'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/stores/cart';
import { submitQuote } from '@/server/actions/quote';
import { QuoteFormFields, isQuoteFormValid, type QuoteFormValue } from '@/components/QuoteFormFields';
import { PrivacyPolicyModal } from '@/components/PrivacyPolicyModal';
import { resolveImageUrl } from '@/lib/utils';
import { getRecaptchaToken } from '@/lib/recaptcha-client';

const EMPTY_FORM: QuoteFormValue = { name: '', email: '', phone: '', docType: 'cnpj', cnpj: '', purpose: '', message: '' };

type Step = 'cart' | 'form' | 'sent';

export function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const items = useCart((s) => s.items);
  const remove = useCart((s) => s.remove);
  const setQty = useCart((s) => s.setQty);
  const clear = useCart((s) => s.clear);

  const [step, setStep] = useState<Step>('cart');
  const [form, setForm] = useState<QuoteFormValue>(EMPTY_FORM);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [sentCount, setSentCount] = useState(0);

  const totalQty = items.reduce((n, i) => n + i.quantity, 0);

  function handleClose() {
    close();
    setStep('cart');
    setForm(EMPTY_FORM);
    setPrivacyChecked(false);
    setError('');
  }

  async function handleSubmit() {
    setSending(true);
    setError('');
    const token = await getRecaptchaToken('submit_quote');
    const result = await submitQuote(
      {
        ...form,
        items: items.map((i) => ({
          code: i.code,
          name: i.name,
          quantity: i.quantity,
          variantLabel: i.variantLabel,
          productId: i.productId,
        })),
      },
      token ?? undefined,
    );
    setSending(false);
    if (result.ok) {
      setSentCount(totalQty);
      clear();
      setStep('sent');
    } else {
      setError(result.error);
    }
  }

  if (!isOpen) return null;

  const panelWidth = step === 'form' ? 'max-w-[880px]' : 'max-w-[420px]';

  return (
    <>
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Seu orçamento">
      <button className="absolute inset-0 bg-ink/40" style={{ animation: 'jg-fade .25s ease both' }} onClick={handleClose} aria-label="Fechar" />

      <div
        className={`absolute right-0 top-0 flex h-full w-full flex-col overflow-hidden bg-white shadow-[-20px_0_60px_rgba(0,0,0,.25)] ${panelWidth}`}
        style={{ animation: 'jg-slide-in .32s cubic-bezier(.22,.61,.36,1) both' }}
      >
        {step === 'sent' ? (
          <SentPanel itemCount={sentCount} onClose={handleClose} />
        ) : (
          <>
            <header className="flex flex-none items-center justify-between border-b border-border-soft p-5">
              <h2 className="font-display text-lg font-black text-ink">Seu orçamento ({items.length})</h2>
              <button
                onClick={handleClose}
                aria-label="Fechar"
                className="flex h-9 w-9 flex-none items-center justify-center rounded-lg text-ink/60 transition hover:bg-surface-alt hover:text-brand"
              >
                ✕
              </button>
            </header>

            <div className="flex min-h-0 flex-1">
              <div className={`min-h-0 min-w-0 flex-col ${step === 'form' ? 'hidden md:flex md:flex-1' : 'flex flex-1'}`}>
                <div className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden p-5">
                  {items.length === 0 ? (
                    <EmptyState onClose={handleClose} />
                  ) : (
                    <ul className="flex flex-col gap-4">
                      {items.map((i) => {
                        const image = resolveImageUrl(i.image);
                        return (
                        <li key={`${i.code}-${i.variantLabel ?? ''}`} className="flex min-w-0 gap-3 text-sm">
                          <div className="flex h-14 w-14 flex-none items-center justify-center overflow-hidden rounded-lg border border-border-soft bg-surface-alt">
                            {image && <Image src={image} alt="" width={56} height={56} className="h-full w-full object-contain" />}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-semibold text-ink">{i.name}</p>
                            <p className="truncate font-mono text-xs text-tertiary">
                              {i.code}
                              {i.variantLabel && <span className="text-brand"> · {i.variantLabel}</span>}
                            </p>
                            <div className="mt-2 flex items-center gap-2.5">
                              <button
                                onClick={() => setQty(i.code, i.quantity - 1, i.variantLabel)}
                                aria-label="Diminuir"
                                className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-border text-sm font-bold text-muted-2 transition hover:border-brand hover:text-brand active:bg-surface-alt"
                              >
                                −
                              </button>
                              <span className="w-5 flex-none text-center text-xs font-bold">{i.quantity}</span>
                              <button
                                onClick={() => setQty(i.code, i.quantity + 1, i.variantLabel)}
                                aria-label="Aumentar"
                                className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-border text-sm font-bold text-muted-2 transition hover:border-brand hover:text-brand active:bg-surface-alt"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={() => remove(i.code, i.variantLabel)}
                            aria-label={`Remover ${i.name}`}
                            className="flex h-10 w-10 flex-none items-center justify-center self-start rounded-lg text-tertiary transition hover:bg-surface-alt hover:text-brand"
                          >
                            🗑
                          </button>
                        </li>
                        );
                      })}
                    </ul>
                  )}
                </div>

                {items.length > 0 && step === 'cart' && (
                  <div className="flex-none border-t border-border-soft p-5">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => setStep('form')}
                        className="rounded-full bg-brand py-3 font-bold text-white transition hover:bg-brand-dark"
                      >
                        Solicitar uma cotação →
                      </button>
                      <button onClick={handleClose} className="rounded-full border border-border py-3 font-bold text-muted-2 transition hover:border-brand hover:text-brand">
                        Selecionar mais itens
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {step === 'form' && (
                <div className="flex w-full flex-1 flex-col bg-surface-card md:w-[440px] md:flex-none" style={{ animation: 'jg-form-in .42s cubic-bezier(.22,.61,.36,1) both' }}>
                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="mt-4">
                      <QuoteFormFields value={form} onChange={(patch) => setForm((f) => ({ ...f, ...patch }))} />
                    </div>
                    <label className="mt-4 flex items-start gap-2.5 text-xs text-muted-2">
                      <input
                        type="checkbox"
                        checked={privacyChecked}
                        onChange={(e) => setPrivacyChecked(e.target.checked)}
                        className="mt-0.5"
                      />
                      <span>
                        Estou de acordo com a{' '}
                        <button type="button" onClick={() => setPrivacyOpen(true)} className="text-brand underline">
                          política de privacidade
                        </button>{' '}
                        da JG2®.
                      </span>
                    </label>
                    {error && <p className="mt-3 text-sm font-semibold text-brand">{error}</p>}
                  </div>
                  <div className="flex flex-none items-center gap-3 border-t border-border-soft p-5">
                    <button
                      onClick={() => setStep('cart')}
                      className="flex-none whitespace-nowrap rounded-full border border-brand-disabled px-6 py-3 font-bold text-brand transition hover:border-brand"
                    >
                      ← Voltar
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!isQuoteFormValid(form, privacyChecked) || sending}
                      className="flex-1 whitespace-nowrap rounded-full bg-brand py-3 font-bold text-white transition hover:bg-brand-dark disabled:bg-brand-disabled"
                    >
                      {sending ? 'Enviando…' : 'Solicitar uma cotação →'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
    <PrivacyPolicyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </>
  );
}

function EmptyState({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <span className="text-4xl">🛍️</span>
      <p className="mt-4 font-bold text-ink">Seu orçamento está vazio</p>
      <p className="mt-1 text-sm text-tertiary">Adicione produtos do catálogo para solicitar a cotação.</p>
      <button onClick={onClose} className="mt-5 rounded-full border border-border px-5 py-2.5 text-sm font-bold text-muted-2 hover:border-brand hover:text-brand">
        Continuar navegando
      </button>
    </div>
  );
}

function SentPanel({ itemCount, onClose }: { itemCount: number; onClose: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-3xl font-black text-success">✓</div>
      <h2 className="mt-5 font-display text-xl font-black text-ink">Cotação solicitada!</h2>
      <p className="mt-2 text-sm text-muted-2">
        Recebemos sua solicitação com <strong>{itemCount} itens</strong>. Nossa equipe retorna com valores e prazos em até 1 dia útil.
      </p>
      <button onClick={onClose} className="mt-6 rounded-full bg-brand px-6 py-3 font-bold text-white hover:bg-brand-dark">
        Fechar
      </button>
    </div>
  );
}

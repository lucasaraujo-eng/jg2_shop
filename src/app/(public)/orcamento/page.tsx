'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/stores/cart';
import { submitQuote } from '@/server/actions/quote';
import { PageQuoteFormFields, isPageQuoteFormValid, type PageQuoteFormValue } from '@/components/PageQuoteFormFields';
import { PrivacyPolicyModal } from '@/components/PrivacyPolicyModal';
import { resolveImageUrl } from '@/lib/utils';
import { getRecaptchaToken } from '@/lib/recaptcha-client';

const EMPTY_FORM: PageQuoteFormValue = { name: '', company: '', email: '', phone: '', city: '', docType: 'cnpj', cnpj: '', message: '' };

export default function OrcamentoPage() {
  const items = useCart((s) => s.items);
  const remove = useCart((s) => s.remove);
  const setQty = useCart((s) => s.setQty);
  const clear = useCart((s) => s.clear);

  const [form, setForm] = useState<PageQuoteFormValue>(EMPTY_FORM);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [protocol, setProtocol] = useState<string | null>(null);
  const [sentCount, setSentCount] = useState(0);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const totalQty = items.reduce((n, i) => n + i.quantity, 0);
  const productCount = items.length;

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
      setProtocol(`JG2-${new Date().getFullYear()}-${result.id.slice(0, 6).toUpperCase()}`);
      clear();
    } else {
      setError(result.error);
    }
  }

  if (protocol) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-[560px] flex-col items-center justify-center px-7 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10 text-4xl font-black text-success">✓</div>
        <h1 className="mt-6 font-display text-3xl font-black text-ink">Orçamento enviado!</h1>
        <p className="mt-3 text-muted-2">
          Recebemos sua solicitação com <strong>{sentCount} itens</strong>. Nossa equipe de especialistas vai analisar e
          retornar com valores e prazos em até <strong>1 dia útil</strong>.
        </p>
        <p className="mt-3 text-sm text-tertiary">
          Uma cópia foi enviada para o seu email. Protocolo: <span className="font-mono font-bold text-ink">{protocol}</span>
        </p>
        <div className="mt-8 flex gap-3">
          <Link href="/" className="rounded-full border border-ink px-6 py-3 font-bold text-ink transition hover:bg-ink hover:text-white">
            Voltar à home
          </Link>
          <Link href="/produtos" className="rounded-full bg-brand px-6 py-3 font-bold text-white transition hover:bg-brand-dark">
            Ver catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-ink-deep py-14 text-white">
        <div className="mx-auto max-w-[1340px] px-7">
          <p className="text-xs text-white/50">
            <Link href="/" className="hover:text-white">
              Home
            </Link>{' '}
            / Orçamento
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-brand-soft">Sem compromisso</p>
          <h1 className="mt-2 font-display text-4xl font-black">Solicitação de orçamento</h1>
          <p className="mt-3 max-w-lg text-white/70">
            Revise os itens, ajuste as quantidades e envie seus dados. Retornamos com valores e prazos em até 1 dia útil.
          </p>
        </div>
      </section>

      {items.length === 0 ? (
        <div className="mx-auto flex max-w-[560px] flex-col items-center px-7 py-24 text-center">
          <span className="text-4xl">🛍️</span>
          <p className="mt-4 font-bold text-ink">Seu orçamento está vazio</p>
          <p className="mt-1 text-sm text-tertiary">Adicione produtos do catálogo para montar sua solicitação.</p>
          <Link href="/produtos" className="mt-6 rounded-full bg-brand px-6 py-3 font-bold text-white transition hover:bg-brand-dark">
            Explorar catálogo →
          </Link>
        </div>
      ) : (
        <div className="mx-auto max-w-[1340px] gap-10 px-7 py-12 lg:flex">
          <div className="flex-1">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-xl font-black text-ink">Itens ({items.length})</h2>
              <button onClick={clear} className="text-sm font-bold text-muted-2 hover:text-brand">
                Limpar tudo
              </button>
            </div>

            <ul className="flex flex-col gap-3">
              {items.map((i) => {
                const image = resolveImageUrl(i.image);
                return (
                <li key={`${i.code}-${i.variantLabel ?? ''}`} className="flex items-start gap-4 rounded-xl border border-border-soft bg-white p-4">
                  <div className="flex h-16 w-16 flex-none items-center justify-center overflow-hidden rounded-lg border border-border-soft bg-surface-alt">
                    {image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={image} alt="" className="h-full w-full object-contain" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-ink">{i.name}</p>
                    <p className="truncate font-mono text-xs text-tertiary">
                      {i.code}
                      {i.category && ` · ${i.category}`}
                    </p>
                    {i.variantLabel && <p className="truncate text-xs font-semibold text-brand">{i.variantLabel}</p>}
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => setQty(i.code, i.quantity - 1, i.variantLabel)}
                        aria-label="Diminuir"
                        className="flex h-7 w-7 flex-none items-center justify-center rounded-full border border-border text-sm font-bold text-muted-2"
                      >
                        −
                      </button>
                      <span className="w-6 flex-none text-center text-sm font-bold">{i.quantity}</span>
                      <button
                        onClick={() => setQty(i.code, i.quantity + 1, i.variantLabel)}
                        aria-label="Aumentar"
                        className="flex h-7 w-7 flex-none items-center justify-center rounded-full border border-border text-sm font-bold text-muted-2"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => remove(i.code, i.variantLabel)}
                    aria-label={`Remover ${i.name}`}
                    className="flex h-8 w-8 flex-none items-center justify-center self-start rounded-lg text-tertiary transition hover:bg-surface-alt hover:text-brand"
                  >
                    🗑
                  </button>
                </li>
                );
              })}
            </ul>

            <Link href="/produtos" className="mt-6 inline-block text-sm font-bold text-brand hover:underline">
              ← Continuar adicionando
            </Link>
          </div>

          <div className="mt-10 w-full flex-none lg:mt-0 lg:w-[380px]">
            <div className="lg:sticky lg:top-[160px] rounded-2xl border border-border-soft bg-surface-card p-6">
              <h2 className="font-display text-base font-black uppercase tracking-wide text-ink">Seus dados</h2>
              <p className="mb-4 mt-1 text-xs text-tertiary">
                {totalQty} itens · {productCount} produtos
              </p>
              <PageQuoteFormFields value={form} onChange={(patch) => setForm((f) => ({ ...f, ...patch }))} />
              {error && <p className="mt-3 text-sm font-semibold text-brand">{error}</p>}
              <button
                onClick={handleSubmit}
                disabled={!isPageQuoteFormValid(form) || sending}
                className="mt-5 w-full rounded-full bg-brand py-3 font-bold text-white transition hover:bg-brand-dark disabled:bg-brand-disabled"
              >
                {sending ? 'Enviando…' : 'Enviar solicitação de orçamento'}
              </button>
              <p className="mt-3 text-center text-xs text-tertiary">
                Ao enviar você concorda com nossa{' '}
                <button type="button" onClick={() => setPrivacyOpen(true)} className="underline hover:text-brand">
                  Política de Privacidade
                </button>
                . Sem compromisso de compra.
              </p>
            </div>
          </div>
        </div>
      )}
      <PrivacyPolicyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { submitContact } from '@/server/actions/contact';
import { PrivacyPolicyModal } from '@/components/PrivacyPolicyModal';
import { getRecaptchaToken } from '@/lib/recaptcha-client';
import { isValidBrPhone, isValidCpfCnpj } from '@/lib/cpfCnpj';
import { formatCpfCnpj, formatPhone } from '@/lib/masks';

const OBJECTIVES = ['Adequação LOTOTO', 'Adequação NR-12', 'Adequação Mãos Seguras', 'Outro assunto'];

type DocType = 'cpf' | 'cnpj';

const inputClass =
  'rounded-lg border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-brand focus:shadow-[0_0_0_3px_rgba(181,32,43,.1)]';
const errorClass = 'text-xs font-semibold text-brand';
const EMAIL_RE = /\S+@\S+\.\S+/;

const EMPTY = { name: '', email: '', phone: '', cnpj: '', subject: '', message: '' };

/** Só é montado quando aberto (ver ProposalRequestButton) — cada abertura já nasce com o estado limpo, sem precisar de efeito pra resetar. */
export function ProposalRequestModal({ onClose, defaultObjective }: { onClose: () => void; defaultObjective: string }) {
  const [form, setForm] = useState(() => ({ ...EMPTY, subject: defaultObjective }));
  const [docType, setDocType] = useState<DocType>('cpf');
  const [showDoc, setShowDoc] = useState(false);
  const [touched, setTouched] = useState({ email: false, phone: false, cnpj: false });
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const emailValid = EMAIL_RE.test(form.email);
  const phoneValid = isValidBrPhone(form.phone);
  const cnpjValid = isValidCpfCnpj(form.cnpj);
  const docLabel = docType === 'cpf' ? 'CPF' : 'CNPJ';

  const isValid =
    form.name.trim().length >= 2 &&
    emailValid &&
    phoneValid &&
    (!showDoc || !form.cnpj || cnpjValid) &&
    form.subject.trim().length > 0 &&
    form.message.trim().length >= 5 &&
    privacyChecked;

  async function handleSubmit() {
    setSending(true);
    setError('');
    const token = await getRecaptchaToken('submit_contact');
    const result = await submitContact(
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        cnpj: form.cnpj ? `${docType.toUpperCase()}: ${form.cnpj}` : null,
        message: form.message,
      },
      token ?? undefined,
    );
    setSending(false);
    if (result.ok) {
      setSent(true);
    } else {
      setError(result.error);
    }
  }

  return createPortal(
    <>
      <div className="fixed inset-0 z-[95] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Detalhar sua demanda">
        <button className="absolute inset-0 bg-ink/50" style={{ animation: 'jg-fade .2s ease both' }} onClick={onClose} aria-label="Fechar" />

        <div
          className="relative flex max-h-[90vh] w-full max-w-[560px] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_rgba(0,0,0,.3)]"
          style={{ animation: 'jg-up .26s ease both' }}
        >
          {sent ? (
            <div className="flex flex-col items-center px-8 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-3xl font-black text-success">✓</div>
              <h2 className="mt-5 font-display text-xl font-black text-ink">Solicitação enviada!</h2>
              <p className="mt-2 text-sm text-muted-2">Nossa equipe recebeu sua demanda e retorna em breve com os próximos passos.</p>
              <button onClick={onClose} className="mt-6 rounded-full bg-brand px-6 py-3 font-bold text-white hover:bg-brand-dark">
                Fechar
              </button>
            </div>
          ) : (
            <>
              <header className="flex flex-none items-start justify-between gap-4 border-b border-border-soft p-6">
                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-widest text-brand">JG2 · Solicitação</p>
                  <h2 className="mt-1 font-display text-xl font-black text-ink">Detalhar sua demanda</h2>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Fechar"
                  className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-surface-alt text-ink/60 transition hover:bg-surface-stripe-a hover:text-brand"
                >
                  ✕
                </button>
              </header>

              <div className="min-h-0 flex-1 overflow-y-auto p-6">
                <div className="flex flex-col gap-4">
                  <label className="flex flex-col gap-1.5 text-sm">
                    <span className="font-bold text-ink">
                      Nome <span className="text-brand">*</span>
                    </span>
                    <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Seu nome completo" className={inputClass} />
                  </label>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-1.5 text-sm">
                      <span className="font-bold text-ink">
                        E-mail <span className="text-brand">*</span>
                      </span>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                        placeholder="voce@empresa.com"
                        className={inputClass}
                      />
                      {touched.email && form.email && !emailValid && <span className={errorClass}>E-mail inválido</span>}
                    </label>
                    <label className="flex flex-col gap-1.5 text-sm">
                      <span className="font-bold text-ink">
                        Telefone <span className="text-brand">*</span>
                      </span>
                      <input
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: formatPhone(e.target.value) }))}
                        onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                        placeholder="(00) 00000-0000"
                        className={inputClass}
                      />
                      {touched.phone && form.phone && !phoneValid && <span className={errorClass}>Telefone inválido</span>}
                    </label>
                  </div>

                  <div className="flex flex-col gap-1.5 text-sm">
                    <span className="font-bold text-ink">Documento (opcional)</span>
                    <div className="flex gap-2.5">
                      <button
                        type="button"
                        onClick={() => {
                          setDocType('cpf');
                          setShowDoc(true);
                        }}
                        className={`rounded-lg border px-4 py-2 text-sm font-bold transition ${docType === 'cpf' && showDoc ? 'border-brand bg-brand text-white' : 'border-border text-muted-2 hover:border-brand'}`}
                      >
                        CPF
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setDocType('cnpj');
                          setShowDoc(true);
                        }}
                        className={`rounded-lg border px-4 py-2 text-sm font-bold transition ${docType === 'cnpj' && showDoc ? 'border-brand bg-brand text-white' : 'border-border text-muted-2 hover:border-brand'}`}
                      >
                        CNPJ
                      </button>
                    </div>
                    {showDoc && (
                      <>
                        <input
                          value={form.cnpj}
                          onChange={(e) => setForm((f) => ({ ...f, cnpj: formatCpfCnpj(e.target.value, docType) }))}
                          onBlur={() => setTouched((t) => ({ ...t, cnpj: true }))}
                          placeholder={docType === 'cpf' ? '000.000.000-00' : '00.000.000/0000-00'}
                          className={`${inputClass} mt-1`}
                        />
                        {touched.cnpj && form.cnpj && !cnpjValid && <span className={errorClass}>{docLabel} inválido</span>}
                      </>
                    )}
                  </div>

                  <label className="flex flex-col gap-1.5 text-sm">
                    <span className="font-bold text-ink">
                      Objetivo <span className="text-brand">*</span>
                    </span>
                    <select value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} className={inputClass}>
                      <option value="">Selecione o objetivo...</option>
                      {OBJECTIVES.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="flex flex-col gap-1.5 text-sm">
                    <span className="font-bold text-ink">
                      Descreva sua demanda <span className="text-brand">*</span>
                    </span>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Conte um pouco sobre sua operação, o número de máquinas/pontos, prazos e o que você precisa."
                      rows={4}
                      className={`${inputClass} resize-y`}
                    />
                  </label>

                  <label className="flex items-start gap-2.5 text-xs text-muted-2">
                    <input type="checkbox" checked={privacyChecked} onChange={(e) => setPrivacyChecked(e.target.checked)} className="mt-0.5" />
                    <span>
                      Li e concordo com a{' '}
                      <button type="button" onClick={() => setPrivacyOpen(true)} className="font-bold text-brand underline">
                        Política de Privacidade
                      </button>{' '}
                      da JG2 e autorizo o contato sobre esta solicitação.<span className="text-brand"> *</span>
                    </span>
                  </label>

                  {error && <p className="text-sm font-semibold text-brand">{error}</p>}
                </div>
              </div>

              <div className="flex-none border-t border-border-soft p-6">
                <button
                  onClick={handleSubmit}
                  disabled={!isValid || sending}
                  className="w-full rounded-full bg-brand py-3 font-bold text-white transition hover:bg-brand-dark disabled:bg-brand-disabled"
                >
                  {sending ? 'Enviando…' : 'Enviar solicitação →'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <PrivacyPolicyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </>,
    document.body,
  );
}

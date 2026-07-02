'use client';

import { useState } from 'react';
import Link from 'next/link';
import { submitContact } from '@/server/actions/contact';

const inputClass =
  'rounded-[11px] border border-border bg-surface-card px-4 py-3.5 text-[15px] outline-none transition focus:border-brand focus:bg-white focus:shadow-[0_0_0_3px_rgba(181,32,43,.1)]';

export default function ContatoPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError('');
    const result = await submitContact(form);
    setSending(false);
    if (result.ok) {
      setSent(true);
    } else {
      setError(result.error);
    }
  }

  return (
    <div>
      <section className="bg-ink-deep py-14 text-white">
        <div className="mx-auto max-w-[1340px] px-7">
          <p className="text-xs text-white/50">
            <Link href="/" className="hover:text-white">
              Home
            </Link>{' '}
            / Contato
          </p>
          <p className="mt-4 inline-block rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
            Fale conosco
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-black leading-tight sm:text-5xl">
            Estamos prontos para atender você
          </h1>
          <p className="mt-3 max-w-xl text-white/70">
            Tire dúvidas, peça uma visita técnica ou solicite informações. Nossa equipe responde em até 1 dia útil.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1340px] gap-7 px-7 py-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-2xl bg-ink p-9 text-white shadow-xl">
          <h2 className="font-display text-xl font-black">Canais de atendimento</h2>
          <p className="mt-1.5 text-sm text-white/60">Escolha o canal de sua preferência — respondemos rápido.</p>

          <div className="mt-6 flex flex-col gap-3.5">
            <a
              href="https://wa.me/5519994073970"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
            >
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-success text-lg">📞</span>
              <div>
                <p className="text-sm font-bold text-white">Telefone &amp; WhatsApp</p>
                <p className="text-[13.5px] text-white/60">+55 19 3500 8210 · +55 19 99407 3970</p>
              </div>
            </a>

            <a href="mailto:comercial@jg2.com.br" className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-brand text-lg">✉️</span>
              <div>
                <p className="text-sm font-bold text-white">Email</p>
                <p className="text-[13.5px] text-white/60">comercial@jg2.com.br · atendimento@jg2.com.br</p>
              </div>
            </a>

            <div className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/5 p-4">
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-white/15 text-lg">📍</span>
              <div>
                <p className="text-sm font-bold text-white">Endereço</p>
                <p className="text-[13.5px] text-white/60">Rua José Gallo, 258 · Vista Alegre · Vinhedo–SP</p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2.5 text-[13.5px] text-white/70">
            <span className="h-2 w-2 flex-none rounded-full bg-success" />
            Seg a sex · 8h às 18h
          </div>
        </div>

        <div className="rounded-2xl border border-border-soft bg-white p-9 shadow-xl">
          {sent ? (
            <div className="flex flex-col items-center py-10 text-center">
              <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-success/10 text-3xl font-black text-success">
                ✓
              </div>
              <h2 className="mt-5 font-display text-2xl font-black text-ink">Mensagem enviada!</h2>
              <p className="mt-2 max-w-sm text-muted-2">Obrigado pelo contato. Nossa equipe vai responder no seu email em até 1 dia útil.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 className="font-display text-2xl font-black text-ink">Envie uma mensagem</h2>
              <p className="mt-1 text-sm text-tertiary">
                Campos marcados com <span className="text-brand">*</span> são obrigatórios.
              </p>

              <div className="mt-6 flex flex-col gap-4">
                <label className="flex flex-col gap-1.5 text-sm">
                  <span className="font-bold text-ink">
                    Nome <span className="text-brand">*</span>
                  </span>
                  <input
                    required
                    placeholder="Seu nome completo"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass}
                  />
                </label>

                <div className="flex flex-wrap gap-3.5">
                  <label className="flex min-w-[170px] flex-1 flex-col gap-1.5 text-sm">
                    <span className="font-bold text-ink">
                      Email <span className="text-brand">*</span>
                    </span>
                    <input
                      required
                      type="email"
                      placeholder="voce@empresa.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                    />
                  </label>
                  <label className="flex min-w-[170px] flex-1 flex-col gap-1.5 text-sm">
                    <span className="font-bold text-ink">Telefone</span>
                    <input
                      placeholder="(00) 00000-0000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={inputClass}
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-1.5 text-sm">
                  <span className="font-bold text-ink">Assunto</span>
                  <input
                    placeholder="Sobre o que deseja falar?"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className={inputClass}
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-sm">
                  <span className="font-bold text-ink">
                    Mensagem <span className="text-brand">*</span>
                  </span>
                  <textarea
                    required
                    placeholder="Escreva sua mensagem…"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputClass} resize-y`}
                  />
                </label>
              </div>

              {error && <p className="mt-4 text-sm font-semibold text-brand">{error}</p>}

              <button
                type="submit"
                disabled={sending}
                className="mt-6 w-full rounded-full bg-brand py-3.5 font-bold text-white transition hover:bg-brand-dark disabled:bg-brand-disabled sm:w-auto sm:px-8"
              >
                {sending ? 'Enviando…' : 'Enviar mensagem →'}
              </button>
              <p className="mt-3.5 text-center text-xs text-tertiary sm:text-left">
                Ao enviar você concorda com nossa Política de Privacidade.
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

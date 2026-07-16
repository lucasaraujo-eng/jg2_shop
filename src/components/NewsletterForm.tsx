'use client';

import { useState } from 'react';
import { submitNewsletter } from '@/server/actions/newsletter';

export function NewsletterForm({ ctaLabel = 'Assinar agora →' }: { ctaLabel?: string }) {
  const [form, setForm] = useState({ name: '', email: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  if (sent) {
    return <p className="text-sm font-semibold text-success">Inscrição recebida — obrigado!</p>;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError('');
    const result = await submitNewsletter(form);
    setSending(false);
    if (result.ok) {
      setSent(true);
    } else {
      setError(result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          required
          placeholder="Nome *"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="flex-1 rounded-full border border-border px-5 py-3 text-sm outline-none focus:border-brand"
        />
        <input
          required
          type="email"
          placeholder="Email *"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="flex-1 rounded-full border border-border px-5 py-3 text-sm outline-none focus:border-brand"
        />
        <button
          type="submit"
          disabled={sending}
          className="flex-none rounded-full bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-dark disabled:bg-brand-disabled"
        >
          {sending ? 'Enviando…' : ctaLabel}
        </button>
      </div>
      {error && <p className="text-sm font-semibold text-brand">{error}</p>}
    </form>
  );
}

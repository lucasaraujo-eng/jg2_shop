'use client';

import { useState } from 'react';

/**
 * Sem serviço de e-mail marketing definido na arquitetura ainda — por ora só
 * confirma no cliente. Quando houver um provedor (ex.: Resend Audiences),
 * troco por uma Server Action real.
 */
export function NewsletterForm({ ctaLabel = 'Assinar agora →' }: { ctaLabel?: string }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return <p className="text-sm font-semibold text-success">Inscrição recebida — obrigado!</p>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <input required placeholder="Nome*" className="flex-1 rounded-full border border-border px-5 py-3 text-sm outline-none focus:border-brand" />
      <input required type="email" placeholder="Email*" className="flex-1 rounded-full border border-border px-5 py-3 text-sm outline-none focus:border-brand" />
      <button type="submit" className="flex-none rounded-full bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-dark">
        {ctaLabel}
      </button>
    </form>
  );
}

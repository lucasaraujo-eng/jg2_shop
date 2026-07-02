'use client';

import { useState, useTransition } from 'react';
import { updateQuoteStatus } from '@/server/actions/quotes';

const STATUS_LABELS: Record<string, string> = {
  NEW: 'Novo',
  IN_PROGRESS: 'Em andamento',
  SENT: 'Enviado',
  ARCHIVED: 'Arquivado',
};

export function QuoteStatusSelect({ id, status }: { id: string; status: string }) {
  const [value, setValue] = useState(status);
  const [pending, startTransition] = useTransition();

  function handleChange(next: string) {
    setValue(next);
    startTransition(async () => {
      const result = await updateQuoteStatus(id, next as Parameters<typeof updateQuoteStatus>[1]);
      if (!result.ok) {
        setValue(status);
        alert(result.error);
      }
    });
  }

  return (
    <select
      value={value}
      disabled={pending}
      onChange={(e) => handleChange(e.target.value)}
      className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-bold text-ink outline-none focus:border-brand disabled:opacity-50"
    >
      {Object.entries(STATUS_LABELS).map(([key, label]) => (
        <option key={key} value={key}>
          {label}
        </option>
      ))}
    </select>
  );
}

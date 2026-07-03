'use client';

import { useState, useTransition } from 'react';
import { updateQuoteStatus } from '@/server/actions/quotes';

const STATUS_LABELS: Record<string, string> = {
  NEW: 'Novo',
  IN_PROGRESS: 'Em andamento',
  SENT: 'Enviado',
  ARCHIVED: 'Arquivado',
};

const STATUS_COLORS: Record<string, string> = {
  NEW: 'border-brand/40 bg-surface-badge text-brand',
  IN_PROGRESS: 'border-gold/40 bg-gold/10 text-gold',
  SENT: 'border-success/40 bg-success/10 text-success',
  ARCHIVED: 'border-border bg-surface-alt text-tertiary',
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
      className={`flex-none rounded-full border px-3.5 py-2 text-xs font-bold outline-none transition disabled:opacity-50 ${STATUS_COLORS[value] ?? STATUS_COLORS.NEW}`}
    >
      {Object.entries(STATUS_LABELS).map(([key, label]) => (
        <option key={key} value={key}>
          {label}
        </option>
      ))}
    </select>
  );
}

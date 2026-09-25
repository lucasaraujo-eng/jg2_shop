'use client';

import { useState } from 'react';

export function ExpandableSupportText({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const long = text.length > 420;

  return (
    <div>
      <div
        className={`whitespace-pre-line leading-relaxed text-muted ${!open && long ? 'max-h-[11.5rem] overflow-hidden' : ''}`}
      >
        {text}
      </div>
      {long && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-3 text-sm font-bold text-brand hover:underline"
        >
          {open ? 'Ver menos' : 'Ver mais'}
        </button>
      )}
    </div>
  );
}

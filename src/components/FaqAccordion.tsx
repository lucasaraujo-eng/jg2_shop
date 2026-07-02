'use client';

import { useState } from 'react';

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-2.5">
      {items.map((f, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={f.q} className="rounded-xl border border-border-strong bg-white px-[18px] py-4">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-3.5 text-left"
            >
              <span className="flex-1 text-[15px] font-semibold text-muted-3">{f.q}</span>
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full border border-border-strong text-lg font-bold text-brand">
                {isOpen ? '–' : '+'}
              </span>
            </button>
            {isOpen && (
              <p className="mt-3 text-sm leading-relaxed text-muted-2" style={{ animation: 'jg-fade .25s ease both' }}>
                {f.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';

/** Sidebar sticky com scroll-spy — mesmo padrão do ProductTabs (Bloco 4), generalizado. */
export function SectionNav({ items }: { items: { id: string; label: string }[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id);

  useEffect(() => {
    const elements = items.map((t) => document.getElementById(t.id)).filter((el): el is HTMLElement => !!el);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-150px 0px -60% 0px', threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Nesta página" className="hidden w-[240px] flex-none lg:block">
      <div className="sticky top-[158px] flex flex-col gap-1">
        <p className="mb-2 pl-4 font-display text-xs font-black uppercase tracking-wide text-tertiary">Nesta página</p>
        {items.map((t) => (
          <a
            key={t.id}
            href={`#${t.id}`}
            className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
              activeId === t.id ? 'bg-surface-badge text-brand' : 'text-muted-2 hover:bg-surface-alt'
            }`}
          >
            {t.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

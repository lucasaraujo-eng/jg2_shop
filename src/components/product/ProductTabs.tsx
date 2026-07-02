'use client';

import { useEffect, useState } from 'react';

const TABS = [
  { id: 'prod-sec-downloads', label: 'DataSheet' },
  { id: 'prod-sec-caracteristicas', label: 'Descrição' },
  { id: 'prod-sec-especificacoes', label: 'Especificações técnicas' },
];

/** Sidebar sticky com scroll-spy — destaca a aba da seção visível. O
 * conteúdo em si é renderizado pelo servidor; aqui só observamos os ids. */
export function ProductTabs() {
  const [activeId, setActiveId] = useState(TABS[0].id);

  useEffect(() => {
    const elements = TABS.map((t) => document.getElementById(t.id)).filter((el): el is HTMLElement => !!el);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-120px 0px -60% 0px', threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Seções do produto" className="hidden w-[220px] flex-none lg:block">
      <div className="sticky top-[100px] flex flex-col gap-1">
        {TABS.map((t) => (
          <a
            key={t.id}
            href={`#${t.id}`}
            className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
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

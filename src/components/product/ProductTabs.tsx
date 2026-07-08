'use client';

import { useEffect, useRef, useState } from 'react';

const TABS = [
  { id: 'prod-sec-downloads', label: 'DataSheet' },
  { id: 'prod-sec-caracteristicas', label: 'Descrição' },
  { id: 'prod-sec-especificacoes', label: 'Especificações' },
];

// Altura real do header sticky do site (2 linhas — logo/busca + menu) é maior
// que os 96/100px usados antes em vários lugares, o que fazia o header cobrir
// o topo de sidebars/âncoras sticky. 160px cobre com folga.
const TOP_OFFSET = 160;

/**
 * Sidebar sticky com scroll-spy — destaca a aba da seção visível. O
 * conteúdo em si é renderizado pelo servidor; aqui só observamos os ids.
 *
 * O "sticky" nativo soltava de forma inconsistente perto do fim da coluna
 * (cortava o menu no meio antes de "Veja também"). Em vez de depender só do
 * CSS, medimos o próprio container (o <nav>, esticado pelo flex pai até a
 * altura do conteúdo) e travamos o menu no rodapé dele assim que o fim da
 * coluna se aproxima — soltando de novo se o usuário rolar pra cima.
 */
export function ProductTabs() {
  const [activeId, setActiveId] = useState(TABS[0].id);
  const [pinnedToBottom, setPinnedToBottom] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = TABS.map((t) => document.getElementById(t.id)).filter((el): el is HTMLElement => !!el);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-160px 0px -60% 0px', threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function handleScroll() {
      const nav = navRef.current;
      const inner = innerRef.current;
      if (!nav || !inner) return;
      const navBottom = nav.getBoundingClientRect().bottom;
      setPinnedToBottom(navBottom <= TOP_OFFSET + inner.offsetHeight);
    }
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <nav ref={navRef} aria-label="Seções do produto" className="relative hidden w-[220px] flex-none lg:block">
      <div
        ref={innerRef}
        className={`flex flex-col gap-1 ${pinnedToBottom ? 'absolute inset-x-0 bottom-0' : 'sticky top-[160px]'}`}
      >
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

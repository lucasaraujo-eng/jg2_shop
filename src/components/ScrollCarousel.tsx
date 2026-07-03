'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Carrossel horizontal genérico — setas + barra de progresso, mesma
 * interação do ProductCarousel, mas recebendo qualquer conteúdo como filhos
 * (ex.: tiles de setor) em vez de só CardProduct.
 *
 * `autoPlay` faz uma rolagem contínua e lenta (não aos saltos), indo e
 * voltando entre as pontas — pausa ao passar o mouse ou tocar.
 */
export function ScrollCarousel({
  children,
  autoPlay = false,
  speed = 35,
}: {
  children: React.ReactNode;
  autoPlay?: boolean;
  /** Pixels por segundo da rolagem automática. */
  speed?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const dirRef = useRef<1 | -1>(1);
  const [progress, setProgress] = useState(0);

  function scroll(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' });
  }

  function handleScroll() {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }

  useEffect(() => {
    if (!autoPlay) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf: number;
    let last: number | null = null;

    function tick(now: number) {
      const el = trackRef.current;
      if (last === null) last = now;
      const dt = now - last;
      last = now;

      if (el && !pausedRef.current && !document.hidden) {
        const max = el.scrollWidth - el.clientWidth;
        if (max > 0) {
          let next = el.scrollLeft + dirRef.current * speed * (dt / 1000);
          if (next >= max) {
            next = max;
            dirRef.current = -1;
          } else if (next <= 0) {
            next = 0;
            dirRef.current = 1;
          }
          el.scrollLeft = next;
        }
      }
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoPlay, speed]);

  return (
    <div
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      onTouchStart={() => {
        pausedRef.current = true;
      }}
    >
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="jg-noscroll flex gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <div className="mt-5 flex items-center gap-4">
        <div className="flex flex-none gap-3">
          <button
            onClick={() => scroll(-1)}
            aria-label="Anterior"
            className="flex h-[46px] w-[46px] items-center justify-center rounded-full border border-border-strong-2 text-lg transition hover:border-brand hover:bg-brand hover:text-white"
          >
            ←
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Próximo"
            className="flex h-[46px] w-[46px] items-center justify-center rounded-full border border-border-strong-2 text-lg transition hover:border-brand hover:bg-brand hover:text-white"
          >
            →
          </button>
        </div>
        <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-border-soft">
          <div
            className="h-full rounded-full bg-brand transition-[width] duration-150 ease-out"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

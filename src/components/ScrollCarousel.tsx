'use client';

import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from 'react';

const LOOP_INTERVAL = 3500;

/**
 * `autoPlay` faz uma rolagem contínua e lenta (não aos saltos), indo e
 * voltando entre as pontas — pausa ao passar o mouse ou tocar. Com
 * `loopToStart`, os filhos são duplicados no trilho e a posição é reiniciada
 * silenciosamente (sem animação) assim que passa da primeira cópia — como o
 * conteúdo é idêntico, o "wrap" é imperceptível e a rolagem parece infinita,
 * sempre avançando para a direita (nunca volta visivelmente ao card 1).
 */
export function ScrollCarousel({
  children,
  autoPlay = false,
  speed = 35,
  loopToStart = false,
  gapClassName = 'gap-4',
  trackClassName = '',
  showControls = true,
}: {
  children: React.ReactNode;
  autoPlay?: boolean;
  /** Pixels por segundo da rolagem automática (ignorado quando loopToStart). */
  speed?: number;
  /** Loop infinito: duplica os filhos e sempre avança para a direita, em vez de inverter o sentido. */
  loopToStart?: boolean;
  /** Espaçamento entre os itens do trilho (ex.: "gap-0" para itens colados, só separados por borda). */
  gapClassName?: string;
  /** Classes extras no trilho rolável (ex.: fundo/arredondamento de um painel que envolve os itens). */
  trackClassName?: string;
  /** Esconde as setas e a barra de progresso abaixo do trilho (ex.: quando o carrossel só rola sozinho, sem controle manual). */
  showControls?: boolean;
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
    if (loopToStart) {
      // Trilho tem 2 cópias dos filhos; ao passar da primeira, volta ao
      // início dela sem animação — como a 2ª cópia é idêntica, não se nota.
      const singleWidth = el.scrollWidth / 2;
      if (singleWidth > 0 && el.scrollLeft >= singleWidth) {
        el.scrollLeft -= singleWidth;
      }
      const effectiveMax = singleWidth - el.clientWidth;
      setProgress(effectiveMax > 0 ? el.scrollLeft / effectiveMax : 0);
      return;
    }
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }

  useEffect(() => {
    if (!autoPlay) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (loopToStart) {
      const id = setInterval(() => {
        const el = trackRef.current;
        if (!el || pausedRef.current || document.hidden) return;
        if (el.scrollWidth - el.clientWidth <= 0) return;
        el.scrollBy({ left: el.clientWidth * 0.85, behavior: 'smooth' });
      }, LOOP_INTERVAL);
      return () => clearInterval(id);
    }

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
  }, [autoPlay, speed, loopToStart]);

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
        className={`jg-noscroll flex ${gapClassName} overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${trackClassName}`}
      >
        {children}
        {loopToStart &&
          Children.map(children, (child, i) =>
            isValidElement(child) ? cloneElement(child, { key: `dup-${i}`, 'aria-hidden': true } as Record<string, unknown>) : child,
          )}
      </div>
      {showControls && (
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
      )}
    </div>
  );
}

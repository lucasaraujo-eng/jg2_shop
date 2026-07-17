'use client';

import { useEffect, useRef, useState } from 'react';
import { ProductCard, type CardProduct } from '@/components/ProductCard';

const STEP = 288;
const AUTOPLAY_INTERVAL = 3500;

export function ProductCarousel({
  products,
  variant = 'compact',
  autoPlay = false,
}: {
  products: CardProduct[];
  variant?: 'compact' | 'catalog';
  autoPlay?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [progress, setProgress] = useState(0);

  function scroll(dir: 1 | -1) {
    trackRef.current?.scrollBy({ left: dir * STEP, behavior: 'smooth' });
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

    const id = setInterval(() => {
      const el = trackRef.current;
      if (!el || pausedRef.current || document.hidden) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      if (el.scrollLeft >= max - 4) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: STEP, behavior: 'smooth' });
      }
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(id);
  }, [autoPlay]);

  if (products.length === 0) return null;

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
        className="jg-noscroll flex gap-5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {products.map((p) => (
          <div key={p.id} className="w-[268px] flex-none" style={{ scrollSnapAlign: 'start' }}>
            <ProductCard product={p} variant={variant} />
          </div>
        ))}
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

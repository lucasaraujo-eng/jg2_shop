'use client';

import { useRef } from 'react';
import { ProductCard, type CardProduct } from '@/components/ProductCard';

export function ProductCarousel({ products, variant = 'compact' }: { products: CardProduct[]; variant?: 'compact' | 'catalog' }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(dir: 1 | -1) {
    trackRef.current?.scrollBy({ left: dir * 288, behavior: 'smooth' });
  }

  if (products.length === 0) return null;

  return (
    <div>
      <div ref={trackRef} className="jg-noscroll flex gap-5 overflow-x-auto pb-1" style={{ scrollSnapType: 'x mandatory' }}>
        {products.map((p) => (
          <div key={p.id} className="w-[268px] flex-none" style={{ scrollSnapAlign: 'start' }}>
            <ProductCard product={p} variant={variant} />
          </div>
        ))}
      </div>
      <div className="mt-5 flex gap-3">
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
    </div>
  );
}

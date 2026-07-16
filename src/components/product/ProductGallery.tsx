'use client';

import { useRef, useState } from 'react';
import { resolveImageUrl } from '@/lib/utils';

/** Largura de 5 miniaturas (80px) + 4 espaços (12px) — só essa "janela" fica visível, o resto rola. */
const THUMBS_VISIBLE_WIDTH = 5 * 80 + 4 * 12;

const STRIPE_BG = {
  backgroundImage:
    'repeating-linear-gradient(135deg, var(--color-surface-stripe-a) 0 14px, var(--color-surface-stripe-b) 14px 28px)',
};

export function ProductGallery({
  images,
  name,
  overrideImageUrl,
}: {
  images: { url: string }[];
  name: string;
  /** Foto da cor selecionada (cadeados) — substitui a galeria enquanto ativa. */
  overrideImageUrl?: string | null;
}) {
  const realImages = images.map((i) => resolveImageUrl(i.url)).filter((u): u is string => !!u);
  const [active, setActive] = useState(0);
  const current = overrideImageUrl ?? realImages[active];
  const thumbsRef = useRef<HTMLDivElement>(null);

  function scrollThumbs(dir: 1 | -1) {
    thumbsRef.current?.scrollBy({ left: dir * THUMBS_VISIBLE_WIDTH, behavior: 'smooth' });
  }

  return (
    <div className="min-w-0 lg:sticky lg:top-[160px]">
      <div className="group flex h-[440px] items-center justify-center overflow-hidden rounded-2xl border border-border-soft bg-white p-6">
        {current ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={current} alt={name} className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-xl" style={STRIPE_BG}>
            <span className="rounded bg-white/90 px-3 py-1.5 text-center font-mono text-xs text-code">
              [ foto: {name} ]
            </span>
          </div>
        )}
      </div>

      {realImages.length > 1 && (
        <div className="mt-4 flex items-center gap-2">
          {realImages.length > 5 && (
            <button
              onClick={() => scrollThumbs(-1)}
              aria-label="Fotos anteriores"
              className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-border-strong-2 text-sm transition hover:border-brand hover:bg-brand hover:text-white"
            >
              ←
            </button>
          )}
          <div
            ref={thumbsRef}
            className="jg-noscroll flex w-full min-w-0 max-w-[min(448px,calc(100vw-8.5rem))] gap-3 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {realImages.map((url, i) => (
              <button
                key={url}
                onClick={() => setActive(i)}
                aria-label={`Ver imagem ${i + 1}`}
                className={`group h-20 w-20 flex-none overflow-hidden rounded-lg border-2 bg-white p-1 transition ${
                  i === active ? 'border-brand' : 'border-border hover:border-brand/50'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110" />
              </button>
            ))}
          </div>
          {realImages.length > 5 && (
            <button
              onClick={() => scrollThumbs(1)}
              aria-label="Próximas fotos"
              className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-border-strong-2 text-sm transition hover:border-brand hover:bg-brand hover:text-white"
            >
              →
            </button>
          )}
        </div>
      )}
    </div>
  );
}

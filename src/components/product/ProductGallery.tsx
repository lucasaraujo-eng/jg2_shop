'use client';

import { useState } from 'react';
import { resolveImageUrl } from '@/lib/utils';

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

  return (
    <div className="lg:sticky lg:top-[96px]">
      <div className="flex h-[440px] items-center justify-center rounded-2xl border border-border-soft bg-white p-6">
        {current ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={current} alt={name} className="max-h-full max-w-full object-contain" />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-xl" style={STRIPE_BG}>
            <span className="rounded bg-white/90 px-3 py-1.5 text-center font-mono text-xs text-code">
              [ foto: {name} ]
            </span>
          </div>
        )}
      </div>

      {realImages.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {realImages.map((url, i) => (
            <button
              key={url}
              onClick={() => setActive(i)}
              aria-label={`Ver imagem ${i + 1}`}
              className={`h-20 w-20 flex-none overflow-hidden rounded-lg border-2 bg-white p-1 ${
                i === active ? 'border-brand' : 'border-border'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-full w-full object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

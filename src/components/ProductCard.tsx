'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/stores/cart';
import { resolveImageUrl } from '@/lib/utils';

export type CardProduct = {
  id: string;
  code: string;
  name: string;
  images: { url: string }[];
  category?: string;
};

/**
 * `variant="compact"` (padrão): código, nome e um único botão.
 * `variant="catalog"`: etiqueta de categoria, nome, código e os botões "Detalhes" + "+ Orçamento".
 */
export function ProductCard({ product, variant = 'compact' }: { product: CardProduct; variant?: 'compact' | 'catalog' }) {
  const add = useCart((s) => s.add);
  const image = resolveImageUrl(product.images[0]?.url);
  const nextImage = resolveImageUrl(product.images[1]?.url);
  const href = `/produto/${encodeURIComponent(product.code)}`;
  const [hovered, setHovered] = useState(false);
  const shown = hovered && nextImage ? nextImage : image;

  if (variant === 'catalog') {
    return (
      <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border-soft bg-white transition hover:-translate-y-1 hover:shadow-xl">
        <Link
          href={href}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="flex h-[190px] items-center justify-center overflow-hidden bg-white p-3"
        >
          {shown ? (
            <Image
              src={shown}
              alt={product.name}
              width={400}
              height={400}
              sizes="(max-width: 640px) 45vw, 268px"
              className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <span className="text-center font-mono text-xs text-code">[ foto: {product.name} ]</span>
          )}
        </Link>
        <div className="flex flex-1 flex-col p-[18px]">
          {product.category && <span className="font-mono text-xs text-brand">{product.category}</span>}
          <Link href={href} className="mb-1 mt-1.5 text-[15.5px] font-bold leading-snug text-ink">
            {product.name}
          </Link>
          <span className="mb-3.5 font-mono text-xs text-code">{product.code}</span>
          <div className="mt-auto flex gap-2">
            <Link
              href={href}
              className="flex-none rounded-lg border border-border px-3.5 py-2.5 text-[13px] font-bold text-ink transition hover:border-ink"
            >
              Detalhes
            </Link>
            <button
              onClick={() => add({ productId: product.id, code: product.code, name: product.name, image, category: product.category })}
              className="flex-1 whitespace-nowrap rounded-lg bg-brand py-2.5 text-[13px] font-bold text-white transition hover:bg-ink"
            >
              + Orçamento
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border-soft bg-white transition hover:-translate-y-1 hover:shadow-xl">
      <Link
        href={href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex h-[180px] items-center justify-center overflow-hidden bg-white p-3"
      >
        {shown ? (
          <Image
            src={shown}
            alt={product.name}
            width={400}
            height={400}
            sizes="(max-width: 640px) 45vw, 268px"
            className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <span className="text-center font-mono text-xs text-code">[ foto: {product.name} ]</span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-[18px]">
        <span className="font-mono text-xs text-code">{product.code}</span>
        <Link href={href} className="mb-3.5 mt-1.5 flex-1 text-[15px] font-bold leading-snug text-ink">
          {product.name}
        </Link>
        <button
          onClick={() => add({ productId: product.id, code: product.code, name: product.name, image })}
          className="w-full rounded-lg bg-brand py-2.5 text-[13px] font-bold text-white transition hover:bg-ink"
        >
          + Adicionar ao orçamento
        </button>
      </div>
    </div>
  );
}

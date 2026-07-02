'use client';

import Link from 'next/link';
import { useCart } from '@/stores/cart';
import { isRealImageUrl } from '@/lib/utils';

export type CardProduct = {
  id: string;
  code: string;
  name: string;
  images: { url: string }[];
};

/** Card de produto reutilizado no carrossel da Home e na grid do catálogo. */
export function ProductCard({ product }: { product: CardProduct }) {
  const add = useCart((s) => s.add);
  const rawImage = product.images[0]?.url ?? null;
  const image = isRealImageUrl(rawImage) ? rawImage : null;
  const href = `/produto/${encodeURIComponent(product.code)}`;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border-soft bg-white transition hover:-translate-y-1 hover:shadow-xl">
      <Link href={href} className="flex h-[180px] items-center justify-center overflow-hidden bg-white p-3">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={product.name} className="max-h-full max-w-full object-contain" />
        ) : (
          <span className="text-center font-mono text-[11px] text-code">[ foto: {product.name} ]</span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-[18px]">
        <span className="font-mono text-[11px] text-code">{product.code}</span>
        <Link href={href} className="mb-3.5 mt-1.5 flex-1 text-[15px] font-bold leading-snug text-ink">
          {product.name}
        </Link>
        <button
          onClick={() => add({ productId: product.id, code: product.code, name: product.name, image })}
          className="w-full rounded-lg bg-ink py-2.5 text-[13px] font-bold text-white transition hover:bg-brand"
        >
          + Adicionar ao orçamento
        </button>
      </div>
    </div>
  );
}

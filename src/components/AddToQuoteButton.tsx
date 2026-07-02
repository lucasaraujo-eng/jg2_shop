'use client';

import { useCart } from '@/stores/cart';

/**
 * Stub (Bloco 1): adiciona o produto ao carrinho sem seletor de variação.
 * O seletor de cor/segredo do cadeado entra no Bloco 4 (página de produto).
 */
export function AddToQuoteButton({
  productId,
  code,
  name,
  image,
}: {
  productId: string;
  code: string;
  name: string;
  image?: string | null;
}) {
  const add = useCart((s) => s.add);

  return (
    <button
      onClick={() => add({ productId, code, name, image })}
      className="rounded-full bg-brand px-6 py-3 font-bold text-white transition hover:bg-brand-dark"
    >
      + Adicionar ao orçamento
    </button>
  );
}

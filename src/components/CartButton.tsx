'use client';

import { useCart } from '@/stores/cart';

/** Contador lido só depois da hidratação, pra não divergir do HTML gerado no servidor. */
export function CartButton() {
  const open = useCart((s) => s.open);
  const count = useCart((s) => s.items.reduce((n, i) => n + i.quantity, 0));

  return (
    <button
      onClick={open}
      aria-label="Seu orçamento"
      title="Seu orçamento"
      className="relative flex h-11 w-11 items-center justify-center gap-2 font-semibold text-ink transition hover:text-brand"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="20" r="1.3" />
        <circle cx="18" cy="20" r="1.3" />
        <path d="M2 3h2.3l2.3 12.1a1.5 1.5 0 0 0 1.5 1.2h8.5a1.5 1.5 0 0 0 1.5-1.2L21 7H5.4" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-2 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand px-1 text-[11px] font-extrabold text-white">
          {count}
        </span>
      )}
    </button>
  );
}

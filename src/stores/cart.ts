'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  productId: string;
  code: string;
  name: string;
  image?: string | null;
  variantLabel?: string | null;
  category?: string | null;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  add: (item: Omit<CartItem, 'quantity'>, qty?: number) => void;
  remove: (code: string, variantLabel?: string | null) => void;
  setQty: (code: string, qty: number, variantLabel?: string | null) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  count: () => number;
};

const sameLine = (a: CartItem, code: string, variantLabel?: string | null) =>
  a.code === code && (a.variantLabel ?? null) === (variantLabel ?? null);

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      add: (item, qty = 1) =>
        set((s) => {
          const existing = s.items.find((i) => sameLine(i, item.code, item.variantLabel));
          if (existing) {
            return {
              items: s.items.map((i) =>
                sameLine(i, item.code, item.variantLabel)
                  ? { ...i, quantity: i.quantity + qty }
                  : i,
              ),
              isOpen: true,
            };
          }
          return { items: [...s.items, { ...item, quantity: qty }], isOpen: true };
        }),
      remove: (code, variantLabel) =>
        set((s) => ({ items: s.items.filter((i) => !sameLine(i, code, variantLabel)) })),
      setQty: (code, qty, variantLabel) =>
        set((s) => ({
          items: s.items
            .map((i) => (sameLine(i, code, variantLabel) ? { ...i, quantity: Math.max(1, qty) } : i))
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      count: () => get().items.reduce((n, i) => n + i.quantity, 0),
    }),
    { name: 'jg2_cart' },
  ),
);

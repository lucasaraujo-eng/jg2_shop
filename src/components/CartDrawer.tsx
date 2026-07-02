'use client';

import { useCart } from '@/stores/cart';

/**
 * Stub do drawer de orçamento (Bloco 1: só abre/fecha e lista itens).
 * O fluxo completo (2 etapas + formulário + envio) entra no Bloco 5.
 */
export function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const items = useCart((s) => s.items);
  const remove = useCart((s) => s.remove);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Seu orçamento">
      <button
        className="absolute inset-0 bg-ink/40"
        style={{ animation: 'jg-fade .25s ease both' }}
        onClick={close}
        aria-label="Fechar"
      />
      <div
        className="absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-white shadow-[-20px_0_60px_rgba(0,0,0,.25)]"
        style={{ animation: 'jg-slide-in .32s cubic-bezier(.22,.61,.36,1) both' }}
      >
        <header className="flex items-center justify-between border-b border-border-soft p-5">
          <h2 className="font-display text-lg font-black">Seu orçamento ({items.length})</h2>
          <button onClick={close} aria-label="Fechar" className="p-1 text-ink/60 hover:text-brand">
            ✕
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <p className="text-sm text-tertiary">
              Seu orçamento está vazio. Adicione produtos do catálogo para solicitar a cotação.
            </p>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((i) => (
                <li key={`${i.code}-${i.variantLabel ?? ''}`} className="flex items-center justify-between gap-3 text-sm">
                  <div>
                    <p className="font-semibold">{i.name}</p>
                    <p className="font-mono text-xs text-tertiary">
                      {i.code} · qtd {i.quantity}
                      {i.variantLabel ? ` · ${i.variantLabel}` : ''}
                    </p>
                  </div>
                  <button
                    onClick={() => remove(i.code, i.variantLabel)}
                    aria-label={`Remover ${i.name}`}
                    className="text-tertiary hover:text-brand"
                  >
                    🗑
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

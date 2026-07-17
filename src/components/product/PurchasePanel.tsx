'use client';

import { useMemo, useState } from 'react';
import { useCart } from '@/stores/cart';
import { resolveImageUrl } from '@/lib/utils';

type SecretType = 'DIFERENTES' | 'IGUAIS' | 'CHAVE_MESTRA';

type Variant = {
  color: string | null;
  secretType: SecretType | null;
  skuSuffix: string | null;
};

const SECRET_LABELS: Record<SecretType, string> = {
  DIFERENTES: 'Segredos diferentes',
  IGUAIS: 'Segredos iguais',
  CHAVE_MESTRA: 'Chave mestra',
};

const COLOR_HEX: Record<string, string> = {
  Vermelho: '#c0392b',
  Amarelo: '#f1c40f',
  Verde: '#2e9e4f',
  Laranja: '#e8821e',
  Azul: '#2557c7',
  Preto: '#1b1b1f',
  Branco: '#ffffff',
  Cinza: '#9a958c',
  Roxo: '#7d3cc0',
  Marrom: '#7a4a2b',
};

export function PurchasePanel({
  productId,
  code,
  name,
  image,
  isCadeado,
  variants,
  category,
  color,
  onColorChange,
}: {
  productId: string;
  code: string;
  name: string;
  image: string | null;
  isCadeado: boolean;
  variants: Variant[];
  category: string;
  color: string | null;
  onColorChange: (color: string) => void;
}) {
  const add = useCart((s) => s.add);
  const openCart = useCart((s) => s.open);
  const cover = resolveImageUrl(image);

  const colors = useMemo(() => {
    const names = variants.map((v) => v.color).filter((c): c is string => !!c);
    return [...new Set(names)];
  }, [variants]);
  const secretTypes = useMemo(() => {
    const types = variants.map((v) => v.secretType).filter((s): s is SecretType => !!s);
    return [...new Set(types)];
  }, [variants]);

  const [secretType, setSecretType] = useState<SecretType | null>(secretTypes[0] ?? null);
  const [masterKeyQty, setMasterKeyQty] = useState(1);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const selectedVariant = isCadeado ? variants.find((v) => v.color === color && v.secretType === secretType) : null;
  const displaySku = selectedVariant?.skuSuffix ? `${code}${selectedVariant.skuSuffix}` : code;

  function handleAdd() {
    const variantLabel = isCadeado && color && secretType ? `${color} · ${SECRET_LABELS[secretType]}` : null;
    add({ productId, code: displaySku, name, image: cover, variantLabel, category }, qty);

    if (isCadeado && secretType === 'CHAVE_MESTRA' && masterKeyQty > 0) {
      add(
        {
          productId,
          code: `${code}-CHAVES-MESTRA`,
          name: `Chaves mestra adicionais — ${name}`,
          image: cover,
          variantLabel: 'Item adicional · valor unitário sob consulta',
          category,
        },
        masterKeyQty,
      );
    }

    setAdded(true);
    openCart();
  }

  return (
    <div>
      {isCadeado && colors.length > 0 && (
        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-2">Cor</p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => onColorChange(c)}
                className={`flex items-center gap-2 rounded-full border px-3.5 py-3 text-xs font-semibold transition ${
                  color === c ? 'border-brand bg-surface-badge text-brand' : 'border-border text-muted-2 hover:border-brand'
                }`}
              >
                <span
                  className="h-3.5 w-3.5 flex-none rounded-full border border-black/10"
                  style={{ background: COLOR_HEX[c] ?? '#ccc' }}
                />
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {isCadeado && secretTypes.length > 0 && (
        <div className="mt-5">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-2">Segredo do cadeado</p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {secretTypes.map((s) => (
              <button
                key={s}
                onClick={() => setSecretType(s)}
                className={`rounded-full border px-3.5 py-3 text-xs font-semibold transition ${
                  secretType === s ? 'border-brand bg-surface-badge text-brand' : 'border-border text-muted-2 hover:border-brand'
                }`}
              >
                {SECRET_LABELS[s]}
              </button>
            ))}
          </div>
        </div>
      )}

      {isCadeado && secretType === 'CHAVE_MESTRA' && (
        <div className="mt-5 rounded-xl border border-border-soft bg-surface-alt p-4">
          <p className="text-sm font-bold text-ink">Chaves mestra</p>
          <p className="text-xs text-tertiary">Item adicional · valor unitário sob consulta</p>
          <Stepper value={masterKeyQty} onChange={setMasterKeyQty} className="mt-3" />
        </div>
      )}

      {isCadeado && selectedVariant && (
        <p className="mt-4 font-mono text-xs text-tertiary">
          SKU selecionado: <span className="font-bold text-ink">{displaySku}</span>
        </p>
      )}

      <div className="mt-6 flex items-center gap-4">
        <p className="text-xs font-bold uppercase tracking-wide text-muted-2">Quantidade</p>
        <Stepper value={qty} onChange={setQty} />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button onClick={handleAdd} className="rounded-full bg-brand px-6 py-3 font-bold text-white transition hover:bg-brand-dark">
          + Adicionar ao orçamento
        </button>
        <button onClick={openCart} className="rounded-full border border-ink px-6 py-3 font-bold text-ink transition hover:bg-ink hover:text-white">
          Ver orçamento
        </button>
      </div>

      {added && <p className="mt-3 text-sm font-semibold text-success">Adicionado ao orçamento.</p>}
    </div>
  );
}

function Stepper({ value, onChange, className = '' }: { value: number; onChange: (v: number) => void; className?: string }) {
  return (
    <div className={`flex items-center rounded-full border border-border ${className}`}>
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        aria-label="Diminuir"
        className="flex h-10 w-10 items-center justify-center text-lg font-bold text-muted-2 hover:text-brand"
      >
        −
      </button>
      <input
        type="number"
        min={1}
        value={value}
        onChange={(e) => onChange(Math.max(1, Number(e.target.value) || 1))}
        className="w-12 border-0 bg-transparent text-center text-sm font-bold outline-none"
      />
      <button
        onClick={() => onChange(value + 1)}
        aria-label="Aumentar"
        className="flex h-10 w-10 items-center justify-center text-lg font-bold text-muted-2 hover:text-brand"
      >
        +
      </button>
    </div>
  );
}

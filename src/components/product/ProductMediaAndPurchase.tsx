'use client';

import { useState } from 'react';
import { ProductGallery } from '@/components/product/ProductGallery';
import { PurchasePanel } from '@/components/product/PurchasePanel';
import { r2Url } from '@/lib/utils';

type SecretType = 'DIFERENTES' | 'IGUAIS' | 'CHAVE_MESTRA';
type Variant = { color: string | null; secretType: SecretType | null; skuSuffix: string | null };

// Sigla do arquivo <código>-<sigla>.png — mesmo mapa do protótipo (photoCss do cadeado).
const COLOR_FILE_CODE: Record<string, string> = {
  Vermelho: 'VM',
  Amarelo: 'AM',
  Verde: 'VD',
  Laranja: 'LR',
  Azul: 'AZ',
  Preto: 'PT',
  Cinza: 'CZ',
  Branco: 'BC',
  Marrom: 'MR',
  Roxo: 'RX',
};

/**
 * Une a galeria de fotos e o painel de compra — precisam compartilhar a cor
 * selecionada do cadeado, porque escolher uma cor troca a foto principal
 * exibida (mesmo comportamento do protótipo: photoCss reage a s.prodColor).
 */
export function ProductMediaAndPurchase({
  productId,
  code,
  name,
  ncm,
  categoryName,
  images,
  isCadeado,
  variants,
}: {
  productId: string;
  code: string;
  name: string;
  ncm: string | null;
  categoryName: string;
  images: { url: string }[];
  isCadeado: boolean;
  variants: Variant[];
}) {
  const [color, setColor] = useState<string | null>(() => variants.find((v) => v.color)?.color ?? null);

  const colorImageUrl = isCadeado && color && COLOR_FILE_CODE[color] ? r2Url(`/uploads/${code}-${COLOR_FILE_CODE[color]}.png`) : null;

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      <ProductGallery images={images} name={name} overrideImageUrl={colorImageUrl} />

      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-surface-badge px-3 py-1 text-xs font-bold text-brand">{categoryName}</span>
          <span className="rounded-full bg-surface-alt px-3 py-1 text-xs font-bold text-tertiary">JG2®</span>
        </div>
        <h1 className="mt-3 font-display text-3xl font-black leading-tight text-ink">{name}</h1>

        <dl className="mt-6 grid grid-cols-3 gap-y-2 border-y border-border-soft py-4 text-sm">
          <dt className="text-tertiary">Marca</dt>
          <dd className="col-span-2 font-semibold text-ink">JG2®</dd>
          <dt className="text-tertiary">SKU</dt>
          <dd className="col-span-2 font-mono text-ink">{code}</dd>
          {ncm && (
            <>
              <dt className="text-tertiary">NCM</dt>
              <dd className="col-span-2 font-mono text-ink">{ncm}</dd>
            </>
          )}
        </dl>

        <PurchasePanel
          productId={productId}
          code={code}
          name={name}
          image={images[0]?.url ?? null}
          isCadeado={isCadeado}
          variants={variants}
          category={categoryName}
          color={color}
          onColorChange={setColor}
        />
      </div>
    </div>
  );
}

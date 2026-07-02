'use client';

import { useState } from 'react';
import { ProductCard, type CardProduct } from '@/components/ProductCard';
import { filterProductsByTag } from '@/server/actions/catalog';
import type { getFilterTaxonomy } from '@/server/catalog';

type Taxonomy = Awaited<ReturnType<typeof getFilterTaxonomy>>;

export function CatalogClient({
  initialProducts,
  taxonomy,
}: {
  initialProducts: CardProduct[];
  taxonomy: Taxonomy | null;
}) {
  const [query, setQuery] = useState('');
  const [applicationKey, setApplicationKey] = useState<string | null>(null);
  const [modelKey, setModelKey] = useState<string | null>(null);
  const [configKey, setConfigKey] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<CardProduct[] | null>(null);
  const [loading, setLoading] = useState(false);

  const application = taxonomy?.find((a) => a.key === applicationKey) ?? null;
  const model = application?.models.find((m) => m.key === modelKey) ?? null;

  async function runFilter(tagKey: string) {
    setLoading(true);
    try {
      const products = await filterProductsByTag(tagKey);
      setFilteredProducts(products);
    } finally {
      setLoading(false);
    }
  }

  function selectApplication(key: string) {
    setApplicationKey(key);
    setModelKey(null);
    setConfigKey(null);
    setFilteredProducts(null);
  }

  function selectModel(key: string, hasConfigs: boolean) {
    setModelKey(key);
    setConfigKey(null);
    if (!hasConfigs) runFilter(key);
    else setFilteredProducts(null);
  }

  function selectConfig(value: string) {
    setConfigKey(value || null);
    runFilter(value || modelKey!);
  }

  function clearFilter() {
    setApplicationKey(null);
    setModelKey(null);
    setConfigKey(null);
    setFilteredProducts(null);
  }

  const baseProducts = filteredProducts ?? initialProducts;
  const q = query.trim().toLowerCase();
  const visibleProducts = q
    ? baseProducts.filter((p) => p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q))
    : baseProducts;

  const filterActive = filteredProducts !== null;

  return (
    <div className="flex-1">
      <div className="mb-8 rounded-full border border-border bg-white px-5 py-3 shadow-sm">
        <div className="flex items-center gap-2.5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6f6a62" strokeWidth={2} strokeLinecap="round" className="flex-none">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.4-3.4" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nome, código ou categoria…"
            aria-label="Buscar no catálogo"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      {taxonomy && (
        <div className="mb-10 rounded-2xl border-[2.5px] border-brand bg-white p-6 sm:p-7">
          <h2 className="font-display text-lg font-black text-ink">
            Encontre o Bloqueio ideal para seu dispositivo de isolamento
          </h2>

          <p className="mt-5 font-mono text-xs font-bold uppercase tracking-wide text-tertiary">1. Tipo de aplicação</p>
          <div className="mt-3 flex gap-2.5">
            {taxonomy.map((app) => (
              <button
                key={app.key}
                onClick={() => selectApplication(app.key)}
                className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                  applicationKey === app.key ? 'bg-brand text-white' : 'border border-border-strong text-muted-2 hover:border-brand'
                }`}
              >
                {app.label}
              </button>
            ))}
          </div>

          {application && (
            <>
              <p className="mt-6 font-mono text-xs font-bold uppercase tracking-wide text-tertiary">2. Modelo do dispositivo</p>
              <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
                {application.models.map((m) => (
                  <button
                    key={m.key}
                    onClick={() => selectModel(m.key, m.configs.length > 0)}
                    className={`rounded-xl border p-3 text-center text-xs font-semibold transition ${
                      modelKey === m.key ? 'border-brand bg-surface-badge text-brand' : 'border-border text-muted-2 hover:border-brand'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </>
          )}

          {model && model.configs.length > 0 && (
            <>
              <p className="mt-6 font-mono text-xs font-bold uppercase tracking-wide text-tertiary">3. Configuração</p>
              <select
                value={configKey ?? ''}
                onChange={(e) => selectConfig(e.target.value)}
                className="mt-3 w-full max-w-xs rounded-lg border border-border px-4 py-2.5 text-sm outline-none focus:border-brand sm:w-auto"
              >
                <option value="">Todas</option>
                {model.configs.map((cfg) => (
                  <option key={cfg.key} value={cfg.key}>
                    {cfg.label}
                  </option>
                ))}
              </select>
            </>
          )}

          {filterActive && (
            <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border-soft pt-5">
              <p className="text-sm text-muted-2">
                {loading ? 'Filtrando…' : `Exibindo ${filteredProducts?.length ?? 0} produtos indicados para o dispositivo selecionado.`}
              </p>
              <button
                onClick={clearFilter}
                className="ml-auto rounded-full border border-brand px-4 py-2 text-xs font-bold text-brand transition hover:bg-brand hover:text-white"
              >
                ✕ Limpar filtro
              </button>
            </div>
          )}
        </div>
      )}

      <div className="mb-6 flex items-baseline justify-between">
        <p className="text-sm font-bold text-ink">{visibleProducts.length} produtos</p>
        <p className="text-sm text-tertiary">Preços e prazos sob consulta</p>
      </div>

      {visibleProducts.length === 0 ? (
        <p className="rounded-xl border border-border-soft bg-white px-6 py-10 text-center text-sm text-tertiary">
          Nenhum produto encontrado.
        </p>
      ) : (
        <div className="jg-card-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

/** Bloco base de esqueleto de carregamento — pulsa suavemente enquanto o conteúdo real não chega. */
export function Skeleton({ className = '', tone = 'light' }: { className?: string; tone?: 'light' | 'dark' }) {
  return <div className={`animate-pulse rounded-lg ${tone === 'dark' ? 'bg-white/10' : 'bg-surface-alt'} ${className}`} />;
}

/** Card de produto (mesmas proporções do ProductCard) — usado nas grades de catálogo. */
export function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border-soft bg-white">
      <Skeleton className="h-[190px] w-full rounded-none" />
      <div className="flex flex-1 flex-col gap-3 p-[18px]">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="mt-auto flex gap-2 pt-2">
          <Skeleton className="h-10 w-24 rounded-lg" />
          <Skeleton className="h-10 flex-1 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

/** Artigo do blog — imagem de capa + linhas de texto. */
export function BlogPostLoading() {
  return (
    <article>
      <section className="bg-ink-deep py-12">
        <div className="mx-auto max-w-[820px] px-7">
          <Skeleton tone="dark" className="h-3 w-40" />
          <Skeleton tone="dark" className="mt-4 h-10 w-full" />
          <Skeleton tone="dark" className="mt-3 h-3 w-32" />
        </div>
      </section>
      <div className="mx-auto max-w-[820px] px-7 py-10">
        <Skeleton className="h-[380px] w-full rounded-2xl" />
        <div className="mt-8 flex flex-col gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className={`h-4 ${i % 3 === 2 ? 'w-2/3' : 'w-full'}`} />
          ))}
        </div>
      </div>
    </article>
  );
}

/** Lista do admin em formato de tabela (produtos, blog). */
export function AdminTableLoading() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Skeleton className="h-7 w-40" />
          <Skeleton className="mt-2 h-4 w-56" />
        </div>
        <Skeleton className="h-10 w-40 rounded-full" />
      </div>
      <div className="mt-6 overflow-hidden rounded-2xl border border-border-soft bg-white p-5">
        <div className="flex flex-col gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Lista do admin em formato de cartões (orçamentos). */
export function AdminCardsLoading() {
  return (
    <div>
      <Skeleton className="h-7 w-40" />
      <Skeleton className="mt-2 h-4 w-56" />
      <div className="mt-6 flex flex-col gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border-soft bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-64" />
              </div>
              <Skeleton className="h-8 w-28 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Formulário do admin (novo/editar produto ou matéria). */
export function AdminFormLoading() {
  return (
    <div>
      <Skeleton className="h-4 w-24" />
      <Skeleton className="mt-3 h-7 w-52" />
      <div className="mt-6 flex max-w-2xl flex-col gap-6 rounded-2xl border border-border-soft bg-white p-6 sm:p-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
        <Skeleton className="h-12 w-40 self-start rounded-full" />
      </div>
    </div>
  );
}

/** Página de produto (galeria + painel de compra + abas). */
export function ProductPageLoading() {
  return (
    <div>
      <div className="mx-auto max-w-[1340px] px-7 pt-6">
        <Skeleton className="h-3 w-64" />
      </div>
      <div className="mx-auto max-w-[1340px] px-7 py-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <Skeleton className="h-[440px] w-full rounded-2xl" />
          <div>
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="mt-4 h-9 w-full max-w-sm" />
            <Skeleton className="mt-2 h-9 w-2/3" />
            <div className="mt-6 flex flex-col gap-2 border-y border-border-soft py-4">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="mt-6 h-24 w-full" />
            <Skeleton className="mt-6 h-12 w-48 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Faixa escura do topo (hero) do catálogo. */
function CatalogHeroSkeleton() {
  return (
    <section className="bg-ink-deep py-14">
      <div className="mx-auto max-w-[1340px] px-7">
        <Skeleton tone="dark" className="h-3 w-32" />
        <Skeleton tone="dark" className="mt-4 h-9 w-2/3 max-w-md" />
        <Skeleton tone="dark" className="mt-3 h-4 w-full max-w-xl" />
      </div>
    </section>
  );
}

/** Catálogo (grade + barra de busca + sidebar) — usado em /produtos/[categoria] (a listagem "Todos" é estática). */
export function CatalogLoading() {
  return (
    <div>
      <CatalogHeroSkeleton />
      <div className="mx-auto max-w-[1340px] gap-10 px-7 py-12 lg:flex">
        <div className="hidden w-[240px] flex-none flex-col gap-1 lg:flex">
          <Skeleton className="mb-1 h-3 w-20" />
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-full" />
          ))}
        </div>
        <div className="flex-1">
          <Skeleton className="h-[52px] w-full max-w-sm rounded-full" />
          <div className="jg-card-grid mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

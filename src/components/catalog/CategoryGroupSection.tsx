import { ProductCarousel } from '@/components/ProductCarousel';
import type { ProductGroup } from '@/lib/catalogGrouping';
import { slugify } from '@/lib/utils';

/** Uma seção de grupo (categoria/subcategoria) no catálogo agrupado — heading, descrição e carrossel ou estado vazio. */
export function CategoryGroupSection({ group }: { group: ProductGroup }) {
  return (
    <div id={slugify(group.name)} className="scroll-mt-[140px]">
      <h2 className="font-display text-2xl font-black leading-tight tracking-tight text-ink">{group.name}</h2>
      {group.description && <p className="mt-1.5 max-w-2xl text-[14.5px] leading-relaxed text-tertiary">{group.description}</p>}
      <div className="mt-5">
        {group.products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border-strong-2 bg-surface-card px-8 py-10 text-center text-sm text-tertiary">
            Produtos desta categoria em breve.
          </div>
        ) : (
          <ProductCarousel products={group.products} variant="catalog" />
        )}
      </div>
    </div>
  );
}

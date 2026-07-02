import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategories, getCategoryBySlug, getProductsByCategory, getFilterTaxonomy } from '@/server/catalog';
import { CategorySidebar } from '@/components/catalog/CategorySidebar';
import { CatalogClient } from '@/components/catalog/CatalogClient';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = await params;
  const category = await getCategoryBySlug(categoria);
  if (!category) notFound();

  const [categories, products, taxonomy] = await Promise.all([
    getCategories(),
    getProductsByCategory(categoria),
    category.type === 'LOTO' ? getFilterTaxonomy() : Promise.resolve(null),
  ]);

  const kicker = category.type === 'MAOS_SEGURAS' ? 'Proteção das mãos' : 'Loja de bloqueio';

  return (
    <div>
      <section className="bg-ink-deep py-14 text-white">
        <div className="mx-auto max-w-[1340px] px-7">
          <p className="text-xs text-white/50">
            <Link href="/" className="hover:text-white">
              Home
            </Link>{' '}
            / Catálogo
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-brand-soft">{kicker}</p>
          <h1 className="mt-2 font-display text-4xl font-black">{category.name}</h1>
        </div>
      </section>

      <div className="mx-auto max-w-[1340px] gap-10 px-7 py-12 lg:flex">
        <CategorySidebar categories={categories} activeSlug={category.slug} />
        <CatalogClient initialProducts={products} taxonomy={taxonomy} />
      </div>

      {category.supportText && (
        <section className="mx-auto max-w-[880px] px-7 pb-20">
          <h2 className="border-b border-border-soft pb-4 font-display text-2xl font-black text-ink">
            Sobre {category.name}
          </h2>
          <div className="mt-5 whitespace-pre-line leading-relaxed text-muted-2">{category.supportText}</div>
        </section>
      )}
    </div>
  );
}

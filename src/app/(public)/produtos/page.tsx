import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getCategories, getAllProducts, getFilterTaxonomy } from '@/server/catalog';
import { CategorySidebar } from '@/components/catalog/CategorySidebar';
import { CatalogClient } from '@/components/catalog/CatalogClient';
import { CatalogResultsLoading } from '@/components/Skeleton';
import { buildCategoryGroups, toCardProducts } from '@/lib/catalogGrouping';
import { r2Url } from '@/lib/utils';

export default async function AllProductsPage() {
  const [categories, products, taxonomy] = await Promise.all([getCategories(), getAllProducts(), getFilterTaxonomy()]);
  const lotoCategories = categories.filter((c) => c.type === 'LOTO');
  const groups = buildCategoryGroups(lotoCategories, products);
  const cardProducts = toCardProducts(products);

  return (
    <div>
      <section className="relative overflow-hidden bg-ink-deep py-14 text-white">
        <Image src={r2Url('/uploads/banner-produtos-loto.png')} alt="" fill sizes="100vw" priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-deep from-45% via-ink-deep/80 via-65% to-transparent" />
        <div className="relative mx-auto max-w-[1340px] px-7">
          <p className="text-xs text-white/50">
            <Link href="/" className="hover:text-white">
              Home
            </Link>{' '}
            / Catálogo
          </p>
          <p className="mt-4 inline-block rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white">Loja de bloqueio</p>
          <h1 className="mt-2 font-display text-4xl font-black">Catálogo de produtos LOTO</h1>
          <p className="mt-3 max-w-xl text-[15px] text-white/70">
            Adicione os itens ao seu orçamento e envie tudo de uma vez. Sem compromisso — nossa equipe retorna com valores e prazos.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1340px] gap-10 px-7 py-12 lg:flex">
        <CategorySidebar categories={categories} activeSlug={null} />
        <Suspense fallback={<CatalogResultsLoading />}>
          <CatalogClient initialProducts={cardProducts} taxonomy={taxonomy} groups={groups} />
        </Suspense>
      </div>
    </div>
  );
}

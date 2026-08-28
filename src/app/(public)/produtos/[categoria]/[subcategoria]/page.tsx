import type { Metadata } from 'next';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategories, getSubcategoryBySlug, getProductsBySubcategory } from '@/server/catalog';
import { CategorySidebar } from '@/components/catalog/CategorySidebar';
import { CatalogClient } from '@/components/catalog/CatalogClient';
import { CatalogResultsLoading } from '@/components/Skeleton';
import { toCardProducts } from '@/lib/catalogGrouping';
import { categorySupportTitle } from '@/lib/catalogText';
import { SUBCATEGORY_GROUP_DESCRIPTIONS } from '@/data/catalogGroups';
import { r2Url } from '@/lib/utils';

type PageProps = { params: Promise<{ categoria: string; subcategoria: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categoria, subcategoria } = await params;
  const sub = await getSubcategoryBySlug(categoria, subcategoria);
  if (!sub || sub.category.type !== 'MAOS_SEGURAS') return {};
  const description = SUBCATEGORY_GROUP_DESCRIPTIONS[sub.name] ?? `${sub.name} — catálogo Mãos Seguras JG2.`;
  return {
    title: `${sub.name} | Mãos Seguras | JG2`,
    description,
  };
}

export default async function SubcategoryPage({ params }: PageProps) {
  const { categoria, subcategoria } = await params;
  const sub = await getSubcategoryBySlug(categoria, subcategoria);
  if (!sub || sub.category.type !== 'MAOS_SEGURAS') notFound();

  const [categories, products] = await Promise.all([getCategories(), getProductsBySubcategory(categoria, subcategoria)]);
  const description = SUBCATEGORY_GROUP_DESCRIPTIONS[sub.name] ?? '';
  const cardProducts = toCardProducts(products);
  const basePath = `/produtos/${sub.category.slug}`;

  return (
    <div>
      <section className="relative overflow-hidden bg-ink-deep py-14 text-white">
        <Image src={r2Url('/uploads/banner-maos-seguras-categoria.png')} alt="" fill sizes="100vw" priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-deep from-45% via-ink-deep/80 via-65% to-transparent" />
        <div className="relative mx-auto max-w-[1340px] px-7">
          <p className="text-xs text-white/50">
            <Link href="/" className="hover:text-white">
              Home
            </Link>{' '}
            /{' '}
            <Link href="/produtos" className="hover:text-white">
              Catálogo
            </Link>{' '}
            /{' '}
            <Link href={basePath} className="hover:text-white">
              Mãos Seguras
            </Link>{' '}
            / {sub.name}
          </p>
          <p className="mt-4 inline-block rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
            Proteção das mãos
          </p>
          <h1 className="mt-2 font-display text-4xl font-black">{sub.name}</h1>
          {description ? <p className="mt-3 max-w-xl text-[15px] text-white/70">{description}</p> : null}
        </div>
      </section>

      <div className="mx-auto max-w-[1340px] gap-10 px-7 py-12 lg:flex">
        <CategorySidebar
          categories={categories}
          activeSlug={sub.category.slug}
          categoryBasePath={basePath}
          subcategories={sub.category.subcategories}
          activeSubSlug={sub.slug}
        />
        <Suspense fallback={<CatalogResultsLoading />}>
          <CatalogClient initialProducts={cardProducts} taxonomy={null} />
        </Suspense>
      </div>

      {sub.supportText && (
        <section className="mx-auto max-w-[880px] px-7 pb-20">
          <h2 className="border-b border-border-soft pb-4 font-display text-2xl font-black text-ink">{categorySupportTitle(sub.name)}</h2>
          <div className="mt-5 whitespace-pre-line leading-relaxed text-muted-2">{sub.supportText}</div>
        </section>
      )}
    </div>
  );
}

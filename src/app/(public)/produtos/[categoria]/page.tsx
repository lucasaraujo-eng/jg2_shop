import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategories, getCategoryBySlug, getProductsByCategory, getFilterTaxonomy } from '@/server/catalog';
import { CategorySidebar } from '@/components/catalog/CategorySidebar';
import { CatalogClient } from '@/components/catalog/CatalogClient';
import { CatalogResultsLoading } from '@/components/Skeleton';
import { buildSubcategoryGroups, toCardProducts } from '@/lib/catalogGrouping';
import { categorySupportTitle } from '@/lib/catalogText';
import { r2Url } from '@/lib/utils';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = await params;
  const category = await getCategoryBySlug(categoria);
  if (!category) notFound();

  const isMaosSeguras = category.type === 'MAOS_SEGURAS';

  const [categories, products, taxonomy] = await Promise.all([
    getCategories(),
    getProductsByCategory(categoria),
    category.type === 'LOTO' ? getFilterTaxonomy() : Promise.resolve(null),
  ]);

  const kicker = isMaosSeguras ? 'Proteção das mãos' : 'Loja de bloqueio';
  const bannerTitle = isMaosSeguras ? (
    <>
      Encontre o bloqueio ideal
      <br />
      para sua válvula ou dispositivo aqui!
    </>
  ) : (
    'Catálogo de produtos LOTO'
  );
  const bannerSubtitle = isMaosSeguras
    ? 'Selecione o tipo de dispositivo de isolamento e encontre com mais rapidez os produtos de bloqueio indicados para a sua aplicação.'
    : 'Adicione os itens ao seu orçamento e envie tudo de uma vez. Sem compromisso — nossa equipe retorna com valores e prazos.';
  const groups = isMaosSeguras ? buildSubcategoryGroups(category.subcategories, products) : null;
  const cardProducts = toCardProducts(products);

  return (
    <div>
      <section className="relative overflow-hidden bg-ink-deep py-14 text-white">
        <Image
          src={r2Url(isMaosSeguras ? '/uploads/banner-maos-seguras-categoria.png' : '/uploads/banner-produtos-loto.png')}
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-deep from-45% via-ink-deep/80 via-65% to-transparent" />
        <div className="relative mx-auto max-w-[1340px] px-7">
          <p className="text-xs text-white/50">
            <Link href="/" className="hover:text-white">
              Home
            </Link>{' '}
            / Catálogo
          </p>
          <p className="mt-4 inline-block rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white">{kicker}</p>
          <h1 className="mt-2 font-display text-4xl font-black">{bannerTitle}</h1>
          <p className="mt-3 max-w-xl text-[15px] text-white/70">{bannerSubtitle}</p>
        </div>
      </section>

      <div className="mx-auto max-w-[1340px] gap-10 px-7 py-12 lg:flex">
        <CategorySidebar categories={categories} activeSlug={category.slug} subcategories={isMaosSeguras ? category.subcategories : undefined} />
        <Suspense fallback={<CatalogResultsLoading />}>
          <CatalogClient initialProducts={cardProducts} taxonomy={taxonomy} groups={groups} />
        </Suspense>
      </div>

      {category.supportText && (
        <section className="mx-auto max-w-[880px] px-7 pb-20">
          <h2 className="border-b border-border-soft pb-4 font-display text-2xl font-black text-ink">
            {categorySupportTitle(category.name)}
          </h2>
          <div className="mt-5 whitespace-pre-line leading-relaxed text-muted-2">{category.supportText}</div>
        </section>
      )}
    </div>
  );
}

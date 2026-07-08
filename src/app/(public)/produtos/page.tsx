import { Suspense } from 'react';
import Link from 'next/link';
import { getCategories, getAllProducts, getFilterTaxonomy } from '@/server/catalog';
import { CategorySidebar } from '@/components/catalog/CategorySidebar';
import { CatalogClient } from '@/components/catalog/CatalogClient';
import { CatalogResultsLoading } from '@/components/Skeleton';
import { buildCategoryGroups, toCardProducts } from '@/lib/catalogGrouping';

/** "Todos" — mesma casca das páginas de categoria, com o filtro de dispositivos e os carrosséis agrupados por categoria (igual ao protótipo: banner e barra de filtro fixos, independente de a listagem incluir Mãos Seguras também). */
export default async function AllProductsPage() {
  const [categories, products, taxonomy] = await Promise.all([getCategories(), getAllProducts(), getFilterTaxonomy()]);
  // Mãos Seguras não entra no agrupamento de "Todos" — no protótipo ela é uma
  // ramificação à parte, fora da lista de categorias usada para os grupos/sidebar.
  const lotoCategories = categories.filter((c) => c.type === 'LOTO');
  const groups = buildCategoryGroups(lotoCategories, products);
  const cardProducts = toCardProducts(products);

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
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-brand-soft">Loja de bloqueio</p>
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

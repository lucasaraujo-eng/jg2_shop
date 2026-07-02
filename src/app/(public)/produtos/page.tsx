import Link from 'next/link';
import { getCategories, getAllProducts } from '@/server/catalog';
import { CategorySidebar } from '@/components/catalog/CategorySidebar';
import { CatalogClient } from '@/components/catalog/CatalogClient';

/** "Todos" — mesma casca das páginas de categoria, sem o filtro de dispositivos (spans LOTO + Mãos Seguras). */
export default async function AllProductsPage() {
  const [categories, products] = await Promise.all([getCategories(), getAllProducts()]);

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
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-brand-soft">Catálogo</p>
          <h1 className="mt-2 font-display text-4xl font-black">Todos os produtos</h1>
        </div>
      </section>

      <div className="mx-auto max-w-[1340px] gap-10 px-7 py-12 lg:flex">
        <CategorySidebar categories={categories} activeSlug={null} />
        <CatalogClient initialProducts={products} taxonomy={null} />
      </div>
    </div>
  );
}

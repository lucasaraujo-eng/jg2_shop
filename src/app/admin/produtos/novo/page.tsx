import Link from 'next/link';
import { getCategories } from '@/server/catalog';
import { ProductForm } from '@/components/admin/ProductForm';

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div>
      <Link href="/admin/produtos" className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-2 hover:text-brand">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Produtos
      </Link>
      <h1 className="mt-3 font-display text-2xl font-black text-ink">Novo produto</h1>
      <div className="mt-6 rounded-2xl border border-border-soft bg-white p-6 shadow-sm sm:p-8">
        <ProductForm categories={categories} />
      </div>
    </div>
  );
}

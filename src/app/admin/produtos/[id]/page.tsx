import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategories } from '@/server/catalog';
import { getAdminProduct } from '@/server/actions/products';
import { ProductForm } from '@/components/admin/ProductForm';
import type { ProductInput } from '@/lib/validations';

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [categories, product] = await Promise.all([getCategories(), getAdminProduct(id)]);
  if (!product) notFound();

  const initial: ProductInput = {
    code: product.code,
    name: product.name,
    ncm: product.ncm ?? '',
    isCadeado: product.isCadeado,
    categoryId: product.categoryId,
    subcategoryId: product.subcategoryId ?? '',
    description: product.description,
    supportText: product.supportText ?? '',
    filterTags: product.filterTags.map((t) => t.tagKey),
    coverUrl: product.images[0]?.url ?? '',
    active: product.active,
  };

  return (
    <div>
      <Link href="/admin/produtos" className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-2 hover:text-brand">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Produtos
      </Link>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="font-display text-2xl font-black text-ink">Editar produto</h1>
        <span className="rounded-full bg-surface-alt px-2.5 py-1 font-mono text-xs font-bold text-muted-2">{product.code}</span>
      </div>
      <div className="mt-6 rounded-2xl border border-border-soft bg-white p-6 shadow-sm sm:p-8">
        <ProductForm categories={categories} productId={product.id} initial={initial} />
      </div>
    </div>
  );
}

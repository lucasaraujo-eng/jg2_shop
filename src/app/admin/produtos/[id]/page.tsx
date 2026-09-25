import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategories } from '@/server/catalog';
import { getAdminProduct } from '@/server/actions/products';
import { ProductForm } from '@/components/admin/ProductForm';
import { parseSupportJson } from '@/lib/productSupport';
import type { ProductInput } from '@/lib/validations';

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [categories, product] = await Promise.all([getCategories(), getAdminProduct(id)]);
  if (!product) notFound();

  const imageUrls = product.images.map((img) => img.url);
  const initial: ProductInput = {
    code: product.code,
    name: product.name,
    subtitle: product.subtitle ?? '',
    ncm: product.ncm ?? '',
    isCadeado: product.isCadeado,
    categoryId: product.categoryId,
    subcategoryId: product.subcategoryId ?? '',
    extraCategoryIds: product.categories.filter((c) => !c.isPrimary).map((c) => c.categoryId),
    description: product.description,
    supportText: product.supportText ?? '',
    seoTitle: product.seoTitle ?? '',
    seoDescription: product.seoDescription ?? '',
    supportHeading: product.supportHeading ?? '',
    supportTldr: product.supportTldr ?? '',
    supportIdealFor: product.supportIdealFor ?? '',
    supportNotFor: product.supportNotFor ?? '',
    supportJson: parseSupportJson(product.supportJson),
    specs: product.specs.map((s) => ({ label: s.label, value: s.value })),
    filterTags: product.filterTags.map((t) => t.tagKey),
    coverUrl: imageUrls[0] ?? '',
    imageUrls,
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

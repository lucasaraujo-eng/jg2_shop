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
      <h1 className="font-display text-2xl font-black text-ink">Editar produto</h1>
      <div className="mt-6">
        <ProductForm categories={categories} productId={product.id} initial={initial} />
      </div>
    </div>
  );
}

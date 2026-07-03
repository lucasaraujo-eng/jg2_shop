import type { CardProduct } from '@/components/ProductCard';
import { CATEGORY_GROUP_DESCRIPTIONS, SUBCATEGORY_GROUP_DESCRIPTIONS } from '@/data/catalogGroups';

export type ProductGroup = { name: string; description: string; products: CardProduct[] };

type GroupableProduct = {
  id: string;
  code: string;
  name: string;
  images: { url: string }[];
  categoryId: string;
  subcategoryId?: string | null;
  category?: { name: string } | null;
};

export function toCardProduct(p: GroupableProduct): CardProduct {
  return { id: p.id, code: p.code, name: p.name, images: p.images, category: p.category?.name };
}

export function toCardProducts(products: GroupableProduct[]): CardProduct[] {
  return products.map(toCardProduct);
}

/** Agrupa produtos por categoria — usado na visão "Todos" do catálogo. */
export function buildCategoryGroups(categories: { id: string; name: string }[], products: GroupableProduct[]): ProductGroup[] {
  return categories.map((c) => ({
    name: c.name,
    description: CATEGORY_GROUP_DESCRIPTIONS[c.name] ?? '',
    products: products.filter((p) => p.categoryId === c.id).map(toCardProduct),
  }));
}

/** Agrupa produtos por subcategoria — usado na raiz de Mãos Seguras (sem subcategoria selecionada). */
export function buildSubcategoryGroups(subcategories: { id: string; name: string }[], products: GroupableProduct[]): ProductGroup[] {
  return subcategories.map((sc) => ({
    name: sc.name,
    description: SUBCATEGORY_GROUP_DESCRIPTIONS[sc.name] ?? '',
    products: products.filter((p) => p.subcategoryId === sc.id).map(toCardProduct),
  }));
}

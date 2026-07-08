import { prisma } from '@/lib/prisma';

/** Catálogo público — leituras (Server Components). */

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { order: 'asc' },
    include: { subcategories: { orderBy: { order: 'asc' } } },
  });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: { subcategories: { orderBy: { order: 'asc' } } },
  });
}

export async function getProductsByCategory(categorySlug: string) {
  return prisma.product.findMany({
    where: { active: true, category: { slug: categorySlug } },
    orderBy: { order: 'asc' },
    include: { images: { orderBy: { order: 'asc' }, take: 2 }, subcategory: true, category: { select: { name: true } } },
  });
}

/** Todos os produtos ativos, para a visão "Todos" do catálogo. */
export async function getAllProducts() {
  return prisma.product.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
    include: { images: { orderBy: { order: 'asc' }, take: 2 }, category: { select: { name: true } } },
  });
}

export async function getProductByCode(code: string) {
  return prisma.product.findUnique({
    where: { code },
    include: {
      images: { orderBy: { order: 'asc' } },
      specs: { orderBy: { order: 'asc' } },
      variants: true,
      category: true,
      subcategory: true,
      filterTags: true,
    },
  });
}

/** "Veja também" — outros produtos da mesma categoria. */
export async function getRelatedProducts(categoryId: string, excludeProductId: string) {
  return prisma.product.findMany({
    where: { active: true, categoryId, id: { not: excludeProductId } },
    orderBy: { order: 'asc' },
    take: 10,
    include: { images: { orderBy: { order: 'asc' }, take: 2 } },
  });
}

/** Filtra produtos por tag do filtro de dispositivos (modelo/config). */
export async function getProductsByFilterTag(tagKey: string) {
  return prisma.product.findMany({
    where: { active: true, filterTags: { some: { tagKey } } },
    orderBy: { order: 'asc' },
    include: { images: { orderBy: { order: 'asc' }, take: 2 }, category: { select: { name: true } } },
  });
}

export async function getFilterTaxonomy() {
  return prisma.filterApplication.findMany({
    orderBy: { order: 'asc' },
    include: {
      models: {
        orderBy: { order: 'asc' },
        include: { configs: { orderBy: { order: 'asc' } } },
      },
    },
  });
}

/** Produtos mais vendidos / destaque (ajuste o critério conforme necessário). */
export async function getFeaturedProducts(codes: string[]) {
  return prisma.product.findMany({
    where: { code: { in: codes }, active: true },
    include: { images: { orderBy: { order: 'asc' }, take: 2 } },
  });
}

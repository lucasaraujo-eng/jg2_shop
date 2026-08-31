import { prisma } from '@/lib/prisma';
import { CACHE_TAGS, cachedQuery } from '@/lib/data-cache';

const tags = [CACHE_TAGS.catalog];

export const getCategories = cachedQuery('catalog:categories', tags, async () =>
  prisma.category.findMany({
    orderBy: { order: 'asc' },
    include: { subcategories: { orderBy: { order: 'asc' } } },
  }),
);

export const getCategoryBySlug = cachedQuery('catalog:category-by-slug', tags, async (slug: string) =>
  prisma.category.findUnique({
    where: { slug },
    include: { subcategories: { orderBy: { order: 'asc' } } },
  }),
);

export const getProductsByCategory = cachedQuery('catalog:products-by-category', tags, async (categorySlug: string) =>
  prisma.product.findMany({
    where: { active: true, category: { slug: categorySlug } },
    orderBy: { order: 'asc' },
    include: { images: { orderBy: { order: 'asc' }, take: 2 }, subcategory: true, category: { select: { name: true } } },
  }),
);

export const getSubcategoryBySlug = cachedQuery(
  'catalog:subcategory-by-slug',
  tags,
  async (categorySlug: string, subcategorySlug: string) =>
    prisma.subcategory.findFirst({
      where: { slug: subcategorySlug, category: { slug: categorySlug } },
      include: { category: { include: { subcategories: { orderBy: { order: 'asc' } } } } },
    }),
);

export const getProductsBySubcategory = cachedQuery(
  'catalog:products-by-subcategory',
  tags,
  async (categorySlug: string, subcategorySlug: string) =>
    prisma.product.findMany({
      where: {
        active: true,
        category: { slug: categorySlug },
        subcategory: { slug: subcategorySlug },
      },
      orderBy: { order: 'asc' },
      include: { images: { orderBy: { order: 'asc' }, take: 2 }, subcategory: true, category: { select: { name: true } } },
    }),
);

export const getAllProducts = cachedQuery('catalog:all-products', tags, async () =>
  prisma.product.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
    include: { images: { orderBy: { order: 'asc' }, take: 2 }, category: { select: { name: true } } },
  }),
);

export const getAllProductCodes = cachedQuery('catalog:product-codes', tags, async () => {
  const products = await prisma.product.findMany({ where: { active: true }, select: { code: true } });
  return products.map((p) => p.code);
});

export const getAllCategorySlugs = cachedQuery('catalog:category-slugs', tags, async () => {
  const categories = await prisma.category.findMany({ select: { slug: true } });
  return categories.map((c) => c.slug);
});

export const getProductByCode = cachedQuery('catalog:product-by-code', tags, async (code: string) =>
  prisma.product.findUnique({
    where: { code },
    include: {
      images: { orderBy: { order: 'asc' } },
      specs: { orderBy: { order: 'asc' } },
      variants: true,
      category: true,
      subcategory: true,
      filterTags: true,
    },
  }),
);

export const getRelatedProducts = cachedQuery(
  'catalog:related-products',
  tags,
  async (categoryId: string, excludeProductId: string) =>
    prisma.product.findMany({
      where: { active: true, categoryId, id: { not: excludeProductId } },
      orderBy: { order: 'asc' },
      take: 10,
      include: { images: { orderBy: { order: 'asc' }, take: 2 } },
    }),
);

export const getProductsByFilterTag = cachedQuery('catalog:products-by-filter-tag', tags, async (tagKey: string) =>
  prisma.product.findMany({
    where: { active: true, filterTags: { some: { tagKey } } },
    orderBy: { order: 'asc' },
    include: { images: { orderBy: { order: 'asc' }, take: 2 }, category: { select: { name: true } } },
  }),
);

export const getFilterTaxonomy = cachedQuery('catalog:filter-taxonomy', tags, async () =>
  prisma.filterApplication.findMany({
    orderBy: { order: 'asc' },
    include: {
      models: {
        orderBy: { order: 'asc' },
        include: { configs: { orderBy: { order: 'asc' } } },
      },
    },
  }),
);

export const getFeaturedProducts = cachedQuery('catalog:featured-products', tags, async (codes: string[]) =>
  prisma.product.findMany({
    where: { code: { in: codes }, active: true },
    include: { images: { orderBy: { order: 'asc' }, take: 2 } },
  }),
);

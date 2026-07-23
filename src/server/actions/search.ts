'use server';

import { prisma } from '@/lib/prisma';

export type SearchResult = {
  categories: { slug: string; name: string; type: 'LOTO' | 'MAOS_SEGURAS' }[];
  products: { code: string; name: string; categoryName: string; image: string | null }[];
  posts: { slug: string; title: string; tag: string | null }[];
};

async function runSearch(q: string, limits: { categories: number; products: number; posts: number }): Promise<SearchResult> {
  const [categories, products, posts] = await Promise.all([
    prisma.category.findMany({
      where: { name: { contains: q, mode: 'insensitive' } },
      take: limits.categories,
      orderBy: { order: 'asc' },
    }),
    prisma.product.findMany({
      where: {
        active: true,
        OR: [{ name: { contains: q, mode: 'insensitive' } }, { code: { contains: q, mode: 'insensitive' } }],
      },
      take: limits.products,
      include: { category: true, images: { take: 1, orderBy: { order: 'asc' } } },
    }),
    prisma.blogPost.findMany({
      where: { status: 'PUBLISHED', title: { contains: q, mode: 'insensitive' } },
      take: limits.posts,
    }),
  ]);

  return {
    categories: categories.map((c) => ({ slug: c.slug, name: c.name, type: c.type })),
    products: products.map((p) => ({
      code: p.code,
      name: p.name,
      categoryName: p.category.name,
      image: p.images[0]?.url ?? null,
    })),
    posts: posts.map((p) => ({ slug: p.slug, title: p.title, tag: p.tag })),
  };
}

/** Busca compacta pro dropdown do header. */
export async function searchSite(query: string): Promise<SearchResult> {
  const q = query.trim();
  if (q.length < 2) return { categories: [], products: [], posts: [] };
  return runSearch(q, { categories: 3, products: 5, posts: 3 });
}

/** Busca completa pra página de resultados (/busca). */
export async function searchSiteFull(query: string): Promise<SearchResult> {
  const q = query.trim();
  if (q.length < 2) return { categories: [], products: [], posts: [] };
  return runSearch(q, { categories: 8, products: 24, posts: 12 });
}

'use server';

import { prisma } from '@/lib/prisma';

export type SearchResult = {
  products: { code: string; name: string; categoryName: string; image: string | null }[];
  posts: { slug: string; title: string; tag: string | null }[];
};

export async function searchSite(query: string): Promise<SearchResult> {
  const q = query.trim();
  if (q.length < 2) return { products: [], posts: [] };

  const [products, posts] = await Promise.all([
    prisma.product.findMany({
      where: {
        active: true,
        OR: [{ name: { contains: q, mode: 'insensitive' } }, { code: { contains: q, mode: 'insensitive' } }],
      },
      take: 5,
      include: { category: true, images: { take: 1, orderBy: { order: 'asc' } } },
    }),
    prisma.blogPost.findMany({
      where: { status: 'PUBLISHED', title: { contains: q, mode: 'insensitive' } },
      take: 3,
    }),
  ]);

  return {
    products: products.map((p) => ({
      code: p.code,
      name: p.name,
      categoryName: p.category.name,
      image: p.images[0]?.url ?? null,
    })),
    posts: posts.map((p) => ({ slug: p.slug, title: p.title, tag: p.tag })),
  };
}

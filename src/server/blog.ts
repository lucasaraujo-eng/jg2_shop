import { prisma } from '@/lib/prisma';
import { CACHE_TAGS, cachedQuery } from '@/lib/data-cache';

const tags = [CACHE_TAGS.blog];

function asDate(value: Date | string | null | undefined): Date | null {
  if (!value) return null;
  return value instanceof Date ? value : new Date(value);
}

function revivePublishedAt<T extends { publishedAt: Date | null }>(post: T): T {
  return { ...post, publishedAt: asDate(post.publishedAt) };
}

export const getPublishedPosts = cachedQuery('blog:published', tags, async () => {
  const posts = await prisma.blogPost.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
  });
  return posts.map(revivePublishedAt);
});

export const getPostBySlug = cachedQuery('blog:by-slug', tags, async (slug: string) => {
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  return post ? revivePublishedAt(post) : null;
});

export const getRelatedPosts = cachedQuery(
  'blog:related',
  tags,
  async (excludeSlug: string, take: number = 3) => {
    const posts = await prisma.blogPost.findMany({
      where: { status: 'PUBLISHED', slug: { not: excludeSlug } },
      orderBy: { publishedAt: 'desc' },
      take,
    });
    return posts.map(revivePublishedAt);
  },
);

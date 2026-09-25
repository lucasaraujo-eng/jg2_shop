import { prisma } from '@/lib/prisma';
import { CACHE_TAGS, cachedQuery } from '@/lib/data-cache';
import type { PostType } from '@prisma/client';

const tags = [CACHE_TAGS.blog];

function asDate(value: Date | string | null | undefined): Date | null {
  if (!value) return null;
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function revivePublishedAt<T extends { publishedAt: Date | null }>(post: T): T {
  return { ...post, publishedAt: asDate(post.publishedAt) };
}

export const getPublishedPosts = cachedQuery('blog:published', tags, async () => {
  const posts = await prisma.blogPost.findMany({
    where: { status: 'PUBLISHED', type: 'BLOG' },
    orderBy: { publishedAt: 'desc' },
  });
  return posts.map(revivePublishedAt);
});

export const getPublishedPostsByType = cachedQuery(
  'blog:published-by-type',
  tags,
  async (type: PostType) => {
    const posts = await prisma.blogPost.findMany({
      where: { status: 'PUBLISHED', type },
      orderBy: { publishedAt: 'desc' },
    });
    return posts.map(revivePublishedAt);
  },
);

export const getPostBySlug = cachedQuery('blog:by-slug', tags, async (slug: string) => {
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  return post ? revivePublishedAt(post) : null;
});

export const getPublishedSetorPost = cachedQuery('blog:setor-by-slug', tags, async (slug: string) => {
  const post = await prisma.blogPost.findFirst({
    where: { slug, type: 'SETOR', status: 'PUBLISHED' },
  });
  return post ? revivePublishedAt(post) : null;
});

export const getRelatedPosts = cachedQuery(
  'blog:related',
  tags,
  async (excludeSlug: string, take: number = 3) => {
    const posts = await prisma.blogPost.findMany({
      where: { status: 'PUBLISHED', type: 'BLOG', slug: { not: excludeSlug } },
      orderBy: { publishedAt: 'desc' },
      take,
    });
    return posts.map(revivePublishedAt);
  },
);

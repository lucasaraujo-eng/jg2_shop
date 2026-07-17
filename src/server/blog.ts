import { prisma } from '@/lib/prisma';

export async function getPublishedPosts() {
  return prisma.blogPost.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
  });
}

export async function getPostBySlug(slug: string) {
  return prisma.blogPost.findUnique({ where: { slug } });
}

export async function getRelatedPosts(excludeSlug: string, take = 3) {
  return prisma.blogPost.findMany({
    where: { status: 'PUBLISHED', slug: { not: excludeSlug } },
    orderBy: { publishedAt: 'desc' },
    take,
  });
}

import { prisma } from '@/lib/prisma';

/** Blog público — leituras. */

export async function getPublishedPosts() {
  return prisma.blogPost.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
  });
}

export async function getPostBySlug(slug: string) {
  return prisma.blogPost.findUnique({ where: { slug } });
}

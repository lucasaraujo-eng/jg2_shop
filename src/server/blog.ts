import { prisma } from '@/lib/prisma';
import { CACHE_TAGS, cachedQuery } from '@/lib/data-cache';
import { setores, setorPageTitle } from '@/data/setores';
import { r2Url } from '@/lib/utils';
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

export type SetorArticle = {
  slug: string;
  title: string;
  excerpt: string | null;
  tag: string | null;
  content: string;
  publishedAt: Date | null;
  coverUrl: string | null;
  href: string;
};

export const getSetorArticlesForBlog = cachedQuery('blog:setores-listing', tags, async (): Promise<SetorArticle[]> => {
  const cms = await prisma.blogPost.findMany({
    where: { status: 'PUBLISHED', type: 'SETOR' },
    orderBy: { publishedAt: 'desc' },
  });
  const bySlug = new Map(cms.map((p) => [p.slug, revivePublishedAt(p)]));

  const fromStatic: SetorArticle[] = setores.map((s) => {
    const post = bySlug.get(s.id);
    return {
      slug: s.id,
      title: post?.title || setorPageTitle(s),
      excerpt: post?.excerpt || s.lead,
      tag: post?.tag || 'Setor industrial',
      content: post?.content || s.intro.join(' '),
      publishedAt: post?.publishedAt ?? null,
      coverUrl: post?.coverUrl || r2Url(s.img),
      href: `/setores/${s.id}`,
    };
  });

  const extra: SetorArticle[] = cms
    .filter((p) => !setores.some((s) => s.id === p.slug))
    .map((p) => {
      const post = revivePublishedAt(p);
      return {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        tag: post.tag || 'Setor industrial',
        content: post.content,
        publishedAt: post.publishedAt,
        coverUrl: post.coverUrl,
        href: `/setores/${post.slug}`,
      };
    });

  return [...fromStatic, ...extra];
});

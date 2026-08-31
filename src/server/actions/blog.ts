'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { postSchema, type PostInput } from '@/lib/validations';
import { slugify } from '@/lib/utils';
import { requireAdmin, requireRoleResult } from '@/lib/auth-guards';
import { invalidateBlogCache } from '@/lib/data-cache';

type Result = { ok: true; id: string } | { ok: false; error: string };

export async function createPost(input: PostInput): Promise<Result> {
  const session = await requireAdmin();
  const data = { ...input, slug: input.slug || slugify(input.title) };
  const parsed = postSchema.safeParse(data);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const d = parsed.data;
  try {
    const post = await prisma.blogPost.create({
      data: {
        title: d.title,
        slug: d.slug,
        excerpt: d.excerpt ?? null,
        content: d.content,
        coverUrl: d.coverUrl ?? null,
        tag: d.tag ?? null,
        status: d.status,
        publishedAt: d.status === 'PUBLISHED' ? new Date() : null,
        authorId: (session.user as { id?: string }).id ?? null,
      },
    });
    invalidateBlogCache();
    revalidatePath('/admin/blog');
    return { ok: true, id: post.id };
  } catch (e) {
    console.error(e);
    return { ok: false, error: 'Erro ao criar a matéria.' };
  }
}

export async function updatePost(id: string, input: PostInput): Promise<Result> {
  await requireAdmin();
  const data = { ...input, slug: input.slug || slugify(input.title) };
  const parsed = postSchema.safeParse(data);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const d = parsed.data;
  try {
    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        title: d.title,
        slug: d.slug,
        excerpt: d.excerpt ?? null,
        content: d.content,
        coverUrl: d.coverUrl ?? null,
        tag: d.tag ?? null,
        status: d.status,
        publishedAt: d.status === 'PUBLISHED' ? new Date() : null,
      },
    });
    invalidateBlogCache();
    revalidatePath('/admin/blog');
    revalidatePath(`/blog/${post.slug}`);
    return { ok: true, id: post.id };
  } catch (e) {
    console.error(e);
    return { ok: false, error: 'Erro ao atualizar a matéria.' };
  }
}

export async function deletePost(id: string): Promise<Result> {
  const session = await requireRoleResult('ADMIN');
  if (!session) return { ok: false, error: 'Apenas administradores podem remover matérias.' };
  try {
    await prisma.blogPost.delete({ where: { id } });
    invalidateBlogCache();
    revalidatePath('/admin/blog');
    return { ok: true, id };
  } catch (e) {
    console.error(e);
    return { ok: false, error: 'Erro ao remover a matéria.' };
  }
}

export async function listAdminPosts() {
  await requireAdmin();
  return prisma.blogPost.findMany({ orderBy: { updatedAt: 'desc' } });
}

export async function getAdminPost(id: string) {
  await requireAdmin();
  return prisma.blogPost.findUnique({ where: { id } });
}

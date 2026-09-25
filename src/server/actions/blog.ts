'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { postSchema, type PostInput } from '@/lib/validations';
import { slugify } from '@/lib/utils';
import { sanitizePostHtml } from '@/lib/sanitize';
import { requireAdmin, requireRoleResult } from '@/lib/auth-guards';
import { invalidateBlogCache } from '@/lib/data-cache';
import type { PostType } from '@prisma/client';

type Result = { ok: true; id: string } | { ok: false; error: string };

function emptyToNull(v: string | null | undefined) {
  if (v == null || v === '') return null;
  return v;
}

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
        excerpt: emptyToNull(d.excerpt),
        content: sanitizePostHtml(d.content),
        coverUrl: emptyToNull(d.coverUrl),
        fileUrl: emptyToNull(d.fileUrl),
        tag: emptyToNull(d.tag),
        type: d.type,
        status: d.status,
        publishedAt: d.status === 'PUBLISHED' ? new Date() : null,
        authorId: (session.user as { id?: string }).id ?? null,
      },
    });
    invalidateBlogCache();
    revalidatePath('/admin/blog');
    revalidatePath('/downloads');
    if (d.type === 'SETOR') revalidatePath(`/setores/${d.slug}`);
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
    const existing = await prisma.blogPost.findUnique({ where: { id }, select: { publishedAt: true } });
    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        title: d.title,
        slug: d.slug,
        excerpt: emptyToNull(d.excerpt),
        content: sanitizePostHtml(d.content),
        coverUrl: emptyToNull(d.coverUrl),
        fileUrl: emptyToNull(d.fileUrl),
        tag: emptyToNull(d.tag),
        type: d.type,
        status: d.status,
        publishedAt:
          d.status === 'PUBLISHED' ? (existing?.publishedAt ?? new Date()) : null,
      },
    });
    invalidateBlogCache();
    revalidatePath('/admin/blog');
    revalidatePath('/downloads');
    revalidatePath(`/blog/${post.slug}`);
    if (d.type === 'SETOR') revalidatePath(`/setores/${d.slug}`);
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
    revalidatePath('/downloads');
    return { ok: true, id };
  } catch (e) {
    console.error(e);
    return { ok: false, error: 'Erro ao remover a matéria.' };
  }
}

export async function listAdminPosts(type?: PostType | 'ALL') {
  await requireAdmin();
  return prisma.blogPost.findMany({
    where: type && type !== 'ALL' ? { type } : undefined,
    orderBy: { updatedAt: 'desc' },
  });
}

export async function getAdminPost(id: string) {
  await requireAdmin();
  return prisma.blogPost.findUnique({ where: { id } });
}

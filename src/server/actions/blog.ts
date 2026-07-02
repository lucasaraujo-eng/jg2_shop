'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { postSchema, type PostInput } from '@/lib/validations';
import { slugify } from '@/lib/utils';

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error('Não autorizado');
  return session;
}

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
    revalidatePath('/admin/blog');
    revalidatePath('/blog');
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
    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    revalidatePath(`/blog/${post.slug}`);
    return { ok: true, id: post.id };
  } catch (e) {
    console.error(e);
    return { ok: false, error: 'Erro ao atualizar a matéria.' };
  }
}

export async function deletePost(id: string): Promise<Result> {
  await requireAdmin();
  try {
    await prisma.blogPost.delete({ where: { id } });
    revalidatePath('/admin/blog');
    revalidatePath('/blog');
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

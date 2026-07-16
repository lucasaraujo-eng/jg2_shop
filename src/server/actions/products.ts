'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { productSchema, type ProductInput } from '@/lib/validations';
import { requireAdmin, requireRoleResult } from '@/lib/auth-guards';

type Result = { ok: true; id: string } | { ok: false; error: string };

export async function createProduct(input: ProductInput): Promise<Result> {
  await requireAdmin();
  const parsed = productSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const d = parsed.data;
  try {
    const exists = await prisma.product.findUnique({ where: { code: d.code } });
    if (exists) return { ok: false, error: 'Já existe um produto com este SKU.' };

    const product = await prisma.product.create({
      data: {
        code: d.code,
        name: d.name,
        ncm: d.ncm ?? null,
        isCadeado: d.isCadeado,
        description: d.description,
        supportText: d.supportText ?? null,
        active: d.active,
        categoryId: d.categoryId,
        subcategoryId: d.subcategoryId ?? null,
        images: d.coverUrl ? { create: [{ url: d.coverUrl, order: 0 }] } : undefined,
        filterTags: d.filterTags.length
          ? { create: d.filterTags.map((tagKey) => ({ tagKey })) }
          : undefined,
      },
    });
    revalidatePath('/admin/produtos');
    revalidatePath('/produtos');
    return { ok: true, id: product.id };
  } catch (e) {
    console.error(e);
    return { ok: false, error: 'Erro ao criar o produto.' };
  }
}

export async function updateProduct(id: string, input: ProductInput): Promise<Result> {
  await requireAdmin();
  const parsed = productSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const d = parsed.data;
  try {
    await prisma.productFilterTag.deleteMany({ where: { productId: id } });
    const product = await prisma.product.update({
      where: { id },
      data: {
        code: d.code,
        name: d.name,
        ncm: d.ncm ?? null,
        isCadeado: d.isCadeado,
        description: d.description,
        supportText: d.supportText ?? null,
        active: d.active,
        categoryId: d.categoryId,
        subcategoryId: d.subcategoryId ?? null,
        filterTags: d.filterTags.length
          ? { create: d.filterTags.map((tagKey) => ({ tagKey })) }
          : undefined,
      },
    });
    // atualiza a imagem de capa (order 0), se enviada
    if (typeof d.coverUrl === 'string') {
      await prisma.productImage.deleteMany({ where: { productId: id, order: 0 } });
      if (d.coverUrl) {
        await prisma.productImage.create({ data: { productId: id, url: d.coverUrl, order: 0 } });
      }
    }
    revalidatePath('/admin/produtos');
    revalidatePath('/produtos');
    return { ok: true, id: product.id };
  } catch (e) {
    console.error(e);
    return { ok: false, error: 'Erro ao atualizar o produto.' };
  }
}

export async function deleteProduct(id: string): Promise<Result> {
  const session = await requireRoleResult('ADMIN');
  if (!session) return { ok: false, error: 'Apenas administradores podem remover produtos.' };
  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath('/admin/produtos');
    revalidatePath('/produtos');
    return { ok: true, id };
  } catch (e) {
    console.error(e);
    return { ok: false, error: 'Erro ao remover o produto.' };
  }
}

/** Lista para a tela de admin (todas as categorias). */
export async function listAdminProducts(query?: string) {
  await requireAdmin();
  return prisma.product.findMany({
    where: query
      ? {
          OR: [
            { code: { contains: query, mode: 'insensitive' } },
            { name: { contains: query, mode: 'insensitive' } },
          ],
        }
      : undefined,
    orderBy: { updatedAt: 'desc' },
    include: { images: { take: 1, orderBy: { order: 'asc' } }, category: true },
  });
}

/** Produto para pré-preencher o formulário de edição. */
export async function getAdminProduct(id: string) {
  await requireAdmin();
  return prisma.product.findUnique({
    where: { id },
    include: { images: { orderBy: { order: 'asc' }, take: 1 }, filterTags: true },
  });
}

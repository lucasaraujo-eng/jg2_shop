'use server';

import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { productSchema, type ProductInput } from '@/lib/validations';
import { requireAdmin, requireRoleResult } from '@/lib/auth-guards';
import { invalidateCatalogCache } from '@/lib/data-cache';

type Result = { ok: true; id: string } | { ok: false; error: string };

function emptyToNull(v: string | null | undefined) {
  if (v == null || v === '') return null;
  return v;
}

function galleryUrls(d: ProductInput): string[] {
  const fromList = (d.imageUrls ?? []).map((u) => u.trim()).filter(Boolean);
  if (fromList.length > 0) return fromList.slice(0, 12);
  if (d.coverUrl) return [d.coverUrl];
  return [];
}

function categoryLinks(d: ProductInput) {
  const extras = (d.extraCategoryIds ?? []).filter((id) => id && id !== d.categoryId);
  const uniqueExtras = [...new Set(extras)];
  return [
    { categoryId: d.categoryId, isPrimary: true },
    ...uniqueExtras.map((categoryId) => ({ categoryId, isPrimary: false })),
  ];
}

function supportJsonValue(d: ProductInput): Prisma.InputJsonValue | typeof Prisma.JsonNull {
  if (!d.supportJson) return Prisma.JsonNull;
  return d.supportJson as Prisma.InputJsonValue;
}

export async function createProduct(input: ProductInput): Promise<Result> {
  await requireAdmin();
  const parsed = productSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const d = parsed.data;
  const images = galleryUrls(d);
  try {
    const exists = await prisma.product.findUnique({ where: { code: d.code } });
    if (exists) return { ok: false, error: 'Já existe um produto com este SKU.' };

    const product = await prisma.product.create({
      data: {
        code: d.code,
        name: d.name,
        subtitle: emptyToNull(d.subtitle),
        ncm: emptyToNull(d.ncm),
        isCadeado: d.isCadeado,
        description: d.description,
        supportText: emptyToNull(d.supportText),
        seoTitle: emptyToNull(d.seoTitle),
        seoDescription: emptyToNull(d.seoDescription),
        supportHeading: emptyToNull(d.supportHeading),
        supportTldr: emptyToNull(d.supportTldr),
        supportIdealFor: emptyToNull(d.supportIdealFor),
        supportNotFor: emptyToNull(d.supportNotFor),
        supportJson: supportJsonValue(d),
        active: d.active,
        categoryId: d.categoryId,
        subcategoryId: emptyToNull(d.subcategoryId),
        images: images.length
          ? { create: images.map((url, i) => ({ url, order: i })) }
          : undefined,
        specs: d.specs.length
          ? { create: d.specs.map((s, i) => ({ label: s.label, value: s.value, order: i })) }
          : undefined,
        filterTags: d.filterTags.length
          ? { create: d.filterTags.map((tagKey) => ({ tagKey })) }
          : undefined,
        categories: { create: categoryLinks(d) },
      },
    });
    invalidateCatalogCache();
    revalidatePath('/admin/produtos');
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
  const images = galleryUrls(d);
  try {
    await prisma.productFilterTag.deleteMany({ where: { productId: id } });
    await prisma.productSpec.deleteMany({ where: { productId: id } });
    await prisma.productImage.deleteMany({ where: { productId: id } });
    await prisma.productCategory.deleteMany({ where: { productId: id } });

    const product = await prisma.product.update({
      where: { id },
      data: {
        code: d.code,
        name: d.name,
        subtitle: emptyToNull(d.subtitle),
        ncm: emptyToNull(d.ncm),
        isCadeado: d.isCadeado,
        description: d.description,
        supportText: emptyToNull(d.supportText),
        seoTitle: emptyToNull(d.seoTitle),
        seoDescription: emptyToNull(d.seoDescription),
        supportHeading: emptyToNull(d.supportHeading),
        supportTldr: emptyToNull(d.supportTldr),
        supportIdealFor: emptyToNull(d.supportIdealFor),
        supportNotFor: emptyToNull(d.supportNotFor),
        supportJson: supportJsonValue(d),
        active: d.active,
        categoryId: d.categoryId,
        subcategoryId: emptyToNull(d.subcategoryId),
        images: images.length
          ? { create: images.map((url, i) => ({ url, order: i })) }
          : undefined,
        specs: d.specs.length
          ? { create: d.specs.map((s, i) => ({ label: s.label, value: s.value, order: i })) }
          : undefined,
        filterTags: d.filterTags.length
          ? { create: d.filterTags.map((tagKey) => ({ tagKey })) }
          : undefined,
        categories: { create: categoryLinks(d) },
      },
    });
    invalidateCatalogCache();
    revalidatePath('/admin/produtos');
    revalidatePath(`/produto/${product.code}`);
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
    invalidateCatalogCache();
    revalidatePath('/admin/produtos');
    return { ok: true, id };
  } catch (e) {
    console.error(e);
    return { ok: false, error: 'Erro ao remover o produto.' };
  }
}

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

export async function getAdminProduct(id: string) {
  await requireAdmin();
  return prisma.product.findUnique({
    where: { id },
    include: {
      images: { orderBy: { order: 'asc' } },
      filterTags: true,
      specs: { orderBy: { order: 'asc' } },
      categories: true,
    },
  });
}

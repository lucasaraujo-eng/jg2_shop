'use server';

import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { categorySchema, type CategoryInput } from '@/lib/validations';
import { requireAdmin } from '@/lib/auth-guards';
import { invalidateCatalogCache } from '@/lib/data-cache';

type Result = { ok: true } | { ok: false; error: string };

function emptyToNull(v: string | null | undefined) {
  const t = v?.trim();
  return t ? t : null;
}

export async function listAdminCategories() {
  await requireAdmin();
  return prisma.category.findMany({
    orderBy: { order: 'asc' },
    include: { subcategories: { orderBy: { order: 'asc' }, select: { id: true } }, _count: { select: { products: true } } },
  });
}

export async function getAdminCategory(id: string) {
  await requireAdmin();
  return prisma.category.findUnique({
    where: { id },
    include: { subcategories: { orderBy: { order: 'asc' } } },
  });
}

export async function updateCategory(id: string, input: CategoryInput): Promise<Result> {
  await requireAdmin();
  const parsed = categorySchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const d = parsed.data;
  try {
    const subs = await prisma.subcategory.findMany({ where: { categoryId: id }, select: { id: true } });
    const validSubIds = new Set(subs.map((s) => s.id));

    const category = await prisma.$transaction(async (tx) => {
      const updated = await tx.category.update({
        where: { id },
        data: {
          supportText: emptyToNull(d.supportText),
          seoTitle: emptyToNull(d.seoTitle),
          seoDescription: emptyToNull(d.seoDescription),
          supportHeading: emptyToNull(d.supportHeading),
          supportTldr: emptyToNull(d.supportTldr),
          supportIdealFor: emptyToNull(d.supportIdealFor),
          supportNotFor: emptyToNull(d.supportNotFor),
          supportJson: d.supportJson ? (d.supportJson as Prisma.InputJsonValue) : Prisma.JsonNull,
        },
      });
      for (const sub of d.subcategories) {
        if (!validSubIds.has(sub.id)) continue;
        await tx.subcategory.update({
          where: { id: sub.id },
          data: {
            supportText: emptyToNull(sub.supportText),
            seoTitle: emptyToNull(sub.seoTitle),
            seoDescription: emptyToNull(sub.seoDescription),
          },
        });
      }
      return updated;
    });

    invalidateCatalogCache();
    revalidatePath('/admin/categorias');
    revalidatePath(`/produtos/${category.slug}`);
    return { ok: true };
  } catch (e) {
    console.error(e);
    return { ok: false, error: 'Erro ao atualizar a categoria.' };
  }
}

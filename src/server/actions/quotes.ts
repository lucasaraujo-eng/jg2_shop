'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth-guards';

const STATUSES = ['NEW', 'IN_PROGRESS', 'SENT', 'ARCHIVED'] as const;
type QuoteStatus = (typeof STATUSES)[number];

export async function listAdminQuotes() {
  await requireAdmin();
  return prisma.quoteRequest.findMany({
    orderBy: { createdAt: 'desc' },
    include: { items: true },
  });
}

type Result = { ok: true } | { ok: false; error: string };

export async function updateQuoteStatus(id: string, status: QuoteStatus): Promise<Result> {
  await requireAdmin();
  if (!STATUSES.includes(status)) return { ok: false, error: 'Status inválido.' };
  try {
    await prisma.quoteRequest.update({ where: { id }, data: { status } });
    revalidatePath('/admin/orcamentos');
    return { ok: true };
  } catch (e) {
    console.error(e);
    return { ok: false, error: 'Erro ao atualizar o status.' };
  }
}

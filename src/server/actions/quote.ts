'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { sendQuoteEmails } from '@/lib/email';
import { quoteRequestSchema, type QuoteRequestInput } from '@/lib/validations';

type ActionResult = { ok: true; id: string } | { ok: false; error: string };

/** Cria o pedido de orçamento, persiste e dispara os e-mails. */
export async function submitQuote(input: QuoteRequestInput): Promise<ActionResult> {
  const parsed = quoteRequestSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Dados inválidos' };
  }
  const data = parsed.data;

  try {
    const quote = await prisma.quoteRequest.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        cnpj: data.cnpj,
        purpose: data.purpose,
        message: data.message ?? null,
        items: {
          create: data.items.map((i) => ({
            code: i.code,
            name: i.name,
            quantity: i.quantity,
            variantLabel: i.variantLabel ?? null,
            productId: i.productId ?? null,
          })),
        },
      },
      include: { items: true },
    });

    await sendQuoteEmails({
      id: quote.id,
      name: quote.name,
      email: quote.email,
      phone: quote.phone,
      cnpj: quote.cnpj,
      purpose: quote.purpose,
      message: quote.message,
      items: quote.items,
    });

    revalidatePath('/admin/orcamentos');
    return { ok: true, id: quote.id };
  } catch (e) {
    console.error('submitQuote', e);
    return { ok: false, error: 'Não foi possível enviar o orçamento. Tente novamente.' };
  }
}

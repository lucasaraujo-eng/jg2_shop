'use server';

import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { sendQuoteEmails } from '@/lib/email';
import { quoteRequestSchema, type QuoteRequestInput } from '@/lib/validations';
import { checkRateLimit, clientIp } from '@/lib/rate-limit';

type ActionResult = { ok: true; id: string } | { ok: false; error: string };

const RATE_LIMIT_MSG = 'Muitas solicitações. Aguarde alguns minutos e tente novamente.';

/** Cria o pedido de orçamento, persiste e dispara os e-mails. */
export async function submitQuote(input: QuoteRequestInput): Promise<ActionResult> {
  const ip = clientIp(await headers());
  if (!checkRateLimit(`quote:${ip}`, 5, 10 * 60 * 1000)) {
    return { ok: false, error: RATE_LIMIT_MSG };
  }

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
        company: data.company ?? null,
        city: data.city ?? null,
        cnpj: data.cnpj ?? null,
        purpose: data.purpose ?? null,
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
      company: quote.company,
      city: quote.city,
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

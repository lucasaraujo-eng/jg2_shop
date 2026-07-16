'use server';

import { headers } from 'next/headers';
import { sendContactEmail } from '@/lib/email';
import { contactMessageSchema, type ContactMessageInput } from '@/lib/validations';
import { checkRateLimit, clientIp } from '@/lib/rate-limit';

type ActionResult = { ok: true } | { ok: false; error: string };

/** "Fale conosco" — mensagem avulsa, sem itens/CNPJ. Não persiste no banco, só envia e-mail. */
export async function submitContact(input: ContactMessageInput): Promise<ActionResult> {
  const ip = clientIp(await headers());
  if (!checkRateLimit(`contact:${ip}`, 5, 10 * 60 * 1000)) {
    return { ok: false, error: 'Muitas solicitações. Aguarde alguns minutos e tente novamente.' };
  }

  const parsed = contactMessageSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Dados inválidos' };
  }

  try {
    await sendContactEmail(parsed.data);
    return { ok: true };
  } catch (e) {
    console.error('submitContact', e);
    return { ok: false, error: 'Não foi possível enviar sua mensagem. Tente novamente.' };
  }
}

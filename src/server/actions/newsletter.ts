'use server';

import { sendNewsletterEmail } from '@/lib/email';
import { newsletterSubscribeSchema, type NewsletterSubscribeInput } from '@/lib/validations';

type ActionResult = { ok: true } | { ok: false; error: string };

/** Inscrição na newsletter — sem itens/CNPJ. Não persiste no banco, só envia e-mail. */
export async function submitNewsletter(input: NewsletterSubscribeInput): Promise<ActionResult> {
  const parsed = newsletterSubscribeSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Dados inválidos' };
  }

  try {
    await sendNewsletterEmail(parsed.data);
    return { ok: true };
  } catch (e) {
    console.error('submitNewsletter', e);
    return { ok: false, error: 'Não foi possível concluir a inscrição. Tente novamente.' };
  }
}

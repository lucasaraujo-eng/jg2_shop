'use server';

import { headers } from 'next/headers';
import { sendNewsletterEmail } from '@/lib/email';
import { newsletterSubscribeSchema, type NewsletterSubscribeInput } from '@/lib/validations';
import { checkRateLimit, clientIp } from '@/lib/rate-limit';
import { verifyRecaptcha } from '@/lib/recaptcha';

type ActionResult = { ok: true } | { ok: false; error: string };

export async function submitNewsletter(input: NewsletterSubscribeInput, recaptchaToken?: string): Promise<ActionResult> {
  const ip = clientIp(await headers());
  if (!checkRateLimit(`newsletter:${ip}`, 5, 10 * 60 * 1000)) {
    return { ok: false, error: 'Muitas solicitações. Aguarde alguns minutos e tente novamente.' };
  }
  if (!(await verifyRecaptcha(recaptchaToken, 'submit_newsletter'))) {
    return { ok: false, error: 'Não foi possível validar sua solicitação. Recarregue a página e tente novamente.' };
  }

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

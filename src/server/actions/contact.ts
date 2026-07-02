'use server';

import { sendContactEmail } from '@/lib/email';
import { contactMessageSchema, type ContactMessageInput } from '@/lib/validations';

type ActionResult = { ok: true } | { ok: false; error: string };

/** "Fale conosco" — mensagem avulsa, sem itens/CNPJ. Não persiste no banco, só envia e-mail. */
export async function submitContact(input: ContactMessageInput): Promise<ActionResult> {
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

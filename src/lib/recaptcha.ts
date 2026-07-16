const SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const SCORE_THRESHOLD = 0.5;

type SiteVerifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  'error-codes'?: string[];
};

/**
 * Verifica um token do reCAPTCHA v3 contra a API do Google. Sem
 * RECAPTCHA_SECRET_KEY configurada (antes do setup no Google Console), não
 * bloqueia o formulário — só loga (mesmo padrão de degradação de
 * email.ts/storage.ts pra RESEND_API_KEY/R2). Falha de rede também não
 * bloqueia (não é justo travar o formulário por uma instabilidade do
 * Google); só reprova quando o Google responde claramente "não é humano".
 */
export async function verifyRecaptcha(token: string | undefined, action: string): Promise<boolean> {
  if (!SECRET_KEY) {
    console.warn('[recaptcha] RECAPTCHA_SECRET_KEY ausente — verificação pulada.');
    return true;
  }
  if (!token) return false;

  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: SECRET_KEY, response: token }),
    });
    const data = (await res.json()) as SiteVerifyResponse;

    if (!data.success) return false;
    if (data.action && data.action !== action) return false;
    if (typeof data.score === 'number' && data.score < SCORE_THRESHOLD) return false;
    return true;
  } catch (e) {
    console.error('[recaptcha] falha ao verificar token', e);
    return true;
  }
}

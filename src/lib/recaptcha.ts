const SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const SCORE_THRESHOLD = 0.5;

type SiteVerifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  'error-codes'?: string[];
};

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

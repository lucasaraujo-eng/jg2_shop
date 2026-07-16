'use client';

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

/**
 * Gera um token do reCAPTCHA v3 pra uma ação (ex.: "submit_quote"). Sem site
 * key configurada, ou se o script do Google não carregou, devolve `null` —
 * a action no servidor trata ausência de token como "verificação
 * indisponível" e não bloqueia o envio (ver lib/recaptcha.ts).
 */
export function getRecaptchaToken(action: string): Promise<string | null> {
  if (!SITE_KEY || typeof window === 'undefined' || !window.grecaptcha) {
    return Promise.resolve(null);
  }
  return new Promise((resolve) => {
    window.grecaptcha!.ready(() => {
      window
        .grecaptcha!.execute(SITE_KEY, { action })
        .then(resolve)
        .catch(() => resolve(null));
    });
  });
}

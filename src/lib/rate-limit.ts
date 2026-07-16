type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/**
 * Limitador em memória (janela fixa), sem dependência externa — não exige
 * Redis/Upstash configurado. Escopo é por processo: reseta em cold start,
 * mas já barra força-bruta/spam automatizado dentro do mesmo runtime quente
 * (suficiente para o volume desta aplicação; se o tráfego crescer muito,
 * trocar por um limitador compartilhado como @upstash/ratelimit).
 */
export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();

  // limpeza oportunista pra não crescer sem limite
  if (buckets.size > 5000) {
    for (const [k, b] of buckets) {
      if (now > b.resetAt) buckets.delete(k);
    }
  }

  const bucket = buckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (bucket.count >= limit) return false;
  bucket.count++;
  return true;
}

/** IP do cliente a partir dos headers da requisição (Netlify/edge repassam x-forwarded-for). */
export function clientIp(headers: Headers): string {
  return headers.get('x-forwarded-for')?.split(',')[0]?.trim() || headers.get('x-real-ip') || 'unknown';
}

const R2_PUBLIC_URL = (process.env.NEXT_PUBLIC_R2_PUBLIC_URL ?? '').replace(/\/$/, '');
// Mesmos prefixos redirecionados pro R2 em next.config.ts — mantido em sincronia manualmente.
const R2_REDIRECTED_PREFIXES = ['uploads/', 'assets/filtro/'];

/**
 * Caminhos que caem num redirect 308 pro R2 (/uploads/*, /assets/filtro/*, ver
 * next.config.ts) são resolvidos direto pra URL absoluta do bucket — o otimizador de
 * imagens do next/image busca o src ele mesmo e NÃO segue redirects, então um caminho
 * relativo redirecionado sempre falharia com "isn't a valid image".
 */
export function resolveImageUrl(url?: string | null): string | null {
  if (!url) return null;
  if (/^https?:\/\//.test(url)) return url;
  if (!/^\/?(assets|uploads)\//.test(url)) return null;
  return r2Url(url);
}

/**
 * Mesma resolução acima, mas para os `src="/uploads/..."` fixos no próprio JSX
 * (banners, fotos institucionais etc. — nunca nulos, não vêm do banco).
 */
export function r2Url(path: string): string {
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  if (R2_PUBLIC_URL && R2_REDIRECTED_PREFIXES.some((p) => normalized.startsWith(p))) {
    return `${R2_PUBLIC_URL}/${normalized}`;
  }
  return `/${normalized}`;
}

export function readingTime(html: string): string {
  const words = html
    .replace(/<[^>]+>/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}

export function slugify(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

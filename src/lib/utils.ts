const R2_PUBLIC_URL = (process.env.NEXT_PUBLIC_R2_PUBLIC_URL ?? '').replace(/\/$/, '');
const R2_REDIRECTED_PREFIXES = ['uploads/', 'assets/filtro/'];

export function resolveImageUrl(url?: string | null): string | null {
  if (!url) return null;
  if (/^https?:\/\//.test(url)) return url;
  if (!/^\/?(assets|uploads)\//.test(url)) return null;
  return r2Url(url);
}

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

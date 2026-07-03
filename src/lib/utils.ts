/**
 * Normaliza a URL de imagem vinda do banco para um src utilizável.
 * O seed carrega caminhos do protótipo sem barra inicial (ex.: "uploads/cover-X.png",
 * "assets/x.png") que hoje já existem como arquivo real em public/ — normaliza para
 * "/uploads/..."/"/assets/...". URLs absolutas (http(s), ex.: R2 futuramente) passam
 * direto. Qualquer outra coisa (ou vazio) retorna null e cai no placeholder de texto.
 */
export function resolveImageUrl(url?: string | null): string | null {
  if (!url) return null;
  if (/^https?:\/\//.test(url)) return url;
  if (/^\/?(assets|uploads)\//.test(url)) return url.startsWith('/') ? url : `/${url}`;
  return null;
}

/** Tempo de leitura estimado a partir do texto real do post (~200 palavras/min). */
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

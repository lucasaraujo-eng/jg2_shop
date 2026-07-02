/**
 * O seed carrega caminhos do protótipo (ex.: "uploads/cover-X.png") que não
 * existem como arquivo real — só URLs absolutas (R2, futuramente) contam
 * como imagem de verdade. O resto cai no placeholder de texto.
 */
export function isRealImageUrl(url?: string | null): url is string {
  return !!url && /^https?:\/\//.test(url);
}

export function slugify(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

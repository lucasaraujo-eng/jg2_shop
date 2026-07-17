import { notFound, permanentRedirect } from 'next/navigation';
import { getAllProductCodes, getAllCategorySlugs } from '@/server/catalog';

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Páginas institucionais fixas do site anterior, sem equivalente 1:1 hoje. */
const OLD_STATIC_REDIRECTS: Record<string, string> = {
  contact: '/contato',
  'quem-somos': '/sobre',
};

/** Primeiro segmento do site anterior cujo nome não bate com o slug atual da categoria. */
const OLD_CATEGORY_ALIASES: Record<string, string> = {
  'bloqueios-mecanicos': 'bloqueio-de-valvulas',
  'caixas-de-travamento': 'caixas-e-estacoes',
};

/**
 * URLs antigas (de antes desta versão do site) continuam indexadas no
 * Google e hoje caem em 404. Em vez disso, tenta reconhecer o padrão e
 * redireciona (301) pro equivalente atual, na seguinte ordem:
 *
 * 1. Produto — slug longo e descritivo com o SKU embutido no meio, ex.:
 *    /cadeado-vermelho-de-bloqueio-jg2-plastico-...-jgl050-1-vm-... → /produto/JGL050-1
 * 2. Página institucional fixa (contato, quem-somos) → página atual.
 * 3. Post de blog antigo (sem slug correspondente) → índice do blog.
 * 4. Categoria antiga, com ou sem subcaminho (ex.: /cadeados-de-bloqueio/acessorios,
 *    /bloqueios-mecanicos/bloqueios-para-valvulas) → /produtos/{categoria atual}.
 *
 * URLs sem nenhum padrão reconhecível continuam caindo no 404 normal.
 */
export default async function LegacyUrlCatchAll({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const path = slug.join('/').toLowerCase();
  const firstSegment = slug[0]?.toLowerCase();

  const codes = await getAllProductCodes();
  const match = codes
    .sort((a, b) => b.length - a.length)
    .find((code) => new RegExp(`\\b${escapeRegExp(code.toLowerCase())}\\b`).test(path));

  if (match) {
    permanentRedirect(`/produto/${match}`);
  }

  if (firstSegment && OLD_STATIC_REDIRECTS[firstSegment]) {
    permanentRedirect(OLD_STATIC_REDIRECTS[firstSegment]);
  }

  if (firstSegment === 'blog') {
    permanentRedirect('/blog');
  }

  if (firstSegment) {
    const categorySlugs = await getAllCategorySlugs();
    const targetSlug = OLD_CATEGORY_ALIASES[firstSegment] ?? (categorySlugs.includes(firstSegment) ? firstSegment : null);
    if (targetSlug) {
      permanentRedirect(`/produtos/${targetSlug}`);
    }
  }

  notFound();
}

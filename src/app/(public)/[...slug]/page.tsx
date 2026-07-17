import { notFound, permanentRedirect } from 'next/navigation';
import { getAllProductCodes, getAllCategorySlugs } from '@/server/catalog';

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const OLD_STATIC_REDIRECTS: Record<string, string> = {
  contact: '/contato',
  'quem-somos': '/sobre',
};

const OLD_CATEGORY_ALIASES: Record<string, string> = {
  'bloqueios-mecanicos': 'bloqueio-de-valvulas',
  'caixas-de-travamento': 'caixas-e-estacoes',
};

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

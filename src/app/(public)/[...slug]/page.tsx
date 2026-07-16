import { notFound, permanentRedirect } from 'next/navigation';
import { getAllProductCodes } from '@/server/catalog';

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * URLs antigas (de antes desta versão do site) usavam um slug longo e
 * descritivo com o SKU embutido no meio, ex.:
 * /cadeado-vermelho-de-bloqueio-jg2-plastico-...-jgl050-1-vm-bloqueio-e-etiquetagem-lototo-jg2
 * Essas continuam indexadas no Google. Em vez de 404, reconhece o SKU e
 * redireciona (301) para a página de produto atual.
 */
export default async function LegacyUrlCatchAll({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const path = slug.join('/').toLowerCase();

  const codes = await getAllProductCodes();
  const match = codes
    .sort((a, b) => b.length - a.length)
    .find((code) => new RegExp(`\\b${escapeRegExp(code.toLowerCase())}\\b`).test(path));

  if (match) {
    permanentRedirect(`/produto/${match}`);
  }

  notFound();
}

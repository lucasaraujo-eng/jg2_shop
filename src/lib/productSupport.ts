import type { SupportArticleData } from '@/data/seo';
import type { ProductInput } from '@/lib/validations';

type ProductSupportSource = {
  supportHeading?: string | null;
  supportTldr?: string | null;
  supportIdealFor?: string | null;
  supportNotFor?: string | null;
  supportJson?: unknown;
};

export function productSupportFromDb(product: ProductSupportSource): SupportArticleData | null {
  const heading = product.supportHeading?.trim();
  const tldr = product.supportTldr?.trim();
  if (!heading || !tldr) return null;

  const json =
    product.supportJson && typeof product.supportJson === 'object' && !Array.isArray(product.supportJson)
      ? (product.supportJson as {
          tableHeaders?: string[];
          tableRows?: string[][];
          faqs?: { q: string; a: string }[];
          tip?: string | null;
          related?: { label: string; href: string }[];
        })
      : {};

  return {
    heading,
    tldr,
    idealFor: product.supportIdealFor?.trim() || '',
    notFor: product.supportNotFor?.trim() || '',
    tableHeaders: json.tableHeaders ?? [],
    tableRows: json.tableRows ?? [],
    faqs: json.faqs ?? [],
    tip: json.tip?.trim() || '',
    related: json.related ?? [],
  };
}

export function parseSupportJson(raw: unknown): ProductInput['supportJson'] {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return { tableHeaders: [], tableRows: [], faqs: [], tip: '', related: [] };
  }
  const j = raw as Record<string, unknown>;
  return {
    tableHeaders: Array.isArray(j.tableHeaders) ? (j.tableHeaders as string[]) : [],
    tableRows: Array.isArray(j.tableRows) ? (j.tableRows as string[][]) : [],
    faqs: Array.isArray(j.faqs) ? (j.faqs as { q: string; a: string }[]) : [],
    tip: typeof j.tip === 'string' ? j.tip : '',
    related: Array.isArray(j.related) ? (j.related as { label: string; href: string }[]) : [],
  };
}

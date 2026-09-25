import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('/orcamento');

export default function OrcamentoLayout({ children }: { children: React.ReactNode }) {
  return children;
}

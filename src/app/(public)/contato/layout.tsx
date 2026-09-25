import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('/contato');

export default function ContatoLayout({ children }: { children: React.ReactNode }) {
  return children;
}

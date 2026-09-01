import type { Metadata } from 'next';
import { ConsultoriaContent } from '@/components/services/ConsultoriaContent';
import { consultorias } from '@/data/consultorias';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('/servicos/maos-seguras');

export default function ConsultoriaMaosSegurasPage() {
  return <ConsultoriaContent data={consultorias['maos-seguras']} />;
}

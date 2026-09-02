import type { Metadata } from 'next';
import { ConsultoriaContent } from '@/components/services/ConsultoriaContent';
import { consultorias } from '@/data/consultorias';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('/servicos/nr12');

export default function ConsultoriaNr12Page() {
  return <ConsultoriaContent data={consultorias.nr12} />;
}

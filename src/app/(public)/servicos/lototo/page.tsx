import type { Metadata } from 'next';
import { ConsultoriaContent } from '@/components/services/ConsultoriaContent';
import { consultorias } from '@/data/consultorias';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('/servicos/lototo');

export default function ConsultoriaLototoPage() {
  return <ConsultoriaContent data={consultorias.lototo} />;
}

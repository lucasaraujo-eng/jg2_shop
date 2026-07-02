import { ConsultoriaContent } from '@/components/services/ConsultoriaContent';
import { consultorias } from '@/data/consultorias';

export default function ConsultoriaLototoPage() {
  return <ConsultoriaContent data={consultorias.lototo} />;
}

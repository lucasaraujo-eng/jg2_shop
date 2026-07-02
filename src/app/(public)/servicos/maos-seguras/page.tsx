import { ConsultoriaContent } from '@/components/services/ConsultoriaContent';
import { consultorias } from '@/data/consultorias';

export default function ConsultoriaMaosSegurasPage() {
  return <ConsultoriaContent data={consultorias['maos-seguras']} />;
}

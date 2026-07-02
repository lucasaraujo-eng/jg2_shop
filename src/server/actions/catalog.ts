'use server';

import { getProductsByFilterTag } from '@/server/catalog';

/**
 * Leitura pública exposta como Server Action para o filtro horizontal de
 * dispositivos (client component) poder chamar sob demanda a cada seleção.
 */
export async function filterProductsByTag(tagKey: string) {
  return getProductsByFilterTag(tagKey);
}

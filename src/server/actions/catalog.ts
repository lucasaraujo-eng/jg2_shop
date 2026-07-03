'use server';

import { getProductsByFilterTag } from '@/server/catalog';
import { toCardProducts } from '@/lib/catalogGrouping';

/**
 * Leitura pública exposta como Server Action para o filtro horizontal de
 * dispositivos (client component) poder chamar sob demanda a cada seleção.
 */
export async function filterProductsByTag(tagKey: string) {
  const products = await getProductsByFilterTag(tagKey);
  return toCardProducts(products);
}

'use server';

import { getProductsByFilterTag } from '@/server/catalog';
import { toCardProducts } from '@/lib/catalogGrouping';

export async function filterProductsByTag(tagKey: string) {
  const products = await getProductsByFilterTag(tagKey);
  return toCardProducts(products);
}

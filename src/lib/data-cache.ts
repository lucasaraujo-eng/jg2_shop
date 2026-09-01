import { cache } from 'react';
import { unstable_cache, updateTag, revalidatePath } from 'next/cache';

export const CACHE_TAGS = {
  catalog: 'catalog',
  blog: 'blog',
} as const;

/** ISR / data cache: 1 hora. Admin invalida na hora via updateTag. */
export const CACHE_REVALIDATE_SECONDS = 3600;

export function cachedQuery<TArgs extends unknown[], TResult>(
  key: string,
  tags: string[],
  fn: (...args: TArgs) => Promise<TResult>,
): (...args: TArgs) => Promise<TResult> {
  const acrossRequests = unstable_cache(fn, [key], {
    tags,
    revalidate: CACHE_REVALIDATE_SECONDS,
  });
  return cache(acrossRequests);
}

export function invalidateCatalogCache() {
  updateTag(CACHE_TAGS.catalog);
  revalidatePath('/produtos');
  revalidatePath('/produto', 'layout');
  revalidatePath('/', 'layout');
}

export function invalidateBlogCache() {
  updateTag(CACHE_TAGS.blog);
  revalidatePath('/blog');
}

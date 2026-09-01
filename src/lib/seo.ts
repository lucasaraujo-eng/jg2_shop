import type { Metadata } from 'next';
import { PAGE_SEO } from '@/data/seo';

export function getPageSeo(path: string) {
  return PAGE_SEO[path];
}

export function pageMetadata(path: string): Metadata {
  const seo = PAGE_SEO[path];
  if (!seo) return {};
  return {
    title: { absolute: seo.title },
    description: seo.description,
  };
}

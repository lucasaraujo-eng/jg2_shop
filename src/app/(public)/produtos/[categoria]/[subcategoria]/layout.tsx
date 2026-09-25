import { notFound } from 'next/navigation';
import { getSubcategoryBySlug } from '@/server/catalog';

/** Valida existência fora do loading.tsx para o HTTP status 404 real. */
export default async function SubcategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ categoria: string; subcategoria: string }>;
}) {
  const { categoria, subcategoria } = await params;
  const sub = await getSubcategoryBySlug(categoria, subcategoria);
  if (!sub || sub.category.type !== 'MAOS_SEGURAS') notFound();
  return children;
}

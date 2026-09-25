import { notFound } from 'next/navigation';
import { getCategoryBySlug } from '@/server/catalog';

/** Valida existência fora do loading.tsx para o HTTP status 404 real. */
export default async function CategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = await params;
  const category = await getCategoryBySlug(categoria);
  if (!category) notFound();
  return children;
}

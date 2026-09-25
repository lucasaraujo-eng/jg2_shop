import { notFound } from 'next/navigation';
import { getProductByCode } from '@/server/catalog';

/** Valida existência fora do loading.tsx para o HTTP status 404 real. */
export default async function ProductCodeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const product = await getProductByCode(decodeURIComponent(code));
  if (!product) notFound();
  return children;
}

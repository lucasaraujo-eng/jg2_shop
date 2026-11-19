import { notFound, redirect } from 'next/navigation';
import { getPostBySlug } from '@/server/blog';

/** Valida existência fora do loading.tsx para o HTTP status 404 real. */
export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || post.status !== 'PUBLISHED') notFound();
  if (post.type === 'SETOR') redirect(`/setores/${post.slug}`);
  if (post.type !== 'BLOG') notFound();
  return children;
}

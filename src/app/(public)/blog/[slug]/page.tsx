import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/server/blog';

/** Stub (Bloco 1). Layout completo do artigo entra no Bloco 6. */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || post.status !== 'PUBLISHED') notFound();

  return (
    <article className="mx-auto max-w-[820px] px-7 py-12">
      {post.tag && <span className="font-mono text-xs uppercase text-brand">{post.tag}</span>}
      <h1 className="mt-2 font-display text-3xl font-black text-ink">{post.title}</h1>
      <div className="prose mt-8 max-w-none whitespace-pre-line text-muted">{post.content}</div>
    </article>
  );
}

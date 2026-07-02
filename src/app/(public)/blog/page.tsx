import Link from 'next/link';
import { getPublishedPosts } from '@/server/blog';

/** Stub (Bloco 1). Layout completo do índice entra no Bloco 6. */
export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="mx-auto max-w-[1340px] px-7 py-12">
      <p className="font-mono text-xs uppercase tracking-widest text-brand">Blog &amp; materiais</p>
      <h1 className="mt-2 font-display text-4xl font-black text-ink">Conteúdos sobre segurança e LOTO</h1>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <Link
            key={p.id}
            href={`/blog/${p.slug}`}
            className="flex flex-col rounded-2xl border border-border-soft bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl"
          >
            {p.tag && <span className="font-mono text-xs uppercase text-brand">{p.tag}</span>}
            <h2 className="mt-2 font-display text-lg font-bold text-ink">{p.title}</h2>
            {p.excerpt && <p className="mt-2 text-sm text-muted">{p.excerpt}</p>}
          </Link>
        ))}
      </div>
    </div>
  );
}

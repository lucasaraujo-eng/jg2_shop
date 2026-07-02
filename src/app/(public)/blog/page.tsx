import Link from 'next/link';
import { getPublishedPosts } from '@/server/blog';
import { PostCard } from '@/components/blog/PostCard';
import { NewsletterForm } from '@/components/NewsletterForm';

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();
  const [featured, ...rest] = posts;

  return (
    <div>
      <section className="bg-ink-deep py-14 text-white">
        <div className="mx-auto max-w-[1340px] px-7">
          <p className="text-xs text-white/50">
            <Link href="/" className="hover:text-white">
              Home
            </Link>{' '}
            / Conteúdos
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-brand-soft">Blog &amp; materiais</p>
          <h1 className="mt-2 font-display text-4xl font-black">Conteúdos sobre segurança e LOTO</h1>
          <p className="mt-3 max-w-xl text-white/70">
            Artigos, guias e boas práticas para implantar e manter o controle de energias perigosas na sua operação.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1340px] px-7 py-12">
        {posts.length === 0 ? (
          <p className="rounded-xl border border-border-soft bg-white px-6 py-10 text-center text-sm text-tertiary">
            Nenhum artigo publicado ainda.
          </p>
        ) : (
          <>
            {featured && (
              <div className="mb-10">
                <PostCard post={featured} featured />
              </div>
            )}

            {rest.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            )}
          </>
        )}

        <div className="mt-16 rounded-2xl border border-border-soft bg-white p-8 sm:p-10">
          <h2 className="font-display text-2xl font-black text-ink">Receba novos conteúdos no seu email</h2>
          <div className="mt-5 max-w-xl">
            <NewsletterForm ctaLabel="Assinar →" />
          </div>
        </div>
      </div>
    </div>
  );
}

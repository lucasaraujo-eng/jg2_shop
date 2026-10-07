import type { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedPosts, getSetorArticlesForBlog } from '@/server/blog';
import { PostCard } from '@/components/blog/PostCard';
import { NewsletterForm } from '@/components/NewsletterForm';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('/blog');

const SHOW_POSTS = true;

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();
  const setorArticles = await getSetorArticlesForBlog();
  const [featured, ...rest] = posts;
  const hasContent = posts.length > 0 || setorArticles.length > 0;

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
          <p className="mt-4 inline-block rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white">Blog &amp; materiais</p>
          <h1 className="mt-2 font-display text-4xl font-black">Conteúdos sobre segurança e LOTO</h1>
          <p className="mt-3 max-w-xl text-white/70">
            Artigos, guias e matérias por setor para implantar e manter o controle de energias perigosas na sua operação.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1340px] px-7 py-12">
        {!SHOW_POSTS || !hasContent ? (
          <div className="py-24 text-center">
            <p className="font-display text-2xl font-black leading-tight text-ink sm:text-3xl">
              Muitos conteúdos relevantes serão lançados em breve, aguarde!
            </p>
          </div>
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

            {setorArticles.length > 0 && (
              <section id="setores" className="scroll-mt-28 mt-16">
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-brand">Áreas de atuação</p>
                <h2 className="mt-2 font-display text-3xl font-black text-ink">Segurança por setor industrial</h2>
                <p className="mt-3 max-w-2xl text-muted-2">
                  Matérias técnicas sobre os riscos e as adequações JG2® em cada tipo de operação.
                </p>
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {setorArticles.map((p) => (
                    <PostCard key={p.slug} post={p} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        <div className="mt-16 rounded-2xl border border-border-soft bg-surface-card p-8 sm:p-10">
          <h2 className="font-display text-2xl font-black text-ink">Receba novos conteúdos no seu email</h2>
          <div className="mt-5 max-w-xl">
            <NewsletterForm ctaLabel="Assinar →" />
          </div>
        </div>
      </div>
    </div>
  );
}

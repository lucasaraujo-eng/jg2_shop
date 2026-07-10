import Link from 'next/link';
import { getPublishedPosts } from '@/server/blog';
import { PostCard } from '@/components/blog/PostCard';
import { NewsletterForm } from '@/components/NewsletterForm';

// TODO: matérias atuais são de teste — esconder a listagem pública até termos
// conteúdo real publicado. Trocar para `true` quando fizer sentido reativar.
const SHOW_POSTS = false;

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
        {!SHOW_POSTS || posts.length === 0 ? (
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

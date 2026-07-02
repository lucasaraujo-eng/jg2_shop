import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getRelatedPosts } from '@/server/blog';
import { PostCard } from '@/components/blog/PostCard';
import { sanitizePostHtml } from '@/lib/sanitize';
import { readingTime } from '@/lib/utils';

const STRIPE_BG = {
  backgroundImage:
    'repeating-linear-gradient(135deg, var(--color-surface-stripe-a) 0 14px, var(--color-surface-stripe-b) 14px 28px)',
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || post.status !== 'PUBLISHED') notFound();

  const related = await getRelatedPosts(slug);
  const date = post.publishedAt
    ? new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(post.publishedAt).toUpperCase()
    : null;

  return (
    <article>
      <section className="bg-ink-deep py-12 text-white">
        <div className="mx-auto max-w-[820px] px-7">
          <p className="text-xs text-white/50">
            <Link href="/" className="hover:text-white">
              Home
            </Link>{' '}
            /{' '}
            <Link href="/blog" className="hover:text-white">
              Conteúdos
            </Link>{' '}
            / <span className="text-white/70">{post.tag}</span>
          </p>
          {post.tag && (
            <span className="mt-4 inline-block rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide">
              {post.tag}
            </span>
          )}
          <h1 className="mt-4 font-display text-3xl font-black leading-tight sm:text-4xl">{post.title}</h1>
          <p className="mt-3 font-mono text-xs text-white/50">
            {date && `${date} · `}
            {readingTime(post.content)} de leitura
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[820px] px-7 py-10">
        <div className="mb-9 h-[380px] rounded-2xl" style={STRIPE_BG} />

        {post.excerpt && <p className="text-xl font-medium leading-relaxed text-ink">{post.excerpt}</p>}

        <div
          className="prose prose-neutral mt-7 max-w-none text-[17px] leading-[1.7] text-muted-3 [&_a]:text-brand [&_a]:underline [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-ink [&_li]:my-1 [&_p]:my-4"
          dangerouslySetInnerHTML={{ __html: sanitizePostHtml(post.content) }}
        />

        <div className="my-10 rounded-r-xl border-l-[3px] border-brand bg-surface-alt px-8 py-7">
          <p className="text-lg font-semibold italic leading-relaxed text-ink">
            &ldquo;A segurança não é um custo — é o que mantém sua operação funcionando todos os dias.&rdquo;
          </p>
        </div>

        <div className="flex items-center gap-3.5 border-y border-border-soft py-6">
          <div className="h-13 w-13 flex-none rounded-full" style={STRIPE_BG} />
          <div className="min-w-0 flex-1">
            <p className="font-bold text-ink">Equipe Técnica JG2</p>
            <p className="text-sm text-tertiary">Especialistas em Lockout/Tagout e NR-12</p>
          </div>
          <Link href="/contato" className="flex-none rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-dark">
            Falar com especialista →
          </Link>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mx-auto max-w-[1340px] px-7 pb-16">
          <h2 className="mb-6 font-display text-2xl font-black text-ink">Leia também</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

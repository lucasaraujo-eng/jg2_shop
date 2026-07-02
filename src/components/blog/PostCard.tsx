import Link from 'next/link';
import { readingTime } from '@/lib/utils';

const STRIPE_BG = {
  backgroundImage:
    'repeating-linear-gradient(135deg, var(--color-surface-stripe-a) 0 14px, var(--color-surface-stripe-b) 14px 28px)',
};

export type PostSummary = {
  slug: string;
  title: string;
  excerpt: string | null;
  tag: string | null;
  content: string;
  publishedAt: Date | null;
};

function formatDate(date: Date | null): string | null {
  if (!date) return null;
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(date).toUpperCase();
}

export function PostCard({ post, featured = false }: { post: PostSummary; featured?: boolean }) {
  const date = formatDate(post.publishedAt);
  const read = readingTime(post.content);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex overflow-hidden rounded-2xl border border-border-soft bg-white transition hover:-translate-y-1 hover:shadow-xl ${
        featured ? 'flex-col lg:flex-row' : 'flex-col'
      }`}
    >
      <div className={featured ? 'h-56 flex-none lg:h-auto lg:w-1/2' : 'h-40'} style={STRIPE_BG} />
      <div className="flex flex-1 flex-col p-6">
        {post.tag && (
          <span className="self-start font-mono text-[11px] uppercase tracking-wide text-brand">
            {featured ? `Destaque · ${post.tag}` : post.tag}
          </span>
        )}
        <h3 className={`mt-2 font-display font-bold text-ink ${featured ? 'text-2xl' : 'text-lg'} leading-snug`}>{post.title}</h3>
        {post.excerpt && <p className="mt-2.5 flex-1 text-sm text-muted-2">{post.excerpt}</p>}
        <p className="mt-4 font-mono text-xs text-tertiary">
          {date && `${date} · `}
          {read} de leitura
        </p>
      </div>
    </Link>
  );
}

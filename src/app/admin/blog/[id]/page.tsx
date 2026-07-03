import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAdminPost } from '@/server/actions/blog';
import { PostForm } from '@/components/admin/PostForm';
import type { PostInput } from '@/lib/validations';

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getAdminPost(id);
  if (!post) notFound();

  const initial: PostInput = {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt ?? '',
    content: post.content,
    coverUrl: post.coverUrl ?? '',
    tag: post.tag ?? '',
    status: post.status,
  };

  return (
    <div>
      <Link href="/admin/blog" className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-2 hover:text-brand">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Blog
      </Link>
      <h1 className="mt-3 font-display text-2xl font-black text-ink">Editar matéria</h1>
      <div className="mt-6 rounded-2xl border border-border-soft bg-white p-6 shadow-sm sm:p-8">
        <PostForm postId={post.id} initial={initial} />
      </div>
    </div>
  );
}

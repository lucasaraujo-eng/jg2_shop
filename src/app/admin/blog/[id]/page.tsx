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
      <h1 className="font-display text-2xl font-black text-ink">Editar matéria</h1>
      <div className="mt-6">
        <PostForm postId={post.id} initial={initial} />
      </div>
    </div>
  );
}

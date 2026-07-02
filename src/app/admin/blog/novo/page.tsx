import { PostForm } from '@/components/admin/PostForm';

export default function NewPostPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-black text-ink">Nova matéria</h1>
      <div className="mt-6">
        <PostForm />
      </div>
    </div>
  );
}

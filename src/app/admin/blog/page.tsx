import { listAdminPosts } from '@/server/actions/blog';

/** Stub (Bloco 1): confirma listagem + auth. CRUD completo entra no Bloco 7. */
export default async function AdminBlogPage() {
  const posts = await listAdminPosts();

  return (
    <div>
      <h1 className="font-display text-2xl font-black text-ink">Blog ({posts.length})</h1>
      <ul className="mt-6 flex flex-col gap-2">
        {posts.map((p) => (
          <li key={p.id} className="rounded-lg border border-border-soft bg-white px-4 py-3 text-sm">
            {p.title} <span className="text-tertiary">({p.status})</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-tertiary">Formulário de criação/edição entra no Bloco 7.</p>
    </div>
  );
}

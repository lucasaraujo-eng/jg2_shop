import Link from 'next/link';
import { listAdminPosts } from '@/server/actions/blog';
import { DeletePostButton } from '@/components/admin/DeletePostButton';

export default async function AdminBlogPage() {
  const posts = await listAdminPosts();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-black text-ink">Blog</h1>
          <p className="mt-1 text-sm text-tertiary">{posts.length} matérias no blog.</p>
        </div>
        <Link
          href="/admin/blog/novo"
          className="flex flex-none items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-dark"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Nova matéria
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border-soft bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead className="text-left text-xs font-bold uppercase tracking-wide text-tertiary">
              <tr>
                <th className="px-5 py-3">Título</th>
                <th className="px-5 py-3">Tag</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-t border-border-soft transition hover:bg-surface-card">
                  <td className="px-5 py-3.5 font-semibold text-ink">{p.title}</td>
                  <td className="px-5 py-3.5">
                    {p.tag ? (
                      <span className="rounded-full bg-surface-alt px-2.5 py-1 text-xs font-semibold text-muted-2">{p.tag}</span>
                    ) : (
                      <span className="text-tertiary">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                        p.status === 'PUBLISHED' ? 'bg-success/10 text-success' : 'bg-surface-alt text-tertiary'
                      }`}
                    >
                      {p.status === 'PUBLISHED' ? 'Publicado' : 'Rascunho'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex justify-end gap-4">
                      <Link href={`/admin/blog/${p.id}`} className="text-xs font-bold text-ink hover:text-brand">
                        Editar
                      </Link>
                      <DeletePostButton id={p.id} title={p.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {posts.length === 0 && (
          <div className="flex flex-col items-center gap-2 px-6 py-14 text-center">
            <span className="text-3xl">📝</span>
            <p className="text-sm font-semibold text-ink">Nenhuma matéria ainda</p>
            <p className="text-sm text-tertiary">Publique o primeiro artigo do blog.</p>
          </div>
        )}
      </div>
    </div>
  );
}

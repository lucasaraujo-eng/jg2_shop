import Link from 'next/link';
import { listAdminPosts } from '@/server/actions/blog';
import { DeletePostButton } from '@/components/admin/DeletePostButton';

export default async function AdminBlogPage() {
  const posts = await listAdminPosts();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-black text-ink">Blog ({posts.length})</h1>
        <Link href="/admin/blog/novo" className="rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-dark">
          + Nova matéria
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-border-soft bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead className="border-b border-border-soft bg-surface-alt text-left text-xs uppercase text-tertiary">
              <tr>
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Tag</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-b border-border-soft last:border-0">
                  <td className="px-4 py-3 font-semibold text-ink">{p.title}</td>
                  <td className="px-4 py-3 text-muted-2">{p.tag ?? '—'}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                        p.status === 'PUBLISHED' ? 'bg-success/10 text-success' : 'bg-surface-alt text-tertiary'
                      }`}
                    >
                      {p.status === 'PUBLISHED' ? 'Publicado' : 'Rascunho'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
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
        {posts.length === 0 && <p className="p-6 text-center text-sm text-tertiary">Nenhuma matéria ainda.</p>}
      </div>
    </div>
  );
}

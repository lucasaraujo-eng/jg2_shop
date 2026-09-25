import Link from 'next/link';
import { listAdminVideos } from '@/server/actions/videos';
import { DeleteVideoButton } from '@/components/admin/DeleteVideoButton';

export default async function AdminVideosPage() {
  const videos = await listAdminVideos();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-black text-ink">Vídeos</h1>
          <p className="mt-1 text-sm text-tertiary">{videos.length} vídeos cadastrados.</p>
        </div>
        <Link
          href="/admin/videos/novo"
          className="flex flex-none items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-dark"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Novo vídeo
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border-soft bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead className="text-left text-xs font-bold uppercase tracking-wide text-tertiary">
              <tr>
                <th className="px-5 py-3">Ordem</th>
                <th className="px-5 py-3">Título</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {videos.map((v) => (
                <tr key={v.id} className="border-t border-border-soft transition hover:bg-surface-card">
                  <td className="px-5 py-3.5 font-mono text-xs text-muted-2">{v.order}</td>
                  <td className="px-5 py-3.5 font-semibold text-ink">{v.title}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                        v.active ? 'bg-success/10 text-success' : 'bg-surface-alt text-tertiary'
                      }`}
                    >
                      {v.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex justify-end gap-4">
                      <Link href={`/admin/videos/${v.id}`} className="text-xs font-bold text-ink hover:text-brand">
                        Editar
                      </Link>
                      <DeleteVideoButton id={v.id} title={v.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {videos.length === 0 && (
          <div className="flex flex-col items-center gap-2 px-6 py-14 text-center">
            <p className="text-sm font-semibold text-ink">Nenhum vídeo ainda</p>
            <p className="text-sm text-tertiary">Cadastre o primeiro vídeo do YouTube.</p>
          </div>
        )}
      </div>
    </div>
  );
}

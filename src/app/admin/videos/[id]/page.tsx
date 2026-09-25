import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAdminVideo } from '@/server/actions/videos';
import { VideoForm } from '@/components/admin/VideoForm';
import type { VideoInput } from '@/lib/validations';

export default async function EditVideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const video = await getAdminVideo(id);
  if (!video) notFound();

  const initial: VideoInput = {
    title: video.title,
    description: video.description ?? '',
    youtubeUrl: video.youtubeUrl,
    order: video.order,
    active: video.active,
  };

  return (
    <div>
      <Link href="/admin/videos" className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-2 hover:text-brand">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Vídeos
      </Link>
      <h1 className="mt-3 font-display text-2xl font-black text-ink">Editar vídeo</h1>
      <div className="mt-6 rounded-2xl border border-border-soft bg-white p-6 shadow-sm sm:p-8">
        <VideoForm videoId={video.id} initial={initial} />
      </div>
    </div>
  );
}

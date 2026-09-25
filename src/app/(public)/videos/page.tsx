import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { getActiveVideos } from '@/server/videos';
import { youtubeEmbedUrl } from '@/lib/youtube';

export const metadata: Metadata = pageMetadata('/videos');

export default async function VideosPage() {
  const videos = await getActiveVideos();

  return (
    <div>
      <section className="bg-ink-deep py-14 text-white">
        <div className="mx-auto max-w-[1340px] px-7">
          <p className="text-xs text-white/50">
            <Link href="/" className="hover:text-white">
              Home
            </Link>{' '}
            /{' '}
            <Link href="/blog" className="hover:text-white">
              Conteúdos
            </Link>{' '}
            / Vídeos
          </p>
          <p className="mt-4 inline-block rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white">Vídeos</p>
          <h1 className="mt-4 font-display text-4xl font-black">Vídeos sobre segurança e LOTO</h1>
          <p className="mt-3 max-w-xl text-white/70">
            Demonstrações, institucionais e conteúdos técnicos para entender na prática como proteger sua operação.
          </p>
        </div>
      </section>

      {videos.length === 0 ? (
        <section className="mx-auto max-w-[1340px] px-7 py-24 text-center">
          <p className="font-display text-2xl font-black leading-tight text-ink sm:text-3xl">
            Muitos conteúdos relevantes serão lançados em breve, aguarde!
          </p>
        </section>
      ) : (
        <section className="mx-auto max-w-[1340px] px-7 py-12">
          <div className="grid gap-8 sm:grid-cols-2">
            {videos.map((v) => {
              const embed = youtubeEmbedUrl(v.youtubeUrl);
              return (
                <article key={v.id} className="overflow-hidden rounded-2xl border border-border-soft bg-white shadow-sm">
                  <div className="relative aspect-video bg-ink-deep">
                    {embed ? (
                      <iframe
                        src={embed}
                        title={v.title}
                        className="absolute inset-0 h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-white/60">Link inválido</div>
                    )}
                  </div>
                  <div className="p-5">
                    <h2 className="font-display text-xl font-black text-ink">{v.title}</h2>
                    {v.description && <p className="mt-2 text-sm leading-relaxed text-tertiary">{v.description}</p>}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

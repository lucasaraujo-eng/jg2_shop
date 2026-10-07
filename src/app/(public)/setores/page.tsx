import type { Metadata } from 'next';
import Link from 'next/link';
import { getSetorArticlesForBlog } from '@/server/blog';
import { PostCard } from '@/components/blog/PostCard';

export const metadata: Metadata = {
  title: { absolute: 'Segurança industrial por setor | JG2' },
  description:
    'Matérias técnicas da JG2® sobre riscos e adequações de segurança em alimentos, papel e celulose, metalurgia, mineração e outros setores industriais.',
};

export default async function SetoresIndexPage() {
  const setorArticles = await getSetorArticlesForBlog();

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
            / Setores
          </p>
          <p className="mt-4 inline-block rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
            Áreas de atuação
          </p>
          <h1 className="mt-2 font-display text-4xl font-black">Segurança por setor industrial</h1>
          <p className="mt-3 max-w-xl text-white/70">
            Matérias técnicas sobre os riscos e as adequações JG2® em cada tipo de operação.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1340px] px-7 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {setorArticles.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

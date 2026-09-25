import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { searchSiteFull } from '@/server/actions/search';
import { pageMetadata } from '@/lib/seo';
import { resolveImageUrl } from '@/lib/utils';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  const query = (q ?? '').trim();
  if (!query) return pageMetadata('/busca');
  return {
    title: { absolute: `Busca: ${query} | JG2` },
    description: `Resultados da busca por "${query}" no catálogo e conteúdos da JG2®.`,
    robots: { index: false, follow: true },
  };
}

export default async function BuscaPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = (q ?? '').trim();
  const results =
    query.length >= 2
      ? await searchSiteFull(query)
      : { categories: [], subcategories: [], products: [], posts: [], videos: [], pages: [] };
  const total =
    results.categories.length +
    results.subcategories.length +
    results.products.length +
    results.posts.length +
    results.videos.length +
    results.pages.length;

  return (
    <div>
      <section className="bg-ink-deep py-14 text-white">
        <div className="mx-auto max-w-[1340px] px-7">
          <p className="text-xs text-white/50">
            <Link href="/" className="hover:text-white">
              Home
            </Link>{' '}
            / Busca
          </p>
          <p className="mt-4 inline-block rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white">Resultado da busca</p>
          <h1 className="mt-2 font-display text-3xl font-black sm:text-4xl">
            {query ? (
              <>
                {total} resultado{total === 1 ? '' : 's'} para &ldquo;{query}&rdquo;
              </>
            ) : (
              'O que você está procurando?'
            )}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-[1340px] px-7 py-14">
        {query.length < 2 && <p className="text-muted-2">Digite ao menos 2 caracteres na busca do menu ou do topo da página.</p>}

        {query.length >= 2 && total === 0 && (
          <p className="text-muted-2">
            Nenhum resultado para &ldquo;{query}&rdquo;. Tente outro termo ou navegue pelo{' '}
            <Link href="/produtos" className="font-semibold text-brand underline">
              catálogo completo
            </Link>
            .
          </p>
        )}

        {results.pages.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-5 font-display text-xl font-black text-ink">Páginas e serviços</h2>
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {results.pages.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="flex items-center justify-between rounded-xl border border-border-soft bg-white px-4 py-3.5 text-sm transition hover:border-brand"
                >
                  <span>
                    <span className="block font-bold text-ink">{p.title}</span>
                    <span className="font-mono text-xs text-tertiary">{p.kind}</span>
                  </span>
                  <span>→</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {results.categories.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-5 font-display text-xl font-black text-ink">Categorias</h2>
            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
              {results.categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/produtos/${c.slug}`}
                  className="flex items-center justify-between rounded-xl border border-border-soft bg-white px-4 py-3.5 text-sm font-bold text-ink transition hover:border-brand hover:text-brand"
                >
                  {c.name}
                  <span>→</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {results.subcategories.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-5 font-display text-xl font-black text-ink">Subcategorias</h2>
            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
              {results.subcategories.map((s) => (
                <Link
                  key={s.href + s.name}
                  href={s.href}
                  className="rounded-xl border border-border-soft bg-white px-4 py-3.5 transition hover:border-brand"
                >
                  <span className="block text-sm font-bold text-ink">{s.name}</span>
                  <span className="font-mono text-xs text-tertiary">{s.categoryName}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {results.products.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-5 font-display text-xl font-black text-ink">Produtos</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {results.products.map((p) => {
                const image = resolveImageUrl(p.image);
                return (
                  <Link
                    key={p.code}
                    href={`/produto/${encodeURIComponent(p.code)}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border-soft bg-white transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <span className="flex h-[160px] items-center justify-center overflow-hidden bg-white p-3">
                      {image ? (
                        <Image
                          src={image}
                          alt={p.name}
                          width={300}
                          height={300}
                          sizes="(max-width: 640px) 45vw, 220px"
                          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <span className="text-center font-mono text-xs text-code">[ foto: {p.name} ]</span>
                      )}
                    </span>
                    <span className="flex flex-1 flex-col p-3.5">
                      <span className="font-mono text-xs text-brand">{p.categoryName}</span>
                      <span className="mt-1 text-[14px] font-bold leading-snug text-ink">{p.name}</span>
                      <span className="mt-1.5 font-mono text-xs text-code">{p.code}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {results.posts.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-5 font-display text-xl font-black text-ink">Conteúdos</h2>
            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {results.posts.map((post) => (
                <Link
                  key={post.slug}
                  href={post.href}
                  className="flex items-center gap-3.5 rounded-xl border border-border-soft bg-white px-4 py-3.5 transition hover:border-brand"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold text-ink">{post.title}</span>
                    <span className="block font-mono text-xs text-tertiary">
                      {post.kind}
                      {post.tag ? ` · ${post.tag}` : ''}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {results.videos.length > 0 && (
          <div>
            <h2 className="mb-5 font-display text-xl font-black text-ink">Vídeos</h2>
            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {results.videos.map((v) => (
                <Link
                  key={v.id}
                  href={v.href}
                  className="flex items-center justify-between rounded-xl border border-border-soft bg-white px-4 py-3.5 text-sm font-bold text-ink transition hover:border-brand"
                >
                  {v.title}
                  <span>→</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

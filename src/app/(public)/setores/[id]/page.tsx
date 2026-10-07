import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setores, getSetorById, setorPageTitle } from '@/data/setores';
import { ProposalRequestButton } from '@/components/ProposalRequestButton';
import { r2Url } from '@/lib/utils';
import { getPublishedSetorPost } from '@/server/blog';
import { sanitizePostHtml } from '@/lib/sanitize';

export function generateStaticParams() {
  return setores.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const sector = getSetorById(id);
  const cms = await getPublishedSetorPost(id);
  if (!sector && !cms) return {};
  return {
    title: { absolute: cms?.title ? `${cms.title} | JG2` : `Segurança Industrial para ${sector?.name} | JG2` },
    description: cms?.excerpt || sector?.lead || `Matéria sobre segurança industrial — JG2.`,
  };
}

export default async function SetorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sector = getSetorById(id);
  const cmsPost = await getPublishedSetorPost(id);
  if (!sector && !cmsPost) notFound();

  const related = sector ? setores.filter((s) => s.id !== sector.id).slice(0, 3) : [];
  const heroImg = cmsPost?.coverUrl || (sector ? r2Url(sector.img) : null);
  const title = cmsPost?.title || (sector ? setorPageTitle(sector) : 'Setor industrial');
  const lead = cmsPost?.excerpt || sector?.lead || '';
  const sectorName = sector?.name ?? cmsPost?.title ?? 'sua operação';

  return (
    <div>
      <section className="relative overflow-hidden bg-ink-deep">
        {heroImg && <Image src={heroImg} alt="" fill sizes="100vw" priority className="object-cover opacity-30" />}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 to-black/85" />
        <div className="relative mx-auto max-w-[900px] px-7 py-16">
          <p className="text-xs text-white/60">
            <Link href="/" className="hover:text-white">
              Home
            </Link>{' '}
            /{' '}
            <Link href="/blog" className="hover:text-white">
              Conteúdos
            </Link>{' '}
            /{' '}
            <Link href="/setores" className="hover:text-white">
              Setores
            </Link>
          </p>
          <span className="mt-4 inline-block rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
            Setor industrial
          </span>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-black leading-tight text-white sm:text-5xl">
            {title}
          </h1>
          {lead && <p className="mt-3 max-w-xl text-lg leading-relaxed text-white/85">{lead}</p>}
        </div>
      </section>

      {cmsPost ? (
        <article className="mx-auto max-w-[820px] px-7 py-12">
          {cmsPost.coverUrl && (
            <div className="group relative mb-10 h-[380px] w-full overflow-hidden rounded-2xl shadow-lg">
              <Image src={cmsPost.coverUrl} alt={cmsPost.title} fill sizes="820px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
          )}
          <div
            className="prose prose-neutral max-w-none text-[17px] leading-[1.7] text-muted-3 [&_a]:text-brand [&_a]:underline [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-ink [&_li]:my-1 [&_p]:my-4"
            dangerouslySetInnerHTML={{ __html: sanitizePostHtml(cmsPost.content) }}
          />
          <div className="mt-12 rounded-2xl bg-ink-deep p-10 text-center text-white">
            <h3 className="mb-2.5 font-display text-2xl font-black">Quer adequar sua operação em {sectorName}?</h3>
            <p className="mb-6 leading-relaxed text-white/75">
              Fale com a equipe técnica da JG2 e receba um diagnóstico das três frentes para a sua planta.
            </p>
            <ProposalRequestButton objective="Outro assunto" className="inline-block rounded-full bg-brand px-7 py-3.5 font-bold text-white transition hover:bg-brand-light">
              Solicitar avaliação técnica →
            </ProposalRequestButton>
          </div>
        </article>
      ) : (
        <article className="mx-auto max-w-[820px] px-7 py-12">
          <div className="group relative mb-10 h-[380px] w-full overflow-hidden rounded-2xl shadow-lg">
            <Image src={r2Url(sector!.img)} alt={sector!.name} fill sizes="820px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>

          <h2 className="font-display text-2xl font-black text-ink">O setor</h2>
          <div className="mt-4 mb-11 flex flex-col gap-5">
            {sector!.intro.map((p, i) => (
              <p key={i} className="text-[17px] leading-relaxed text-muted-3">
                {p}
              </p>
            ))}
          </div>

          <h2 className="font-display text-2xl font-black text-ink">Como a indústria opera — e onde estão os riscos</h2>
          <div className="mt-4 mb-6 flex flex-col gap-5">
            {sector!.comoAtua.map((p, i) => (
              <p key={i} className="text-[17px] leading-relaxed text-muted-3">
                {p}
              </p>
            ))}
          </div>
          <div className="mb-12 rounded-2xl bg-surface-alt p-7">
            <p className="mb-3.5 text-xs font-bold uppercase tracking-wide text-brand">Principais riscos do setor</p>
            <div className="flex flex-col gap-2.5">
              {sector!.riscos.map((r) => (
                <div key={r} className="flex items-start gap-3">
                  <span className="flex-none font-black text-brand">→</span>
                  <span className="text-[15.5px] leading-snug text-muted-3">{r}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-ink-deep p-10 text-center text-white">
            <h3 className="mb-2.5 font-display text-2xl font-black">Quer adequar sua operação em {sector!.name}?</h3>
            <p className="mb-6 leading-relaxed text-white/75">
              Fale com a equipe técnica da JG2 e receba um diagnóstico das três frentes para a sua planta.
            </p>
            <ProposalRequestButton objective="Outro assunto" className="inline-block rounded-full bg-brand px-7 py-3.5 font-bold text-white transition hover:bg-brand-light">
              Solicitar avaliação técnica →
            </ProposalRequestButton>
          </div>
        </article>
      )}

      {related.length > 0 && (
        <section className="mx-auto max-w-[1340px] px-7 pb-20">
          <h2 className="mb-6 font-display text-2xl font-black text-ink">Outros setores que atendemos</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/setores/${r.id}`}
                className="group relative flex h-[200px] items-end overflow-hidden rounded-2xl transition hover:-translate-y-1 hover:shadow-xl"
              >
                <Image src={r2Url(r.img)} alt="" fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <span className="relative p-4 text-base font-bold text-white [text-shadow:0_1px_6px_rgba(0,0,0,.4)]">{r.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

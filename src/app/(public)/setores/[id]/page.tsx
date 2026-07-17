import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setores, getSetorById } from '@/data/setores';
import { ProposalRequestButton } from '@/components/ProposalRequestButton';
import { r2Url } from '@/lib/utils';

export function generateStaticParams() {
  return setores.map((s) => ({ id: s.id }));
}

export default async function SetorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sector = getSetorById(id);
  if (!sector) notFound();

  const related = setores.filter((s) => s.id !== sector.id).slice(0, 3);

  return (
    <div>
      <section className="relative overflow-hidden bg-ink-deep">
        <Image src={r2Url(sector.img)} alt="" fill sizes="100vw" priority className="object-cover opacity-30" />
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
            / <span className="text-white">Setores</span>
          </p>
          <span className="mt-4 inline-block rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
            Setor industrial
          </span>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-black leading-tight text-white sm:text-5xl">
            Segurança e adequação para {sector.name}
          </h1>
          <p className="mt-3 max-w-xl text-lg leading-relaxed text-white/85">{sector.lead}</p>
        </div>
      </section>

      <article className="mx-auto max-w-[820px] px-7 py-12">
        <div className="group relative mb-10 h-[380px] w-full overflow-hidden rounded-2xl shadow-lg">
          <Image src={r2Url(sector.img)} alt={sector.name} fill sizes="820px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>

        <h2 className="font-display text-2xl font-black text-ink">O setor</h2>
        <div className="mt-4 mb-11 flex flex-col gap-5">
          {sector.intro.map((p, i) => (
            <p key={i} className="text-[17px] leading-relaxed text-muted-3">
              {p}
            </p>
          ))}
        </div>

        <h2 className="font-display text-2xl font-black text-ink">Como a indústria opera — e onde estão os riscos</h2>
        <div className="mt-4 mb-6 flex flex-col gap-5">
          {sector.comoAtua.map((p, i) => (
            <p key={i} className="text-[17px] leading-relaxed text-muted-3">
              {p}
            </p>
          ))}
        </div>
        <div className="mb-12 rounded-2xl bg-surface-alt p-7">
          <p className="mb-3.5 text-xs font-bold uppercase tracking-wide text-brand">Principais riscos do setor</p>
          <div className="flex flex-col gap-2.5">
            {sector.riscos.map((r) => (
              <div key={r} className="flex items-start gap-3">
                <span className="flex-none font-black text-brand">→</span>
                <span className="text-[15.5px] leading-snug text-muted-3">{r}</span>
              </div>
            ))}
          </div>
        </div>

        <h2 className="mb-2 font-display text-2xl font-black text-ink">A importância das adequações para {sector.name}</h2>
        <p className="mb-8 leading-relaxed text-muted-2">
          Três frentes de atuação da JG2 reduzem diretamente a exposição das equipes nesse setor — do controle de
          energia à proteção das mãos e à conformidade das máquinas.
        </p>

        <div className="group mb-5.5 overflow-hidden rounded-2xl border border-border-soft">
          <div className="relative h-[200px] w-full">
            <Image src={r2Url('/uploads/banner-lototo.jpg')} alt="" fill sizes="820px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div className="p-7">
            <span className="mb-3 inline-block rounded-full bg-surface-badge px-3 py-1.5 text-xs font-bold text-brand">
              Bloqueio e Etiquetagem (LOTO)
            </span>
            <p className="mb-4 leading-relaxed text-muted-3">
              Em {sector.name}, cada manutenção, limpeza ou desobstrução exige que a máquina esteja comprovadamente
              isolada de todas as suas fontes de energia. Os dispositivos e a consultoria LOTO da JG2® padronizam o
              bloqueio por equipamento, eliminando a partida acidental durante a intervenção.
            </p>
            <ProposalRequestButton objective="Adequação LOTOTO" className="inline-block rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-dark">
              Falar sobre LOTO →
            </ProposalRequestButton>
          </div>
        </div>

        <div className="group mb-5.5 overflow-hidden rounded-2xl border border-border-soft">
          <div className="relative h-[200px] w-full">
            <Image src={r2Url('/uploads/banner-maos.png')} alt="" fill sizes="820px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div className="p-7">
            <span className="mb-3 inline-block rounded-full px-3 py-1.5 text-xs font-bold text-maos" style={{ background: '#fdf0d8' }}>
              Mãos Seguras
            </span>
            <p className="mb-4 leading-relaxed text-muted-3">
              As mãos são a parte do corpo mais exposta nas operações desse setor. Os dispositivos Mãos Seguras
              afastam o operador da zona de perigo durante alimentação, ajuste e limpeza — reduzindo cortes,
              esmagamentos e amputações sem comprometer a produtividade.
            </p>
            <ProposalRequestButton objective="Adequação Mãos Seguras" className="inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand">
              Falar sobre Mãos Seguras →
            </ProposalRequestButton>
          </div>
        </div>

        <div className="group mb-12 overflow-hidden rounded-2xl border border-border-soft">
          <div className="relative h-[200px] w-full">
            <Image src={r2Url('/uploads/banner-nr12.jpg')} alt="" fill sizes="820px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div className="p-7">
            <span className="mb-3 inline-block rounded-full px-3 py-1.5 text-xs font-bold text-nr12" style={{ background: '#e9f3ec' }}>
              Adequação à NR-12
            </span>
            <p className="mb-4 leading-relaxed text-muted-3">
              A NR-12 exige que as máquinas de {sector.name} tenham proteções, dispositivos de segurança e
              documentação adequados. A JG2® conduz a apreciação de riscos, o projeto e a fabricação das proteções e o
              laudo técnico com ART — colocando o parque fabril em conformidade e reduzindo passivos.
            </p>
            <ProposalRequestButton objective="Adequação NR-12" className="inline-block rounded-full bg-nr12 px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90">
              Falar sobre NR-12 →
            </ProposalRequestButton>
          </div>
        </div>

        <div className="rounded-2xl bg-ink-deep p-10 text-center text-white">
          <h3 className="mb-2.5 font-display text-2xl font-black">Quer adequar sua operação em {sector.name}?</h3>
          <p className="mb-6 leading-relaxed text-white/75">
            Fale com a equipe técnica da JG2 e receba um diagnóstico das três frentes para a sua planta.
          </p>
          <ProposalRequestButton objective="Outro assunto" className="inline-block rounded-full bg-brand px-7 py-3.5 font-bold text-white transition hover:bg-brand-light">
            Solicitar avaliação técnica →
          </ProposalRequestButton>
        </div>
      </article>

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

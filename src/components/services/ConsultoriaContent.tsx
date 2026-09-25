import Image from 'next/image';
import Link from 'next/link';
import { FaqAccordion } from '@/components/FaqAccordion';
import { ScrollCarousel } from '@/components/ScrollCarousel';
import { ProposalRequestButton } from '@/components/ProposalRequestButton';
import { r2Url } from '@/lib/utils';
import type { ConsultoriaData } from '@/data/consultorias';
import { SupportArticle } from '@/components/SupportArticle';
import { getPageSeo } from '@/lib/seo';

const WHATSAPP_URL = 'https://wa.me/5531996690692';

const OBJECTIVE_BY_SLUG: Record<ConsultoriaData['slug'], string> = {
  lototo: 'Adequação LOTOTO',
  nr12: 'Adequação NR-12',
  'maos-seguras': 'Adequação Mãos Seguras',
};

type Accent = {
  pill: string;
  pillText: string;
  btn: string;
  btnHover: string;
  border: string;
  hoverBorder: string;
  check: string;
  checkHover: string;
  stepTop: string;
  stepNum: string;
  stageChip: string;
  ctaBg: string;
  normHover: string;
  gainHover: string;
};

const ACCENT: Record<ConsultoriaData['slug'], Accent> = {
  lototo: {
    pill: 'bg-brand',
    pillText: 'text-white',
    btn: 'bg-brand text-white',
    btnHover: 'hover:bg-brand-light',
    border: 'border-brand',
    hoverBorder: 'hover:border-brand',
    check: 'border-brand text-brand',
    checkHover: 'group-hover:bg-brand group-hover:text-white',
    stepTop: 'border-t-brand',
    stepNum: 'text-brand',
    stageChip: 'bg-brand text-white hover:bg-ink',
    ctaBg: 'bg-brand',
    normHover: 'hover:border-brand hover:bg-brand hover:text-white',
    gainHover: 'group-hover:text-brand',
  },
  nr12: {
    pill: 'bg-[#C9A227]',
    pillText: 'text-ink',
    btn: 'bg-[#C9A227] text-ink',
    btnHover: 'hover:bg-[#b8921f]',
    border: 'border-[#C9A227]',
    hoverBorder: 'hover:border-[#C9A227]',
    check: 'border-[#C9A227] text-[#C9A227]',
    checkHover: 'group-hover:bg-[#C9A227] group-hover:text-ink',
    stepTop: 'border-t-[#C9A227]',
    stepNum: 'text-[#C9A227]',
    stageChip: 'bg-[#C9A227] text-ink hover:bg-ink hover:text-white',
    ctaBg: 'bg-[#C9A227]',
    normHover: 'hover:border-[#C9A227] hover:bg-[#C9A227] hover:text-ink',
    gainHover: 'group-hover:text-[#C9A227]',
  },
  'maos-seguras': {
    pill: 'bg-[#0B3D5C]',
    pillText: 'text-white',
    btn: 'bg-[#0B3D5C] text-white',
    btnHover: 'hover:bg-[#0a334d]',
    border: 'border-[#0B3D5C]',
    hoverBorder: 'hover:border-[#0B3D5C]',
    check: 'border-[#0B3D5C] text-[#0B3D5C]',
    checkHover: 'group-hover:bg-[#0B3D5C] group-hover:text-white',
    stepTop: 'border-t-[#0B3D5C]',
    stepNum: 'text-[#0B3D5C]',
    stageChip: 'bg-[#0B3D5C] text-white hover:bg-ink',
    ctaBg: 'bg-[#0B3D5C]',
    normHover: 'hover:border-[#0B3D5C] hover:bg-[#0B3D5C] hover:text-white',
    gainHover: 'group-hover:text-[#0B3D5C]',
  },
};

function mediaSrc(path: string) {
  return path.startsWith('/assets/') ? path : r2Url(path);
}

export function ConsultoriaContent({ data }: { data: ConsultoriaData }) {
  const objective = OBJECTIVE_BY_SLUG[data.slug];
  const support = getPageSeo(`/servicos/${data.slug}`)?.support;
  const accent = ACCENT[data.slug];
  const catalogHref = data.catalogHref ?? '/produtos';
  const actionBanner = data.actionBannerImg ?? '/uploads/loto/banner-equipe-bg.jpg';
  const longNorms = data.norms.length > 12;

  return (
    <div>
      <section className="relative overflow-hidden bg-ink-deeper py-14 text-white">
        <Image src={mediaSrc(data.heroImg)} alt="" fill sizes="100vw" priority className="object-cover object-right" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-deeper via-ink-deeper/90 to-ink-deeper/10" />
        <div className="relative mx-auto max-w-[1440px] px-7">
          <p className="text-xs text-white/60">
            <Link href="/" className="hover:text-white">
              Home
            </Link>{' '}
            / Serviços / <span className="text-white/80">{data.pill}</span>
          </p>
          <h1 className="mt-4 max-w-xl font-display text-4xl font-black leading-tight sm:text-5xl">{data.heroH1}</h1>
          <p className="mt-3 max-w-md text-white/80">{data.subtitle}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ProposalRequestButton
              objective={objective}
              className={`rounded-full px-6 py-3 font-bold transition ${accent.btn} ${accent.btnHover}`}
            >
              {data.heroBtn}
            </ProposalRequestButton>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/40 px-6 py-3 font-bold text-white transition hover:bg-white/10"
            >
              Falar com especialista
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1340px] px-7 py-14">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className={`inline-block rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide ${accent.pill} ${accent.pillText}`}>
              O problema
            </p>
            <h2 className="mt-2 font-display text-3xl font-black leading-tight text-ink">{data.problemTitle}</h2>
            <div className="mt-4 flex flex-col gap-3.5">
              {data.problemParas.map((p, i) => (
                <p key={i} className="leading-relaxed text-muted-2">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div className="group relative h-[460px] w-full overflow-hidden rounded-2xl bg-white">
            <Image
              src={mediaSrc(data.problemImg)}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`transition-transform duration-500 group-hover:scale-105 ${data.problemFit === 'contain' ? 'object-contain p-2' : 'object-cover'} ${data.problemPosition === 'top' ? 'object-top' : ''}`}
            />
          </div>
        </div>
      </section>

      <section className="bg-surface-alt py-14">
        <div className="mx-auto max-w-[1340px] px-7">
          <h2 className="font-display text-2xl font-black text-ink sm:text-3xl">{data.gainsTitle}</h2>
          <div className="mt-7 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {data.gains.map((g) => (
              <div key={g} className="group flex items-start gap-3.5 border-t border-border-strong py-3.5">
                <span
                  className={`flex h-6 w-6 flex-none items-center justify-center rounded-full border-2 text-xs font-black transition ${accent.check} ${accent.checkHover}`}
                >
                  ✓
                </span>
                <span className={`inline-block font-semibold text-muted-3 transition duration-300 group-hover:translate-x-1.5 ${accent.gainHover}`}>
                  {g}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1340px] px-7 py-14">
        <div className="relative min-h-[400px] overflow-hidden rounded-3xl bg-black p-9 sm:p-12">
          <Image src={mediaSrc(actionBanner)} alt="" fill sizes="100vw" className="object-cover object-right" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />
          <div className="relative max-w-xl">
            <h2 className="font-display text-2xl font-black leading-tight text-white sm:text-3xl">{data.stagesTitle}</h2>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {data.stages.map((s) => (
                <span key={s} className={`inline-block rounded-full px-4 py-2.5 text-sm font-bold transition hover:-translate-y-1 ${accent.stageChip}`}>
                  {s}
                </span>
              ))}
            </div>
            <ProposalRequestButton
              objective={objective}
              className={`mt-7 inline-flex items-center gap-3 rounded-full px-6 py-3 font-bold transition hover:gap-4 ${accent.btn} ${accent.btnHover}`}
            >
              <span className="text-xl">→</span> Falar com a JG2®
            </ProposalRequestButton>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1340px] px-7 py-14">
        <p className={`inline-block rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide ${accent.pill} ${accent.pillText}`}>
          Passo a passo
        </p>
        <h2 className="mt-2 font-display text-3xl font-black text-ink">{data.howTitle}</h2>
        <div className="jg-card-grid mt-8 grid gap-5 sm:grid-cols-2">
          {data.steps.map((step) => (
            <div
              key={step.n}
              className={`rounded-2xl border border-border-soft border-t-[3px] bg-white p-7 transition hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl ${accent.stepTop} ${accent.hoverBorder}`}
            >
              <span className={`font-mono text-xl font-bold ${accent.stepNum}`}>{step.n}</span>
              <h3 className="mt-2.5 text-lg font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-tertiary">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface-alt py-14">
        <div className="mx-auto max-w-[1340px] px-7">
          <p className={`inline-block rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide ${accent.pill} ${accent.pillText}`}>
            Entregáveis
          </p>
          <h2 className="mt-2 font-display text-3xl font-black text-ink">{data.showcaseTitle}</h2>
          <p className="mt-2 max-w-xl text-muted-2">{data.showcaseText}</p>
          <div className="mt-8">
            <ScrollCarousel autoPlay speed={35}>
              {data.showcase.map((item) => (
                <div
                  key={item.title}
                  className="group flex w-[412px] flex-none flex-col overflow-hidden rounded-2xl border border-border-soft bg-white transition duration-300 hover:z-10 hover:scale-105 hover:shadow-xl"
                >
                  <Image
                    src={mediaSrc(item.img)}
                    alt=""
                    width={412}
                    height={240}
                    className={`h-[240px] w-full border-b border-border-soft bg-white transition-transform duration-500 group-hover:scale-105 ${item.fit === 'contain' ? 'object-contain p-6' : 'object-cover'} ${item.position === 'top' ? 'object-top' : ''}`}
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-bold leading-snug text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-tertiary">{item.desc}</p>
                  </div>
                </div>
              ))}
            </ScrollCarousel>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1340px] px-7 py-14">
        <div className="rounded-2xl border border-border-soft bg-surface-card p-9">
          <h3 className="font-display text-lg font-black text-ink">{data.normsTitle}</h3>
          {longNorms ? (
            <ol className="mt-5 grid list-decimal gap-2 pl-5 text-sm leading-relaxed text-muted-2 sm:grid-cols-2">
              {data.norms.map((n) => (
                <li key={n} className="pl-1">
                  {n}
                </li>
              ))}
            </ol>
          ) : (
            <div className="mt-5 flex flex-wrap gap-2.5">
              {data.norms.map((n) => (
                <span
                  key={n}
                  className={`inline-block rounded-lg border border-border bg-white px-4 py-2.5 font-mono text-sm font-bold text-muted-2 transition hover:-translate-y-1 ${accent.normHover}`}
                >
                  {n}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-[1340px] px-7 py-14">
        <h2 className="font-display text-3xl font-black text-ink">{data.diffTitle}</h2>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {data.diffs.map((d) => (
            <div
              key={d.title}
              className={`rounded-2xl border border-border-soft p-6 transition hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg ${accent.hoverBorder}`}
            >
              <h3 className="font-bold leading-snug text-ink">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-tertiary">{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      {data.software && (
        <section id="software" className="mx-auto max-w-[1340px] scroll-mt-[160px] px-7 py-14">
          <div className="relative grid gap-11 overflow-hidden rounded-3xl bg-ink-deep p-9 sm:p-12 lg:grid-cols-2 lg:items-center">
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,rgba(181,32,43,.35),transparent_70%)]" />
            <div className="relative">
              <p className={`inline-block rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide ${accent.pill} ${accent.pillText}`}>
                Software de gestão
              </p>
              <h2 className="mt-2 font-display text-2xl font-black leading-tight text-white sm:text-3xl">{data.software.title}</h2>
              <p className="mt-4 leading-relaxed text-white/80">{data.software.text}</p>
              <ProposalRequestButton
                objective={objective}
                className={`mt-6 inline-block rounded-full px-6 py-3 font-bold transition ${accent.btn} ${accent.btnHover}`}
              >
                {data.software.cta}
              </ProposalRequestButton>
            </div>
            <div className="relative flex min-h-[200px] items-center justify-center rounded-2xl bg-white p-9">
              <Image src={mediaSrc(data.software.img)} alt={data.software.title} width={500} height={300} className="max-h-full w-full object-contain" />
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-[900px] px-7 py-14">
        <p className={`inline-block rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide ${accent.pill} ${accent.pillText}`}>
          Tire suas dúvidas
        </p>
        <h2 className="mt-2 font-display text-3xl font-black text-ink">Perguntas frequentes</h2>
        <div className="mt-7">
          <FaqAccordion items={data.faqs} />
        </div>
      </section>

      <section className="mx-auto max-w-[1340px] px-7 pb-16">
        <div className={`relative overflow-hidden rounded-3xl p-9 text-center sm:p-14 ${accent.ctaBg}`}>
          <div className="absolute -bottom-16 -left-10 h-60 w-60 rounded-full bg-white/6" />
          <h2
            className={`relative mx-auto max-w-2xl font-display text-2xl font-black sm:text-3xl ${data.slug === 'nr12' ? 'text-ink' : 'text-white'}`}
          >
            {data.ctaTitle}
          </h2>
          <p className={`relative mx-auto mt-3 max-w-xl ${data.slug === 'nr12' ? 'text-ink/80' : 'text-white/85'}`}>{data.ctaText}</p>
          <div className="relative mt-7 flex flex-wrap justify-center gap-3">
            <ProposalRequestButton
              objective={objective}
              className={`rounded-full bg-white px-7 py-3.5 font-extrabold transition hover:bg-ink-deep hover:text-white ${data.slug === 'nr12' ? 'text-ink' : 'text-brand'}`}
            >
              Solicitar avaliação técnica →
            </ProposalRequestButton>
            {catalogHref.startsWith('http') ? (
              <a
                href={catalogHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-ink-deep px-7 py-3.5 font-bold text-white transition hover:bg-black"
              >
                Ver catálogo
              </a>
            ) : (
              <Link href={catalogHref} className="rounded-full bg-ink-deep px-7 py-3.5 font-bold text-white transition hover:bg-black">
                Ver catálogo
              </Link>
            )}
          </div>
        </div>
      </section>

      {support && <SupportArticle data={support} />}
    </div>
  );
}

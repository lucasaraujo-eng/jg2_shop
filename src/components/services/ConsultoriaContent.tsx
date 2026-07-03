import Link from 'next/link';
import { FaqAccordion } from '@/components/FaqAccordion';
import type { ConsultoriaData } from '@/data/consultorias';

export function ConsultoriaContent({ data }: { data: ConsultoriaData }) {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-deeper py-14 text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={data.heroImg} alt="" className="absolute inset-0 h-full w-full object-cover object-right" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-deeper via-ink-deeper/90 to-ink-deeper/10" />
        <div className="relative mx-auto max-w-[1440px] px-7">
          <p className="text-xs text-white/60">
            <Link href="/" className="hover:text-white">
              Home
            </Link>{' '}
            /{' '}
            <Link href="/servicos" className="hover:text-white">
              Serviços
            </Link>{' '}
            / <span className="text-white/80">{data.pill}</span>
          </p>
          <h1 className="mt-4 max-w-xl font-display text-4xl font-black leading-tight sm:text-5xl">{data.heroH1}</h1>
          <p className="mt-3 max-w-md text-white/80">{data.subtitle}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/contato" className="rounded-full bg-brand px-6 py-3 font-bold text-white transition hover:bg-brand-light">
              {data.heroBtn}
            </Link>
            <Link href="/contato" className="rounded-full border border-white/40 px-6 py-3 font-bold text-white transition hover:bg-white/10">
              Falar com especialista
            </Link>
          </div>
        </div>
      </section>

      {/* O problema */}
      <section className="mx-auto max-w-[1340px] px-7 py-14">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-brand">O problema</p>
            <h2 className="mt-2 font-display text-3xl font-black leading-tight text-ink">{data.problemTitle}</h2>
            <div className="mt-4 flex flex-col gap-3.5">
              {data.problemParas.map((p, i) => (
                <p key={i} className="leading-relaxed text-muted-2">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div className="group h-[340px] w-full overflow-hidden rounded-2xl bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.problemImg}
              alt=""
              className={`h-full w-full transition-transform duration-500 group-hover:scale-105 ${data.problemFit === 'contain' ? 'object-contain p-6' : 'object-cover'} ${data.problemPosition === 'top' ? 'object-top' : ''}`}
            />
          </div>
        </div>
      </section>

      {/* Ganhos */}
      <section className="bg-surface-alt py-14">
        <div className="mx-auto max-w-[1340px] px-7">
          <h2 className="font-display text-2xl font-black text-ink sm:text-3xl">{data.gainsTitle}</h2>
          <div className="mt-7 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {data.gains.map((g) => (
              <div key={g} className="flex items-start gap-3.5 border-t border-border-strong py-3.5">
                <span className="flex-none font-black text-brand">→</span>
                <span className="font-semibold text-muted-3">{g}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Etapas */}
      <section className="mx-auto max-w-[1340px] px-7 py-14">
        <div className="relative min-h-[400px] overflow-hidden rounded-3xl bg-black p-9 sm:p-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/uploads/loto/banner-equipe-bg.jpg" alt="" className="absolute inset-0 h-full w-full object-cover object-right" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black/0" />
          <div className="relative max-w-xl">
            <h2 className="font-display text-2xl font-black leading-tight text-white sm:text-3xl">{data.stagesTitle}</h2>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {data.stages.map((s) => (
                <span key={s} className="rounded-full bg-brand px-4 py-2.5 text-sm font-bold text-white">
                  {s}
                </span>
              ))}
            </div>
            <Link href="/contato" className="mt-7 inline-flex items-center gap-3 font-bold text-white transition hover:gap-4">
              <span className="text-xl">→</span> Falar com a JG2
            </Link>
          </div>
        </div>
      </section>

      {/* Passo a passo */}
      <section className="mx-auto max-w-[1340px] px-7 py-14">
        <p className="font-mono text-xs uppercase tracking-widest text-brand">Passo a passo</p>
        <h2 className="mt-2 font-display text-3xl font-black text-ink">{data.howTitle}</h2>
        <div className="jg-card-grid mt-8 grid gap-5 sm:grid-cols-2">
          {data.steps.map((step) => (
            <div key={step.n} className="rounded-2xl border border-border-soft border-t-[3px] border-t-brand bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl">
              <span className="font-mono text-xl font-bold text-brand">{step.n}</span>
              <h3 className="mt-2.5 text-lg font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-tertiary">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Entregáveis */}
      <section className="bg-surface-alt py-14">
        <div className="mx-auto max-w-[1340px] px-7">
          <p className="font-mono text-xs uppercase tracking-widest text-brand">Entregáveis</p>
          <h2 className="mt-2 font-display text-3xl font-black text-ink">{data.showcaseTitle}</h2>
          <p className="mt-2 max-w-xl text-muted-2">{data.showcaseText}</p>
          <div
            className="mt-8 overflow-hidden"
            style={{ WebkitMaskImage: 'linear-gradient(90deg, transparent 0, #000 3%, #000 97%, transparent 100%)', maskImage: 'linear-gradient(90deg, transparent 0, #000 3%, #000 97%, transparent 100%)' }}
          >
            <div className="flex w-max gap-6 hover:[animation-play-state:paused]" style={{ animation: 'jg-marquee 48s linear infinite' }}>
              {[...data.showcase, ...data.showcase].map((item, i) => (
                <div key={`${item.title}-${i}`} className="group flex w-[412px] flex-none flex-col overflow-hidden rounded-2xl border border-border-soft bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.img}
                    alt=""
                    className={`h-[240px] w-full border-b border-border-soft bg-white transition-transform duration-500 group-hover:scale-105 ${item.fit === 'contain' ? 'object-contain p-6' : 'object-cover'} ${item.position === 'top' ? 'object-top' : ''}`}
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-bold leading-snug text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-tertiary">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Normas */}
      <section className="mx-auto max-w-[1340px] px-7 py-14">
        <div className="flex flex-wrap items-center gap-8 rounded-2xl border border-border-soft bg-surface-card p-9">
          <h3 className="max-w-[280px] flex-none font-display text-lg font-black text-ink">{data.normsTitle}</h3>
          <div className="ml-auto flex flex-wrap gap-2.5">
            {data.norms.map((n) => (
              <span key={n} className="rounded-lg border border-border bg-white px-4 py-2.5 font-mono text-sm font-bold text-muted-2">
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="mx-auto max-w-[1340px] px-7 py-14">
        <h2 className="font-display text-3xl font-black text-ink">{data.diffTitle}</h2>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {data.diffs.map((d) => (
            <div key={d.title} className="rounded-2xl border border-border-soft p-6">
              <h3 className="font-bold leading-snug text-ink">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-tertiary">{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Software JG2 Smart Loto — só na consultoria LOTO */}
      {data.software && (
        <section id="software" className="mx-auto max-w-[1340px] scroll-mt-[140px] px-7 py-14">
          <div className="relative grid gap-11 overflow-hidden rounded-3xl bg-ink-deep p-9 sm:p-12 lg:grid-cols-2 lg:items-center">
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,rgba(181,32,43,.35),transparent_70%)]" />
            <div className="relative">
              <p className="font-mono text-xs uppercase tracking-widest text-brand-soft">Software de gestão</p>
              <h2 className="mt-2 font-display text-2xl font-black leading-tight text-white sm:text-3xl">{data.software.title}</h2>
              <p className="mt-4 leading-relaxed text-white/80">{data.software.text}</p>
              <Link href="/contato" className="mt-6 inline-block rounded-full bg-brand px-6 py-3 font-bold text-white transition hover:bg-brand-light">
                {data.software.cta}
              </Link>
            </div>
            <div className="relative flex min-h-[200px] items-center justify-center rounded-2xl bg-white p-9">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.software.img} alt={data.software.title} className="max-h-full w-full object-contain" />
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="mx-auto max-w-[900px] px-7 py-14">
        <p className="font-mono text-xs uppercase tracking-widest text-brand">Tire suas dúvidas</p>
        <h2 className="mt-2 font-display text-3xl font-black text-ink">Perguntas frequentes</h2>
        <div className="mt-7">
          <FaqAccordion items={data.faqs} />
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-[1340px] px-7 pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-brand p-9 text-center sm:p-14">
          <div className="absolute -bottom-16 -left-10 h-60 w-60 rounded-full bg-white/6" />
          <h2 className="relative mx-auto max-w-2xl font-display text-2xl font-black text-white sm:text-3xl">{data.ctaTitle}</h2>
          <p className="relative mx-auto mt-3 max-w-xl text-white/85">{data.ctaText}</p>
          <div className="relative mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/contato" className="rounded-full bg-white px-7 py-3.5 font-extrabold text-brand transition hover:bg-ink-deep hover:text-white">
              Solicitar avaliação técnica →
            </Link>
            <Link href="/produtos" className="rounded-full bg-ink-deep px-7 py-3.5 font-bold text-white transition hover:bg-black">
              Ver catálogo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

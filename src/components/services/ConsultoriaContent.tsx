import Link from 'next/link';
import { FaqAccordion } from '@/components/FaqAccordion';
import type { ConsultoriaData } from '@/data/consultorias';

const STRIPE_BG = {
  backgroundImage:
    'repeating-linear-gradient(135deg, var(--color-surface-stripe-a) 0 14px, var(--color-surface-stripe-b) 14px 28px)',
};

export function ConsultoriaContent({ data }: { data: ConsultoriaData }) {
  return (
    <div>
      {/* Hero */}
      <section className="bg-ink-deeper py-14 text-white">
        <div className="mx-auto max-w-[1340px] px-7">
          <p className="text-xs text-white/50">
            <Link href="/" className="hover:text-white">
              Home
            </Link>{' '}
            /{' '}
            <Link href="/servicos" className="hover:text-white">
              Serviços
            </Link>{' '}
            / <span className="text-white/70">{data.pill}</span>
          </p>
          <span className="mt-4 inline-block rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide">
            {data.pill}
          </span>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-black leading-tight sm:text-5xl">{data.heroH1}</h1>
          <p className="mt-3 max-w-xl text-white/70">{data.subtitle}</p>
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
          <div className="h-[340px] rounded-2xl" style={STRIPE_BG} />
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
        <div className="overflow-hidden rounded-3xl bg-ink-deep p-9 sm:p-12" style={STRIPE_BG}>
          <div className="max-w-xl rounded-2xl bg-ink-deep/90 p-6 backdrop-blur-sm sm:p-0 sm:backdrop-blur-none sm:bg-transparent">
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
          <div className="jg-noscroll mt-8 flex gap-6 overflow-x-auto pb-1">
            {data.showcase.map((item) => (
              <div key={item.title} className="w-[340px] flex-none overflow-hidden rounded-2xl border border-border-soft bg-white">
                <div className="h-[180px] border-b border-border-soft" style={STRIPE_BG} />
                <div className="p-6">
                  <h3 className="text-lg font-bold leading-snug text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tertiary">{item.desc}</p>
                </div>
              </div>
            ))}
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
        <section className="mx-auto max-w-[1340px] px-7 py-14">
          <div className="grid gap-11 overflow-hidden rounded-3xl bg-ink-deep p-9 sm:p-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-brand-soft">Software de gestão</p>
              <h2 className="mt-2 font-display text-2xl font-black leading-tight text-white sm:text-3xl">{data.software.title}</h2>
              <p className="mt-4 leading-relaxed text-white/80">{data.software.text}</p>
              <Link href="/contato" className="mt-6 inline-block rounded-full bg-brand px-6 py-3 font-bold text-white transition hover:bg-brand-light">
                {data.software.cta}
              </Link>
            </div>
            <div className="h-[200px] rounded-2xl bg-white/5" style={STRIPE_BG} />
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

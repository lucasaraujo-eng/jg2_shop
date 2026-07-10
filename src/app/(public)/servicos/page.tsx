import Link from 'next/link';
import { ProposalRequestButton } from '@/components/ProposalRequestButton';

const STRIPE_BG = {
  backgroundImage:
    'repeating-linear-gradient(135deg, var(--color-surface-stripe-a) 0 14px, var(--color-surface-stripe-b) 14px 28px)',
};

const SERVICES = [
  {
    n: '01',
    title: 'Bloqueio, Etiquetagem e Teste (LOTOTO)',
    text: 'Programa completo para identificar, isolar e controlar todas as fontes de energia perigosa — eliminando o improviso e protegendo quem opera e mantém suas máquinas.',
    tags: ['Levantamentos técnicos', 'Matriz de bloqueio', 'Procedimentos por máquina', 'Treinamentos e auditorias'],
    href: '/servicos/lototo',
  },
  {
    n: '02',
    title: 'Adequação à NR-12',
    text: 'Implementamos a NR-12 com excelência técnica — reduzindo passivos, evitando paradas e protegendo seus operadores com soluções validadas por engenharia.',
    tags: ['Inventário de máquinas', 'Apreciação de riscos', 'Projetos e validação (ART)'],
    href: '/servicos/nr12',
  },
  {
    n: '03',
    title: 'Mãos Seguras',
    text: 'Fortalecemos a cultura de segurança com dispositivos personalizados e treinamentos — menos acidentes, mais produtividade e engajamento das equipes.',
    tags: ['Dispositivos sob medida', 'Catálogo amplo', 'Treinamentos práticos'],
    href: '/servicos/maos-seguras',
  },
  {
    n: '04',
    title: 'Cabines e Salas em Aço',
    text: 'Fabricação sob medida para ampliar setores com segurança, robustez e agilidade — projeto, instalação e validação em conformidade com a NR-1.',
    tags: ['Layout personalizado', 'Instalação e validação', 'Conformidade NR-1'],
    href: '/contato',
  },
];

const PROCESS = [
  { n: '01', title: 'Diagnóstico', text: 'Visita técnica, levantamento de energias e mapeamento de riscos.' },
  { n: '02', title: 'Projeto', text: 'Matriz de bloqueio, procedimentos e especificação de dispositivos.' },
  { n: '03', title: 'Implantação', text: 'Instalação, identificação e entrega dos kits de bloqueio.' },
  { n: '04', title: 'Treino e auditoria', text: 'Capacitação das equipes e auditorias periódicas de conformidade.' },
];

export default function ServicosPage() {
  return (
    <div>
      <section className="bg-ink-deep py-14 text-white">
        <div className="mx-auto max-w-[1340px] px-7">
          <p className="text-xs text-white/50">
            <Link href="/" className="hover:text-white">
              Home
            </Link>{' '}
            / Serviços
          </p>
          <p className="mt-4 inline-block rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
            Abordagem 360°
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-black leading-tight sm:text-5xl">
            Do planejamento à implantação, em cada etapa da jornada LOTO
          </h1>
          <p className="mt-3 max-w-xl text-white/70">
            Combinamos consultoria técnica, dispositivos nacionais e software de gestão para padronizar o controle de
            energias perigosas na sua operação.
          </p>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1340px] flex-col gap-7 px-7 py-16">
        {SERVICES.map((s, i) => (
          <Link
            key={s.n}
            href={s.href}
            className={`grid items-center gap-10 overflow-hidden rounded-2xl border border-border-soft transition hover:shadow-xl lg:grid-cols-2 ${
              i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
            }`}
          >
            <div className="h-[260px]" style={STRIPE_BG} />
            <div className="p-8 lg:py-8 lg:pr-10">
              <span className="font-mono text-sm font-bold text-brand">{s.n}</span>
              <h2 className="mt-2.5 font-display text-2xl font-black leading-tight text-ink sm:text-3xl">{s.title}</h2>
              <p className="mt-3 leading-relaxed text-muted-2">{s.text}</p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {s.tags.map((t) => (
                  <span key={t} className="rounded-full bg-surface-footer px-3.5 py-2 text-xs font-semibold text-muted">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </section>

      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-[1340px] px-7">
          <p className="font-mono text-xs uppercase tracking-widest text-brand">Como trabalhamos</p>
          <h2 className="mt-2 font-display text-3xl font-black text-ink">Um processo em 4 etapas</h2>
          <div className="jg-card-grid mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p) => (
              <div key={p.n} className="rounded-2xl border border-border-soft bg-white p-6">
                <span className="font-mono text-xl font-bold text-brand">{p.n}</span>
                <h3 className="mt-2.5 text-lg font-bold text-ink">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-tertiary">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1340px] px-7 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-ink-deep p-9 text-center sm:p-14">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(181,32,43,.5), transparent 70%)' }} />
          <h2 className="relative mx-auto max-w-2xl font-display text-2xl font-black text-white sm:text-3xl">
            Vamos desenhar o programa LOTO da sua operação?
          </h2>
          <p className="relative mx-auto mt-3 max-w-lg text-white/70">
            Fale com nossos especialistas e receba um diagnóstico inicial sem compromisso.
          </p>
          <ProposalRequestButton objective="Outro assunto" className="relative mt-7 inline-block rounded-full bg-brand px-8 py-3.5 font-bold text-white transition hover:bg-brand-light">
            Solicitar atendimento →
          </ProposalRequestButton>
        </div>
      </section>
    </div>
  );
}

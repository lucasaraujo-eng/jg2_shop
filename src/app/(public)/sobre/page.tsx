import Link from 'next/link';
import { StatsCounter, type Stat } from '@/components/about/StatsCounter';
import { ClientsMarquee } from '@/components/ClientsMarquee';

const STRIPE_BG = {
  backgroundImage:
    'repeating-linear-gradient(135deg, var(--color-surface-stripe-a) 0 14px, var(--color-surface-stripe-b) 14px 28px)',
};

const STATS: Stat[] = [
  { prefix: '+', value: 5000, label: 'clientes atendidos em todo o Brasil' },
  { prefix: '+', value: 10000, label: 'máquinas adequadas às normas' },
  { prefix: '+', value: 20000, label: 'colaboradores treinados' },
  { value: 8000, suffix: ' m²', label: 'parque fabril em Timóteo (MG)' },
  { prefix: '+', value: 40, suffix: ' anos', label: 'de experiência em soluções industriais' },
  { text: 'América do Sul', label: 'atuação no Brasil e em países vizinhos' },
];

const DIFFS = [
  'Atendimento ágil e próximo, com respostas rápidas às demandas',
  'Portfólio amplo de produtos e serviços em um só fornecedor',
  'Equipe técnica com mais de 40 anos de experiência na indústria',
  'Projetos e consultorias com ART, assegurando respaldo técnico',
  'Acompanhamento completo, da concepção ao pós-venda',
  'Suporte em auditorias e próximas etapas de melhoria',
  'Estrutura fabril própria, com controle de qualidade e entrega',
  'Visão integrada entre segurança, conformidade e desempenho',
];

const AREAS = [
  'Consultoria completa em NR-12',
  'Consultoria e adequação LOTO / LOTOTO',
  'Produtos de bloqueio e etiquetagem',
  'Proteções para NR-12',
  'Placas de sinalização industrial',
  'Escadas, plataformas e meios de acesso',
  'Cabines e salas industriais personalizadas',
  'Dispositivos mãos seguras',
  'Software e tecnologia para gestão da segurança',
];

const SECTORS = [
  'Siderurgia',
  'Alimentício',
  'Papel e celulose',
  'Automotivo',
  'Madeireiro',
  'Petrolífero',
  'Combustíveis',
  'Mineração',
  'E diversos outros setores',
];

export default function SobrePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-deeper">
        <div className="absolute inset-0" style={STRIPE_BG} />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-deeper/55 to-ink-deeper/80" />
        <div className="relative mx-auto max-w-[1340px] px-7 py-28">
          <p className="text-xs text-white/55">
            <Link href="/" className="hover:text-white">
              Home
            </Link>{' '}
            / Sobre nós
          </p>
          <p className="mt-4 inline-block rounded-full bg-brand px-4 py-2 text-xs font-bold uppercase tracking-wide text-white">
            Grupo JG2 · Quem somos
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-black leading-tight text-white sm:text-5xl">
            Nosso Compromisso
            <br />
            Salva Vidas
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/80">
            Há mais de 40 anos desenvolvendo soluções industriais e transformando a segurança nas empresas — com
            atuação nacional em NR-12, LOTOTO, fabricação e produtos técnicos de prevenção.
          </p>
        </div>
      </section>

      {/* Quem somos */}
      <section className="mx-auto max-w-[1340px] px-7 py-20">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-brand">Quem somos</p>
            <h2 className="mt-3 font-display text-3xl font-black leading-tight text-ink sm:text-4xl">
              Um parceiro estratégico da indústria, do projeto ao pós-venda
            </h2>
            <p className="mt-4 leading-relaxed text-muted-2">
              O Grupo JG2 nasceu com o propósito de tornar o ambiente industrial mais seguro, mais eficiente e mais
              preparado para os desafios da operação moderna — unindo experiência técnica, capacidade fabril,
              conhecimento normativo e atendimento próximo ao cliente.
            </p>
            <p className="mt-4 leading-relaxed text-muted-2">
              São <strong className="text-ink">15 anos em adequação à NR-12</strong>, <strong className="text-ink">6 anos em LOTOTO</strong> e mais de{' '}
              <strong className="text-ink">40 anos de história</strong> em soluções industriais: placas de
              sinalização, cabines e salas, escadas, plataformas, meios de acesso e dispositivos mãos seguras.
            </p>
          </div>
          <div className="h-[420px] rounded-3xl shadow-xl" style={STRIPE_BG} />
        </div>
      </section>

      {/* Números */}
      <section className="bg-ink-deeper py-16">
        <div className="mx-auto max-w-[1340px] px-7">
          <p className="font-mono text-xs uppercase tracking-widest text-brand-soft">Nossa trajetória em números</p>
          <h2 className="mt-2 max-w-xl font-display text-2xl font-black leading-tight text-white sm:text-3xl">
            Escala e experiência que sustentam cada entrega
          </h2>
          <div className="mt-7">
            <StatsCounter stats={STATS} />
          </div>
        </div>
      </section>

      {/* Especialidade */}
      <section className="mx-auto max-w-[1340px] px-7 py-20">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="order-2 h-[400px] rounded-3xl shadow-xl lg:order-1" style={STRIPE_BG} />
          <div className="order-1 lg:order-2">
            <p className="font-mono text-xs uppercase tracking-widest text-brand">Nossa especialidade</p>
            <h2 className="mt-3 font-display text-3xl font-black leading-tight text-ink sm:text-4xl">
              Especialistas em segurança industrial com profundidade técnica
            </h2>
            <p className="mt-4 leading-relaxed text-muted-2">
              Trabalhamos para ajudar empresas a reduzir riscos, prevenir acidentes, atender às exigências legais e
              elevar o nível de maturidade da sua operação.
            </p>
            <p className="mt-4 leading-relaxed text-muted-2">
              Atuamos de forma integrada para que o cliente encontre em um só grupo tudo o que precisa para
              estruturar, adequar, implantar e sustentar seus programas de segurança — com respaldo técnico,
              qualidade de execução e acompanhamento contínuo.
            </p>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="bg-surface-footer py-20">
        <div className="mx-auto max-w-[1340px] px-7">
          <p className="font-mono text-xs uppercase tracking-widest text-brand">Por que o Grupo JG2 é diferente</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-black leading-tight text-ink sm:text-4xl">
            Agilidade, profundidade técnica, estrutura produtiva e portfólio integrado
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted-2">
            Nosso diferencial está na combinação entre quatro forças que poucos fornecedores reúnem sob o mesmo teto.
          </p>
          <div className="jg-card-grid mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DIFFS.map((t, i) => (
              <div key={t} className="rounded-2xl border border-border-soft bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl">
                <div className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-surface-badge font-display font-black text-brand">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p className="mt-4 text-sm font-semibold leading-relaxed text-muted-3">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O que fazemos */}
      <section className="mx-auto max-w-[1340px] px-7 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-brand">O que fazemos</p>
          <h2 className="mt-3 font-display text-3xl font-black leading-tight text-ink sm:text-4xl">
            Soluções completas para a indústria
          </h2>
          <p className="mt-3 leading-relaxed text-muted-2">
            Um portfólio desenvolvido para empresas que buscam segurança, conformidade normativa, organização
            operacional e redução de riscos com alto padrão técnico.
          </p>
        </div>
        <div className="jg-card-grid mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AREAS.map((a) => (
            <div key={a} className="flex items-center gap-4 rounded-2xl border border-border-soft p-6 transition hover:-translate-y-1 hover:border-brand hover:bg-surface-card hover:shadow-lg">
              <span className="h-2.5 w-2.5 flex-none rounded-full bg-brand" />
              <span className="font-semibold leading-snug text-ink">{a}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Setores atendidos */}
      <section className="bg-brand py-20">
        <div className="mx-auto max-w-[1340px] px-7">
          <p className="font-mono text-xs uppercase tracking-widest text-white/70">Setores atendidos</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-black leading-tight text-white sm:text-4xl">
            Experiência nos principais setores da indústria
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-white/85">
            Atendemos algumas das maiores indústrias do país e do mundo — uma diversidade que nos permite
            compreender com profundidade os desafios de cada operação.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {SECTORS.map((s) => (
              <span key={s} className="rounded-full border border-white/25 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Estrutura */}
      <section className="mx-auto max-w-[1340px] px-7 py-20">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-brand">Estrutura e capacidade</p>
            <h2 className="mt-3 font-display text-3xl font-black leading-tight text-ink sm:text-4xl">
              Parque fabril de 8.000 m² para atender com qualidade e escala
            </h2>
            <p className="mt-4 leading-relaxed text-muted-2">
              Estamos no Distrito Industrial de Timóteo, na Rua das Palmeiras, nº 95, com estrutura preparada para
              desenvolver e fabricar soluções industriais com alto padrão de qualidade.
            </p>
            <p className="mt-4 leading-relaxed text-muted-2">
              Unimos engenharia, fabricação, personalização, agilidade de entrega e acompanhamento técnico — mais
              controle em cada etapa e mais confiança para quem depende de soluções robustas e seguras.
            </p>
          </div>
          <div className="h-[420px] rounded-3xl shadow-xl" style={STRIPE_BG} />
        </div>
      </section>

      {/* Missão / Visão / Compromisso */}
      <section className="bg-ink-deeper py-20">
        <div className="mx-auto max-w-[1340px] px-7">
          <div className="jg-card-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-dark-border p-8 transition hover:-translate-y-1">
              <p className="font-mono text-xs uppercase tracking-widest text-brand-soft">Missão</p>
              <p className="mt-3.5 leading-relaxed text-white/80">
                Transformar o ambiente industrial em um local mais seguro, reduzindo acidentes e multas, promovendo
                qualidade de vida para as equipes e gerando melhor gestão e retorno financeiro por meio da prevenção.
              </p>
            </div>
            <div className="rounded-2xl border border-dark-border p-8 transition hover:-translate-y-1 hover:border-brand">
              <p className="font-mono text-xs uppercase tracking-widest text-brand-soft">Visão</p>
              <p className="mt-3.5 leading-relaxed text-white/80">
                Ser referência nacional em segurança industrial, reconhecida pela excelência técnica, confiabilidade,
                capacidade de entrega e impacto real na prevenção de acidentes e na evolução da cultura de segurança.
              </p>
            </div>
            <div className="rounded-2xl border border-dark-border p-8 transition hover:-translate-y-1">
              <p className="font-mono text-xs uppercase tracking-widest text-brand-soft">Compromisso</p>
              <p className="mt-3.5 leading-relaxed text-white/80">
                Segurança industrial é uma decisão estratégica que protege pessoas, preserva operações e fortalece
                empresas. Trabalhamos para transformar a cultura de segurança, com soluções que geram resultado
                prático e confiança.
              </p>
            </div>
          </div>
          <p className="mt-12 text-center font-display text-3xl font-black text-white sm:text-4xl">
            Nosso compromisso <span className="text-brand-soft">salva vidas.</span>
          </p>
        </div>
      </section>

      <ClientsMarquee />

      {/* CTA final */}
      <section className="mx-auto max-w-[1340px] px-7 py-20">
        <div className="relative flex flex-wrap items-center justify-between gap-9 overflow-hidden rounded-3xl bg-ink-deeper p-10 sm:p-14">
          <div className="absolute -right-16 -top-16 h-80 w-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(181,32,43,.34), transparent 70%)' }} />
          <div className="relative min-w-[300px] flex-1">
            <h2 className="font-display text-3xl font-black leading-tight text-white sm:text-4xl">
              Um grupo completo para quem leva segurança industrial a sério
            </h2>
            <p className="mt-3 max-w-xl leading-relaxed text-white/80">
              Se a sua empresa busca uma parceira sólida para adequar operações às normas e implantar soluções com
              respaldo e eficiência, o Grupo JG2 está pronto para atender.
            </p>
          </div>
          <div className="relative flex flex-wrap gap-3">
            <Link href="/contato" className="rounded-full bg-brand px-7 py-3.5 font-bold text-white transition hover:bg-brand-light">
              Falar com a equipe →
            </Link>
            <Link href="/produtos" className="rounded-full border border-white/30 bg-white/10 px-7 py-3.5 font-bold text-white transition hover:bg-white/20">
              Ver catálogo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

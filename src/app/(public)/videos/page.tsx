import Link from 'next/link';

const STRIPE_BG_DARK = {
  backgroundImage: 'repeating-linear-gradient(135deg, #1f1f25 0 14px, #1a1a20 14px 28px)',
};

const VIDEOS = [
  { tag: 'Institucional', dur: '2:14', title: 'Conheça a JG2: segurança que nasce do compromisso', desc: 'Um panorama de quem somos e como atuamos no controle de energias perigosas.' },
  { tag: 'LOTOTO', dur: '4:38', title: 'Como funciona um programa de Lockout/Tagout na prática', desc: 'Da matriz de bloqueio à verificação de energia zero, passo a passo no chão de fábrica.' },
  { tag: 'NR-12', dur: '3:52', title: 'Adequação à NR-12: do inventário ao laudo de conformidade', desc: 'As etapas da adequação de máquinas conduzidas por uma única estrutura técnica.' },
  { tag: 'Mãos Seguras', dur: '2:47', title: 'Mãos Seguras: dispositivos personalizados em ação', desc: 'Veja como projetamos soluções que afastam as mãos da zona de perigo.' },
  { tag: 'Produtos', dur: '1:59', title: 'Linha de dispositivos de bloqueio LOTO JG2®', desc: 'Cadeados, garras, bloqueios de válvula e elétricos em demonstração.' },
  { tag: 'Software', dur: '5:10', title: 'JG2 Smart Loto®: gestão contínua do seu programa LOTO', desc: 'Dashboards, auditoria em tempo real e rastreabilidade total dos bloqueios.' },
];

function PlayButton({ size }: { size: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full bg-brand shadow-[0_8px_28px_rgba(181,32,43,.5)]"
      style={{ width: size, height: size }}
    >
      <span
        className="ml-1 block"
        style={{
          width: 0,
          height: 0,
          borderTop: `${size * 0.18}px solid transparent`,
          borderBottom: `${size * 0.18}px solid transparent`,
          borderLeft: `${size * 0.28}px solid white`,
        }}
      />
    </div>
  );
}

export default function VideosPage() {
  const [featured] = VIDEOS;

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
          <p className="mt-4 inline-block rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide">Vídeos</p>
          <h1 className="mt-4 font-display text-4xl font-black">Vídeos sobre segurança e LOTO</h1>
          <p className="mt-3 max-w-xl text-white/70">
            Demonstrações, institucionais e conteúdos técnicos para entender na prática como proteger sua operação.
          </p>
        </div>
      </section>

      {/* Destaque */}
      <section className="mx-auto max-w-[1340px] px-7 py-10">
        <div className="grid overflow-hidden rounded-3xl border border-border-soft lg:grid-cols-[1.3fr_1fr]">
          <div className="relative flex min-h-[360px] items-center justify-center" style={STRIPE_BG_DARK}>
            <PlayButton size={84} />
            <span className="absolute bottom-4 left-5 font-mono text-xs text-white/50">[ vídeo em destaque ]</span>
          </div>
          <div className="flex flex-col justify-center p-10">
            <span className="self-start rounded-full bg-surface-badge px-3.5 py-1.5 text-xs font-bold text-brand">
              Destaque · {featured.tag}
            </span>
            <h2 className="mt-4 font-display text-2xl font-black leading-tight text-ink">{featured.title}</h2>
            <p className="mt-3 leading-relaxed text-muted-2">{featured.desc}</p>
            <span className="mt-4 font-mono text-xs text-tertiary">
              {featured.dur} min · {featured.tag}
            </span>
          </div>
        </div>
      </section>

      {/* Grade */}
      <section className="mx-auto max-w-[1340px] px-7 pb-20">
        <div className="jg-card-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((v) => (
            <div key={v.title} className="flex flex-col overflow-hidden rounded-2xl border border-border-soft transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative flex h-[180px] items-center justify-center" style={STRIPE_BG_DARK}>
                <PlayButton size={54} />
                <span className="absolute bottom-2.5 right-2.5 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[11px] text-white">{v.dur}</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="font-mono text-[11px] text-brand">{v.tag}</span>
                <h3 className="mt-2 text-base font-bold leading-snug text-ink">{v.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-snug text-tertiary">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

import Link from 'next/link';
import { SectionNav } from '@/components/downloads/SectionNav';

type Doc = { tag: string; title: string; desc: string; meta: string; url?: string };

const DOCS_CATALOGOS: Doc[] = [
  { tag: 'Catálogo geral', title: 'Catálogo de Produtos JG2 — Linha LOTO', desc: 'Linha completa de cadeados, garras, etiquetas, bloqueios de válvula e elétricos.', meta: 'PDF · 8,4 MB' },
  { tag: 'Catálogo', title: 'Dispositivos de Bloqueio de Válvulas', desc: 'Soluções para válvulas esfera, gaveta e borboleta em diversos diâmetros.', meta: 'PDF · 3,1 MB' },
  { tag: 'Portfólio', title: 'Cadeados e Garras de Bloqueio', desc: 'Modelos, materiais, opções de chaveamento e identificação por cores.', meta: 'PDF · 2,7 MB' },
];

const DOCS_NORMAS: Doc[] = [
  { tag: 'NR-12', title: 'Guia de Adequação à NR-12', desc: 'Boas práticas, exigências e checklist para conformidade com a NR-12.', meta: 'PDF · 3,8 MB' },
  { tag: 'NR-10', title: 'Resumo Prático da NR-10', desc: 'Pontos de atenção em segurança em instalações e serviços com eletricidade.', meta: 'PDF · 2,2 MB' },
];

const DOCS_ARTIGOS: Doc[] = [
  { tag: 'Manual', title: 'Manual de Implantação do LOTOTO', desc: 'Passo a passo para estruturar e padronizar seu programa de bloqueio.', meta: 'PDF · 4,9 MB' },
  { tag: 'Ficha técnica', title: 'Fichas Técnicas — Etiquetas e Placas', desc: 'Especificações, dimensões e materiais das etiquetas de sinalização.', meta: 'PDF · 1,6 MB' },
];

const SECTIONS = [
  { id: 'cat-sec-catalogos', label: 'Catálogos e Portfólios JG2®', docs: DOCS_CATALOGOS },
  { id: 'cat-sec-normas', label: 'Normas Regulamentadoras', docs: DOCS_NORMAS },
  { id: 'cat-sec-artigos', label: 'Artigos e Manuais', docs: DOCS_ARTIGOS },
];

function DocCard({ doc }: { doc: Doc }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border-soft bg-white">
      <div className="flex h-[200px] items-center justify-center bg-surface-alt">
        <div className="relative flex h-[118px] w-[92px] flex-col items-center justify-end rounded-md border border-border bg-white pb-3.5 shadow-md">
          <div className="absolute right-0 top-0 h-[26px] w-[26px] rounded-bl-md rounded-tr-md border-b border-l border-border bg-surface-alt" />
          <span className="rounded bg-brand px-2 py-0.5 font-mono text-[11px] font-bold tracking-wide text-white">PDF</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="font-mono text-[11px] text-brand">{doc.tag}</span>
        <h3 className="mt-1.5 text-[17px] font-bold leading-snug text-ink">{doc.title}</h3>
        <p className="mt-1.5 flex-1 text-sm leading-snug text-tertiary">{doc.desc}</p>
        <div className="mt-3.5 flex items-center justify-between border-t border-surface-stripe-a pt-3.5">
          <span className="font-mono text-xs text-tertiary">{doc.meta}</span>
          {doc.url ? (
            <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-brand hover:underline">
              Baixar ↓
            </a>
          ) : (
            <span className="text-xs font-bold text-tertiary">PDF ainda não disponível</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DownloadsPage() {
  return (
    <div>
      <section className="bg-ink-deep py-14 text-white">
        <div className="mx-auto max-w-[1340px] px-7">
          <p className="text-xs text-white/50">
            <Link href="/" className="hover:text-white">
              Home
            </Link>{' '}
            / Catálogos
          </p>
          <p className="mt-4 inline-block rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide">Downloads</p>
          <h1 className="mt-4 font-display text-4xl font-black">Catálogos e manuais em PDF</h1>
          <p className="mt-3 max-w-xl text-white/70">
            Baixe nossos catálogos de produtos, fichas técnicas e manuais de uso. Material gratuito para consulta e
            especificação.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1340px] gap-12 px-7 py-12 lg:flex">
        <SectionNav items={SECTIONS.map(({ id, label }) => ({ id, label }))} />

        <div className="flex min-w-0 flex-1 flex-col gap-16">
          {SECTIONS.map((s) => (
            <div key={s.id} id={s.id} className="scroll-mt-[150px]">
              <div className="mb-6 flex items-center gap-3.5">
                <span className="h-[30px] w-[5px] flex-none rounded-sm bg-brand" />
                <h2 className="font-display text-2xl font-black leading-tight text-ink sm:text-3xl">{s.label}</h2>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {s.docs.map((doc) => (
                  <DocCard key={doc.title} doc={doc} />
                ))}
              </div>
            </div>
          ))}

          <div className="flex flex-wrap items-center justify-between gap-7 rounded-2xl border border-border-soft bg-surface-alt p-9">
            <div className="min-w-[300px] flex-1">
              <h2 className="text-2xl font-black text-ink">Não encontrou o material que precisa?</h2>
              <p className="mt-2 leading-relaxed text-tertiary">
                Fale com nossa equipe técnica — enviamos fichas e desenhos específicos para o seu projeto.
              </p>
            </div>
            <Link href="/contato" className="rounded-full bg-brand px-6 py-3 font-bold text-white transition hover:bg-brand-dark">
              Falar com especialista →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { FaqAccordion } from '@/components/FaqAccordion';
import type { SupportArticleData } from '@/data/seo';

function maybeSkuHref(cell: string): string | null {
  const trimmed = cell.trim();
  if (/^JGL\d{3}-\d$/.test(trimmed)) return `/produto/${trimmed}`;
  if (/^JGL\d{3}-\d a JGL\d{3}-\d$/.test(trimmed)) return null;
  return null;
}

export function SupportArticle({ data }: { data: SupportArticleData }) {
  return (
    <section className="mx-auto max-w-[880px] px-7 py-16">
      <h2 className="border-b border-border-soft pb-4 font-display text-2xl font-black text-ink">{data.heading}</h2>

      <p className="mt-6 rounded-xl border border-border-soft bg-surface-alt px-5 py-4 text-sm leading-relaxed text-muted">
        <span className="font-bold text-ink">TL;DR: </span>
        {data.tldr}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border-soft bg-white p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-brand">Ideal para</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{data.idealFor}</p>
        </div>
        <div className="rounded-xl border border-border-soft bg-white p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-tertiary">Não recomendado para</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{data.notFor}</p>
        </div>
      </div>

      <h3 className="mt-10 font-display text-lg font-black text-ink">Tabela de apoio à decisão</h3>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border-soft">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="bg-surface-alt">
            <tr>
              {data.tableHeaders.map((h) => (
                <th key={h} className="px-4 py-3 font-bold text-ink">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.tableRows.map((row, i) => (
              <tr key={i} className="border-t border-border-soft">
                {row.map((cell, j) => {
                  const href = maybeSkuHref(cell);
                  return (
                    <td key={j} className="px-4 py-3 text-muted">
                      {href ? (
                        <Link href={href} className="font-semibold text-brand hover:underline">
                          {cell}
                        </Link>
                      ) : (
                        cell
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10">
        <FaqAccordion items={data.faqs} />
      </div>

      <div className="mt-8 rounded-xl border border-brand/20 bg-surface-badge px-5 py-4">
        <p className="text-xs font-bold uppercase tracking-wide text-brand">Dica de especialista</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">{data.tip}</p>
      </div>

      {data.related.length > 0 && (
        <p className="mt-8 text-sm text-muted-2">
          Confira nossas categorias relacionadas:{' '}
          {data.related.map((r, i) => (
            <span key={r.href}>
              {i > 0 && ' · '}
              <Link href={r.href} className="font-semibold text-brand hover:underline">
                {r.label}
              </Link>
            </span>
          ))}
        </p>
      )}
    </section>
  );
}

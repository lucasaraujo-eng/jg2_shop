'use client';

import type { ProductInput } from '@/lib/validations';

const inputClass =
  'rounded-lg border border-border bg-surface-card px-4 py-2.5 text-sm outline-none transition focus:border-brand focus:bg-white focus:shadow-[0_0_0_3px_rgba(181,32,43,.1)]';

type SupportJson = NonNullable<ProductInput['supportJson']>;

/** Estado de edição (textos brutos) dos campos de SEO + texto de apoio. */
export type SupportSeoState = {
  seoTitle: string;
  seoDescription: string;
  supportHeading: string;
  supportTldr: string;
  supportIdealFor: string;
  supportNotFor: string;
  tableHeadersText: string;
  tableRowsText: string;
  faqs: { q: string; a: string }[];
  tip: string;
  relatedText: string;
};

type SupportSeoSource = {
  seoTitle?: string | null;
  seoDescription?: string | null;
  supportHeading?: string | null;
  supportTldr?: string | null;
  supportIdealFor?: string | null;
  supportNotFor?: string | null;
  supportJson?: ProductInput['supportJson'];
};

export function supportSeoStateFrom(source?: SupportSeoSource): SupportSeoState {
  const json = source?.supportJson;
  return {
    seoTitle: source?.seoTitle ?? '',
    seoDescription: source?.seoDescription ?? '',
    supportHeading: source?.supportHeading ?? '',
    supportTldr: source?.supportTldr ?? '',
    supportIdealFor: source?.supportIdealFor ?? '',
    supportNotFor: source?.supportNotFor ?? '',
    tableHeadersText: (json?.tableHeaders ?? []).join(' | '),
    tableRowsText: (json?.tableRows ?? []).map((r) => r.join(' | ')).join('\n'),
    faqs: json?.faqs ?? [],
    tip: json?.tip ?? '',
    relatedText: (json?.related ?? []).map((r) => `${r.label}|${r.href}`).join('\n'),
  };
}

/** Converte o estado de edição no formato salvo no banco. */
export function supportSeoToPayload(state: SupportSeoState) {
  const supportJson: SupportJson = {
    tableHeaders: state.tableHeadersText
      .split('|')
      .map((s) => s.trim())
      .filter(Boolean),
    tableRows: state.tableRowsText
      .split('\n')
      .map((line) =>
        line
          .split('|')
          .map((s) => s.trim())
          .filter(Boolean),
      )
      .filter((row) => row.length > 0),
    faqs: state.faqs.map((f) => ({ q: f.q.trim(), a: f.a.trim() })).filter((f) => f.q && f.a),
    tip: state.tip,
    related: state.relatedText
      .split('\n')
      .map((line) => {
        const [label, href] = line.split('|').map((s) => s.trim());
        return label && href ? { label, href } : null;
      })
      .filter((x): x is { label: string; href: string } => !!x),
  };
  return {
    seoTitle: state.seoTitle,
    seoDescription: state.seoDescription,
    supportHeading: state.supportHeading,
    supportTldr: state.supportTldr,
    supportIdealFor: state.supportIdealFor,
    supportNotFor: state.supportNotFor,
    supportJson,
  };
}

export function SupportSeoFields({
  value,
  onChange,
}: {
  value: SupportSeoState;
  onChange: (next: SupportSeoState) => void;
}) {
  const set = <K extends keyof SupportSeoState>(key: K, v: SupportSeoState[K]) => onChange({ ...value, [key]: v });

  return (
    <>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-bold text-ink">SEO Title</span>
        <input value={value.seoTitle} onChange={(e) => set('seoTitle', e.target.value)} className={inputClass} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-bold text-ink">SEO Description</span>
        <textarea value={value.seoDescription} onChange={(e) => set('seoDescription', e.target.value)} rows={2} className={`${inputClass} resize-y`} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-bold text-ink">Heading do artigo de apoio</span>
        <input value={value.supportHeading} onChange={(e) => set('supportHeading', e.target.value)} className={inputClass} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-bold text-ink">Resumo (TL;DR)</span>
        <textarea value={value.supportTldr} onChange={(e) => set('supportTldr', e.target.value)} rows={3} className={`${inputClass} resize-y`} />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-bold text-ink">Ideal para</span>
          <textarea value={value.supportIdealFor} onChange={(e) => set('supportIdealFor', e.target.value)} rows={3} className={`${inputClass} resize-y`} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-bold text-ink">Não recomendado para</span>
          <textarea value={value.supportNotFor} onChange={(e) => set('supportNotFor', e.target.value)} rows={3} className={`${inputClass} resize-y`} />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-bold text-ink">Cabeçalhos da tabela (separados por |)</span>
        <input
          value={value.tableHeadersText}
          onChange={(e) => set('tableHeadersText', e.target.value)}
          placeholder="Coluna A | Coluna B"
          className={inputClass}
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-bold text-ink">Linhas da tabela (uma por linha, células com |)</span>
        <textarea
          value={value.tableRowsText}
          onChange={(e) => set('tableRowsText', e.target.value)}
          rows={4}
          className={`${inputClass} resize-y font-mono text-xs`}
        />
      </label>
      <div className="flex flex-col gap-2.5">
        <span className="text-sm font-bold text-ink">FAQs</span>
        {value.faqs.map((f, i) => (
          <div key={i} className="flex flex-col gap-2 rounded-xl border border-border-soft p-3">
            <input
              value={f.q}
              onChange={(e) => set('faqs', value.faqs.map((x, j) => (j === i ? { ...x, q: e.target.value } : x)))}
              placeholder="Pergunta"
              className={inputClass}
            />
            <textarea
              value={f.a}
              onChange={(e) => set('faqs', value.faqs.map((x, j) => (j === i ? { ...x, a: e.target.value } : x)))}
              placeholder="Resposta"
              rows={2}
              className={`${inputClass} resize-y`}
            />
            <button type="button" onClick={() => set('faqs', value.faqs.filter((_, j) => j !== i))} className="self-start text-xs font-bold text-brand">
              Remover FAQ
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => set('faqs', [...value.faqs, { q: '', a: '' }])}
          className="self-start rounded-lg border border-dashed border-border-strong-2 px-4 py-2 text-sm font-bold text-muted-2 transition hover:border-brand hover:text-brand"
        >
          + Adicionar FAQ
        </button>
      </div>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-bold text-ink">Dica de especialista</span>
        <textarea value={value.tip} onChange={(e) => set('tip', e.target.value)} rows={2} className={`${inputClass} resize-y`} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-bold text-ink">Links relacionados (label|href, um por linha)</span>
        <textarea
          value={value.relatedText}
          onChange={(e) => set('relatedText', e.target.value)}
          rows={3}
          placeholder="Cadeados|/produtos/cadeados"
          className={`${inputClass} resize-y font-mono text-xs`}
        />
      </label>
    </>
  );
}

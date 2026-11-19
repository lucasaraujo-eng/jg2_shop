'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateCategory } from '@/server/actions/categories';
import { SupportSeoFields, supportSeoStateFrom, supportSeoToPayload } from '@/components/admin/SupportSeoFields';
import type { CategoryInput } from '@/lib/validations';

const inputClass =
  'rounded-lg border border-border bg-surface-card px-4 py-2.5 text-sm outline-none transition focus:border-brand focus:bg-white focus:shadow-[0_0_0_3px_rgba(181,32,43,.1)]';

type SubForm = { id: string; name: string; supportText: string; seoTitle: string; seoDescription: string };

function FormSection({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border-soft pt-6 first:mt-0 first:border-0 first:pt-0">
      <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-brand">{title}</p>
      {hint && <p className="mt-0.5 text-xs text-tertiary">{hint}</p>}
      <div className="mt-4 flex flex-col gap-4">{children}</div>
    </div>
  );
}

export function CategoryForm({
  categoryId,
  initial,
  subcategories,
  isMaosSeguras,
}: {
  categoryId: string;
  initial: Pick<
    CategoryInput,
    'supportText' | 'seoTitle' | 'seoDescription' | 'supportHeading' | 'supportTldr' | 'supportIdealFor' | 'supportNotFor' | 'supportJson'
  >;
  subcategories: SubForm[];
  isMaosSeguras: boolean;
}) {
  const router = useRouter();
  const [support, setSupport] = useState(() => supportSeoStateFrom(initial));
  const [supportText, setSupportText] = useState(initial.supportText ?? '');
  const [subs, setSubs] = useState<SubForm[]>(subcategories);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSaved(false);
    const result = await updateCategory(categoryId, {
      supportText,
      ...supportSeoToPayload(support),
      subcategories: subs.map(({ id, supportText, seoTitle, seoDescription }) => ({ id, supportText, seoTitle, seoDescription })),
    });
    setSaving(false);
    if (result.ok) {
      setSaved(true);
      router.refresh();
    } else {
      setError(result.error);
    }
  }

  function patchSub(id: string, patch: Partial<SubForm>) {
    setSubs((list) => list.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-6">
      <FormSection
        title="SEO e Texto de apoio"
        hint="Se o resumo e o heading estiverem preenchidos, o artigo de apoio aparece no fim da página da categoria e substitui o texto padrão."
      >
        <SupportSeoFields value={support} onChange={setSupport} />
      </FormSection>

      <FormSection title="Texto simples de apoio" hint="Usado quando não há artigo de apoio completo (heading + resumo).">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-bold text-ink">Texto</span>
          <textarea value={supportText} onChange={(e) => setSupportText(e.target.value)} rows={5} className={`${inputClass} resize-y`} />
        </label>
      </FormSection>

      {subs.length > 0 && (
        <FormSection
          title="Subcategorias"
          hint={isMaosSeguras ? 'Cada subcategoria tem página própria no site.' : 'Subcategorias desta categoria.'}
        >
          {subs.map((s) => (
            <div key={s.id} className="flex flex-col gap-3 rounded-xl border border-border-soft bg-surface-card p-4">
              <p className="text-sm font-black text-ink">{s.name}</p>
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-bold text-ink">SEO Title</span>
                <input value={s.seoTitle} onChange={(e) => patchSub(s.id, { seoTitle: e.target.value })} className={inputClass} />
              </label>
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-bold text-ink">SEO Description</span>
                <textarea value={s.seoDescription} onChange={(e) => patchSub(s.id, { seoDescription: e.target.value })} rows={2} className={`${inputClass} resize-y`} />
              </label>
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-bold text-ink">Texto de apoio</span>
                <textarea value={s.supportText} onChange={(e) => patchSub(s.id, { supportText: e.target.value })} rows={3} className={`${inputClass} resize-y`} />
              </label>
            </div>
          ))}
        </FormSection>
      )}

      {error && <p className="rounded-lg bg-surface-badge px-3.5 py-2.5 text-sm font-semibold text-brand">{error}</p>}
      {saved && <p className="rounded-lg bg-success/10 px-3.5 py-2.5 text-sm font-semibold text-success">Categoria salva.</p>}

      <div>
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-brand px-7 py-3 text-sm font-bold text-white transition hover:bg-brand-dark disabled:bg-brand-disabled"
        >
          {saving ? 'Salvando…' : 'Salvar categoria'}
        </button>
      </div>
    </form>
  );
}

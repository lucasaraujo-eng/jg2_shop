'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct, updateProduct } from '@/server/actions/products';
import { ImageUpload } from '@/components/ImageUpload';
import type { ProductInput } from '@/lib/validations';
import type { getCategories } from '@/server/catalog';

type Categories = Awaited<ReturnType<typeof getCategories>>;

const inputClass =
  'rounded-lg border border-border bg-surface-card px-4 py-2.5 text-sm outline-none transition focus:border-brand focus:bg-white focus:shadow-[0_0_0_3px_rgba(181,32,43,.1)]';

const EMPTY: ProductInput = {
  code: '',
  name: '',
  ncm: '',
  isCadeado: false,
  categoryId: '',
  subcategoryId: '',
  description: [],
  supportText: '',
  filterTags: [],
  coverUrl: '',
  active: true,
};

function FormSection({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border-soft pt-6 first:mt-0 first:border-0 first:pt-0">
      <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-brand">{title}</p>
      {hint && <p className="mt-0.5 text-xs text-tertiary">{hint}</p>}
      <div className="mt-4 flex flex-col gap-4">{children}</div>
    </div>
  );
}

function ToggleRow({ checked, onChange, label, hint }: { checked: boolean; onChange: (v: boolean) => void; label: string; hint?: string }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-border-soft bg-surface-card px-4 py-3 transition hover:border-border-strong">
      <span>
        <span className="block text-sm font-bold text-ink">{label}</span>
        {hint && <span className="block text-xs text-tertiary">{hint}</span>}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 flex-none accent-brand"
      />
    </label>
  );
}

export function ProductForm({
  categories,
  productId,
  initial,
}: {
  categories: Categories;
  productId?: string;
  initial?: ProductInput;
}) {
  const router = useRouter();
  const [form, setForm] = useState<ProductInput>(initial ?? EMPTY);
  const [descriptionText, setDescriptionText] = useState((initial?.description ?? []).join('\n'));
  const [filterTagsText, setFilterTagsText] = useState((initial?.filterTags ?? []).join(', '));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const subcategories = categories.find((c) => c.id === form.categoryId)?.subcategories ?? [];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload: ProductInput = {
      ...form,
      description: descriptionText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      filterTags: filterTagsText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    };

    const result = productId ? await updateProduct(productId, payload) : await createProduct(payload);
    setSaving(false);
    if (result.ok) {
      router.push('/admin/produtos');
      router.refresh();
    } else {
      setError(result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-6">
      <FormSection title="Identificação">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-bold text-ink">SKU (código)*</span>
            <input required value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} className={inputClass} />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-bold text-ink">NCM</span>
            <input value={form.ncm ?? ''} onChange={(e) => setForm({ ...form, ncm: e.target.value })} className={inputClass} />
          </label>
        </div>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-bold text-ink">Nome*</span>
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
        </label>
      </FormSection>

      <FormSection title="Categorização">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-bold text-ink">Categoria*</span>
            <select
              required
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value, subcategoryId: '' })}
              className={inputClass}
            >
              <option value="">Selecione...</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-bold text-ink">Subcategoria</span>
            <select
              value={form.subcategoryId ?? ''}
              onChange={(e) => setForm({ ...form, subcategoryId: e.target.value })}
              disabled={subcategories.length === 0}
              className={`${inputClass} disabled:opacity-50`}
            >
              <option value="">Nenhuma</option>
              {subcategories.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <ToggleRow
          checked={form.isCadeado}
          onChange={(v) => setForm({ ...form, isCadeado: v })}
          label="É um cadeado"
          hint="Habilita variações de cor e segredo na página do produto"
        />
      </FormSection>

      <FormSection title="Mídia">
        <ImageUpload label="Imagem de capa" value={form.coverUrl} onChange={(url) => setForm({ ...form, coverUrl: url })} folder="produtos" />
      </FormSection>

      <FormSection title="Conteúdo">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-bold text-ink">Descrição (um parágrafo por linha)</span>
          <textarea
            value={descriptionText}
            onChange={(e) => setDescriptionText(e.target.value)}
            rows={5}
            className={`${inputClass} resize-y`}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-bold text-ink">Texto de apoio (SEO)</span>
          <textarea
            value={form.supportText ?? ''}
            onChange={(e) => setForm({ ...form, supportText: e.target.value })}
            rows={4}
            className={`${inputClass} resize-y`}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-bold text-ink">Tags do filtro (separadas por vírgula)</span>
          <input
            value={filterTagsText}
            onChange={(e) => setFilterTagsText(e.target.value)}
            placeholder="ex.: disjuntor_din, din_bipolar"
            className={inputClass}
          />
        </label>
      </FormSection>

      <FormSection title="Publicação">
        <ToggleRow checked={form.active} onChange={(v) => setForm({ ...form, active: v })} label="Ativo" hint="Visível no catálogo do site" />

        {error && <p className="rounded-lg bg-surface-badge px-3.5 py-2.5 text-sm font-semibold text-brand">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="self-start rounded-full bg-brand px-6 py-3 font-bold text-white transition hover:bg-brand-dark disabled:bg-brand-disabled"
        >
          {saving ? 'Salvando…' : productId ? 'Salvar alterações' : 'Criar produto'}
        </button>
      </FormSection>
    </form>
  );
}

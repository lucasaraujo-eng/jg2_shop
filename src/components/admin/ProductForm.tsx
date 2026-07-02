'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct, updateProduct } from '@/server/actions/products';
import { ImageUpload } from '@/components/ImageUpload';
import type { ProductInput } from '@/lib/validations';
import type { getCategories } from '@/server/catalog';

type Categories = Awaited<ReturnType<typeof getCategories>>;

const inputClass = 'rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-brand';

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
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-5">
      <div className="grid grid-cols-2 gap-4">
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

      <div className="grid grid-cols-2 gap-4">
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
            className={inputClass}
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

      <label className="flex items-center gap-2 text-sm font-bold text-ink">
        <input type="checkbox" checked={form.isCadeado} onChange={(e) => setForm({ ...form, isCadeado: e.target.checked })} />
        É um cadeado (habilita variações de cor e segredo)
      </label>

      <ImageUpload
        label="Imagem de capa"
        value={form.coverUrl}
        onChange={(url) => setForm({ ...form, coverUrl: url })}
        folder="produtos"
      />

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

      <label className="flex items-center gap-2 text-sm font-bold text-ink">
        <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
        Ativo (visível no catálogo)
      </label>

      {error && <p className="text-sm font-semibold text-brand">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="self-start rounded-full bg-brand px-6 py-3 font-bold text-white transition hover:bg-brand-dark disabled:bg-brand-disabled"
      >
        {saving ? 'Salvando…' : productId ? 'Salvar alterações' : 'Criar produto'}
      </button>
    </form>
  );
}

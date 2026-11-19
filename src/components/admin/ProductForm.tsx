'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createProduct, updateProduct } from '@/server/actions/products';
import { ImageUpload } from '@/components/ImageUpload';
import { SupportSeoFields, supportSeoStateFrom, supportSeoToPayload } from '@/components/admin/SupportSeoFields';
import { MAX_PRODUCT_IMAGES, type ProductInput } from '@/lib/validations';
import { resolveImageUrl } from '@/lib/utils';
import type { getCategories } from '@/server/catalog';

type Categories = Awaited<ReturnType<typeof getCategories>>;

const inputClass =
  'rounded-lg border border-border bg-surface-card px-4 py-2.5 text-sm outline-none transition focus:border-brand focus:bg-white focus:shadow-[0_0_0_3px_rgba(181,32,43,.1)]';

const EMPTY: ProductInput = {
  code: '',
  name: '',
  subtitle: '',
  ncm: '',
  isCadeado: false,
  categoryId: '',
  subcategoryId: '',
  subcategoryIds: [],
  extraCategoryIds: [],
  description: [],
  supportText: '',
  seoTitle: '',
  seoDescription: '',
  supportHeading: '',
  supportTldr: '',
  supportIdealFor: '',
  supportNotFor: '',
  supportJson: { tableHeaders: [], tableRows: [], faqs: [], tip: '', related: [] },
  specs: [],
  filterTags: [],
  coverUrl: '',
  imageUrls: [],
  datasheetUrl: '',
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

function GalleryField({
  urls,
  onChange,
}: {
  urls: string[];
  onChange: (urls: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    setError('');
    try {
      const next = [...urls];
      for (const file of Array.from(files)) {
        if (next.length >= MAX_PRODUCT_IMAGES) break;
        const fd = new FormData();
        fd.append('file', file);
        fd.append('folder', 'produtos');
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Falha no upload');
        next.push(json.url as string);
      }
      onChange(next);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Falha no upload');
    } finally {
      setBusy(false);
    }
  }

  function makeCover(i: number) {
    if (i <= 0) return;
    const next = [...urls];
    const [item] = next.splice(i, 1);
    next.unshift(item);
    onChange(next);
  }

  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= urls.length) return;
    const next = [...urls];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-bold text-ink">Galeria ({urls.length}/{MAX_PRODUCT_IMAGES})</span>
        <button
          type="button"
          disabled={busy || urls.length >= MAX_PRODUCT_IMAGES}
          onClick={() => inputRef.current?.click()}
          className="rounded-lg border border-dashed border-border-strong-2 px-3 py-1.5 text-xs font-bold text-muted-2 transition hover:border-brand hover:text-brand disabled:opacity-50"
        >
          {busy ? 'Enviando…' : '+ Adicionar fotos'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            upload(e.target.files);
            e.target.value = '';
          }}
        />
      </div>
      {urls.length < 5 && (
        <p className="text-xs text-tertiary">Recomendado: pelo menos 5 fotos (máx. {MAX_PRODUCT_IMAGES}). A primeira é a capa.</p>
      )}
      {urls.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-tertiary">
          Nenhuma imagem na galeria.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {urls.map((url, i) => (
            <li key={`${url}-${i}`} className="flex items-center gap-3 rounded-xl border border-border-soft bg-surface-card p-2">
              <div className="relative h-14 w-14 flex-none overflow-hidden rounded-lg border border-border bg-white">
                <Image src={resolveImageUrl(url) ?? url} alt="" fill sizes="56px" className="object-contain" unoptimized />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs text-tertiary">{url}</p>
                {i === 0 && <p className="text-[11px] font-bold uppercase tracking-wide text-brand">Capa</p>}
              </div>
 <div className="flex flex-none gap-1">
                {i > 0 && (
                  <button type="button" onClick={() => makeCover(i)} className="rounded border border-border px-2 py-1 text-xs font-bold text-muted-2 hover:border-brand hover:text-brand">
                    Capa
                  </button>
                )}
                <button type="button" aria-label="Subir" disabled={i === 0} onClick={() => move(i, -1)} className="rounded border border-border px-2 py-1 text-xs disabled:opacity-30">
                  ↑
                </button>
                <button type="button" aria-label="Descer" disabled={i === urls.length - 1} onClick={() => move(i, 1)} className="rounded border border-border px-2 py-1 text-xs disabled:opacity-30">
                  ↓
                </button>
                <button
                  type="button"
                  aria-label="Remover"
                  onClick={() => onChange(urls.filter((_, j) => j !== i))}
                  className="rounded border border-border px-2 py-1 text-xs text-brand"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {error && <p className="text-xs font-semibold text-brand">{error}</p>}
    </div>
  );
}

function DatasheetField({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function upload(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('kind', 'pdf');
      fd.append('folder', 'datasheets');
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Falha no upload');
      onChange(json.url as string);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Falha no upload');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-bold text-ink">Ficha técnica (PDF)</span>
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Cole a URL do PDF ou envie um arquivo"
          className={`${inputClass} min-w-0 flex-1`}
        />
        <button
          type="button"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          className="rounded-lg border border-dashed border-border-strong-2 px-3 py-2.5 text-xs font-bold text-muted-2 transition hover:border-brand hover:text-brand disabled:opacity-50"
        >
          {busy ? 'Enviando…' : 'Enviar PDF'}
        </button>
        {value && (
          <>
            <a href={resolveImageUrl(value) ?? value} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-brand hover:underline">
              Ver
            </a>
            <button type="button" onClick={() => onChange('')} className="text-xs font-bold text-muted-2 hover:text-brand">
              Remover
            </button>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => {
            upload(e.target.files?.[0]);
            e.target.value = '';
          }}
        />
      </div>
      {error && <p className="text-xs font-semibold text-brand">{error}</p>}
    </div>
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
  const [specs, setSpecs] = useState<{ label: string; value: string }[]>(initial?.specs ?? []);
  const [filterTagsText, setFilterTagsText] = useState((initial?.filterTags ?? []).join(', '));
  const [support, setSupport] = useState(() => supportSeoStateFrom(initial));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Subcategorias disponíveis: as da categoria principal e das categorias adicionais.
  const selectedCategoryIds = [form.categoryId, ...(form.extraCategoryIds ?? [])].filter(Boolean);
  const subcategoryGroups = categories
    .filter((c) => selectedCategoryIds.includes(c.id) && c.subcategories.length > 0)
    .map((c) => ({ id: c.id, name: c.name, subcategories: c.subcategories }));

  function keepSubcategoriesOf(categoryIds: string[], subcategoryIds: string[]) {
    const allowed = new Set(categories.filter((c) => categoryIds.includes(c.id)).flatMap((c) => c.subcategories.map((s) => s.id)));
    return subcategoryIds.filter((id) => allowed.has(id));
  }

  function toggleExtraCategory(id: string) {
    const current = form.extraCategoryIds ?? [];
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    const subcategoryIds = keepSubcategoriesOf([form.categoryId, ...next], form.subcategoryIds ?? []);
    setForm({ ...form, extraCategoryIds: next, subcategoryIds, subcategoryId: subcategoryIds[0] ?? '' });
  }

  function toggleSubcategory(id: string) {
    const current = form.subcategoryIds ?? [];
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    setForm({ ...form, subcategoryIds: next, subcategoryId: next[0] ?? '' });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const imageUrls = form.imageUrls?.length
      ? form.imageUrls
      : form.coverUrl
        ? [form.coverUrl]
        : [];

    const payload: ProductInput = {
      ...form,
      coverUrl: imageUrls[0] ?? '',
      imageUrls,
      description: descriptionText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      specs: specs
        .map((s) => ({ label: s.label.trim(), value: s.value.trim() }))
        .filter((s) => s.label && s.value),
      filterTags: filterTagsText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      ...supportSeoToPayload(support),
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
          <textarea
            required
            rows={3}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={`${inputClass} min-h-[88px] resize-y overflow-y-auto`}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-bold text-ink">Subtítulo</span>
          <textarea
            rows={4}
            value={form.subtitle ?? ''}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            placeholder="Texto curto exibido abaixo do nome na página do produto"
            className={`${inputClass} min-h-[112px] resize-y overflow-y-auto`}
          />
        </label>
      </FormSection>

      <FormSection title="Categorização" hint="A categoria principal define breadcrumb e URL padrão. Extras aparecem nas listagens adicionais.">
        <div className="grid grid-cols-1 gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-bold text-ink">Categoria principal*</span>
            <select
              required
              value={form.categoryId}
              onChange={(e) => {
                const extraCategoryIds = (form.extraCategoryIds ?? []).filter((id) => id !== e.target.value);
                const subcategoryIds = keepSubcategoriesOf([e.target.value, ...extraCategoryIds], form.subcategoryIds ?? []);
                setForm({
                  ...form,
                  categoryId: e.target.value,
                  extraCategoryIds,
                  subcategoryIds,
                  subcategoryId: subcategoryIds[0] ?? '',
                });
              }}
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
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold text-ink">Categorias adicionais</span>
          <div className="flex flex-col gap-1.5 rounded-xl border border-border-soft bg-surface-card p-3">
            {categories
              .filter((c) => c.id !== form.categoryId)
              .map((c) => (
                <label key={c.id} className="flex items-center gap-2 text-sm text-ink">
                  <input
                    type="checkbox"
                    checked={(form.extraCategoryIds ?? []).includes(c.id)}
                    onChange={() => toggleExtraCategory(c.id)}
                    className="accent-brand"
                  />
                  {c.name}
                </label>
              ))}
            {categories.filter((c) => c.id !== form.categoryId).length === 0 && (
              <p className="text-xs text-tertiary">Selecione a categoria principal primeiro.</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold text-ink">Subcategorias</span>
          <div className="flex flex-col gap-3 rounded-xl border border-border-soft bg-surface-card p-3">
            {subcategoryGroups.map((g) => (
              <div key={g.id} className="flex flex-col gap-1.5">
                <p className="text-xs font-bold uppercase tracking-wide text-tertiary">{g.name}</p>
                {g.subcategories.map((sc) => (
                  <label key={sc.id} className="flex items-center gap-2 text-sm text-ink">
                    <input
                      type="checkbox"
                      checked={(form.subcategoryIds ?? []).includes(sc.id)}
                      onChange={() => toggleSubcategory(sc.id)}
                      className="accent-brand"
                    />
                    {sc.name}
                  </label>
                ))}
              </div>
            ))}
            {subcategoryGroups.length === 0 && (
              <p className="text-xs text-tertiary">As categorias selecionadas não possuem subcategorias.</p>
            )}
          </div>
          <span className="text-xs text-tertiary">A primeira subcategoria marcada é a principal do produto.</span>
        </div>

        <ToggleRow
          checked={form.isCadeado}
          onChange={(v) => setForm({ ...form, isCadeado: v })}
          label="É um cadeado"
          hint="Habilita variações de cor e segredo na página do produto"
        />
      </FormSection>

      <FormSection title="Galeria de imagens" hint="Ordene com ↑↓. A primeira foto é a capa na listagem e na PDP.">
        <GalleryField
          urls={form.imageUrls ?? []}
          onChange={(imageUrls) => setForm({ ...form, imageUrls, coverUrl: imageUrls[0] ?? '' })}
        />
        {(form.imageUrls?.length ?? 0) === 0 && (
          <ImageUpload
            label="Ou envie só a capa"
            value={form.coverUrl}
            onChange={(url) => setForm({ ...form, coverUrl: url, imageUrls: url ? [url] : [] })}
            folder="produtos"
          />
        )}
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
          <span className="font-bold text-ink">Texto de apoio legado (simples)</span>
          <textarea
            value={form.supportText ?? ''}
            onChange={(e) => setForm({ ...form, supportText: e.target.value })}
            rows={3}
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

      <FormSection title="Especificações técnicas" hint="Exibidas na tabela da página do produto. Deixe vazio se o produto não tiver.">
        <div className="flex flex-col gap-2.5">
          {specs.map((s, i) => (
            <div key={i} className="flex gap-2.5">
              <input
                value={s.label}
                onChange={(e) => setSpecs(specs.map((sp, j) => (j === i ? { ...sp, label: e.target.value } : sp)))}
                placeholder="Ex.: Material"
                className={`${inputClass} w-[180px] flex-none`}
              />
              <input
                value={s.value}
                onChange={(e) => setSpecs(specs.map((sp, j) => (j === i ? { ...sp, value: e.target.value } : sp)))}
                placeholder="Ex.: Corpo Plástico e Haste em Aço Cromado"
                className={`${inputClass} flex-1`}
              />
              <button
                type="button"
                onClick={() => setSpecs(specs.filter((_, j) => j !== i))}
                aria-label="Remover especificação"
                className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-border text-muted-2 transition hover:border-brand hover:text-brand"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setSpecs([...specs, { label: '', value: '' }])}
            className="self-start rounded-lg border border-dashed border-border-strong-2 px-4 py-2 text-sm font-bold text-muted-2 transition hover:border-brand hover:text-brand"
          >
            + Adicionar especificação
          </button>
        </div>
      </FormSection>

      <FormSection title="Ficha técnica" hint="PDF exibido na aba DataSheet da página do produto.">
        <DatasheetField value={form.datasheetUrl ?? ''} onChange={(url) => setForm({ ...form, datasheetUrl: url })} />
      </FormSection>

      <FormSection title="SEO e Texto de apoio" hint="Se preenchido, substitui o SEO estático da agência na PDP.">
        <SupportSeoFields value={support} onChange={setSupport} />
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

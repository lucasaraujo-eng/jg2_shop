'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
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
  subtitle: '',
  ncm: '',
  isCadeado: false,
  categoryId: '',
  subcategoryId: '',
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
        if (next.length >= 12) break;
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
        <span className="text-sm font-bold text-ink">Galeria ({urls.length}/12)</span>
        <button
          type="button"
          disabled={busy || urls.length >= 12}
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
        <p className="text-xs text-tertiary">Recomendado: pelo menos 5 fotos (máx. 12). A primeira é a capa.</p>
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
                <Image src={url} alt="" fill sizes="56px" className="object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs text-tertiary">{url}</p>
                {i === 0 && <p className="text-[11px] font-bold uppercase tracking-wide text-brand">Capa</p>}
              </div>
              <div className="flex flex-none gap-1">
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
  const [tableHeadersText, setTableHeadersText] = useState((initial?.supportJson?.tableHeaders ?? []).join(' | '));
  const [tableRowsText, setTableRowsText] = useState(
    (initial?.supportJson?.tableRows ?? []).map((r) => r.join(' | ')).join('\n'),
  );
  const [faqs, setFaqs] = useState<{ q: string; a: string }[]>(initial?.supportJson?.faqs ?? []);
  const [relatedText, setRelatedText] = useState(
    (initial?.supportJson?.related ?? []).map((r) => `${r.label}|${r.href}`).join('\n'),
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const subcategories = categories.find((c) => c.id === form.categoryId)?.subcategories ?? [];

  function toggleExtraCategory(id: string) {
    const current = form.extraCategoryIds ?? [];
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    setForm({ ...form, extraCategoryIds: next });
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
      supportJson: {
        tableHeaders: tableHeadersText
          .split('|')
          .map((s) => s.trim())
          .filter(Boolean),
        tableRows: tableRowsText
          .split('\n')
          .map((line) =>
            line
              .split('|')
              .map((s) => s.trim())
              .filter(Boolean),
          )
          .filter((row) => row.length > 0),
        faqs: faqs.map((f) => ({ q: f.q.trim(), a: f.a.trim() })).filter((f) => f.q && f.a),
        tip: form.supportJson?.tip ?? '',
        related: relatedText
          .split('\n')
          .map((line) => {
            const [label, href] = line.split('|').map((s) => s.trim());
            return label && href ? { label, href } : null;
          })
          .filter((x): x is { label: string; href: string } => !!x),
      },
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-bold text-ink">Categoria principal*</span>
            <select
              required
              value={form.categoryId}
              onChange={(e) =>
                setForm({
                  ...form,
                  categoryId: e.target.value,
                  subcategoryId: '',
                  extraCategoryIds: (form.extraCategoryIds ?? []).filter((id) => id !== e.target.value),
                })
              }
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

      <FormSection title="SEO e Texto de apoio" hint="Se preenchido, substitui o SEO estático da agência na PDP.">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-bold text-ink">SEO Title</span>
          <input value={form.seoTitle ?? ''} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} className={inputClass} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-bold text-ink">SEO Description</span>
          <textarea
            value={form.seoDescription ?? ''}
            onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
            rows={2}
            className={`${inputClass} resize-y`}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-bold text-ink">Heading do artigo de apoio</span>
          <input
            value={form.supportHeading ?? ''}
            onChange={(e) => setForm({ ...form, supportHeading: e.target.value })}
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-bold text-ink">TL;DR</span>
          <textarea
            value={form.supportTldr ?? ''}
            onChange={(e) => setForm({ ...form, supportTldr: e.target.value })}
            rows={3}
            className={`${inputClass} resize-y`}
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-bold text-ink">Ideal para</span>
            <textarea
              value={form.supportIdealFor ?? ''}
              onChange={(e) => setForm({ ...form, supportIdealFor: e.target.value })}
              rows={3}
              className={`${inputClass} resize-y`}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-bold text-ink">Não recomendado para</span>
            <textarea
              value={form.supportNotFor ?? ''}
              onChange={(e) => setForm({ ...form, supportNotFor: e.target.value })}
              rows={3}
              className={`${inputClass} resize-y`}
            />
          </label>
        </div>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-bold text-ink">Cabeçalhos da tabela (separados por |)</span>
          <input
            value={tableHeadersText}
            onChange={(e) => setTableHeadersText(e.target.value)}
            placeholder="Coluna A | Coluna B"
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-bold text-ink">Linhas da tabela (uma por linha, células com |)</span>
          <textarea
            value={tableRowsText}
            onChange={(e) => setTableRowsText(e.target.value)}
            rows={4}
            className={`${inputClass} resize-y font-mono text-xs`}
          />
        </label>
        <div className="flex flex-col gap-2.5">
          <span className="text-sm font-bold text-ink">FAQs</span>
          {faqs.map((f, i) => (
            <div key={i} className="flex flex-col gap-2 rounded-xl border border-border-soft p-3">
              <input
                value={f.q}
                onChange={(e) => setFaqs(faqs.map((x, j) => (j === i ? { ...x, q: e.target.value } : x)))}
                placeholder="Pergunta"
                className={inputClass}
              />
              <textarea
                value={f.a}
                onChange={(e) => setFaqs(faqs.map((x, j) => (j === i ? { ...x, a: e.target.value } : x)))}
                placeholder="Resposta"
                rows={2}
                className={`${inputClass} resize-y`}
              />
              <button type="button" onClick={() => setFaqs(faqs.filter((_, j) => j !== i))} className="self-start text-xs font-bold text-brand">
                Remover FAQ
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setFaqs([...faqs, { q: '', a: '' }])}
            className="self-start rounded-lg border border-dashed border-border-strong-2 px-4 py-2 text-sm font-bold text-muted-2 transition hover:border-brand hover:text-brand"
          >
            + Adicionar FAQ
          </button>
        </div>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-bold text-ink">Dica de especialista</span>
          <textarea
            value={form.supportJson?.tip ?? ''}
            onChange={(e) =>
              setForm({
                ...form,
                supportJson: { ...(form.supportJson ?? { tableHeaders: [], tableRows: [], faqs: [], related: [] }), tip: e.target.value },
              })
            }
            rows={2}
            className={`${inputClass} resize-y`}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-bold text-ink">Links relacionados (label|href, um por linha)</span>
          <textarea
            value={relatedText}
            onChange={(e) => setRelatedText(e.target.value)}
            rows={3}
            placeholder="Cadeados|/produtos/cadeados"
            className={`${inputClass} resize-y font-mono text-xs`}
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

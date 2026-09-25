'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost, updatePost } from '@/server/actions/blog';
import { ImageUpload } from '@/components/ImageUpload';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { slugify } from '@/lib/utils';
import type { PostInput } from '@/lib/validations';

const inputClass =
  'rounded-lg border border-border bg-surface-card px-4 py-2.5 text-sm outline-none transition focus:border-brand focus:bg-white focus:shadow-[0_0_0_3px_rgba(181,32,43,.1)]';

const POST_TYPES: { value: PostInput['type']; label: string }[] = [
  { value: 'BLOG', label: 'Blog' },
  { value: 'NORMA', label: 'Norma' },
  { value: 'EBOOK', label: 'E-book' },
  { value: 'ARTIGO', label: 'Artigo' },
  { value: 'SETOR', label: 'Área de atuação (setor)' },
];

const EMPTY: PostInput = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  coverUrl: '',
  fileUrl: '',
  tag: '',
  type: 'BLOG',
  status: 'DRAFT',
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

export function PostForm({ postId, initial }: { postId?: string; initial?: PostInput }) {
  const router = useRouter();
  const [form, setForm] = useState<PostInput>(initial ?? EMPTY);
  const [slugTouched, setSlugTouched] = useState(!!initial?.slug);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function handleTitleChange(title: string) {
    setForm((f) => ({ ...f, title, slug: slugTouched ? f.slug : slugify(title) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    const result = postId ? await updatePost(postId, form) : await createPost(form);
    setSaving(false);
    if (result.ok) {
      router.push('/admin/blog');
      router.refresh();
    } else {
      setError(result.error);
    }
  }

  const needsFile = form.type === 'NORMA' || form.type === 'EBOOK' || form.type === 'ARTIGO';

  return (
    <form onSubmit={handleSubmit} className="flex max-w-3xl flex-col gap-6">
      <FormSection title="Identificação">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-bold text-ink">Tipo de matéria*</span>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value as PostInput['type'] })}
            className={inputClass}
          >
            {POST_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          {form.type === 'SETOR' && (
            <span className="text-xs text-tertiary">
              Use o slug igual ao id do setor (ex.: alimentos, metalurgia) para sobrescrever a página pública.
            </span>
          )}
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-bold text-ink">Título*</span>
          <input required value={form.title} onChange={(e) => handleTitleChange(e.target.value)} className={inputClass} />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-bold text-ink">Slug (URL)*</span>
          <input
            required
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true);
              setForm({ ...form, slug: e.target.value });
            }}
            className={`${inputClass} font-mono`}
          />
        </label>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-bold text-ink">Tag</span>
            <input value={form.tag ?? ''} onChange={(e) => setForm({ ...form, tag: e.target.value })} className={inputClass} />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-bold text-ink">Status</span>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as PostInput['status'] })} className={inputClass}>
              <option value="DRAFT">Rascunho</option>
              <option value="PUBLISHED">Publicado</option>
            </select>
          </label>
        </div>
      </FormSection>

      <FormSection title="Mídia">
        <ImageUpload label="Imagem de capa" value={form.coverUrl} onChange={(url) => setForm({ ...form, coverUrl: url })} folder="blog" />
        {needsFile && (
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-bold text-ink">URL do PDF / arquivo</span>
            <input
              type="url"
              value={form.fileUrl ?? ''}
              onChange={(e) => setForm({ ...form, fileUrl: e.target.value })}
              placeholder="https://…/arquivo.pdf"
              className={inputClass}
            />
            <span className="text-xs text-tertiary">Usado na página de Downloads para Normas, E-books e Artigos.</span>
          </label>
        )}
      </FormSection>

      <FormSection title="Conteúdo">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-bold text-ink">Resumo</span>
          <textarea
            value={form.excerpt ?? ''}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            rows={2}
            className={`${inputClass} resize-y`}
          />
        </label>

        <div className="flex flex-col gap-1.5 text-sm">
          <span className="font-bold text-ink">Conteúdo*</span>
          <RichTextEditor value={form.content} onChange={(html) => setForm({ ...form, content: html })} folder="blog" />
          <span className="text-xs text-tertiary">
            O HTML é sanitizado no salvamento (p, strong, em, listas, headings, links e imagens).
          </span>
        </div>
      </FormSection>

      <FormSection title="Publicação">
        {error && <p className="rounded-lg bg-surface-badge px-3.5 py-2.5 text-sm font-semibold text-brand">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="self-start rounded-full bg-brand px-6 py-3 font-bold text-white transition hover:bg-brand-dark disabled:bg-brand-disabled"
        >
          {saving ? 'Salvando…' : postId ? 'Salvar alterações' : 'Criar matéria'}
        </button>
      </FormSection>
    </form>
  );
}

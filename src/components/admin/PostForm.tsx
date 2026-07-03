'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost, updatePost } from '@/server/actions/blog';
import { ImageUpload } from '@/components/ImageUpload';
import { slugify } from '@/lib/utils';
import type { PostInput } from '@/lib/validations';

const inputClass =
  'rounded-lg border border-border bg-surface-card px-4 py-2.5 text-sm outline-none transition focus:border-brand focus:bg-white focus:shadow-[0_0_0_3px_rgba(181,32,43,.1)]';

const EMPTY: PostInput = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  coverUrl: '',
  tag: '',
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

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-6">
      <FormSection title="Identificação">
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

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-bold text-ink">Conteúdo (HTML)*</span>
          <textarea
            required
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={10}
            className={`${inputClass} resize-y font-mono text-xs`}
          />
          <span className="text-xs text-tertiary">
            Tags permitidas na publicação: p, br, strong, em, a, ul, ol, li, h2, h3, h4, blockquote, img — o resto é removido
            automaticamente por segurança.
          </span>
        </label>
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

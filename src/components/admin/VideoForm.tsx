'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createVideo, updateVideo } from '@/server/actions/videos';
import type { VideoInput } from '@/lib/validations';

const inputClass =
  'rounded-lg border border-border bg-surface-card px-4 py-2.5 text-sm outline-none transition focus:border-brand focus:bg-white focus:shadow-[0_0_0_3px_rgba(181,32,43,.1)]';

const EMPTY: VideoInput = {
  title: '',
  description: '',
  youtubeUrl: '',
  order: 0,
  active: true,
};

export function VideoForm({ videoId, initial }: { videoId?: string; initial?: VideoInput }) {
  const router = useRouter();
  const [form, setForm] = useState<VideoInput>(initial ?? EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    const result = videoId ? await updateVideo(videoId, form) : await createVideo(form);
    setSaving(false);
    if (result.ok) {
      router.push('/admin/videos');
      router.refresh();
    } else {
      setError(result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-5">
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-bold text-ink">Título*</span>
        <input
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-bold text-ink">Link do YouTube*</span>
        <input
          required
          type="url"
          value={form.youtubeUrl}
          onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
          placeholder="https://www.youtube.com/watch?v=..."
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-bold text-ink">Descrição</span>
        <textarea
          value={form.description ?? ''}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
          className={`${inputClass} resize-y`}
        />
      </label>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-bold text-ink">Ordem</span>
          <input
            type="number"
            min={0}
            value={form.order}
            onChange={(e) => setForm({ ...form, order: Number(e.target.value) || 0 })}
            className={inputClass}
          />
        </label>
        <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-border-soft bg-surface-card px-4 py-3">
          <span className="text-sm font-bold text-ink">Ativo</span>
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
            className="h-5 w-5 accent-brand"
          />
        </label>
      </div>

      {error && <p className="rounded-lg bg-surface-badge px-3.5 py-2.5 text-sm font-semibold text-brand">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="self-start rounded-full bg-brand px-6 py-3 font-bold text-white transition hover:bg-brand-dark disabled:bg-brand-disabled"
      >
        {saving ? 'Salvando…' : videoId ? 'Salvar alterações' : 'Criar vídeo'}
      </button>
    </form>
  );
}

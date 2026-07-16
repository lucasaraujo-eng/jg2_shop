'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

/**
 * Campo de upload de imagem com drag-and-drop.
 * Envia para /api/upload (Cloudflare R2) e devolve a URL pública via onChange.
 */
export function ImageUpload({
  value,
  onChange,
  folder = 'uploads',
  label = 'Imagem',
}: {
  value?: string | null;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);

  async function upload(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', folder);
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
    <div className="flex flex-col gap-1.5 text-sm">
      <span className="font-bold text-ink">{label}</span>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          upload(e.dataTransfer.files);
        }}
        className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 border-dashed p-4 transition ${
          dragging ? 'border-brand bg-surface-badge' : 'border-border bg-surface-card hover:border-brand'
        }`}
      >
        <div className="flex h-20 w-20 flex-none items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-alt">
          {value ? (
            <Image src={value} alt="" width={80} height={80} className="h-full w-full object-contain" />
          ) : (
            <svg className="h-7 w-7 text-tertiary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
            </svg>
          )}
        </div>
        <div className="min-w-0 flex-1 text-sm">
          {busy ? (
            <span className="font-semibold text-brand">Enviando…</span>
          ) : (
            <>
              <p className="font-semibold text-ink">
                Arraste uma imagem ou <span className="text-brand">clique para escolher</span>
              </p>
              <p className="mt-0.5 truncate text-xs text-tertiary">
                {value ? value : 'PNG, JPG ou WEBP · até 8 MB'}
              </p>
            </>
          )}
        </div>
        {value && !busy && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange('');
            }}
            className="flex-none rounded-lg border border-border px-3 py-2 text-xs font-bold text-muted-2 hover:border-brand hover:text-brand"
          >
            Remover
          </button>
        )}
      </div>

      {error && <p className="text-xs font-semibold text-brand">{error}</p>}

      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => upload(e.target.files)} />
    </div>
  );
}

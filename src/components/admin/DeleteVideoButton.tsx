'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteVideo } from '@/server/actions/videos';

export function DeleteVideoButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleClick() {
    if (!window.confirm(`Remover o vídeo "${title}"?`)) return;
    setBusy(true);
    const result = await deleteVideo(id);
    setBusy(false);
    if (result.ok) router.refresh();
    else window.alert(result.error);
  }

  return (
    <button
      type="button"
      disabled={busy}
      onClick={handleClick}
      className="text-xs font-bold text-brand hover:underline disabled:opacity-50"
    >
      {busy ? '…' : 'Excluir'}
    </button>
  );
}

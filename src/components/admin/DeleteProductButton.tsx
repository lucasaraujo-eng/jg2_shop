'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteProduct } from '@/server/actions/products';

export function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    if (!confirm(`Remover "${name}"? Essa ação não pode ser desfeita.`)) return;
    setBusy(true);
    const result = await deleteProduct(id);
    setBusy(false);
    if (result.ok) router.refresh();
    else alert(result.error);
  }

  return (
    <button onClick={handleDelete} disabled={busy} className="text-xs font-bold text-brand hover:underline disabled:opacity-50">
      {busy ? 'Removendo…' : 'Remover'}
    </button>
  );
}

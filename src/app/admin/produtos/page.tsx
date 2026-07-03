import Link from 'next/link';
import { listAdminProducts } from '@/server/actions/products';
import { DeleteProductButton } from '@/components/admin/DeleteProductButton';

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const products = await listAdminProducts(q);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-black text-ink">Produtos</h1>
          <p className="mt-1 text-sm text-tertiary">{products.length} produtos cadastrados no catálogo.</p>
        </div>
        <Link
          href="/admin/produtos/novo"
          className="flex flex-none items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-dark"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Adicionar produto
        </Link>
      </div>

      <div className="mt-6 rounded-2xl border border-border-soft bg-white shadow-sm">
        <div className="border-b border-border-soft p-4">
          <form className="relative max-w-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-tertiary">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.4-3.4" />
            </svg>
            <input
              type="search"
              name="q"
              defaultValue={q ?? ''}
              placeholder="Buscar por nome ou código…"
              className="w-full rounded-full border border-border bg-surface-card py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-brand focus:bg-white"
            />
          </form>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="text-left text-xs font-bold uppercase tracking-wide text-tertiary">
              <tr>
                <th className="px-5 py-3">Código</th>
                <th className="px-5 py-3">Nome</th>
                <th className="px-5 py-3">Categoria</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-border-soft transition hover:bg-surface-card">
                  <td className="px-5 py-3.5 font-mono text-xs font-bold text-brand">{p.code}</td>
                  <td className="px-5 py-3.5 font-semibold text-ink">{p.name}</td>
                  <td className="px-5 py-3.5">
                    <span className="rounded-full bg-surface-alt px-2.5 py-1 text-xs font-semibold text-muted-2">{p.category.name}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${p.active ? 'bg-success/10 text-success' : 'bg-surface-alt text-tertiary'}`}>
                      {p.active ? 'Ativo' : 'Oculto'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex justify-end gap-4">
                      <Link href={`/admin/produtos/${p.id}`} className="text-xs font-bold text-ink hover:text-brand">
                        Editar
                      </Link>
                      <DeleteProductButton id={p.id} name={p.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="flex flex-col items-center gap-2 px-6 py-14 text-center">
            <span className="text-3xl">📦</span>
            <p className="text-sm font-semibold text-ink">Nenhum produto encontrado</p>
            <p className="text-sm text-tertiary">Ajuste a busca ou cadastre um novo produto.</p>
          </div>
        )}
      </div>
    </div>
  );
}

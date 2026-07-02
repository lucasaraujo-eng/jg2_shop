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
        <h1 className="font-display text-2xl font-black text-ink">Produtos ({products.length})</h1>
        <Link href="/admin/produtos/novo" className="rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-dark">
          + Adicionar produto
        </Link>
      </div>

      <form className="mt-6 max-w-sm">
        <input
          type="search"
          name="q"
          defaultValue={q ?? ''}
          placeholder="Buscar por nome ou código…"
          className="w-full rounded-full border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
        />
      </form>

      <div className="mt-6 overflow-hidden rounded-xl border border-border-soft bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="border-b border-border-soft bg-surface-alt text-left text-xs uppercase text-tertiary">
              <tr>
                <th className="px-4 py-3">Código</th>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Categoria</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-border-soft last:border-0">
                  <td className="px-4 py-3 font-mono text-brand">{p.code}</td>
                  <td className="px-4 py-3 font-semibold text-ink">{p.name}</td>
                  <td className="px-4 py-3 text-muted-2">{p.category.name}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${p.active ? 'bg-success/10 text-success' : 'bg-surface-alt text-tertiary'}`}>
                      {p.active ? 'Ativo' : 'Oculto'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
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
        {products.length === 0 && <p className="p-6 text-center text-sm text-tertiary">Nenhum produto encontrado.</p>}
      </div>
    </div>
  );
}

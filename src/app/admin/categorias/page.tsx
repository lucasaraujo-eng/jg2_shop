import Link from 'next/link';
import { listAdminCategories } from '@/server/actions/categories';

export default async function AdminCategoriesPage() {
  const categories = await listAdminCategories();

  return (
    <div>
      <h1 className="font-display text-2xl font-black text-ink">Categorias</h1>
      <p className="mt-1 text-sm text-tertiary">
        Configure o SEO e o texto de apoio de cada categoria (e das subcategorias).
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border-soft bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="text-left text-xs font-bold uppercase tracking-wide text-tertiary">
              <tr>
                <th className="px-5 py-3">Categoria</th>
                <th className="px-5 py-3">Linha</th>
                <th className="px-5 py-3">Produtos</th>
                <th className="px-5 py-3">SEO</th>
                <th className="px-5 py-3">Texto de apoio</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => {
                const hasSeo = !!(c.seoTitle || c.seoDescription);
                const hasSupport = !!((c.supportHeading && c.supportTldr) || c.supportText);
                return (
                  <tr key={c.id} className="border-t border-border-soft transition hover:bg-surface-card">
                    <td className="px-5 py-3.5 font-semibold text-ink">{c.name}</td>
                    <td className="px-5 py-3.5 text-muted-2">{c.type === 'MAOS_SEGURAS' ? 'Mãos Seguras' : 'LOTO'}</td>
                    <td className="px-5 py-3.5 text-muted-2">{c._count.products}</td>
                    <td className="px-5 py-3.5">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${hasSeo ? 'bg-success/10 text-success' : 'bg-surface-alt text-tertiary'}`}>
                        {hasSeo ? 'Preenchido' : 'Padrão'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${hasSupport ? 'bg-success/10 text-success' : 'bg-surface-alt text-tertiary'}`}>
                        {hasSupport ? 'Preenchido' : 'Padrão'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Link href={`/admin/categorias/${c.id}`} className="text-xs font-bold text-ink hover:text-brand">
                        Editar
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

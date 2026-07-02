import { listAdminProducts } from '@/server/actions/products';

/** Stub (Bloco 1): confirma listagem + auth. CRUD completo entra no Bloco 7. */
export default async function AdminProductsPage() {
  const products = await listAdminProducts();

  return (
    <div>
      <h1 className="font-display text-2xl font-black text-ink">Produtos ({products.length})</h1>
      <ul className="mt-6 flex flex-col gap-2">
        {products.map((p) => (
          <li key={p.id} className="rounded-lg border border-border-soft bg-white px-4 py-3 text-sm">
            <span className="font-mono text-brand">{p.code}</span> — {p.name}{' '}
            <span className="text-tertiary">({p.category.name})</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-tertiary">
        Formulário de criação/edição + upload de imagem entram no Bloco 7.
      </p>
    </div>
  );
}

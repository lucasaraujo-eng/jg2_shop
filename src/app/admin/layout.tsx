import Link from 'next/link';

/** Stub (Bloco 1): navegação mínima do admin. UI final entra no Bloco 7. */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-alt">
      <header className="border-b border-border-soft bg-white px-4 py-4 sm:px-7">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <Link href="/admin/produtos" className="font-display text-lg font-black text-ink">
            JG2 <span className="text-brand">Admin</span>
          </Link>
          <nav className="flex gap-4 text-sm font-semibold uppercase sm:gap-6">
            <Link href="/admin/produtos" className="hover:text-brand">
              Produtos
            </Link>
            <Link href="/admin/blog" className="hover:text-brand">
              Blog
            </Link>
            <Link href="/admin/orcamentos" className="hover:text-brand">
              Orçamentos
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-[1200px] px-4 py-10 sm:px-7">{children}</main>
    </div>
  );
}

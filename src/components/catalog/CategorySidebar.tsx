import Link from 'next/link';
import type { getCategories } from '@/server/catalog';

type Categories = Awaited<ReturnType<typeof getCategories>>;

/** Sidebar sticky de categorias — sem interatividade, então nem precisa ser client. */
export function CategorySidebar({ categories, activeSlug }: { categories: Categories; activeSlug: string | null }) {
  return (
    <nav aria-label="Categorias" className="hidden w-[240px] flex-none lg:block">
      <div className="sticky top-[100px] flex flex-col gap-1">
        <p className="mb-1 px-3 font-mono text-[11px] uppercase tracking-wider text-tertiary">Categorias</p>
        <SidebarLink href="/produtos" label="Todos" active={activeSlug === null} />
        {categories.map((c) => (
          <SidebarLink key={c.id} href={`/produtos/${c.slug}`} label={c.name} active={c.slug === activeSlug} />
        ))}
      </div>
    </nav>
  );
}

function SidebarLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
        active ? 'bg-surface-badge text-brand' : 'text-muted-2 hover:bg-surface-alt'
      }`}
    >
      {label}
    </Link>
  );
}

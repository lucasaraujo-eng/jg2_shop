import Link from 'next/link';
import type { getCategories } from '@/server/catalog';

type Categories = Awaited<ReturnType<typeof getCategories>>;

export function CategorySidebar({
  categories,
  activeSlug,
  subcategories,
  categoryBasePath,
  activeSubSlug,
}: {
  categories: Categories;
  activeSlug: string | null;
  subcategories?: { id: string; name: string; slug: string }[];
  categoryBasePath?: string;
  activeSubSlug?: string | null;
}) {
  if (subcategories && categoryBasePath) {
    return (
      <nav aria-label="Categorias" className="hidden w-[240px] flex-none lg:block">
        <div className="sticky top-[160px] flex flex-col gap-1">
          <p className="mb-1 px-3 font-mono text-xs uppercase tracking-wider text-tertiary">Categorias</p>
          <SidebarLink href={categoryBasePath} label="Todos" active={!activeSubSlug} />
          {subcategories.map((sc) => (
            <SidebarLink key={sc.id} href={`${categoryBasePath}/${sc.slug}`} label={sc.name} active={sc.slug === activeSubSlug} />
          ))}
        </div>
      </nav>
    );
  }

  const loto = categories.filter((c) => c.type === 'LOTO');
  return (
    <nav aria-label="Categorias" className="hidden w-[240px] flex-none lg:block">
      <div className="sticky top-[160px] flex flex-col gap-1">
        <p className="mb-1 px-3 font-mono text-xs uppercase tracking-wider text-tertiary">Categorias</p>
        <SidebarLink href="/produtos" label="Todos" active={activeSlug === null} />
        {loto.map((c) => (
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

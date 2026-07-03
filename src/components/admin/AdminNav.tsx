'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  {
    href: '/admin/produtos',
    label: 'Produtos',
    icon: (
      <path d="M21 8v13H3V8M1 3h22v5H1V3zM10 12h4" />
    ),
  },
  {
    href: '/admin/blog',
    label: 'Blog',
    icon: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" />
      </>
    ),
  },
  {
    href: '/admin/orcamentos',
    label: 'Orçamentos',
    icon: (
      <>
        <path d="M4 4h16v14H7l-3 3z" />
        <path d="M8 9h8M8 12.5h5" />
      </>
    ),
  },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 items-center gap-1.5 overflow-x-auto">
      {LINKS.map((l) => {
        const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`flex flex-none items-center gap-2 rounded-full px-3.5 py-2 text-sm font-bold transition ${
              active ? 'bg-brand text-white' : 'text-muted-2 hover:bg-surface-alt hover:text-ink'
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="flex-none">
              {l.icon}
            </svg>
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}

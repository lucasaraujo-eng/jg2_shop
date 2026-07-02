'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CartButton } from '@/components/CartButton';
import { useCart } from '@/stores/cart';
import { searchSite, type SearchResult } from '@/server/actions/search';
import type { getCategories } from '@/server/catalog';

type Categories = Awaited<ReturnType<typeof getCategories>>;

const CONTEUDOS_LINKS = [
  { label: 'Blog', href: '/blog' },
  { label: 'Downloads', href: '/downloads' },
  { label: 'Vídeos', href: '/videos' },
];

const SERVICOS_LINKS = [
  { label: 'Consultoria LOTOTO', href: '/servicos/lototo' },
  { label: 'Consultoria NR-12', href: '/servicos/nr12' },
  { label: 'Consultoria Mãos Seguras', href: '/servicos/maos-seguras' },
];

type MenuKey = 'produtos' | 'servicos' | 'conteudos' | null;

export function Header({ categories }: { categories: Categories }) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult>({ products: [], posts: [] });
  const [searchOpen, setSearchOpen] = useState(false);
  const [, startSearch] = useTransition();
  const navRef = useRef<HTMLDivElement>(null);

  // fecha dropdowns/menu mobile ao trocar de rota — ajuste de estado durante
  // a renderização (não em efeito) para evitar um re-render em cascata.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
    setSearchOpen(false);
  }

  // fecha dropdown ao clicar fora ou pressionar Esc
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenMenu(null);
    }
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  function handleSearchChange(value: string) {
    setQuery(value);
    if (value.trim().length < 2) {
      setResults({ products: [], posts: [] });
      return;
    }
    startSearch(async () => {
      const r = await searchSite(value);
      setResults(r);
    });
  }

  const loto = categories.filter((c) => c.type === 'LOTO');
  const maosSeguras = categories.filter((c) => c.type === 'MAOS_SEGURAS');

  return (
    <header className="sticky top-0 z-[60] border-b border-border-soft bg-white/95 backdrop-blur">
      {/* linha 1 */}
      <div className="border-b border-surface-alt">
        <div className="mx-auto grid max-w-[1340px] grid-cols-[1fr_auto_1fr] items-center gap-6 px-7 py-4">
          <Link href="/" className="justify-self-start font-display text-xl font-black text-ink">
            JG2<span className="text-brand">®</span>
          </Link>

          <div className="relative hidden w-[600px] max-w-full justify-self-center md:block">
            <div className="flex items-center gap-2.5 rounded-full border border-border bg-white px-5 py-3">
              <input
                value={query}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setTimeout(() => setSearchOpen(false), 150)}
                placeholder="Busque por produtos, serviços, catálogos, artigos, etc…"
                aria-label="Buscar"
                className="flex-1 bg-transparent text-sm text-ink outline-none"
              />
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6f6a62" strokeWidth={2} strokeLinecap="round" className="flex-none">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.4-3.4" />
              </svg>
            </div>

            {searchOpen && query.trim().length >= 2 && (
              <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-[90] max-h-[70vh] overflow-y-auto rounded-2xl border border-border-soft bg-white p-2 shadow-[0_18px_44px_rgba(20,18,16,.16)]" style={{ animation: 'jg-fade .14s ease both' }}>
                {results.products.length === 0 && results.posts.length === 0 && (
                  <p className="p-5 text-center text-sm text-tertiary">Nenhum resultado para sua busca.</p>
                )}
                {results.products.length > 0 && (
                  <>
                    <p className="px-3.5 pb-1.5 pt-2.5 font-mono text-[10.5px] font-bold uppercase tracking-wider text-brand">Produtos</p>
                    {results.products.map((r) => (
                      <Link key={r.code} href={`/produto/${encodeURIComponent(r.code)}`} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-surface-alt">
                        <span className="min-w-0 flex-1 truncate font-semibold text-ink">{r.name}</span>
                        <span className="flex-none font-mono text-xs text-tertiary">{r.code}</span>
                      </Link>
                    ))}
                  </>
                )}
                {results.posts.length > 0 && (
                  <>
                    <p className="mt-1 border-t border-surface-stripe-a px-3.5 pb-1.5 pt-3 font-mono text-[10.5px] font-bold uppercase tracking-wider text-brand">Blog</p>
                    {results.posts.map((r) => (
                      <Link key={r.slug} href={`/blog/${r.slug}`} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-surface-alt">
                        <span className="min-w-0 flex-1 truncate font-semibold text-ink">{r.title}</span>
                      </Link>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 justify-self-end">
            <CartButton />
            <Link
              href="/contato"
              className="hidden items-center gap-2 rounded-full border-[1.5px] border-brand px-5 py-2.5 text-sm font-bold text-brand transition hover:bg-brand hover:text-white md:flex"
            >
              <span className="h-2.5 w-2.5 flex-none rounded-full bg-success shadow-[0_0_0_3px_rgba(70,196,106,.25)]" />
              Fale Conosco
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Menu"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border md:hidden"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1b1b1f" strokeWidth={2} strokeLinecap="round">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* linha 2 */}
      <div ref={navRef} className="hidden md:block">
        <div className="mx-auto flex max-w-[1340px] items-center justify-center gap-8 px-7 py-3 text-sm font-bold uppercase tracking-wide text-ink">
          <Link href="/" className="hover:text-brand">
            Home
          </Link>

          <DropdownNav label="Produtos" open={openMenu === 'produtos'} onToggle={() => setOpenMenu((m) => (m === 'produtos' ? null : 'produtos'))}>
            <div className="grid grid-cols-2 gap-8 p-2">
              <div>
                <p className="px-3 pb-2 font-mono text-[11px] uppercase tracking-wider text-brand">Bloqueio e Etiquetagem – LOTO</p>
                {loto.map((c) => (
                  <Link key={c.id} href={`/produtos/${c.slug}`} className="block rounded-lg px-3 py-2 text-sm font-semibold normal-case text-muted-3 hover:bg-surface-alt">
                    {c.name}
                  </Link>
                ))}
              </div>
              <div>
                <p className="px-3 pb-2 font-mono text-[11px] uppercase tracking-wider text-brand">Mãos Seguras</p>
                {maosSeguras.flatMap((c) => c.subcategories).map((sub) => (
                  <p key={sub.id} className="px-3 py-2 text-sm font-semibold normal-case text-muted-3">
                    {sub.name}
                  </p>
                ))}
                {maosSeguras[0] && (
                  <Link href={`/produtos/${maosSeguras[0].slug}`} className="block rounded-lg px-3 py-2 text-sm font-bold normal-case text-brand hover:bg-surface-alt">
                    → Ver todos
                  </Link>
                )}
              </div>
            </div>
          </DropdownNav>

          <DropdownNav label="Serviços" open={openMenu === 'servicos'} onToggle={() => setOpenMenu((m) => (m === 'servicos' ? null : 'servicos'))}>
            <div className="p-2">
              {SERVICOS_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="block rounded-lg px-3 py-2.5 text-sm font-semibold normal-case text-muted-3 hover:bg-surface-alt">
                  {l.label}
                </Link>
              ))}
              <Link href="/servicos" className="mt-1 block rounded-lg border-t border-border-soft px-3 pt-3 text-sm font-bold normal-case text-brand hover:bg-surface-alt">
                → Ver todos os serviços
              </Link>
            </div>
          </DropdownNav>

          <Link href="/downloads" className="hover:text-brand">
            Catálogos
          </Link>
          <Link href="/sobre" className="hover:text-brand">
            Sobre nós
          </Link>

          <DropdownNav label="Conteúdos" open={openMenu === 'conteudos'} onToggle={() => setOpenMenu((m) => (m === 'conteudos' ? null : 'conteudos'))}>
            <div className="p-2">
              {CONTEUDOS_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="block rounded-lg px-3 py-2.5 text-sm font-semibold normal-case text-muted-3 hover:bg-surface-alt">
                  {l.label}
                </Link>
              ))}
            </div>
          </DropdownNav>
        </div>
      </div>

      {mobileOpen && (
        <MobileMenu categories={categories} onClose={() => setMobileOpen(false)} />
      )}
    </header>
  );
}

function DropdownNav({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <button onClick={onToggle} aria-expanded={open} className="flex items-center gap-1.5 hover:text-brand">
        {label} <span className="text-xs">⌄</span>
      </button>
      {open && (
        <div
          className="absolute left-1/2 top-[calc(100%+12px)] z-[90] min-w-[280px] -translate-x-1/2 rounded-2xl border border-border-soft bg-white shadow-[0_12px_32px_rgba(20,18,16,.10)]"
          style={{ animation: 'jg-fade .16s ease both' }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function MobileMenu({ categories, onClose }: { categories: Categories; onClose: () => void }) {
  const cartCount = useCart((s) => s.items.reduce((n, i) => n + i.quantity, 0));
  const openCart = useCart((s) => s.open);
  return (
    <div className="fixed inset-0 z-[80] md:hidden">
      <button className="absolute inset-0 bg-ink/40" style={{ animation: 'jg-fade .2s ease both' }} onClick={onClose} aria-label="Fechar menu" />
      <div className="absolute inset-x-0 top-0 max-h-full overflow-y-auto bg-white p-6" style={{ animation: 'jg-up .26s ease both' }}>
        <div className="flex items-center justify-between">
          <span className="font-display text-xl font-black text-ink">
            JG2<span className="text-brand">®</span>
          </span>
          <button onClick={onClose} aria-label="Fechar" className="p-2 text-ink">
            ✕
          </button>
        </div>

        <nav className="mt-6 flex flex-col gap-1 text-sm font-semibold">
          <Link href="/" onClick={onClose} className="rounded-lg px-3 py-3 hover:bg-surface-alt">
            Home
          </Link>

          <p className="mt-3 px-3 font-mono text-[11px] uppercase tracking-wider text-brand">Produtos</p>
          {categories.map((c) => (
            <Link key={c.id} href={`/produtos/${c.slug}`} onClick={onClose} className="rounded-lg px-3 py-2.5 pl-6 hover:bg-surface-alt">
              {c.name}
            </Link>
          ))}

          <p className="mt-3 px-3 font-mono text-[11px] uppercase tracking-wider text-brand">Serviços</p>
          <Link href="/servicos" onClick={onClose} className="rounded-lg px-3 py-2.5 pl-6 font-bold hover:bg-surface-alt">
            Ver todos os serviços
          </Link>
          {SERVICOS_LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={onClose} className="rounded-lg px-3 py-2.5 pl-6 hover:bg-surface-alt">
              {l.label}
            </Link>
          ))}

          <Link href="/downloads" onClick={onClose} className="mt-3 rounded-lg px-3 py-3 hover:bg-surface-alt">
            Catálogos
          </Link>
          <Link href="/sobre" onClick={onClose} className="rounded-lg px-3 py-3 hover:bg-surface-alt">
            Sobre nós
          </Link>

          <p className="mt-3 px-3 font-mono text-[11px] uppercase tracking-wider text-brand">Conteúdos</p>
          {CONTEUDOS_LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={onClose} className="rounded-lg px-3 py-2.5 pl-6 hover:bg-surface-alt">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 flex flex-col gap-3 border-t border-border-soft pt-6">
          <Link href="/contato" onClick={onClose} className="flex items-center justify-center gap-2 rounded-full border-[1.5px] border-brand py-3 text-sm font-bold text-brand">
            <span className="h-2.5 w-2.5 rounded-full bg-success" /> Fale Conosco
          </Link>
          <button
            onClick={() => {
              onClose();
              openCart();
            }}
            className="rounded-full bg-brand py-3 text-center text-sm font-bold text-white"
          >
            Ver meu orçamento ({cartCount})
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CartButton } from '@/components/CartButton';
import { useCart } from '@/stores/cart';
import { searchSite, type SearchResult } from '@/server/actions/search';
import type { getCategories } from '@/server/catalog';
import { slugify, resolveImageUrl } from '@/lib/utils';
import { ProposalRequestButton } from '@/components/ProposalRequestButton';

type Categories = Awaited<ReturnType<typeof getCategories>>;

const CONTEUDOS_LINKS = [
  { label: 'Blog', href: '/blog' },
  { label: 'Downloads', href: '/downloads' },
  { label: 'Vídeos', href: '/videos' },
];

/** Lista curada do dropdown "Produtos" (LOTO) — rótulos e recorte exatos do protótipo, não é 1:1 com o nome/lista completa das categorias no banco (ex.: "Malas e Bolsas" não aparece aqui). */
const PROD_LOTO_MENU = [
  { label: 'Cadeados de Bloqueio', categoryName: 'Cadeados de Bloqueio' },
  { label: 'Etiquetas de Bloqueio', categoryName: 'Etiquetas e Placas' },
  { label: 'Garras de Bloqueio', categoryName: 'Garras de Bloqueio' },
  { label: 'Bloqueios Elétricos', categoryName: 'Bloqueios Elétricos' },
  { label: 'Bloqueios de Válvulas', categoryName: 'Bloqueio de Válvulas' },
  { label: 'Caixas e Estações de Bloqueio', categoryName: 'Caixas e Estações' },
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
  const [results, setResults] = useState<SearchResult>({
    products: [],
    posts: [],
  });
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

  const maosSeguras = categories.filter((c) => c.type === 'MAOS_SEGURAS');
  const slugByCategoryName = new Map(categories.map((c) => [c.name, c.slug]));

  const isHomeActive = pathname === '/';
  const isProdutosActive = pathname.startsWith('/produtos') || pathname.startsWith('/produto/');
  const isServicosActive = pathname === '/servicos' || pathname.startsWith('/servicos/');
  const isCatalogosActive = pathname === '/downloads';
  const isSobreActive = pathname === '/sobre';
  const isConteudosActive = pathname.startsWith('/blog') || pathname === '/videos';
  const activeClass = 'text-brand';
  const inactiveClass = 'hover:text-brand';

  return (
    <>
      <header className="sticky top-0 z-[60] border-b border-border-soft bg-white/95 backdrop-blur">
        <div className="border-b border-surface-alt">
          <div className="mx-auto flex max-w-[1340px] items-center justify-between gap-6 px-7 py-4 md:grid md:grid-cols-[1fr_auto_1fr]">
            <Link href="/" className="flex-none md:justify-self-start">
              <Image src="/assets/jg2-logo.png" alt="JG2 Produtos de Segurança" width={800} height={400} priority className="h-[60px] w-auto" />
            </Link>

            <div className="relative hidden w-[600px] max-w-full justify-self-center md:block">
              <div className="flex items-center gap-2.5 rounded-full border border-border bg-white px-5 py-3">
                <input value={query} onChange={(e) => handleSearchChange(e.target.value)} onFocus={() => setSearchOpen(true)} onBlur={() => setTimeout(() => setSearchOpen(false), 150)} placeholder="Busque por produtos, serviços, catálogos, artigos, etc…" aria-label="Buscar" className="flex-1 bg-transparent text-sm text-ink outline-none" />
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6f6a62" strokeWidth={2} strokeLinecap="round" className="flex-none">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.4-3.4" />
                </svg>
              </div>

              {searchOpen && query.trim().length >= 2 && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-[90] max-h-[70vh] overflow-y-auto rounded-2xl border border-border-soft bg-white p-2 shadow-[0_18px_44px_rgba(20,18,16,.16)]" style={{ animation: 'jg-fade .14s ease both' }}>
                  {results.products.length === 0 && results.posts.length === 0 && <p className="p-5 text-center text-sm text-tertiary">Nenhum resultado para sua busca.</p>}
                  {results.products.length > 0 && (
                    <>
                      <p className="px-3.5 pb-1.5 pt-2.5 font-mono text-xs font-bold uppercase tracking-wider text-brand">Produtos</p>
                      {results.products.map((r) => {
                        const image = resolveImageUrl(r.image);
                        return (
                          <Link key={r.code} href={`/produto/${encodeURIComponent(r.code)}`} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-surface-alt">
                            <span className="relative flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-lg border border-border-soft bg-surface-alt">
                              {image ? <Image src={image} alt="" fill sizes="40px" className="object-contain" /> : null}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate font-semibold text-ink">{r.name}</span>
                              <span className="block font-mono text-xs text-tertiary">
                                {r.code} · {r.categoryName}
                              </span>
                            </span>
                          </Link>
                        );
                      })}
                    </>
                  )}
                  {results.posts.length > 0 && (
                    <>
                      <p className="mt-1 border-t border-surface-stripe-a px-3.5 pb-1.5 pt-3 font-mono text-xs font-bold uppercase tracking-wider text-brand">Blog</p>
                      {results.posts.map((r) => (
                        <Link key={r.slug} href={`/blog/${r.slug}`} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-surface-alt">
                          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-surface-badge text-brand">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                            </svg>
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-semibold text-ink">{r.title}</span>
                            {r.tag && <span className="block font-mono text-xs text-tertiary">{r.tag}</span>}
                          </span>
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="col-start-3 flex items-center gap-4 justify-self-end">
              <CartButton />
              <ProposalRequestButton
                objective="Outro assunto"
                className="hidden items-center gap-2 rounded-full border-[1.5px] border-brand px-5 py-2.5 text-sm font-bold text-brand transition hover:bg-brand hover:text-white md:flex"
              >
                <span className="h-2.5 w-2.5 flex-none rounded-full bg-success shadow-[0_0_0_3px_rgba(70,196,106,.25)]" />
                Fale Conosco
              </ProposalRequestButton>
              <button onClick={() => setMobileOpen(true)} aria-label="Menu" className="flex h-11 w-11 items-center justify-center rounded-xl border border-border md:hidden">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1b1b1f" strokeWidth={2} strokeLinecap="round">
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div ref={navRef} className="hidden md:block">
          <div className="mx-auto grid max-w-[1340px] grid-cols-[1fr_auto_1fr] items-center gap-6 px-7 py-3">
            <span />
            <div className="flex items-center justify-self-center gap-8 text-sm font-bold uppercase tracking-wide text-ink">
              <Link href="/" className={isHomeActive ? activeClass : inactiveClass}>
                Home
              </Link>

              <ProdutosDropdown
                active={isProdutosActive}
                open={openMenu === 'produtos'}
                onToggle={() => setOpenMenu((m) => (m === 'produtos' ? null : 'produtos'))}
                lotoItems={PROD_LOTO_MENU.map((item) => ({
                  label: item.label,
                  slug: slugByCategoryName.get(item.categoryName),
                })).filter((item): item is { label: string; slug: string } => !!item.slug)}
                maosSeguras={maosSeguras[0] ?? null}
              />

              <DropdownNav label="Serviços" active={isServicosActive} open={openMenu === 'servicos'} onToggle={() => setOpenMenu((m) => (m === 'servicos' ? null : 'servicos'))}>
                <div className="p-2">
                  {SERVICOS_LINKS.map((l) => (
                    <Link key={l.href} href={l.href} className="block rounded-lg px-3 py-2.5 text-sm font-semibold normal-case text-muted-3 transition hover:bg-surface-alt hover:text-brand">
                      {l.label}
                    </Link>
                  ))}
                </div>
              </DropdownNav>

              <Link href="/downloads" className={isCatalogosActive ? activeClass : inactiveClass}>
                Catálogos
              </Link>
              <Link href="/sobre" className={isSobreActive ? activeClass : inactiveClass}>
                Sobre nós
              </Link>

              <DropdownNav label="Conteúdos" active={isConteudosActive} open={openMenu === 'conteudos'} onToggle={() => setOpenMenu((m) => (m === 'conteudos' ? null : 'conteudos'))}>
                <div className="p-2">
                  {CONTEUDOS_LINKS.map((l) => (
                    <Link key={l.href} href={l.href} className="block rounded-lg px-3 py-2.5 text-sm font-semibold normal-case text-muted-3 transition hover:bg-surface-alt hover:text-brand">
                      {l.label}
                    </Link>
                  ))}
                </div>
              </DropdownNav>
            </div>

            <Link href="/servicos/lototo#software" className="justify-self-end whitespace-nowrap rounded-full border-[1.5px] border-brand bg-brand px-5 py-2.5 text-sm font-extrabold text-white transition hover:bg-white hover:text-brand">
              JG2 Smart LOTO®
            </Link>
          </div>
        </div>
      </header>

      {mobileOpen && <MobileMenu categories={categories} onClose={() => setMobileOpen(false)} />}
    </>
  );
}

function DropdownNav({ label, active = false, open, onToggle, children }: { label: string; active?: boolean; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className="relative">
      <button onClick={onToggle} aria-expanded={open} className={`flex items-center gap-1.5 uppercase hover:text-brand ${active ? 'text-brand' : ''}`}>
        {label} <span className="text-xs">⌄</span>
      </button>
      {open && (
        <div className="absolute -left-3 top-[calc(100%+12px)] z-[90] min-w-[280px] rounded-2xl border border-border-soft bg-white shadow-[0_12px_32px_rgba(20,18,16,.10)]" style={{ animation: 'jg-fade .16s ease both' }}>
          {children}
        </div>
      )}
    </div>
  );
}

/**
 * Flyout de dois estágios: painel 1 com só 2 linhas (LOTO / Mãos Seguras,
 * cada uma navegável), painel 2 troca de conteúdo conforme qual linha está
 * em hover (LOTO por padrão).
 */
function ProdutosDropdown({ active, open, onToggle, lotoItems, maosSeguras }: { active: boolean; open: boolean; onToggle: () => void; lotoItems: { label: string; slug: string }[]; maosSeguras: Categories[number] | null }) {
  const [hoverCat, setHoverCat] = useState<'loto' | 'maos'>('loto');
  const maosHref = maosSeguras ? `/produtos/${maosSeguras.slug}` : '/produtos';

  return (
    <div className="relative">
      <button onClick={onToggle} aria-expanded={open} className={`flex items-center gap-1.5 uppercase hover:text-brand ${active ? 'text-brand' : ''}`}>
        Produtos <span className="text-xs">⌄</span>
      </button>
      {open && (
        <div className="absolute -left-3 top-[calc(100%+12px)] z-[90] flex items-start gap-2" style={{ animation: 'jg-fade .16s ease both' }}>
          <div className="w-[262px] flex-none rounded-2xl border border-border-soft bg-white p-1.5 shadow-[0_12px_32px_rgba(20,18,16,.10)]">
            <Link href="/produtos" onMouseEnter={() => setHoverCat('loto')} className={`flex items-center gap-2 rounded-lg px-3.5 py-3 text-sm normal-case transition ${hoverCat === 'loto' ? 'bg-surface-alt text-brand' : 'text-ink hover:bg-surface-alt'}`}>
              <span className="flex-1 font-bold leading-tight">Bloqueio e Etiquetagem – LOTO</span>
              <span className="text-tertiary">›</span>
            </Link>
            <Link href={maosHref} onMouseEnter={() => setHoverCat('maos')} className={`flex items-center gap-2 rounded-lg px-3.5 py-3 text-sm normal-case transition ${hoverCat === 'maos' ? 'bg-surface-alt text-brand' : 'text-ink hover:bg-surface-alt'}`}>
              <span className="flex-1 font-bold">Mãos Seguras</span>
              <span className="text-tertiary">›</span>
            </Link>
          </div>

          <div className="w-[280px] flex-none rounded-2xl border border-border-soft bg-white p-1.5 shadow-[0_12px_32px_rgba(20,18,16,.10)]">
            {hoverCat === 'loto'
              ? lotoItems.map((item) => (
                  <Link key={item.slug} href={`/produtos/${item.slug}`} className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm normal-case text-muted-3 transition hover:bg-surface-alt hover:text-brand">
                    <span className="h-1.5 w-1.5 flex-none rounded-full bg-brand" />
                    {item.label}
                  </Link>
                ))
              : maosSeguras?.subcategories.map((sub) => (
                  <Link key={sub.id} href={`${maosHref}#${slugify(sub.name)}`} className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm normal-case text-muted-3 transition hover:bg-surface-alt hover:text-brand">
                    <span className="h-1.5 w-1.5 flex-none rounded-full bg-brand" />
                    {sub.name}
                  </Link>
                ))}
            <Link href={hoverCat === 'loto' ? '/produtos' : maosHref} className="mt-1 block rounded-lg border-t border-border-soft px-3 pt-3 text-sm font-bold text-brand hover:bg-surface-alt">
              → ver todos
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function MobileMenu({ categories, onClose }: { categories: Categories; onClose: () => void }) {
  const cartCount = useCart((s) => s.items.reduce((n, i) => n + i.quantity, 0));
  const openCart = useCart((s) => s.open);
  const maosSegurasSlug = categories.find((c) => c.type === 'MAOS_SEGURAS')?.slug;
  return (
    <div className="fixed inset-0 z-[80] md:hidden">
      <button className="absolute inset-0 bg-ink/40" style={{ animation: 'jg-fade .2s ease both' }} onClick={onClose} aria-label="Fechar menu" />
      <div className="absolute inset-x-0 top-0 max-h-full overflow-y-auto bg-white p-6" style={{ animation: 'jg-up .26s ease both' }}>
        <div className="flex items-center justify-between">
          <Image src="/assets/jg2-logo.png" alt="JG2" width={800} height={400} className="h-10 w-auto" />
          <button onClick={onClose} aria-label="Fechar" className="p-2 text-ink">
            ✕
          </button>
        </div>

        <Link href="/produtos" onClick={onClose} className="mt-4 flex items-center gap-2.5 rounded-xl border border-border bg-surface-alt px-4 py-3 text-sm text-tertiary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6f6a62" strokeWidth={2} strokeLinecap="round" className="flex-none">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.4-3.4" />
          </svg>
          Buscar produtos, serviços…
        </Link>

        <nav className="mt-4 flex flex-col gap-1 text-sm font-semibold">
          <Link href="/" onClick={onClose} className="rounded-lg px-3 py-3 hover:bg-surface-alt">
            Home
          </Link>

          <p className="mt-3 px-3 font-mono text-xs uppercase tracking-wider text-brand">Produtos</p>
          <Link href="/produtos" onClick={onClose} className="rounded-lg px-3 py-2.5 pl-6 transition hover:bg-surface-alt hover:text-brand">
            Bloqueio e Etiquetagem – LOTO
          </Link>
          {maosSegurasSlug && (
            <Link href={`/produtos/${maosSegurasSlug}`} onClick={onClose} className="rounded-lg px-3 py-2.5 pl-6 transition hover:bg-surface-alt hover:text-brand">
              Mãos Seguras
            </Link>
          )}

          <p className="mt-3 px-3 font-mono text-xs uppercase tracking-wider text-brand">Serviços</p>
          {SERVICOS_LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={onClose} className="rounded-lg px-3 py-2.5 pl-6 transition hover:bg-surface-alt hover:text-brand">
              {l.label}
            </Link>
          ))}

          <Link href="/downloads" onClick={onClose} className="mt-3 rounded-lg px-3 py-3 hover:bg-surface-alt">
            Catálogos
          </Link>
          <Link href="/sobre" onClick={onClose} className="rounded-lg px-3 py-3 hover:bg-surface-alt">
            Sobre nós
          </Link>

          <p className="mt-3 px-3 font-mono text-xs uppercase tracking-wider text-brand">Conteúdos</p>
          {CONTEUDOS_LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={onClose} className="rounded-lg px-3 py-2.5 pl-6 transition hover:bg-surface-alt hover:text-brand">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 flex flex-col gap-3 border-t border-border-soft pt-6">
          <ProposalRequestButton
            objective="Outro assunto"
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded-full border-[1.5px] border-brand py-3 text-sm font-bold text-brand"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-success" /> Fale Conosco
          </ProposalRequestButton>
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

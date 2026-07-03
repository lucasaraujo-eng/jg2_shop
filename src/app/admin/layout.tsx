import Link from 'next/link';
import { auth, signOut } from '@/lib/auth';
import { AdminNav } from '@/components/admin/AdminNav';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // Tela de login tem identidade visual própria, sem o chrome autenticado.
  if (!session) {
    return <div className="min-h-screen bg-surface-alt">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-surface-alt">
      <header className="sticky top-0 z-10 border-b border-border-soft bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] items-center gap-5 px-5 py-3 sm:px-7">
          <Link href="/admin/produtos" className="flex flex-none items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/jg2-logo.png" alt="JG2" className="h-7 w-auto" />
            <span className="hidden h-5 w-px bg-border-soft sm:block" />
            <span className="hidden font-mono text-[11px] font-bold uppercase tracking-widest text-tertiary sm:block">Admin</span>
          </Link>

          <AdminNav />

          <div className="flex flex-none items-center gap-3">
            <div className="hidden text-right leading-tight sm:block">
              <p className="text-xs font-bold text-ink">{session.user?.name ?? 'Administrador'}</p>
              <p className="text-[11px] text-tertiary">{session.user?.email}</p>
            </div>
            <form
              action={async () => {
                'use server';
                await signOut({ redirectTo: '/admin/login' });
              }}
            >
              <button
                type="submit"
                aria-label="Sair"
                title="Sair"
                className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-border text-muted-2 transition hover:border-brand hover:text-brand"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <path d="M16 17l5-5-5-5M21 12H9" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[1200px] px-5 py-8 sm:px-7 sm:py-10">{children}</main>
    </div>
  );
}

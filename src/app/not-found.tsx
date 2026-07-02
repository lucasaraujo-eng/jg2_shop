import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[600px] flex-col items-center justify-center px-7 text-center">
      <p className="font-mono text-sm text-brand">404</p>
      <h1 className="mt-2 font-display text-3xl font-black text-ink">Página não encontrada</h1>
      <p className="mt-2 text-muted">A página que você procura não existe ou foi movida.</p>
      <Link href="/" className="mt-8 rounded-full bg-brand px-6 py-3 font-bold text-white transition hover:bg-brand-dark">
        Voltar à home
      </Link>
    </div>
  );
}

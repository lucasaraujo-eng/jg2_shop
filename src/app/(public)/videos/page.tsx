import Link from 'next/link';

export default function VideosPage() {
  return (
    <div>
      <section className="bg-ink-deep py-14 text-white">
        <div className="mx-auto max-w-[1340px] px-7">
          <p className="text-xs text-white/50">
            <Link href="/" className="hover:text-white">
              Home
            </Link>{' '}
            /{' '}
            <Link href="/blog" className="hover:text-white">
              Conteúdos
            </Link>{' '}
            / Vídeos
          </p>
          <p className="mt-4 inline-block rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide">Vídeos</p>
          <h1 className="mt-4 font-display text-4xl font-black">Vídeos sobre segurança e LOTO</h1>
          <p className="mt-3 max-w-xl text-white/70">
            Demonstrações, institucionais e conteúdos técnicos para entender na prática como proteger sua operação.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1340px] px-7 py-24 text-center">
        <p className="font-display text-2xl font-black leading-tight text-ink sm:text-3xl">
          Muitos conteúdos relevantes serão lançados em breve, aguarde!
        </p>
      </section>
    </div>
  );
}

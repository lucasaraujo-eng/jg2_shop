import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { CartDrawer } from '@/components/CartDrawer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { ProposalRequestButton } from '@/components/ProposalRequestButton';
import { RecaptchaScript } from '@/components/RecaptchaScript';
import { RecaptchaNotice } from '@/components/RecaptchaNotice';
import { CookieConsent } from '@/components/CookieConsent';
import { getCategories } from '@/server/catalog';

export const revalidate = 3600;

const MAOS_LINKS = [
  { label: 'Extensores Industriais', href: '/produtos/maos-seguras/extensores-industriais' },
  { label: 'Proteção de Impacto', href: '/produtos/maos-seguras/protecao-de-impacto' },
  { label: 'Movimentação e Transporte', href: '/produtos/maos-seguras/movimentacao-e-transporte' },
  { label: 'Armazenamento Seguro', href: '/produtos/maos-seguras/armazenamento-seguro' },
  { label: 'Fixação e Ajuste', href: '/produtos/maos-seguras/fixacao-e-ajuste' },
];

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories();

  return (
    <>
      <Header categories={categories} />
      <main className="min-h-screen flex-1">{children}</main>
      <CartDrawer />
      <ScrollReveal />
      <WhatsAppFloat />
      <CookieConsent />
      <RecaptchaScript />

      <footer className="bg-ink-deep">
        <div className="mx-auto grid max-w-[1340px] grid-cols-2 gap-10 px-7 py-14 md:grid-cols-3 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Image src="/assets/jg2-logo-white-r.png" alt="JG2®" width={800} height={400} className="h-16 w-auto" />
            <p className="mt-4 max-w-xs text-sm text-white/70">
              Nosso time de especialistas está pronto para te atender e entregar a solução ideal para o seu projeto!
            </p>
            <ProposalRequestButton objective="Outro assunto" className="mt-4 inline-block text-sm font-bold text-brand hover:underline">
              Fale com nosso time →
            </ProposalRequestButton>
          </div>

          <div>
            <p className="font-display text-sm font-black uppercase tracking-wide text-white">Menu rápido</p>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-white/70">
              <li>
                <Link href="/" className="hover:text-brand">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/servicos/lototo" className="hover:text-brand">
                  Consultoria LOTOTO
                </Link>
              </li>
              <li>
                <Link href="/servicos/nr12" className="hover:text-brand">
                  Consultoria NR-12
                </Link>
              </li>
              <li>
                <Link href="/servicos/maos-seguras" className="hover:text-brand">
                  Consultoria Mãos Seguras
                </Link>
              </li>
              <li>
                <Link href="/servicos/lototo#software" className="hover:text-brand">
                  Software
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-brand">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/videos" className="hover:text-brand">
                  Vídeos
                </Link>
              </li>
              <li>
                <Link href="/downloads" className="hover:text-brand">
                  Downloads
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-brand">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link href="/orcamento" className="hover:text-brand">
                  Orçamento
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-display text-sm font-black uppercase tracking-wide text-white">Bloqueio e Etiquetagem</p>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-white/70">
              <li>
                <Link href="/produtos/cadeados-de-bloqueio" className="hover:text-brand">
                  Cadeados de Bloqueio
                </Link>
              </li>
              <li>
                <Link href="/produtos/etiquetas-e-placas" className="hover:text-brand">
                  Etiquetas e Placas
                </Link>
              </li>
              <li>
                <Link href="/produtos/garras-de-bloqueio" className="hover:text-brand">
                  Garras de Bloqueio
                </Link>
              </li>
              <li>
                <Link href="/produtos/bloqueio-de-valvulas" className="hover:text-brand">
                  Bloqueio de Válvulas
                </Link>
              </li>
              <li>
                <Link href="/produtos/bloqueios-eletricos" className="hover:text-brand">
                  Bloqueios Elétricos
                </Link>
              </li>
              <li>
                <Link href="/produtos/caixas-e-estacoes" className="hover:text-brand">
                  Caixas e Estações de Bloqueio
                </Link>
              </li>
              <li>
                <Link href="/produtos/bloqueios-de-cabo" className="hover:text-brand">
                  Bloqueios de Cabo
                </Link>
              </li>
              <li>
                <Link href="/produtos/malas-e-bolsas" className="hover:text-brand">
                  Malas e Bolsas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-display text-sm font-black uppercase tracking-wide text-white">Mãos Seguras</p>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-white/70">
              {MAOS_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-sm font-black uppercase tracking-wide text-white">Contato</p>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-white/70">
              <li>+55 31 9 9669-0692</li>
              <li>comercial@jg2ps.com.br</li>
              <li>R. das Palmeiras, 95 - Distrito Industrial, Timóteo - MG, 35181-672</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
          <p>© {new Date().getFullYear()} JG2 Produtos de Segurança®. Todos os direitos reservados.</p>
          <RecaptchaNotice className="mt-1.5" />
        </div>
      </footer>
    </>
  );
}

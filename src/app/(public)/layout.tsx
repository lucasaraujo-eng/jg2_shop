import Link from 'next/link';
import { Header } from '@/components/Header';
import { CartDrawer } from '@/components/CartDrawer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { ProposalRequestButton } from '@/components/ProposalRequestButton';
import { RecaptchaScript } from '@/components/RecaptchaScript';
import { getCategories } from '@/server/catalog';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories();
  const maosSeguras = categories.find((c) => c.type === 'MAOS_SEGURAS');

  return (
    <>
      <Header categories={categories} />
      <main className="min-h-screen flex-1">{children}</main>
      <CartDrawer />
      <ScrollReveal />
      <WhatsAppFloat />
      <RecaptchaScript />

      <footer className="bg-ink-deep">
        <div className="mx-auto grid max-w-[1340px] grid-cols-2 gap-10 px-7 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/jg2-logo-white.png" alt="JG2" className="h-16 w-auto" />
            <p className="mt-4 max-w-xs text-sm text-white/70">
              Nosso time de especialistas está pronto para apresentar as soluções da JG2®.
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
                <Link href="/servicos" className="hover:text-brand">
                  Serviços
                </Link>
              </li>
              <li>
                <Link href="/servicos/lototo#software" className="hover:text-brand">
                  Software
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
              {maosSeguras && (
                <li>
                  <Link href={`/produtos/${maosSeguras.slug}`} className="hover:text-brand">
                    Mãos Seguras
                  </Link>
                </li>
              )}
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
          © {new Date().getFullYear()} JG2 Produtos de Segurança®. Todos os direitos reservados.
        </div>
      </footer>
    </>
  );
}

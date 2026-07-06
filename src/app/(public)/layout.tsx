import Link from 'next/link';
import { Header } from '@/components/Header';
import { CartDrawer } from '@/components/CartDrawer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { getCategories } from '@/server/catalog';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories();

  return (
    <>
      <Header categories={categories} />
      <main className="min-h-screen flex-1">{children}</main>
      <CartDrawer />
      <ScrollReveal />
      <WhatsAppFloat />

      <footer className="bg-surface-footer">
        <div className="mx-auto grid max-w-[1340px] grid-cols-2 gap-10 px-7 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/jg2-logo.png" alt="JG2" className="h-10 w-auto" />
            <p className="mt-4 max-w-xs text-sm text-muted-2">
              Nosso time de especialistas está pronto para apresentar as soluções LOTO da JG2.
            </p>
            <Link href="/contato" className="mt-4 inline-block text-sm font-bold text-brand hover:underline">
              Fale com nosso time →
            </Link>
          </div>

          <div>
            <p className="font-display text-sm font-black uppercase tracking-wide text-ink">Menu rápido</p>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-muted-2">
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
            <p className="font-display text-sm font-black uppercase tracking-wide text-ink">Produtos</p>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-muted-2">
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
            </ul>
          </div>

          <div>
            <p className="font-display text-sm font-black uppercase tracking-wide text-ink">Contato</p>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-muted-2">
              <li>+55 19 3500 8210</li>
              <li>+55 19 99407 3970</li>
              <li>R. das Palmeiras, 95 - Distrito Industrial, Timóteo - MG, 35181-672</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border-soft py-6 text-center text-xs text-tertiary">
          © {new Date().getFullYear()} JG2 Produtos de Segurança. Todos os direitos reservados.
        </div>
      </footer>
    </>
  );
}

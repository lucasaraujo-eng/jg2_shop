import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProductByCode, getRelatedProducts } from '@/server/catalog';
import { productSupportTitle } from '@/lib/catalogText';
import { ProductMediaAndPurchase } from '@/components/product/ProductMediaAndPurchase';
import { ProductTabs } from '@/components/product/ProductTabs';
import { ProductCarousel } from '@/components/ProductCarousel';
import { ClientsMarquee } from '@/components/ClientsMarquee';
import { SupportArticle } from '@/components/SupportArticle';
import { ExpandableSupportText } from '@/components/product/ExpandableSupportText';
import { getPageSeo, pageMetadata } from '@/lib/seo';
import { productSupportFromDb } from '@/lib/productSupport';

type PageProps = { params: Promise<{ code: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;
  const decoded = decodeURIComponent(code);
  const product = await getProductByCode(decoded);
  if (product?.seoTitle || product?.seoDescription) {
    return {
      title: { absolute: product.seoTitle || `${product.name} | JG2` },
      description: product.seoDescription || product.subtitle || product.description[0] || undefined,
    };
  }
  const agency = getPageSeo(`/produto/${decoded}`);
  if (agency) return pageMetadata(`/produto/${decoded}`);
  if (!product) return {};
  return {
    title: { absolute: `${product.name} | JG2` },
    description: product.subtitle || product.description[0] || `Produto ${product.code} da linha JG2®.`,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { code } = await params;
  const decoded = decodeURIComponent(code);
  const product = await getProductByCode(decoded);
  if (!product) notFound();
  const dbSupport = productSupportFromDb(product);
  const agencySupport = getPageSeo(`/produto/${product.code}`)?.support;
  const support = dbSupport ?? agencySupport;

  const related = await getRelatedProducts(product.categoryId, product.id);

  return (
    <div>
      <div className="mx-auto max-w-[1340px] px-7 pt-6 text-xs text-tertiary">
        <Link href="/" className="hover:text-brand">
          Home
        </Link>{' '}
        /{' '}
        <Link href={`/produtos/${product.category.slug}`} className="hover:text-brand">
          Catálogo
        </Link>{' '}
        / <span className="text-muted-2">{product.code}</span>
      </div>

      <div className="mx-auto max-w-[1340px] px-7 py-8">
        <ProductMediaAndPurchase
          productId={product.id}
          code={product.code}
          name={product.name}
          subtitle={product.subtitle}
          ncm={product.ncm}
          categoryName={product.category.name}
          images={product.images}
          isCadeado={product.isCadeado}
          variants={product.variants}
        />

        <div className="mt-16 gap-10 lg:flex">
          <ProductTabs />

          <div className="min-w-0 flex-1">
            <section id="prod-sec-downloads" className="scroll-mt-[160px]">
              <h2 className="border-b border-border-soft pb-4 font-display text-2xl font-black text-ink">DataSheet</h2>
              {product.datasheetUrl ? (
                <a
                  href={product.datasheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex items-center gap-4 rounded-xl border border-border-soft bg-white p-5 transition hover:border-brand"
                >
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-surface-badge text-brand">↓</span>
                  <div>
                    <p className="font-bold text-ink">Ficha técnica do produto</p>
                    <p className="text-xs text-tertiary">PDF</p>
                  </div>
                </a>
              ) : (
                <p className="mt-5 rounded-xl border border-border-soft bg-surface-alt p-5 text-sm text-tertiary">
                  Ficha técnica em PDF ainda não disponível para este produto.
                </p>
              )}
            </section>

            {product.description.length > 0 && (
              <section id="prod-sec-caracteristicas" className="mt-14 scroll-mt-[160px]">
                <h2 className="border-b border-border-soft pb-4 font-display text-2xl font-black text-ink">
                  Descrição do Produto
                </h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {product.description.map((p, i) => (
                    <li key={i} className="flex gap-3 text-muted">
                      <span className="mt-1 flex-none text-brand">✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {product.specs.length > 0 && (
              <section id="prod-sec-especificacoes" className="mt-14 scroll-mt-[160px]">
                <h2 className="border-b border-border-soft pb-4 font-display text-2xl font-black text-ink">
                  Especificações técnicas
                </h2>
                <table className="mt-5 w-full max-w-[620px] text-sm">
                  <tbody>
                    {product.specs.map((s) => (
                      <tr key={s.id} className="border-b border-border-soft">
                        <td className="w-[130px] py-2.5 pr-3 font-semibold text-muted-2 sm:w-[200px] sm:pr-4">{s.label}</td>
                        <td className="py-2.5">{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20 rounded-2xl bg-[#f0f0f0] px-5 py-8 sm:px-8">
            <h2 className="font-display text-2xl font-black text-ink">Veja também</h2>
            <div className="mt-6">
              <ProductCarousel products={related} />
            </div>
          </section>
        )}
      </div>

      <ClientsMarquee />

      {support ? (
        <SupportArticle data={support} />
      ) : product.supportText ? (
        <section className="mx-auto max-w-[880px] px-7 py-16">
          <h2 className="border-b border-border-soft pb-4 font-display text-2xl font-black text-ink">
            {productSupportTitle(product.name)}
          </h2>
          <div className="mt-5">
            <ExpandableSupportText text={product.supportText} />
          </div>
        </section>
      ) : null}
    </div>
  );
}

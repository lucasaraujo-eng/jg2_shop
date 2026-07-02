import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductByCode, getRelatedProducts } from '@/server/catalog';
import { ProductGallery } from '@/components/product/ProductGallery';
import { PurchasePanel } from '@/components/product/PurchasePanel';
import { ProductTabs } from '@/components/product/ProductTabs';
import { ProductCarousel } from '@/components/ProductCarousel';
import { ClientsMarquee } from '@/components/ClientsMarquee';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const product = await getProductByCode(decodeURIComponent(code));
  if (!product) notFound();

  const related = await getRelatedProducts(product.categoryId, product.id);
  const cover = product.images[0]?.url ?? null;

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
        <div className="grid gap-12 lg:grid-cols-2">
          <ProductGallery images={product.images} name={product.name} />

          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-surface-badge px-3 py-1 text-xs font-bold text-brand">{product.category.name}</span>
              <span className="rounded-full bg-surface-alt px-3 py-1 text-xs font-bold text-tertiary">JG2®</span>
            </div>
            <h1 className="mt-3 font-display text-3xl font-black leading-tight text-ink">{product.name}</h1>

            <dl className="mt-6 grid grid-cols-3 gap-y-2 border-y border-border-soft py-4 text-sm">
              <dt className="text-tertiary">Marca</dt>
              <dd className="col-span-2 font-semibold text-ink">JG2®</dd>
              <dt className="text-tertiary">SKU</dt>
              <dd className="col-span-2 font-mono text-ink">{product.code}</dd>
              {product.ncm && (
                <>
                  <dt className="text-tertiary">NCM</dt>
                  <dd className="col-span-2 font-mono text-ink">{product.ncm}</dd>
                </>
              )}
            </dl>

            <PurchasePanel
              productId={product.id}
              code={product.code}
              name={product.name}
              image={cover}
              isCadeado={product.isCadeado}
              variants={product.variants}
            />
          </div>
        </div>

        <div className="mt-16 gap-10 lg:flex">
          <ProductTabs />

          <div className="min-w-0 flex-1">
            <section id="prod-sec-downloads" className="scroll-mt-[100px]">
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
              <section id="prod-sec-caracteristicas" className="mt-14 scroll-mt-[100px]">
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
              <section id="prod-sec-especificacoes" className="mt-14 scroll-mt-[100px]">
                <h2 className="border-b border-border-soft pb-4 font-display text-2xl font-black text-ink">
                  Especificações técnicas
                </h2>
                <table className="mt-5 w-full text-sm">
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
          <section className="mt-20">
            <h2 className="font-display text-2xl font-black text-ink">Veja também</h2>
            <div className="mt-6">
              <ProductCarousel products={related} />
            </div>
          </section>
        )}
      </div>

      <ClientsMarquee />

      {product.supportText && (
        <section className="mx-auto max-w-[880px] px-7 py-16">
          <h2 className="border-b border-border-soft pb-4 font-display text-2xl font-black text-ink">
            A importância deste produto para a segurança na indústria
          </h2>
          <div className="mt-5 whitespace-pre-line leading-relaxed text-muted">{product.supportText}</div>
        </section>
      )}
    </div>
  );
}

'use server';

import { prisma } from '@/lib/prisma';
import { foldAccents, includesFolded, postPublicHref } from '@/lib/utils';
import { setores } from '@/data/setores';
import { consultorias } from '@/data/consultorias';

export type SearchPageHit = {
  href: string;
  title: string;
  kind: string;
};

export type SearchResult = {
  categories: { slug: string; name: string; type: 'LOTO' | 'MAOS_SEGURAS' }[];
  subcategories: { name: string; href: string; categoryName: string }[];
  products: { code: string; name: string; categoryName: string; image: string | null }[];
  posts: { slug: string; title: string; tag: string | null; href: string; kind: string }[];
  videos: { id: string; title: string; href: string }[];
  pages: SearchPageHit[];
};

const EMPTY: SearchResult = {
  categories: [],
  subcategories: [],
  products: [],
  posts: [],
  videos: [],
  pages: [],
};

type Limits = {
  categories: number;
  subcategories: number;
  products: number;
  posts: number;
  videos: number;
  pages: number;
  /** Inclui campos longos (suporte, descrição, conteúdo de posts). */
  deep: boolean;
};

const STATIC_PAGES: { href: string; title: string; kind: string; text: string }[] = [
  {
    href: '/',
    title: 'Home JG2',
    kind: 'Página',
    text: 'home início jg2',
  },
  {
    href: '/produtos',
    title: 'Catálogo de produtos',
    kind: 'Página',
    text: 'catálogo produtos loja dispositivos',
  },
  {
    href: '/downloads',
    title: 'Downloads e catálogos',
    kind: 'Página',
    text: 'downloads catálogos portfolios e-books normas pdf materiais técnicos',
  },
  {
    href: '/videos',
    title: 'Vídeos',
    kind: 'Página',
    text: 'vídeos youtube demonstrações institucionais',
  },
  {
    href: '/blog',
    title: 'Blog e conteúdos',
    kind: 'Página',
    text: 'blog artigos conteúdos',
  },
  {
    href: '/sobre',
    title: 'Sobre a JG2',
    kind: 'Página',
    text: 'sobre nós empresa história fabricante timóteo',
  },
  {
    href: '/contato',
    title: 'Contato',
    kind: 'Página',
    text: 'contato fale conosco telefone e-mail comercial suporte',
  },
  {
    href: '/orcamento',
    title: 'Solicitar orçamento',
    kind: 'Página',
    text: 'orçamento proposta cotação solicite orçamento',
  },
  {
    href: '/servicos',
    title: 'Serviços e consultorias',
    kind: 'Página',
    text: 'serviços consultorias lototo nr-12 mãos seguras adequação',
  },
  ...Object.values(consultorias).map((c) => ({
    href: `/servicos/${c.slug}`,
    title: c.pill,
    kind: 'Serviço',
    text: [
      c.pill,
      c.heroH1,
      c.subtitle,
      c.problemTitle,
      ...c.problemParas,
      c.gainsTitle,
      ...c.gains,
      c.stagesTitle,
      ...c.stages,
      c.howTitle,
      ...c.steps.flatMap((s) => [s.title, s.body]),
      c.normsTitle,
      ...c.norms,
      c.diffTitle,
      ...c.diffs.flatMap((d) => [d.title, d.body]),
      c.ctaTitle,
      c.ctaText,
      ...c.faqs.flatMap((f) => [f.q, f.a]),
      c.software ? `${c.software.title} ${c.software.text}` : '',
    ].join(' '),
  })),
  ...setores.map((s) => ({
    href: `/setores/${s.id}`,
    title: s.name,
    kind: 'Setor',
    text: [s.name, s.lead, ...s.intro, ...s.comoAtua, ...s.riscos].join(' '),
  })),
];

function postHref(type: string, slug: string): { href: string; kind: string } {
  const href = postPublicHref(type, slug);
  switch (type) {
    case 'SETOR':
      return { href, kind: 'Setor' };
    case 'NORMA':
      return { href, kind: 'Norma' };
    case 'EBOOK':
      return { href, kind: 'E-book' };
    case 'ARTIGO':
      return { href, kind: 'Artigo' };
    default:
      return { href, kind: 'Blog' };
  }
}

function searchStaticPages(foldedQuery: string, limit: number): SearchPageHit[] {
  return STATIC_PAGES.map((p) => {
    const words = foldedQuery.split(/\s+/).filter(Boolean);
    const titleHit = words.every((w) => includesFolded(p.title, w));
    const textHit = words.every((w) => includesFolded(`${p.title} ${p.text}`, w));
    if (!titleHit && !textHit) return null;
    return {
      href: p.href,
      title: p.title,
      kind: p.kind,
      score: titleHit ? 2 : 1,
    };
  })
    .filter((p): p is NonNullable<typeof p> => !!p)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ href, title, kind }) => ({ href, title, kind }));
}

type ProductHit = {
  id: string;
  code: string;
  name: string;
  categoryName: string;
  image: string | null;
};

/** Quebra a busca em termos já sem acento, minúsculos e prontos para `LIKE ALL`. */
function searchTerms(folded: string): string[] {
  const escape = (t: string) => t.replace(/[\\%_]/g, (c) => `\\${c}`);
  return folded
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 8)
    .map((t) => `%${escape(t)}%`);
}

/**
 * Produtos: TODOS os termos precisam aparecer em nome + código + categoria
 * ("etiqueta jgl601-1" encontra "Etiqueta de Bloqueio … JGL601-1"). Os campos
 * longos (descrição, suporte, specs) só entram como fallback quando quase nada
 * casa no nome — assim "cadeado" não traz produtos que só citam a palavra.
 */
async function searchProducts(folded: string, limits: Limits): Promise<ProductHit[]> {
  const terms = searchTerms(folded);
  if (terms.length === 0) return [];
  const pattern = `%${folded}%`;
  const prefix = `${folded}%`;

  const primary = await prisma.$queryRaw<ProductHit[]>`
    SELECT
      p.id,
      p.code,
      p.name,
      c.name AS "categoryName",
      (
        SELECT pi.url FROM "ProductImage" pi
        WHERE pi."productId" = p.id
        ORDER BY pi."order" ASC
        LIMIT 1
      ) AS image
    FROM "Product" p
    JOIN "Category" c ON c.id = p."categoryId"
    WHERE p.active = true
      AND unaccent(lower(p.name || ' ' || p.code || ' ' || c.name)) LIKE ALL (${terms}::text[])
    ORDER BY
      CASE
        WHEN lower(p.code) = ${folded} THEN 100
        WHEN lower(p.code) LIKE ${prefix} THEN 90
        WHEN unaccent(lower(p.name)) LIKE ${prefix} THEN 80
        WHEN unaccent(lower(p.name)) LIKE ${pattern} THEN 70
        WHEN unaccent(lower(p.name || ' ' || p.code)) LIKE ALL (${terms}::text[]) THEN 60
        ELSE 40
      END DESC,
      p."order" ASC,
      p.name ASC
    LIMIT ${limits.products}
  `;

  if (primary.length >= 3 || !limits.deep) return primary;

  const seen = new Set(primary.map((p) => p.id));
  const fallback = await prisma.$queryRaw<ProductHit[]>`
    SELECT
      p.id,
      p.code,
      p.name,
      c.name AS "categoryName",
      (
        SELECT pi.url FROM "ProductImage" pi
        WHERE pi."productId" = p.id
        ORDER BY pi."order" ASC
        LIMIT 1
      ) AS image
    FROM "Product" p
    JOIN "Category" c ON c.id = p."categoryId"
    WHERE p.active = true
      AND unaccent(lower(concat_ws(' ',
        p.name, p.code, c.name, p.subtitle, p."seoTitle", p."seoDescription",
        p."supportHeading", p."supportTldr", p."supportText", p."supportIdealFor", p."supportNotFor",
        array_to_string(p.description, ' '),
        (SELECT string_agg(ps.label || ' ' || ps.value, ' ') FROM "ProductSpec" ps WHERE ps."productId" = p.id),
        (SELECT string_agg(ft."tagKey", ' ') FROM "ProductFilterTag" ft WHERE ft."productId" = p.id)
      ))) LIKE ALL (${terms}::text[])
    ORDER BY p."order" ASC, p.name ASC
    LIMIT ${limits.products}
  `;
  return [...primary, ...fallback.filter((p) => !seen.has(p.id))].slice(0, limits.products);
}

async function runSearch(q: string, limits: Limits): Promise<SearchResult> {
  const folded = foldAccents(q);
  const pattern = `%${folded}%`;
  const prefix = `${folded}%`;
  const terms = searchTerms(folded);

  const [categoryRows, subcategoryRows, products, postRows, videoRows] = await Promise.all([
    prisma.$queryRaw<{ id: string; slug: string; name: string; type: 'LOTO' | 'MAOS_SEGURAS' }[]>`
      SELECT c.id, c.slug, c.name, c.type
      FROM "Category" c
      WHERE unaccent(lower(c.name || ' ' || c.slug)) LIKE ALL (${terms}::text[])
      ORDER BY
        CASE
          WHEN unaccent(lower(c.name)) LIKE ${prefix} THEN 2
          WHEN unaccent(lower(c.name)) LIKE ${pattern} THEN 1
          ELSE 0
        END DESC,
        c."order" ASC
      LIMIT ${limits.categories}
    `,
    prisma.$queryRaw<
      { id: string; name: string; slug: string; categoryName: string; categorySlug: string; categoryType: 'LOTO' | 'MAOS_SEGURAS' }[]
    >`
      SELECT
        s.id,
        s.name,
        s.slug,
        c.name AS "categoryName",
        c.slug AS "categorySlug",
        c.type AS "categoryType"
      FROM "Subcategory" s
      JOIN "Category" c ON c.id = s."categoryId"
      WHERE unaccent(lower(s.name || ' ' || s.slug || ' ' || c.name)) LIKE ALL (${terms}::text[])
      ORDER BY
        CASE
          WHEN unaccent(lower(s.name)) LIKE ${prefix} THEN 2
          ELSE 1
        END DESC,
        s."order" ASC
      LIMIT ${limits.subcategories}
    `,
    searchProducts(folded, limits),
    limits.deep
      ? prisma.$queryRaw<{ id: string; slug: string; title: string; tag: string | null; type: string }[]>`
          SELECT b.id, b.slug, b.title, b.tag, b.type::text AS type
          FROM "BlogPost" b
          WHERE b.status = CAST('PUBLISHED' AS "PostStatus")
            AND unaccent(lower(concat_ws(' ', b.title, b.slug, b.tag, b.excerpt, b.content))) LIKE ALL (${terms}::text[])
          ORDER BY
            CASE
              WHEN unaccent(lower(b.title)) LIKE ${prefix} THEN 3
              WHEN unaccent(lower(b.title)) LIKE ${pattern} THEN 2
              ELSE 1
            END DESC,
            b."publishedAt" DESC NULLS LAST
          LIMIT ${limits.posts}
        `
      : prisma.$queryRaw<{ id: string; slug: string; title: string; tag: string | null; type: string }[]>`
          SELECT b.id, b.slug, b.title, b.tag, b.type::text AS type
          FROM "BlogPost" b
          WHERE b.status = CAST('PUBLISHED' AS "PostStatus")
            AND unaccent(lower(concat_ws(' ', b.title, b.slug, b.tag, b.excerpt))) LIKE ALL (${terms}::text[])
          ORDER BY
            CASE
              WHEN unaccent(lower(b.title)) LIKE ${prefix} THEN 3
              WHEN unaccent(lower(b.title)) LIKE ${pattern} THEN 2
              ELSE 1
            END DESC,
            b."publishedAt" DESC NULLS LAST
          LIMIT ${limits.posts}
        `,
    prisma.$queryRaw<{ id: string; title: string }[]>`
      SELECT v.id, v.title
      FROM "Video" v
      WHERE v.active = true
        AND unaccent(lower(concat_ws(' ', v.title, v.description))) LIKE ALL (${terms}::text[])
      ORDER BY
        CASE WHEN unaccent(lower(v.title)) LIKE ${pattern} THEN 1 ELSE 0 END DESC,
        v."order" ASC
      LIMIT ${limits.videos}
    `,
  ]);

  return {
    categories: categoryRows.map((c) => ({ slug: c.slug, name: c.name, type: c.type })),
    subcategories: subcategoryRows.map((s) => ({
      name: s.name,
      categoryName: s.categoryName,
      href:
        s.categoryType === 'MAOS_SEGURAS'
          ? `/produtos/${s.categorySlug}/${s.slug}`
          : `/produtos/${s.categorySlug}`,
    })),
    products: products.map((p) => ({
      code: p.code,
      name: p.name,
      categoryName: p.categoryName,
      image: p.image,
    })),
    posts: postRows.map((p) => {
      const link = postHref(p.type, p.slug);
      return { slug: p.slug, title: p.title, tag: p.tag, href: link.href, kind: link.kind };
    }),
    videos: videoRows.map((v) => ({ id: v.id, title: v.title, href: '/videos' })),
    pages: searchStaticPages(folded, limits.pages),
  };
}

/** Busca compacta pro dropdown do header. */
export async function searchSite(query: string): Promise<SearchResult> {
  const q = query.trim();
  if (q.length < 2) return EMPTY;
  return runSearch(q, {
    categories: 6,
    subcategories: 4,
    products: 8,
    posts: 3,
    videos: 2,
    pages: 3,
    deep: false,
  });
}

/** Busca completa pra página de resultados (/busca). */
export async function searchSiteFull(query: string): Promise<SearchResult> {
  const q = query.trim();
  if (q.length < 2) return EMPTY;
  return runSearch(q, {
    categories: 12,
    subcategories: 8,
    products: 60,
    posts: 12,
    videos: 8,
    pages: 12,
    deep: true,
  });
}

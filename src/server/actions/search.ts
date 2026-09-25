'use server';

import { prisma } from '@/lib/prisma';
import { foldAccents, includesFolded } from '@/lib/utils';
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
  /** Máx. de produtos por categoria (diversifica o ranking). */
  perCategory: number;
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
  switch (type) {
    case 'SETOR':
      return { href: `/setores/${slug}`, kind: 'Setor' };
    case 'NORMA':
      return { href: '/downloads#cat-sec-normas', kind: 'Norma' };
    case 'EBOOK':
      return { href: '/downloads#cat-sec-ebooks', kind: 'E-book' };
    case 'ARTIGO':
      return { href: '/downloads#cat-sec-artigos', kind: 'Artigo' };
    default:
      return { href: `/blog/${slug}`, kind: 'Blog' };
  }
}

function searchStaticPages(foldedQuery: string, limit: number): SearchPageHit[] {
  return STATIC_PAGES.map((p) => {
    const titleHit = includesFolded(p.title, foldedQuery);
    const textHit = includesFolded(p.text, foldedQuery);
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

async function searchProducts(folded: string, limits: Limits): Promise<ProductHit[]> {
  const pattern = `%${folded}%`;
  const prefix = `${folded}%`;

  if (limits.deep) {
    return prisma.$queryRaw<ProductHit[]>`
      WITH scored AS (
        SELECT
          p.id,
          p.code,
          p.name,
          p."order",
          p."categoryId",
          c.name AS "categoryName",
          CASE
            WHEN lower(p.code) = ${folded} THEN 100
            WHEN lower(p.code) LIKE ${prefix} THEN 90
            WHEN unaccent(lower(p.name)) LIKE ${prefix} THEN 80
            WHEN unaccent(lower(p.name)) LIKE ${pattern} THEN 70
            WHEN unaccent(lower(c.name)) LIKE ${pattern} THEN 55
            WHEN unaccent(lower(coalesce(p.subtitle, ''))) LIKE ${pattern} THEN 45
            WHEN unaccent(lower(coalesce(p."seoTitle", ''))) LIKE ${pattern} THEN 25
            WHEN unaccent(lower(coalesce(p."supportHeading", ''))) LIKE ${pattern} THEN 22
            WHEN unaccent(lower(coalesce(p."supportTldr", ''))) LIKE ${pattern} THEN 18
            WHEN unaccent(lower(coalesce(p."supportText", ''))) LIKE ${pattern} THEN 12
            WHEN unaccent(lower(array_to_string(p.description, ' '))) LIKE ${pattern} THEN 10
            WHEN unaccent(lower(coalesce(p."seoDescription", ''))) LIKE ${pattern} THEN 8
            WHEN unaccent(lower(coalesce(p."supportIdealFor", ''))) LIKE ${pattern} THEN 6
            WHEN unaccent(lower(coalesce(p."supportNotFor", ''))) LIKE ${pattern} THEN 5
            WHEN EXISTS (
              SELECT 1 FROM "ProductFilterTag" ft
              WHERE ft."productId" = p.id AND unaccent(lower(ft."tagKey")) LIKE ${pattern}
            ) THEN 15
            WHEN EXISTS (
              SELECT 1 FROM "ProductSpec" ps
              WHERE ps."productId" = p.id
                AND (
                  unaccent(lower(ps.label)) LIKE ${pattern}
                  OR unaccent(lower(ps.value)) LIKE ${pattern}
                )
            ) THEN 14
            ELSE 1
          END AS score
        FROM "Product" p
        JOIN "Category" c ON c.id = p."categoryId"
        WHERE p.active = true
          AND (
            unaccent(lower(p.name)) LIKE ${pattern}
            OR lower(p.code) LIKE ${pattern}
            OR unaccent(lower(c.name)) LIKE ${pattern}
            OR unaccent(lower(coalesce(p.subtitle, ''))) LIKE ${pattern}
            OR unaccent(lower(coalesce(p."seoTitle", ''))) LIKE ${pattern}
            OR unaccent(lower(coalesce(p."seoDescription", ''))) LIKE ${pattern}
            OR unaccent(lower(coalesce(p."supportHeading", ''))) LIKE ${pattern}
            OR unaccent(lower(coalesce(p."supportTldr", ''))) LIKE ${pattern}
            OR unaccent(lower(coalesce(p."supportText", ''))) LIKE ${pattern}
            OR unaccent(lower(coalesce(p."supportIdealFor", ''))) LIKE ${pattern}
            OR unaccent(lower(coalesce(p."supportNotFor", ''))) LIKE ${pattern}
            OR unaccent(lower(array_to_string(p.description, ' '))) LIKE ${pattern}
            OR EXISTS (
              SELECT 1 FROM "ProductSpec" ps
              WHERE ps."productId" = p.id
                AND (
                  unaccent(lower(ps.label)) LIKE ${pattern}
                  OR unaccent(lower(ps.value)) LIKE ${pattern}
                )
            )
            OR EXISTS (
              SELECT 1 FROM "ProductFilterTag" ft
              WHERE ft."productId" = p.id AND unaccent(lower(ft."tagKey")) LIKE ${pattern}
            )
          )
      ),
      ranked AS (
        SELECT
          scored.*,
          ROW_NUMBER() OVER (PARTITION BY scored."categoryId" ORDER BY scored.score DESC, scored."order" ASC) AS rn
        FROM scored
      )
      SELECT
        ranked.id,
        ranked.code,
        ranked.name,
        ranked."categoryName",
        (
          SELECT pi.url
          FROM "ProductImage" pi
          WHERE pi."productId" = ranked.id
          ORDER BY pi."order" ASC
          LIMIT 1
        ) AS image
      FROM ranked
      WHERE ranked.rn <= ${limits.perCategory}
      ORDER BY ranked.score DESC, ranked."order" ASC
      LIMIT ${limits.products}
    `;
  }

  // Autocomplete: só nome/código/categoria/subtítulo — rápido e sem falso positivo de suporte.
  return prisma.$queryRaw<ProductHit[]>`
    WITH scored AS (
      SELECT
        p.id,
        p.code,
        p.name,
        p."order",
        p."categoryId",
        c.name AS "categoryName",
        CASE
          WHEN lower(p.code) = ${folded} THEN 100
          WHEN lower(p.code) LIKE ${prefix} THEN 90
          WHEN unaccent(lower(p.name)) LIKE ${prefix} THEN 80
          WHEN unaccent(lower(p.name)) LIKE ${pattern} THEN 70
          WHEN unaccent(lower(c.name)) LIKE ${pattern} THEN 55
          WHEN unaccent(lower(coalesce(p.subtitle, ''))) LIKE ${pattern} THEN 45
          ELSE 1
        END AS score
      FROM "Product" p
      JOIN "Category" c ON c.id = p."categoryId"
      WHERE p.active = true
        AND (
          unaccent(lower(p.name)) LIKE ${pattern}
          OR lower(p.code) LIKE ${pattern}
          OR unaccent(lower(c.name)) LIKE ${pattern}
          OR unaccent(lower(coalesce(p.subtitle, ''))) LIKE ${pattern}
        )
    ),
    ranked AS (
      SELECT
        scored.*,
        ROW_NUMBER() OVER (PARTITION BY scored."categoryId" ORDER BY scored.score DESC, scored."order" ASC) AS rn
      FROM scored
    )
    SELECT
      ranked.id,
      ranked.code,
      ranked.name,
      ranked."categoryName",
      (
        SELECT pi.url
        FROM "ProductImage" pi
        WHERE pi."productId" = ranked.id
        ORDER BY pi."order" ASC
        LIMIT 1
      ) AS image
    FROM ranked
    WHERE ranked.rn <= ${limits.perCategory}
    ORDER BY ranked.score DESC, ranked."order" ASC
    LIMIT ${limits.products}
  `;
}

async function runSearch(q: string, limits: Limits): Promise<SearchResult> {
  const folded = foldAccents(q);
  const pattern = `%${folded}%`;
  const prefix = `${folded}%`;

  const [categoryRows, subcategoryRows, products, postRows, videoRows] = await Promise.all([
    prisma.$queryRaw<{ id: string; slug: string; name: string; type: 'LOTO' | 'MAOS_SEGURAS' }[]>`
      SELECT c.id, c.slug, c.name, c.type
      FROM "Category" c
      WHERE unaccent(lower(c.name)) LIKE ${pattern}
         OR unaccent(lower(c.slug)) LIKE ${pattern}
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
      WHERE unaccent(lower(s.name)) LIKE ${pattern}
         OR unaccent(lower(s.slug)) LIKE ${pattern}
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
            AND (
              unaccent(lower(b.title)) LIKE ${pattern}
              OR unaccent(lower(b.slug)) LIKE ${pattern}
              OR unaccent(lower(coalesce(b.tag, ''))) LIKE ${pattern}
              OR unaccent(lower(coalesce(b.excerpt, ''))) LIKE ${pattern}
              OR unaccent(lower(b.content)) LIKE ${pattern}
            )
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
            AND (
              unaccent(lower(b.title)) LIKE ${pattern}
              OR unaccent(lower(b.slug)) LIKE ${pattern}
              OR unaccent(lower(coalesce(b.tag, ''))) LIKE ${pattern}
              OR unaccent(lower(coalesce(b.excerpt, ''))) LIKE ${pattern}
            )
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
        AND (
          unaccent(lower(v.title)) LIKE ${pattern}
          OR unaccent(lower(coalesce(v.description, ''))) LIKE ${pattern}
        )
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
    categories: 4,
    subcategories: 4,
    products: 6,
    posts: 3,
    videos: 2,
    pages: 4,
    perCategory: 2,
    deep: false,
  });
}

/** Busca completa pra página de resultados (/busca). */
export async function searchSiteFull(query: string): Promise<SearchResult> {
  const q = query.trim();
  if (q.length < 2) return EMPTY;
  return runSearch(q, {
    categories: 8,
    subcategories: 8,
    products: 24,
    posts: 12,
    videos: 8,
    pages: 12,
    perCategory: 3,
    deep: true,
  });
}

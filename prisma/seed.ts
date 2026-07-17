import { config } from 'dotenv';
import { PrismaClient, CategoryType, PostStatus, SecretType } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import products from './data/products.json';
import categories from './data/categories.json';
import filters from './data/filters.json';
import posts from './data/posts.json';
import cadeadoColors from './data/cadeado-colors.json';
import { slugify } from '../src/lib/utils';

config({ quiet: true });

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const SECRETS: { type: SecretType; prefix: string }[] = [
  { type: 'DIFERENTES', prefix: '' },
  { type: 'IGUAIS', prefix: 'SI' },
  { type: 'CHAVE_MESTRA', prefix: 'CM' },
];

async function main() {
  console.log('Limpando tabelas...');
  await prisma.quoteItem.deleteMany();
  await prisma.quoteRequest.deleteMany();
  await prisma.productFilterTag.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productSpec.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.filterConfig.deleteMany();
  await prisma.filterModel.deleteMany();
  await prisma.filterApplication.deleteMany();
  await prisma.subcategory.deleteMany();
  await prisma.category.deleteMany();
  await prisma.blogPost.deleteMany();

  console.log('Categorias...');
  const categoryIdByName = new Map<string, string>();
  const subcategoryIdByKey = new Map<string, string>();

  for (const cat of categories as Array<{
    name: string;
    type: string;
    order?: number;
    subcategories?: string[];
  }>) {
    const category = await prisma.category.create({
      data: {
        name: cat.name,
        slug: slugify(cat.name),
        type: cat.type as CategoryType,
        order: cat.order ?? 0,
      },
    });
    categoryIdByName.set(cat.name, category.id);

    for (let i = 0; i < (cat.subcategories ?? []).length; i++) {
      const subName = cat.subcategories![i];
      const sub = await prisma.subcategory.create({
        data: {
          name: subName,
          slug: slugify(subName),
          order: i,
          categoryId: category.id,
        },
      });
      subcategoryIdByKey.set(`${cat.name}|${subName}`, sub.id);
    }
  }

  console.log('Taxonomia do filtro...');
  const modelIdByKey = new Map<string, string>();
  for (const app of filters.applications) {
    const application = await prisma.filterApplication.create({
      data: { key: app.key, label: app.label, order: app.order ?? 0 },
    });
    for (let i = 0; i < app.models.length; i++) {
      const m = app.models[i];
      const model = await prisma.filterModel.create({
        data: {
          key: m.key,
          label: m.label,
          order: i,
          applicationId: application.id,
        },
      });
      modelIdByKey.set(m.key, model.id);
      for (let c = 0; c < (m.configs ?? []).length; c++) {
        const cfg = m.configs![c];
        await prisma.filterConfig.create({
          data: { key: cfg.key, label: cfg.label, order: c, modelId: model.id },
        });
      }
    }
  }

  console.log(`Produtos (${products.length})...`);
  for (const p of products) {
    const categoryId = categoryIdByName.get(p.category);
    if (!categoryId) {
      console.warn(`Categoria não encontrada para ${p.code}: ${p.category}`);
      continue;
    }
    const subcategoryId = p.subcategory
      ? (subcategoryIdByKey.get(`${p.category}|${p.subcategory}`) ?? null)
      : null;

    const product = await prisma.product.create({
      data: {
        code: p.code,
        name: p.name,
        ncm: p.ncm ?? null,
        isCadeado: !!p.isCadeado,
        description: p.description ?? [],
        supportText: p.supportText ?? null,
        order: p.order ?? 0,
        categoryId,
        subcategoryId,
        images: p.image ? { create: [{ url: p.image, order: 0 }] } : undefined,
        filterTags: p.filterTags?.length
          ? {
              create: p.filterTags.map((tag: string) => ({
                tagKey: tag,
                modelId: modelIdByKey.get(tag) ?? null,
              })),
            }
          : undefined,
      },
    });

    if (p.isCadeado) {
      const variants = [];
      for (const color of cadeadoColors) {
        for (const secret of SECRETS) {
          const suffix = secret.prefix ? `-${secret.prefix}-${color.code}` : `-${color.code}`;
          variants.push({
            color: color.name,
            secretType: secret.type,
            skuSuffix: suffix,
            productId: product.id,
          });
        }
      }
      await prisma.productVariant.createMany({ data: variants });
    }
  }

  console.log(`Posts (${posts.length})...`);
  for (const post of posts as Array<{
    title: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    tag?: string;
    status?: string;
  }>) {
    await prisma.blogPost.create({
      data: {
        title: post.title,
        slug: post.slug ?? slugify(post.title),
        excerpt: post.excerpt ?? null,
        content: post.content ?? '',
        tag: post.tag ?? null,
        status: (post.status as PostStatus) ?? 'PUBLISHED',
        publishedAt: post.status === 'PUBLISHED' ? new Date() : null,
      },
    });
  }

  console.log('Seed concluído.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

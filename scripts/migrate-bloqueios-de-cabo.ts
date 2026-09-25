import { config } from 'dotenv';
import { PrismaClient, CategoryType } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { slugify } from '../src/lib/utils';

config({ quiet: true });

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const CABLE_CODES = ['JGL251-1', 'JGL254-1', 'JGL255-1', 'JGL256-1', 'JGL257-1', 'JGL260-18'];

async function main() {
  const valves = await prisma.category.findUnique({ where: { slug: 'bloqueio-de-valvulas' } });
  if (!valves) throw new Error('Categoria bloqueio-de-valvulas não encontrada');

  let cable = await prisma.category.findUnique({ where: { slug: 'bloqueios-de-cabo' } });
  if (!cable) {
    // Empurra orders >= 4
    const later = await prisma.category.findMany({ where: { order: { gte: 4 } }, orderBy: { order: 'desc' } });
    for (const c of later) {
      await prisma.category.update({ where: { id: c.id }, data: { order: c.order + 1 } });
    }
    cable = await prisma.category.create({
      data: {
        name: 'Bloqueios de Cabo',
        slug: 'bloqueios-de-cabo',
        type: CategoryType.LOTO,
        order: 4,
        supportText:
          'Dispositivos para possibilitar o bloqueio de válvulas esfera, válvulas gaveta, válvulas borboleta e disjuntores em série.',
      },
    });
    console.log('Criada categoria Bloqueios de Cabo');
  }

  let sub = await prisma.subcategory.findFirst({
    where: { categoryId: cable.id, slug: slugify('Bloqueios de Cabo Multiuso') },
  });
  if (!sub) {
    sub = await prisma.subcategory.create({
      data: {
        name: 'Bloqueios de Cabo Multiuso',
        slug: slugify('Bloqueios de Cabo Multiuso'),
        order: 0,
        categoryId: cable.id,
      },
    });
  }

  const result = await prisma.product.updateMany({
    where: { code: { in: CABLE_CODES } },
    data: { categoryId: cable.id, subcategoryId: sub.id },
  });
  console.log(`Movidos ${result.count} produtos para Bloqueios de Cabo`);

  // Remove subcategoria antiga de cabo em válvulas, se vazia
  const oldSubs = await prisma.subcategory.findMany({
    where: { categoryId: valves.id, name: { contains: 'Cabo' } },
    include: { _count: { select: { products: true } } },
  });
  for (const s of oldSubs) {
    if (s._count.products === 0) {
      await prisma.subcategory.delete({ where: { id: s.id } });
      console.log('Removida subcategoria vazia', s.name);
    }
  }

  console.log('OK — rode o site (ou redeploy) para invalidar o cache do catálogo.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

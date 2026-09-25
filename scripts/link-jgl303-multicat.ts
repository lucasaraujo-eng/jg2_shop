import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';

config({ quiet: true });

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const product = await prisma.product.findUnique({ where: { code: 'JGL303-1' } });
  const cat = await prisma.category.findUnique({ where: { slug: 'bloqueios-de-cabo' } });
  if (!product || !cat) {
    console.log('skip', { product: !!product, cat: !!cat });
    return;
  }
  await prisma.productCategory.upsert({
    where: { productId_categoryId: { productId: product.id, categoryId: cat.id } },
    create: { productId: product.id, categoryId: cat.id, isPrimary: false },
    update: {},
  });
  console.log('linked JGL303-1 -> bloqueios-de-cabo');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

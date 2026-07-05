/**
 * Sobe as fotos de capa dos produtos LOTO que ainda não têm imagem (pasta
 * public/Produtos/{CODIGO}[...]/) para o R2, e cria o ProductImage no banco.
 * Produtos que já têm imagem (cadeados, Mãos Seguras) são ignorados.
 *
 * Uso: npx tsx --env-file=.env scripts/upload-product-covers.ts [--dry-run]
 */
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { uploadImage } from '../src/lib/storage';

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const BASE = join(__dirname, '..', 'public', 'Produtos');
const DRY_RUN = process.argv.includes('--dry-run');

// Escolhas manuais pra pastas sem um arquivo "{codigo}.png" ou "(logo)" claro
// (só variações numeradas, ou nomes que não seguem o padrão) — verificado
// visualmente uma a uma.
const MANUAL_PICK: Record<string, string> = {
  'JGL150-1': 'JGL150-1 (fechado-logo).png',
  'JGL207-5': 'JGL207-5 (7).png',
  'JGL302-1': 'JGL302-1 (1).png',
  'JGL303-1': 'JGL303-1 (1).png',
  'JGL306-1': 'JGL306-1 (1).png',
  'JGL311-1': 'JGL311-1 (4).png',
  'JGL400-3': 'JGL400-3 (3).png',
  'JGL500-1': 'JGL500-1 (3).png',
  'JGL600-1': 'JGL600-2 (modelo novo).png',
  'JGL600-2': 'JGL600-2 (modelo novo).png',
  'JGL705-1': 'JGL705-1 (2).png',
};

function pickCoverFile(dir: string, code: string): string | null {
  const full = join(BASE, dir);
  const files = readdirSync(full).filter((f) => f.toLowerCase().endsWith('.png'));

  if (MANUAL_PICK[code]) return MANUAL_PICK[code];

  const bare = files.find((f) => f.toLowerCase() === `${code}.png`.toLowerCase());
  if (bare) return bare;

  const logo = files.find((f) => /\(\s*logo\s*\)/i.test(f) && !/desenho|medidas|aplicad/i.test(f));
  if (logo) return logo;

  return null;
}

async function main() {
  const dirs = readdirSync(BASE);
  const products = await prisma.product.findMany({ include: { images: true } });
  const byCode = new Map(products.map((p) => [p.code, p]));

  let uploaded = 0;
  let skippedHasImage = 0;
  let skippedNoMatch = 0;
  let skippedNoFile = 0;

  for (const dir of dirs) {
    const code = dir.replace(/ \(.*/, '').trim();
    const product = byCode.get(code);
    if (!product) {
      console.log(`⏭  ${code}: sem produto correspondente no banco (pasta "${dir}")`);
      skippedNoMatch++;
      continue;
    }
    if (product.images.length > 0) {
      skippedHasImage++;
      continue;
    }

    const file = pickCoverFile(dir, code);
    if (!file) {
      console.log(`⚠️  ${code}: não achei um arquivo de capa claro na pasta "${dir}"`);
      skippedNoFile++;
      continue;
    }

    const key = `uploads/cover-${code}.png`;
    if (DRY_RUN) {
      console.log(`[dry-run] ${code} <- "${dir}/${file}"  ->  ${key}`);
      uploaded++;
      continue;
    }

    const bytes = readFileSync(join(BASE, dir, file));
    const url = await uploadImage(key, bytes, 'image/png');
    await prisma.productImage.create({ data: { productId: product.id, url: key, order: 0 } });
    console.log(`✓ ${code} <- "${dir}/${file}"  ->  ${url}`);
    uploaded++;
  }

  console.log(`\nResumo: ${uploaded} enviados, ${skippedHasImage} já tinham imagem, ${skippedNoMatch} sem produto no banco, ${skippedNoFile} sem arquivo claro.`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

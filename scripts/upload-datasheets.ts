import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { uploadImage } from '../src/lib/storage';

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const DIR = 'C:/Users/Kaique/Desktop/Datasheet - Produtos LOTO';
const DRY_RUN = process.argv.includes('--dry-run');
const PREFERRED_COLOR = 'VM';

function normalize(filename: string): string {
  return filename.replace(/^Cópia de /, '').replace(/\.pdf$/i, '').trim();
}

async function main() {
  const files = readdirSync(DIR).filter((f) => f.toLowerCase().endsWith('.pdf'));

  const groups = new Map<string, { file: string; color: string | null }[]>();
  for (const f of files) {
    const name = normalize(f);
    const m = name.match(/^(.*)-(AM|AZ|BC|CZ|LR|MR|PT|RX|VD|VM)$/);
    const code = m ? m[1] : name;
    const color = m ? m[2] : null;
    if (!groups.has(code)) groups.set(code, []);
    groups.get(code)!.push({ file: f, color });
  }

  const products = await prisma.product.findMany();
  const byCode = new Map(products.map((p) => [p.code, p]));

  let uploaded = 0;
  let skippedNoMatch = 0;

  for (const [code, entries] of groups) {
    const product = byCode.get(code);
    if (!product) {
      console.log(`⏭  ${code}: sem produto correspondente no banco (${entries.map((e) => e.file).join(', ')})`);
      skippedNoMatch++;
      continue;
    }

    const chosen = entries.length === 1 ? entries[0] : entries.find((e) => e.color === PREFERRED_COLOR) ?? entries[0];

    const key = `datasheets/${code}.pdf`;
    if (DRY_RUN) {
      console.log(`[dry-run] ${code} <- "${chosen.file}"  ->  ${key}`);
      uploaded++;
      continue;
    }

    const bytes = readFileSync(join(DIR, chosen.file));
    const url = await uploadImage(key, bytes, 'application/pdf');
    await prisma.product.update({ where: { id: product.id }, data: { datasheetUrl: url } });
    console.log(`✓ ${code} <- "${chosen.file}"  ->  ${url}`);
    uploaded++;
  }

  console.log(`\nResumo: ${uploaded} enviados, ${skippedNoMatch} sem produto no banco.`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

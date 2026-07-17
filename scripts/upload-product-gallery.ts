/**
 * A imagem que já está no R2 (product.images[0]) é identificada por hash
 * (MD5 local vs ETag do R2, que é o MD5 pra uploads simples) e excluída —
 * só o restante da pasta é enviado.
 * Uso: npx tsx --env-file=.env scripts/upload-product-gallery.ts [--dry-run]
 */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { createHash } from 'crypto';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { uploadImage } from '../src/lib/storage';

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const DIR = 'C:/Users/Kaique/Desktop/Produtos';
const DRY_RUN = process.argv.includes('--dry-run');
const R2_PUBLIC_URL = (process.env.R2_PUBLIC_URL ?? '').replace(/\/$/, '');

// Arquivos fora do lugar, verificados manualmente (nome não bate com o produto
// da pasta e não há relação real entre os dois produtos — ver JGL801-1 vs
// JGL800-1, que são itens completamente diferentes; já JGL600-1/JGL600-2 são
// a mesma etiqueta com códigos irmãos, esse caso continua liberado).
const SKIP_FILES: Record<string, string[]> = {
  'JGL052-1 (Cadeados alumínio 38mm)': ['JGL051-1-VD.png'],
  'JGL801-1': [
    'JGL800-1 (2).png',
    'JGL800-1 (3).png',
    'JGL800-1 (4).png',
    'JGL800-1 (5).png',
    'JGL800-1 (6).png',
    'JGL800-1 (7).png',
    'JGL800-1.png',
  ],
};

function md5(buf: Buffer): string {
  return createHash('md5').update(buf).digest('hex');
}

async function getR2Etag(key: string): Promise<string | null> {
  try {
    const res = await fetch(`${R2_PUBLIC_URL}/${key}`, { method: 'HEAD' });
    if (!res.ok) return null;
    const etag = res.headers.get('etag');
    return etag ? etag.replace(/"/g, '') : null;
  } catch {
    return null;
  }
}

async function main() {
  const dirs = readdirSync(DIR).filter((d) => statSync(join(DIR, d)).isDirectory());
  const products = await prisma.product.findMany({ include: { images: { orderBy: { order: 'asc' } } } });
  const byCode = new Map(products.map((p) => [p.code, p]));

  let totalUploaded = 0;
  let totalProducts = 0;
  const noMatchWarnings: string[] = [];
  const noFolderCodes: string[] = [];

  for (const dir of dirs) {
    const code = dir.replace(/ \(.*/, '').trim();
    const product = byCode.get(code);
    if (!product) {
      console.log(`⏭  sem produto no banco para a pasta "${dir}" (código "${code}")`);
      continue;
    }

    const skip = new Set(SKIP_FILES[dir] ?? []);
    const files = readdirSync(join(DIR, dir)).filter((f) => f.toLowerCase().endsWith('.png') && !skip.has(f));
    const fileHashes = files.map((f) => ({ f, hash: md5(readFileSync(join(DIR, dir, f))) }));

    const existingHashes = new Set<string>();
    for (const img of product.images) {
      const etag = await getR2Etag(img.url);
      if (etag) existingHashes.add(etag);
    }

    if (product.images.length > 0 && existingHashes.size === 0) {
      console.log(`⚠️  ${code}: tem ${product.images.length} imagem(ns) no banco mas não consegui ler o ETag no R2 (url: ${product.images.map((i) => i.url).join(', ')}) — pulando por segurança.`);
      noMatchWarnings.push(code);
      continue;
    }

    const matched = fileHashes.filter(({ hash }) => existingHashes.has(hash));
    if (product.images.length > 0 && matched.length === 0) {
      console.log(`⚠️  ${code}: produto já tem imagem no banco, mas NENHUM arquivo da pasta "${dir}" bate por hash com ela — pulando por segurança (confirmar manualmente).`);
      noMatchWarnings.push(code);
      continue;
    }

    const toUpload = fileHashes.filter(({ hash }) => !existingHashes.has(hash));
    if (toUpload.length === 0) {
      continue;
    }

    totalProducts++;
    let nextOrder = product.images.length > 0 ? Math.max(...product.images.map((i) => i.order)) + 1 : 0;

    console.log(`${code}: ${matched.length} já no R2 (excluída${matched.length === 1 ? '' : 's'}: ${matched.map((m) => m.f).join(', ')}), ${toUpload.length} a enviar`);

    for (const { f } of toUpload) {
      const key = `uploads/${code}-${nextOrder + 1}.png`;
      if (DRY_RUN) {
        console.log(`  [dry-run] "${f}" -> ${key} (order ${nextOrder})`);
        nextOrder++;
        totalUploaded++;
        continue;
      }
      const bytes = readFileSync(join(DIR, dir, f));
      const url = await uploadImage(key, bytes, 'image/png');
      await prisma.productImage.create({ data: { productId: product.id, url: key, order: nextOrder } });
      console.log(`  ✓ "${f}" -> ${url} (order ${nextOrder})`);
      nextOrder++;
      totalUploaded++;
    }
  }

  const dbCodes = new Set(products.map((p) => p.code));
  const folderCodes = new Set(dirs.map((d) => d.replace(/ \(.*/, '').trim()));
  for (const c of dbCodes) if (!folderCodes.has(c)) noFolderCodes.push(c);

  console.log(`\nResumo: ${totalUploaded} imagens ${DRY_RUN ? 'a enviar' : 'enviadas'} em ${totalProducts} produtos.`);
  if (noMatchWarnings.length) console.log(`Produtos pulados por não confirmar a imagem já existente: ${noMatchWarnings.join(', ')}`);
  console.log(`Produtos no banco sem pasta correspondente: ${noFolderCodes.length}`);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

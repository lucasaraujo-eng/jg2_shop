/**
 * Os logos (assets/jg2-logo*.png) ficam de fora de propósito — continuam locais/no git.
 * Uso: npx tsx --env-file=.env scripts/migrate-media-to-r2.ts
 */
import { readdirSync, readFileSync, statSync } from 'fs';
import { join, relative, extname } from 'path';
import { uploadImage } from '../src/lib/storage';

const ROOT = join(__dirname, '..', 'public');

const TARGETS = [
  join(ROOT, 'uploads'),
  join(ROOT, 'assets', 'filtro'),
  join(ROOT, 'assets', 'hero.mp4'),
  join(ROOT, 'assets', 'hero-banner.mp4'),
  join(ROOT, 'assets', 'planejamento.mp4'),
];

const CONTENT_TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.mp4': 'video/mp4',
};

function listFiles(path: string): string[] {
  const stat = statSync(path);
  if (stat.isFile()) return [path];
  const out: string[] = [];
  for (const entry of readdirSync(path)) {
    out.push(...listFiles(join(path, entry)));
  }
  return out;
}

async function main() {
  const files = TARGETS.flatMap(listFiles);
  console.log(`${files.length} arquivos para subir.\n`);

  let ok = 0;
  let fail = 0;

  for (const filePath of files) {
    const key = relative(ROOT, filePath).split('\\').join('/'); // 'uploads/setores/alimentos.jpg'
    const contentType = CONTENT_TYPES[extname(filePath).toLowerCase()] ?? 'application/octet-stream';
    try {
      const bytes = readFileSync(filePath);
      const url = await uploadImage(key, bytes, contentType);
      ok++;
      console.log(`✓ ${key} -> ${url}`);
    } catch (e) {
      fail++;
      console.error(`✗ ${key}:`, e instanceof Error ? e.message : e);
    }
  }

  console.log(`\nConcluído: ${ok} enviados, ${fail} falharam.`);
  if (fail > 0) process.exit(1);
}

main();

import { readFileSync } from 'fs';
import { join } from 'path';
import { uploadImage } from '../src/lib/storage';

const DIR = 'C:/Users/Kaique/Desktop/Catálogos';
const DRY_RUN = process.argv.includes('--dry-run');

const FILES: { file: string; slug: string }[] = [
  { file: 'Segurança Industrial - GRUPO JG2.pdf', slug: 'seguranca-industrial' },
  { file: 'Dispositivos de Bloqueio e Etiquetagem (LOTOTO) - GRUPO JG2.pdf', slug: 'lototo-bloqueio-etiquetagem' },
  { file: 'Dispositivos Mão Seguras - Grupo JG2.pdf', slug: 'maos-seguras' },
  { file: 'Gradil de segurança - GRUPO JG2.pdf', slug: 'gradis-seguranca' },
  { file: 'Adequação NR-12 - GRUPO JG2.pdf', slug: 'nr12-adequacao' },
];

async function main() {
  for (const { file, slug } of FILES) {
    const key = `catalogos/${slug}.pdf`;
    if (DRY_RUN) {
      console.log(`[dry-run] "${file}"  ->  ${key}`);
      continue;
    }
    const bytes = readFileSync(join(DIR, file));
    const url = await uploadImage(key, bytes, 'application/pdf');
    console.log(`✓ "${file}"  ->  ${url}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

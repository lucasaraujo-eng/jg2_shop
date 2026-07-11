import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { createCanvas } from '@napi-rs/canvas';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const DIR = 'C:/Users/Kaique/Desktop/Catálogos';
const OUT = 'C:/Users/Kaique/AppData/Local/Temp/claude/c--Users-Kaique-Documents-jg2-shop/387ccaa5-82ba-4426-841e-b99394d0fa29/scratchpad';

const FILES = [
  { file: 'Segurança Industrial - GRUPO JG2.pdf', slug: 'seguranca-industrial' },
  { file: 'Dispositivos de Bloqueio e Etiquetagem (LOTOTO) - GRUPO JG2.pdf', slug: 'lototo-bloqueio-etiquetagem' },
  { file: 'Dispositivos Mão Seguras - Grupo JG2.pdf', slug: 'maos-seguras' },
  { file: 'Gradil de segurança - GRUPO JG2.pdf', slug: 'gradis-seguranca' },
  { file: 'Adequação NR-12 - GRUPO JG2.pdf', slug: 'nr12-adequacao' },
];

async function renderCover(path, outPath) {
  const data = new Uint8Array(readFileSync(path));
  const doc = await getDocument({ data }).promise;
  const page = await doc.getPage(1);
  const viewport = page.getViewport({ scale: 2 });
  const canvas = createCanvas(viewport.width, viewport.height);
  const ctx = canvas.getContext('2d');
  await page.render({ canvasContext: ctx, viewport }).promise;
  writeFileSync(outPath, canvas.toBuffer('image/png'));
}

for (const { file, slug } of FILES) {
  const outPath = join(OUT, `cover-${slug}.png`);
  await renderCover(join(DIR, file), outPath);
  console.log('✓', file, '->', outPath);
}

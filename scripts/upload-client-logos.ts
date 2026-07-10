/**
 * Substitui as logos de clientes do carrossel da Home (uploads/clientes/{file}.png
 * no R2) pelas novas versões da pasta "C:\Users\Kaique\Desktop\Principais Clientes".
 * Mesma chave já usada — sobrescreve o arquivo existente no R2, sem precisar
 * mexer em ClientsMarquee.tsx.
 *
 * Uso: npx tsx --env-file=.env scripts/upload-client-logos.ts [--dry-run]
 */
import { readFileSync } from 'fs';
import { join } from 'path';
import { uploadImage } from '../src/lib/storage';

const DIR = 'C:/Users/Kaique/Desktop/Principais Clientes';
const DRY_RUN = process.argv.includes('--dry-run');

const FILES: { key: string; file: string }[] = [
  { key: 'coca-cola', file: 'pngwing.com.png' },
  { key: 'brf', file: 'BRF_Global.svg.png' },
  { key: 'schmersal', file: 'schmersal.png' },
  { key: 'volkswagen', file: 'Logo VolksWagen.png' },
  { key: 'bunge', file: 'pngwing.com 2.png' },
  { key: 'arcelormittal', file: 'Logo_ArcelorMittal.png' },
  { key: 'csn', file: 'Companhia_Siderúrgica_Nacional.png' },
  { key: 'gerdau', file: 'gerdau-logo-1-1.png' },
  { key: 'cenibra', file: 'Cenibra_logo.png' },
  { key: 'ball', file: 'ball corporation.png' },
  { key: 'vale', file: 'Logotipo_Vale.svg.png' },
  { key: 'lactalis', file: 'Lactalis_2023_logo.png' },
  { key: 'aperam', file: 'Logo_Aperam.png' },
  { key: 'klabin', file: 'Klabin.svg.png' },
  { key: 'usiminas', file: 'usiminas-logo-1-1.png' },
];

async function main() {
  for (const { key, file } of FILES) {
    const path = `uploads/clientes/${key}.png`;
    if (DRY_RUN) {
      console.log(`[dry-run] "${file}"  ->  ${path}`);
      continue;
    }
    const bytes = readFileSync(join(DIR, file));
    const url = await uploadImage(path, bytes, 'image/png');
    console.log(`✓ "${file}"  ->  ${url}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

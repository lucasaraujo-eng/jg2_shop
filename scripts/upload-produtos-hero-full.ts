import { readFileSync } from 'fs';
import { uploadImage } from '../src/lib/storage';

async function main() {
  const bytes = readFileSync('C:/Users/Kaique/Downloads/Banner Bloqueio e Etiquetagem  JG2.png');
  const url = await uploadImage('uploads/banner-produtos-loto.png', bytes, 'image/png');
  console.log('✓', url);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

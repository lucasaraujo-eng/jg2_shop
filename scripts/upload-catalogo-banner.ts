import { readFileSync } from 'fs';
import { uploadImage } from '../src/lib/storage';

async function main() {
  const bytes = readFileSync('public/assets/Banner Catálogo Online1.png');
  const url = await uploadImage('uploads/banner-catalogo-online.png', bytes, 'image/png');
  console.log('✓', url);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

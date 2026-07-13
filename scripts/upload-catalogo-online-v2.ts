import { readFileSync } from 'fs';
import { uploadImage } from '../src/lib/storage';

async function main() {
  const bytes = readFileSync('C:/Users/Kaique/Desktop/Banner_Catálogo_Online1-removebg-preview.png');
  const url = await uploadImage('uploads/banner-catalogo-online.png', bytes, 'image/png');
  console.log('✓', url);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

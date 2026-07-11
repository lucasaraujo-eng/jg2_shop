import { readFileSync } from 'fs';
import { uploadImage } from '../src/lib/storage';

async function main() {
  const bytes = readFileSync('public/assets/Banner Catalogos JG2.png');
  const url = await uploadImage('uploads/banner-catalogos-downloads.png', bytes, 'image/png');
  console.log('✓', url);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

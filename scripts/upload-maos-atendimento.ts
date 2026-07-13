import { readFileSync } from 'fs';
import { uploadImage } from '../src/lib/storage';

async function main() {
  const bytes = readFileSync(
    'C:/Users/Kaique/AppData/Local/Temp/claude/c--Users-Kaique-Documents-jg2-shop/387ccaa5-82ba-4426-841e-b99394d0fa29/scratchpad/atendimento-new.jpg',
  );
  const url = await uploadImage('uploads/maoscons/atendimento.jpg', bytes, 'image/jpeg');
  console.log('✓', url);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

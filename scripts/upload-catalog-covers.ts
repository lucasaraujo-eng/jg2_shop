import { readFileSync } from 'fs';
import { join } from 'path';
import { uploadImage } from '../src/lib/storage';

const OUT = 'C:/Users/Kaique/AppData/Local/Temp/claude/c--Users-Kaique-Documents-jg2-shop/387ccaa5-82ba-4426-841e-b99394d0fa29/scratchpad';

const SLUGS = ['seguranca-industrial', 'lototo-bloqueio-etiquetagem', 'maos-seguras', 'gradis-seguranca', 'nr12-adequacao'];

async function main() {
  for (const slug of SLUGS) {
    const bytes = readFileSync(join(OUT, `cover-${slug}.png`));
    const url = await uploadImage(`catalogos/${slug}-cover.png`, bytes, 'image/png');
    console.log('✓', slug, '->', url);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

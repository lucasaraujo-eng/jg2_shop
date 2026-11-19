/**
 * Copia os textos estáticos de src/data/setores.ts para o CMS (BlogPost tipo SETOR),
 * para que cada setor passe a ser editável em /admin/blog?type=SETOR.
 *
 * Idempotente: setores que já existem no CMS (mesmo slug) são ignorados.
 *
 *   npx tsx scripts/seed-setores-cms.ts           # simulação (nada é gravado)
 *   npx tsx scripts/seed-setores-cms.ts --apply   # grava no banco
 */
import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { setores, setorAsPostInput } from '../src/data/setores';
import { sanitizePostHtml } from '../src/lib/sanitize';

config({ quiet: true });

const apply = process.argv.includes('--apply');
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const existing = new Set(
    (await prisma.blogPost.findMany({ where: { type: 'SETOR' }, select: { slug: true } })).map((p) => p.slug),
  );

  let created = 0;
  for (const sector of setores) {
    if (existing.has(sector.id)) {
      console.log(`= ${sector.id}: já existe no CMS`);
      continue;
    }
    const input = setorAsPostInput(sector);
    console.log(`+ ${sector.id}: ${apply ? 'criando' : 'seria criado'} "${input.title}"`);
    if (!apply) continue;
    await prisma.blogPost.create({
      data: {
        title: input.title,
        slug: input.slug,
        excerpt: input.excerpt,
        content: sanitizePostHtml(input.content),
        coverUrl: input.coverUrl,
        fileUrl: null,
        tag: input.tag,
        type: input.type,
        status: input.status,
        publishedAt: new Date(),
      },
    });
    created++;
  }

  console.log(apply ? `\n${created} setor(es) criado(s).` : '\nSimulação — use --apply para gravar.');
  if (apply && created > 0) {
    console.log('Obs.: o cache de /blog e /setores é revalidado em até 1h (ou ao salvar qualquer matéria no admin).');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

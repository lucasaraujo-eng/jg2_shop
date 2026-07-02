import { config } from 'dotenv';
import { defineConfig, env } from 'prisma/config';

// quiet: true suprime as "tips" aleatórias do dotenv no console (uma delas
// aponta para um domínio de terceiros não verificado — ver histórico do chat).
config({ quiet: true });

/**
 * Prisma 7: o CLI (migrate/db seed/studio) não lê mais `url`/`directUrl` do
 * schema.prisma — a connection string de migração vem daqui. A conexão em
 * runtime (PrismaClient) usa o adapter do Neon em src/lib/prisma.ts.
 * DIRECT_URL (sem "-pooler") é obrigatória para o Schema Engine.
 */
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: env('DIRECT_URL'),
  },
});

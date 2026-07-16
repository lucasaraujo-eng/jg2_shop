/**
 * Cria (ou atualiza a senha de) o primeiro administrador.
 * Uso: npx tsx scripts/create-admin.ts "Nome" email@dominio.com "senhaForte"
 */
import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import bcrypt from 'bcryptjs';

config({ quiet: true });

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const [name, email, password] = process.argv.slice(2);
  if (!name || !email || !password) {
    console.error('Uso: npx tsx scripts/create-admin.ts "Nome" email@dominio.com "senhaForte"');
    process.exit(1);
  }
  if (password.length < 8) {
    console.error('A senha precisa ter ao menos 8 caracteres.');
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash, name },
    create: { name, email, passwordHash, role: 'ADMIN' },
  });

  console.log(`Admin pronto: ${user.email} (${user.role})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

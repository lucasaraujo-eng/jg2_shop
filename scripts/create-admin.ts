import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import bcrypt from 'bcryptjs';

config({ quiet: true });

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const COMMON_PASSWORDS = new Set([
  'password', 'password1', '12345678', '123456789', 'qwerty123', 'senha123',
  'admin123', 'administrador', 'jg2produtos', 'letmein', 'welcome1',
]);

function checkPasswordStrength(password: string): string | null {
  if (password.length < 12) return 'A senha precisa ter ao menos 12 caracteres.';
  if (COMMON_PASSWORDS.has(password.toLowerCase())) return 'Essa senha é comum demais — escolha outra.';

  const classes = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].filter((re) => re.test(password)).length;
  if (classes < 3) {
    return 'Combine ao menos 3 destes: minúsculas, maiúsculas, números e símbolos.';
  }
  return null;
}

async function main() {
  const [name, email, password] = process.argv.slice(2);
  if (!name || !email || !password) {
    console.error('Uso: npx tsx scripts/create-admin.ts "Nome" email@dominio.com "senhaForte"');
    process.exit(1);
  }
  const strengthError = checkPasswordStrength(password);
  if (strengthError) {
    console.error(strengthError);
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

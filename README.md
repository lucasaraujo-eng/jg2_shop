# JG2 — Catálogo & Orçamentos

Site institucional e catálogo de produtos de segurança industrial da JG2 — bloqueio e
etiquetagem (LOTO) e Mãos Seguras — com montagem de orçamento e área administrativa.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Prisma 7** + **PostgreSQL** (Neon, via driver adapter `@prisma/adapter-neon`)
- **Auth.js v5** — login admin por credenciais
- **Zustand** — carrinho de orçamento (persistido em localStorage)
- **Resend** — e-mail de orçamento (a configurar)
- **Cloudflare R2** — upload de imagens (a configurar)

## Status do desenvolvimento

- [x] Setup técnico — schema Prisma, seed (108 produtos reais, categorias, taxonomia do
      filtro de dispositivos, posts do blog), Server Actions, autenticação admin
- [x] Home — 14 seções, header com busca e mega-menu, footer, reveal/stagger ao rolar
- [x] Catálogo — sidebar de categorias, filtro horizontal de dispositivos (3 etapas:
      aplicação → modelo → configuração), busca local
- [x] Página de produto — galeria, variações de cadeado (cor × segredo), abas com
      scroll-spy, "veja também", texto de apoio SEO
- [ ] Carrinho de orçamento completo (drawer em 2 etapas) + `/orcamento` + `/contato`
- [ ] Blog (índice + artigo)
- [ ] Admin — CRUD de produtos e blog com upload de imagem, lista de orçamentos
- [ ] Institucional — Serviços, Consultorias (LOTOTO/NR-12/Mãos Seguras), Sobre nós,
      páginas de setor de atuação, Downloads, Vídeos

## Estrutura

```
prisma/
  schema.prisma       # modelos
  seed.ts              # carga inicial (108 produtos, filtro, blog)
  data/*.json          # dados reais extraídos do protótipo de referência
scripts/
  create-admin.ts       # cria/atualiza o usuário administrador
src/
  app/
    (public)/           # site público — home, catálogo, produto, blog, contato
    admin/               # área administrativa (protegida por proxy.ts)
    api/                 # rotas de auth e upload
  components/            # Header, componentes de catálogo e produto, carrinho
  lib/                    # prisma, auth, email, storage, validations, utils
  server/                 # leituras (Server Components) + Server Actions
  stores/cart.ts           # estado do carrinho (Zustand)
  proxy.ts                  # protege as rotas /admin (ex-middleware.ts no Next 16)
```

## Setup local

```bash
npm install
cp .env.example .env        # preencha DATABASE_URL/DIRECT_URL (Neon) e AUTH_SECRET

npx prisma migrate dev      # cria as tabelas
npx prisma db seed          # carrega os 108 produtos + filtro + blog

npx tsx scripts/create-admin.ts "Nome" email@dominio.com "senhaForte"

npm run dev
```

Site em `http://localhost:3000`, admin em `/admin/login`.

## Notas

- **Imagens de produto**: ainda não há fotos reais — os cards mostram um placeholder de
  texto até a integração com o Cloudflare R2 estar configurada.
- **Blog**: o corpo dos artigos vem do protótipo de referência como Lorem Ipsum — precisa
  de redação real antes de produção. Títulos, tags e resumos já são reais.

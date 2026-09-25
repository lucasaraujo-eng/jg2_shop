# JG2 — Catálogo & Orçamentos

Site institucional e catálogo de produtos de segurança industrial da JG2 — bloqueio e
etiquetagem (LOTO) e Mãos Seguras — com montagem de orçamento e área administrativa.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Prisma 7** + **PostgreSQL** (Neon, via driver adapter `@prisma/adapter-neon`)
- **Auth.js v5** — login admin por credenciais
- **Zustand** — carrinho de orçamento (persistido em localStorage)
- **Resend** — e-mail de orçamento, contato e newsletter
- **Cloudflare R2** — imagens e PDFs
- **Google Analytics 4** — pageviews em produção (`G-D3Y0DQBN6Y`)
- **reCAPTCHA v3** — proteção dos formulários públicos (opcional)
- **Netlify** — hospedagem (`@netlify/plugin-nextjs`)

## Status do desenvolvimento

- [x] Setup técnico — schema Prisma, seed (produtos, categorias, filtro de dispositivos,
      posts do blog), Server Actions, autenticação admin
- [x] Home — seções, header com busca e mega-menu, footer, reveal ao rolar
- [x] Catálogo — sidebar, filtro de dispositivos (3 etapas), busca; subcategorias Mãos Seguras
- [x] Página de produto — galeria, variações de cadeado, abas, "veja também", texto de apoio SEO
- [x] Carrinho de orçamento (drawer) + `/orcamento` + `/contato` + modal de proposta
- [x] Institucional — Serviços (LOTOTO / NR-12 / Mãos Seguras), Sobre nós, setores, Downloads
- [x] Admin — CRUD de produtos e blog, lista de orçamentos, upload de imagem (R2)
- [x] SEO — metatags por rota (`src/data/seo.ts`), Search Console, GA4
- [x] Cache de catálogo/blog (1h) no Netlify
- [ ] Blog público — índice oculto por enquanto (`SHOW_POSTS = false`); corpos ainda seed/lorem
- [ ] Vídeos — página placeholder (“em breve”)
- [ ] Sitemap / robots.txt

## Estrutura

```
prisma/
  schema.prisma       # modelos
  seed.ts              # carga inicial (produtos, filtro, blog)
  data/*.json          # dados reais extraídos do protótipo de referência
scripts/
  create-admin.ts       # cria/atualiza o usuário administrador
  upload-*.ts           # uploads de mídia para o R2
src/
  app/
    (public)/           # site público — home, catálogo, produto, blog, contato
    admin/               # área administrativa (protegida por proxy.ts)
    api/                 # rotas de auth e upload
  components/            # Header, catálogo, produto, carrinho, GA4, etc.
  data/                  # SEO, setores, textos estáticos
  lib/                   # prisma, auth, email, storage, seo, validations
  server/                # leituras (Server Components) + Server Actions
  stores/cart.ts         # estado do carrinho (Zustand)
  proxy.ts               # protege as rotas /admin (ex-middleware.ts no Next 16)
```

## Setup local

```bash
npm install
cp .env.example .env        # preencha DATABASE_URL/DIRECT_URL (Neon) e AUTH_SECRET

npx prisma migrate dev      # cria as tabelas
npx prisma db seed          # carrega produtos + filtro + blog

npx tsx scripts/create-admin.ts "Nome" email@dominio.com "senhaForte"

npm run dev
```

Site em `http://localhost:3000`, admin em `/admin/login`.

## Notas

- **GA4**: carrega só em produção. Override com `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- **reCAPTCHA / Resend / R2**: opcionais no `.env`; sem as chaves, formulários e e-mails
  degradam de forma segura (ou avisam no log).
- **Blog**: títulos/tags reais no seed; corpos ainda precisam de redação antes de publicar.
- **SEO**: títulos e descriptions em `src/data/seo.ts`, aplicados via `pageMetadata()` /
  `generateMetadata` nas rotas públicas.

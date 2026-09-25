-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('BLOG', 'NORMA', 'EBOOK', 'ARTIGO', 'SETOR');

-- AlterTable BlogPost
ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "fileUrl" TEXT;
ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "type" "PostType" NOT NULL DEFAULT 'BLOG';
CREATE INDEX IF NOT EXISTS "BlogPost_type_status_idx" ON "BlogPost"("type", "status");

-- AlterTable Product SEO / support
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "seoTitle" TEXT;
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "seoDescription" TEXT;
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "supportHeading" TEXT;
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "supportTldr" TEXT;
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "supportIdealFor" TEXT;
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "supportNotFor" TEXT;
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "supportJson" JSONB;

-- CreateTable Video
CREATE TABLE IF NOT EXISTS "Video" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "youtubeUrl" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable ProductCategory
CREATE TABLE IF NOT EXISTS "ProductCategory" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "ProductCategory_productId_categoryId_key" ON "ProductCategory"("productId", "categoryId");
CREATE INDEX IF NOT EXISTS "ProductCategory_categoryId_idx" ON "ProductCategory"("categoryId");

DO $$ BEGIN
  ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_productId_fkey"
    FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_categoryId_fkey"
    FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Backfill primary ProductCategory from existing categoryId
INSERT INTO "ProductCategory" ("id", "productId", "categoryId", "isPrimary")
SELECT 'pc_' || substr(md5(p."id" || p."categoryId"), 1, 22), p."id", p."categoryId", true
FROM "Product" p
WHERE NOT EXISTS (
  SELECT 1 FROM "ProductCategory" pc WHERE pc."productId" = p."id" AND pc."categoryId" = p."categoryId"
);

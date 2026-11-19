
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "seoDescription" TEXT,
ADD COLUMN     "seoTitle" TEXT,
ADD COLUMN     "supportHeading" TEXT,
ADD COLUMN     "supportIdealFor" TEXT,
ADD COLUMN     "supportJson" JSONB,
ADD COLUMN     "supportNotFor" TEXT,
ADD COLUMN     "supportTldr" TEXT;

-- AlterTable
ALTER TABLE "Subcategory" ADD COLUMN     "seoDescription" TEXT,
ADD COLUMN     "seoTitle" TEXT;


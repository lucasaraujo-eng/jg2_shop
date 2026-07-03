-- AlterTable
ALTER TABLE "QuoteRequest" ADD COLUMN     "city" TEXT,
ADD COLUMN     "company" TEXT,
ALTER COLUMN "cnpj" DROP NOT NULL,
ALTER COLUMN "purpose" DROP NOT NULL;

-- Produto com várias subcategorias (N:N). "subcategoryId" em Product continua como subcategoria principal.
CREATE TABLE "ProductSubcategory" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "subcategoryId" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ProductSubcategory_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ProductSubcategory_subcategoryId_idx" ON "ProductSubcategory"("subcategoryId");

CREATE UNIQUE INDEX "ProductSubcategory_productId_subcategoryId_key" ON "ProductSubcategory"("productId", "subcategoryId");

ALTER TABLE "ProductSubcategory" ADD CONSTRAINT "ProductSubcategory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ProductSubcategory" ADD CONSTRAINT "ProductSubcategory_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "Subcategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Backfill: cada produto com subcategoria atual ganha o vínculo principal.
INSERT INTO "ProductSubcategory" ("id", "productId", "subcategoryId", "isPrimary")
SELECT 'ps_' || md5("id" || "subcategoryId"), "id", "subcategoryId", true
FROM "Product"
WHERE "subcategoryId" IS NOT NULL;

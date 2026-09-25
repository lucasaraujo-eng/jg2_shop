-- Corrige nome/slug sujo da subcategoria "Bloqueio Universal para Válvulas"
UPDATE "Subcategory"
SET
  "name" = 'Bloqueio Universal para Válvulas',
  "slug" = 'bloqueio-universal-para-valvulas'
WHERE "id" = 'cmr3kpia3000jrgthw4uoyhta'
   OR "slug" LIKE 'bloqueio-universal-para-valvulas-aparece-como-categoria%';

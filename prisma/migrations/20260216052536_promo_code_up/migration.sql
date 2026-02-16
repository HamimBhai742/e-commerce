/*
  Warnings:

  - A unique constraint covering the columns `[promo]` on the table `promo_codes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "promo_codes_promo_key" ON "promo_codes"("promo");

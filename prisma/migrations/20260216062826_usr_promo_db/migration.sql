/*
  Warnings:

  - You are about to drop the column `userId` on the `promo_codes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "promo_codes" DROP CONSTRAINT "promo_codes_userId_fkey";

-- DropIndex
DROP INDEX "promo_codes_promo_userId_key";

-- AlterTable
ALTER TABLE "promo_codes" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "used_promo_codes" (
    "id" TEXT NOT NULL,
    "promo" TEXT NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "used_promo_codes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "used_promo_codes_promo_key" ON "used_promo_codes"("promo");

-- CreateIndex
CREATE UNIQUE INDEX "used_promo_codes_promo_userId_key" ON "used_promo_codes"("promo", "userId");

-- AddForeignKey
ALTER TABLE "used_promo_codes" ADD CONSTRAINT "used_promo_codes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - Added the required column `startDate` to the `promo_codes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "promo_codes" ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

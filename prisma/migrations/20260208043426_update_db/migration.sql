/*
  Warnings:

  - You are about to drop the column `quntity` on the `Cart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "quntity",
ADD COLUMN     "quantity" DOUBLE PRECISION NOT NULL DEFAULT 1;

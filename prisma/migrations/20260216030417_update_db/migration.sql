/*
  Warnings:

  - Added the required column `sub_total` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "shippingFee" DOUBLE PRECISION,
ADD COLUMN     "sub_total" DOUBLE PRECISION NOT NULL;

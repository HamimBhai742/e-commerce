/*
  Warnings:

  - You are about to drop the column `full_address` on the `address` table. All the data in the column will be lost.
  - Added the required column `phone` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "address" DROP COLUMN "full_address",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "phone" TEXT NOT NULL;

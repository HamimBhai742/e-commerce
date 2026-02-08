/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `address` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "address_userId_phone_key";

-- CreateIndex
CREATE UNIQUE INDEX "address_phone_key" ON "address"("phone");

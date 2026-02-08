/*
  Warnings:

  - A unique constraint covering the columns `[userId,phone]` on the table `address` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "address_userId_phone_key" ON "address"("userId", "phone");

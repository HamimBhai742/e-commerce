/*
  Warnings:

  - A unique constraint covering the columns `[onlinePayId]` on the table `payments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Payment_Method" AS ENUM ('BKASH', 'NAGAD', 'ROCKET', 'UPAY');

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "onlinePayId" TEXT;

-- CreateTable
CREATE TABLE "online_payments" (
    "id" TEXT NOT NULL,
    "payment_method" "Payment_Method" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "phone" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "online_payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "online_payments_transactionId_key" ON "online_payments"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "payments_onlinePayId_key" ON "payments"("onlinePayId");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_onlinePayId_fkey" FOREIGN KEY ("onlinePayId") REFERENCES "online_payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

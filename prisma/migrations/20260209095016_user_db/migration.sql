/*
  Warnings:

  - You are about to drop the column `description` on the `subscription_plans` table. All the data in the column will be lost.
  - You are about to drop the column `stripePriceId` on the `subscription_plans` table. All the data in the column will be lost.
  - Added the required column `billingPeriod` to the `subscription_plans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `subscription_plans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricingId` to the `subscription_plans` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'CANCELLED', 'EXPIRED');

-- DropIndex
DROP INDEX "subscription_plans_stripePriceId_key";

-- AlterTable
ALTER TABLE "subscription_plans" DROP COLUMN "description",
DROP COLUMN "stripePriceId",
ADD COLUMN     "billingPeriod" TEXT NOT NULL,
ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "features" TEXT[],
ADD COLUMN     "pricingId" TEXT NOT NULL,
ADD COLUMN     "productId" TEXT[];

-- CreateTable
CREATE TABLE "user_subscriptions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'INACTIVE',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_subscriptions_userId_planId_key" ON "user_subscriptions"("userId", "planId");

-- AddForeignKey
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_planId_fkey" FOREIGN KEY ("planId") REFERENCES "subscription_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

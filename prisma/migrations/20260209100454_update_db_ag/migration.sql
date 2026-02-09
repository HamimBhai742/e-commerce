/*
  Warnings:

  - Made the column `transactionId` on table `user_subscriptions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user_subscriptions" ALTER COLUMN "transactionId" SET NOT NULL;

-- AlterTable
ALTER TABLE "address" ADD COLUMN     "full_address" TEXT,
ADD COLUMN     "isDefault" BOOLEAN NOT NULL DEFAULT false;

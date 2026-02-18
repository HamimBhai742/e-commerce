-- CreateEnum
CREATE TYPE "PromoStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'EXPIRED');

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "isDiscounted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isTranding" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "promo_codes" ADD COLUMN     "status" "PromoStatus" NOT NULL DEFAULT 'ACTIVE';

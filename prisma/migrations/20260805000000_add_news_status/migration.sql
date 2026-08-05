-- CreateEnum
CREATE TYPE "NewsStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- AlterTable
ALTER TABLE "News" ADD COLUMN "status" "NewsStatus" NOT NULL DEFAULT 'DRAFT';
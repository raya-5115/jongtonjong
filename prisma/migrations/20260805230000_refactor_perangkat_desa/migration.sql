/*
  Warnings:

  - You are about to drop the column `nip` on the `PerangkatDesa` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `PerangkatDesa` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PerangkatDesa" DROP CONSTRAINT "PerangkatDesa_userId_fkey";

-- DropIndex
DROP INDEX "PerangkatDesa_userId_key";

-- AlterTable
ALTER TABLE "PerangkatDesa" DROP COLUMN "nip",
DROP COLUMN "userId",
ADD COLUMN     "nik" TEXT,
ADD COLUMN     "telepon" TEXT,
ADD COLUMN     "urutan" INTEGER NOT NULL DEFAULT 0;

/*
  Warnings:

  - You are about to drop the column `nik` on the `PerangkatDesa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PerangkatDesa" DROP COLUMN "nik",
ADD COLUMN     "nip" TEXT;

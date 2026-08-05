/*
  Warnings:

  - You are about to drop the column `image` on the `Umkm` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Umkm` table. All the data in the column will be lost.
  - You are about to drop the column `whatsapp` on the `Umkm` table. All the data in the column will be lost.
  - Added the required column `ownerName` to the `Umkm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Umkm` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Umkm` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `Umkm` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Umkm" DROP CONSTRAINT "Umkm_ownerId_fkey";

-- AlterTable
ALTER TABLE "Umkm" DROP COLUMN "image",
DROP COLUMN "ownerId",
DROP COLUMN "whatsapp",
ADD COLUMN     "googleMapsUrl" TEXT,
ADD COLUMN     "ownerName" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "productImage" TEXT,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL;

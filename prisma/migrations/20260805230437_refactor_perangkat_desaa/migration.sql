/*
  Warnings:

  - Added the required column `nama` to the `PerangkatDesa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PerangkatDesa" ADD COLUMN     "nama" TEXT NOT NULL;

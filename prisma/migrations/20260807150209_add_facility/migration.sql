-- CreateEnum
CREATE TYPE "FacilityCategory" AS ENUM ('PENDIDIKAN', 'KESEHATAN', 'KEAGAMAAN', 'OLAHRAGA', 'PEMERINTAHAN', 'SOSIAL', 'LAINNYA');

-- CreateTable
CREATE TABLE "Facility" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "FacilityCategory" NOT NULL,
    "description" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Facility_pkey" PRIMARY KEY ("id")
);

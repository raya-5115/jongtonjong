import { prisma } from "@/lib/prisma";

export async function getFacilities() {
  return prisma.facility.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getFacilityById(id) {
  return prisma.facility.findUnique({
    where: {
      id,
    },
  });
}

export async function createFacility(data) {
  return prisma.facility.create({
    data,
  });
}

export async function updateFacility(id, data) {
  return prisma.facility.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteFacility(id) {
  return prisma.facility.delete({
    where: {
      id,
    },
  });
}
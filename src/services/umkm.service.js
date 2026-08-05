import {prisma} from "@/lib/prisma";

export async function getUmkm() {
  return prisma.umkm.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getUmkmById(id) {
  return prisma.umkm.findUnique({
    where: {
      id,
    },
  });
}

export async function createUmkm(data) {
  return prisma.umkm.create({
    data,
  });
}

export async function updateUmkm(id, data) {
  return prisma.umkm.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteUmkm(id) {
  return prisma.umkm.delete({
    where: {
      id,
    },
  });
}
import {prisma} from "@/lib/prisma";

export async function getPerangkat() {
  return prisma.perangkatDesa.findMany({
    orderBy: [
      {
        urutan: "asc",
      },
      {
        createdAt: "asc",
      },
    ],
  });
}

export async function getPerangkatById(id) {
  return prisma.perangkatDesa.findUnique({
    where: {
      id,
    },
  });
}

export async function createPerangkat(data) {
  return prisma.perangkatDesa.create({
    data,
  });
}

export async function updatePerangkat(id, data) {
  return prisma.perangkatDesa.update({
    where: {
      id,
    },
    data,
  });
}

export async function deletePerangkat(id) {
  return prisma.perangkatDesa.delete({
    where: {
      id,
    },
  });
}
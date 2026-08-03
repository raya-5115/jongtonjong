import {prisma} from "@/lib/prisma";

export async function getServices() {
  return prisma.service.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getServiceById(id) {
  return prisma.service.findUnique({
    where: {
      id,
    },
  });
}

export async function createService(data) {
  return prisma.service.create({
    data,
  });
}

export async function updateService(id, data) {
  return prisma.service.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteService(id) {
  return prisma.service.delete({
    where: {
      id,
    },
  });
}


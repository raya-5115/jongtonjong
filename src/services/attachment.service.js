import prisma from "@/lib/prisma";

export async function createAttachment(data) {
  return prisma.serviceRequestAttachment.create({
    data,
  });
}

export async function getAttachmentsByRequest(serviceRequestId) {
  return prisma.serviceRequestAttachment.findMany({
    where: {
      serviceRequestId,
    },
  });
}

export async function deleteAttachment(id) {
  return prisma.serviceRequestAttachment.delete({
    where: {
      id,
    },
  });
}
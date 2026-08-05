import {prisma} from "@/lib/prisma";

export async function getServiceRequests() {
  return prisma.serviceRequest.findMany({
    include: {
      service: true,
      attachments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getServiceRequestById(id) {
  return prisma.serviceRequest.findUnique({
    where: {
      id,
    },
    include: {
      service: true,
      attachments: true,
    },
  });
}

export async function createServiceRequest(data) {
  return prisma.serviceRequest.create({
    data,
  });
}

export async function updateServiceRequest(id, data) {
  return prisma.serviceRequest.update({
    where: {
      id,
    },
    data,
    include: {
      service: true,
      attachments: true,
    },
  });
}

export async function deleteServiceRequest(id) {
  return prisma.serviceRequest.delete({
    where: { id },
  });
}

export async function getServiceRequestBySubmissionNumber(
  submissionNumber
) {
  return prisma.serviceRequest.findUnique({
    where: {
      submissionNumber,
    },
    include: {
      service: true,
      attachments: true,
    },
  });
}


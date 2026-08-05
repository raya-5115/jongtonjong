import {prisma} from "@/lib/prisma";

export async function getDashboardStats() {
  const [
    totalServices,
    totalRequests,
    pendingRequests,
    totalNews,
    totalUmkm,
    recentRequests,
  ] = await Promise.all([
    prisma.service.count(),

    prisma.serviceRequest.count(),

    prisma.serviceRequest.count({
      where: {
        status: "PENDING",
      },
    }),

    prisma.news.count(),

    prisma.umkm.count(),

    prisma.serviceRequest.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        service: true,
      },
    }),
  ]);

  return {
    totalServices,
    totalRequests,
    pendingRequests,
    totalNews,
    totalUmkm,
    recentRequests,
  };
}
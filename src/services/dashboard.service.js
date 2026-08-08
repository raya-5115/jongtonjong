import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  try {
    const [
      totalRequests,
      pendingRequests,
      totalNews,
      totalUmkm,
      recentRequests,
    ] = await Promise.all([
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
      totalRequests,
      pendingRequests,
      totalNews,
      totalUmkm,
      recentRequests,
    };
  } catch (error) {
    console.error("[dashboard] Failed to load dashboard stats", {
      message: error?.message,
      code: error?.code,
      name: error?.name,
    });

    return {
      totalRequests: 0,
      pendingRequests: 0,
      totalNews: 0,
      totalUmkm: 0,
      recentRequests: [],
    };
  }
}

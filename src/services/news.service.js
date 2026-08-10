import {prisma} from "@/lib/prisma";

export async function getNews() {
  return prisma.news.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getNewsById(id) {
  return prisma.news.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
    },
  });
}

export async function getNewsByIdOrSlug(idOrSlug) {
  try {
    const byId = await prisma.news.findUnique({
      where: { id: idOrSlug },
      include: { author: true },
    });
    if (byId) return byId;

    return prisma.news.findUnique({
      where: { slug: idOrSlug },
      include: { author: true },
    });
  } catch (error) {
    return null;
  }
}

export async function createNews(data) {
  return prisma.news.create({
    data,
  });
}

export async function updateNews(id, data) {
  return prisma.news.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteNews(id) {
  return prisma.news.delete({
    where: {
      id,
    },
  });
}
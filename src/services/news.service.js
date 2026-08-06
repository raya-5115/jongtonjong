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
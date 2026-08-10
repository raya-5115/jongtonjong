import {prisma} from "@/lib/prisma";

export async function getNews() {
  return prisma.news.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getNewsById(id) {
  const news = await prisma.news.findUnique({
    where: {
      id,
    },
  });

  if (news && news.authorId) {
    const author = await prisma.user.findUnique({
      where: { id: news.authorId },
      select: { id: true, name: true, email: true },
    });
    return { ...news, author };
  }

  return news;
}

export async function getNewsByIdOrSlug(idOrSlug) {
  try {
    let article = await prisma.news.findUnique({
      where: { id: idOrSlug },
    });

    if (!article) {
      article = await prisma.news.findUnique({
        where: { slug: idOrSlug },
      });
    }

    if (article && article.authorId) {
      const author = await prisma.user.findUnique({
        where: { id: article.authorId },
        select: { id: true, name: true, email: true },
      });
      return { ...article, author };
    }

    return article;
  } catch (error) {
    console.error("Error in getNewsByIdOrSlug:", error);
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
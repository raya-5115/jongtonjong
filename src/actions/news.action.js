"use server";

import { revalidatePath } from "next/cache";

import { newsSchema } from "@/validation/news.validation";
import { slugify } from "@/lib/slugify";

import {
  createNews,
  updateNews,
  deleteNews,
} from "@/services/news.service";

export async function createNewsAction(data) {
  const validated = newsSchema.parse(data);

  await createNews({
    ...validated,
    slug: slugify(validated.title),
  });

  revalidatePath("/dashboard/berita");

  return {
    success: true,
    message: "Berita berhasil ditambahkan.",
  };
}

export async function updateNewsAction(id, data) {
  const validated = newsSchema.parse(data);

  await updateNews(id, {
    ...validated,
    slug: slugify(validated.title),
  });

  revalidatePath("/dashboard/berita");
  revalidatePath(`/dashboard/berita/${id}/edit`);

  return {
    success: true,
    message: "Berita berhasil diperbarui.",
  };
}

export async function deleteNewsAction(id) {
  await deleteNews(id);

  revalidatePath("/dashboard/berita");

  return {
    success: true,
    message: "Berita berhasil dihapus.",
  };
}


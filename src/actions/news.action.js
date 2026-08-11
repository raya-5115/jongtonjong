"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";
import { uploadImage, deleteFile } from "@/services/storage.service";
import { newsSchema } from "@/validation/news.validation";

export async function createNewsAction(formData) {
  const title = formData.get("title");
  const rawSlug = formData.get("slug");
  const content = formData.get("content");
  const image = formData.get("image");

  const validated = newsSchema.parse({
    title,
    slug: rawSlug || undefined,
    content,
  });

  const finalSlug = rawSlug && rawSlug.trim() !== ""
    ? slugify(rawSlug)
    : slugify(title);

  let imagePath = null;

  try {
    if (image && image instanceof File && image.size > 0) {
      imagePath = await uploadImage({
        file: image,
        folder: "berita",
      });
    }

    const news = await prisma.news.create({
      data: {
        title: validated.title,
        slug: finalSlug,
        content: validated.content,
        image: imagePath,
      },
    });

    revalidatePath("/dashboard/berita");
    revalidatePath("/berita");
    revalidatePath(`/berita/${finalSlug}`);

    return {
      success: true,
      message: "Berita berhasil ditambahkan.",
      data: news,
    };
  } catch (error) {
    if (imagePath) {
      await deleteFile({
        bucket: "images",
        path: imagePath,
      });
    }
    throw error;
  }
}

export async function updateNewsAction(id, formData) {
  if (!id) {
    throw new Error("ID berita tidak ditemukan.");
  }

  const existing = await prisma.news.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new Error("Data berita tidak ditemukan.");
  }

  const title = formData.get("title");
  const rawSlug = formData.get("slug");
  const content = formData.get("content");
  const image = formData.get("image");

  const validated = newsSchema.parse({
    title,
    slug: rawSlug || undefined,
    content,
  });

  const finalSlug = rawSlug && rawSlug.trim() !== ""
    ? slugify(rawSlug)
    : slugify(title);

  let imagePath = existing.image;

  if (image && image instanceof File && image.size > 0) {
    const newImagePath = await uploadImage({
      file: image,
      folder: "berita",
    });

    if (existing.image) {
      await deleteFile({
        bucket: "images",
        path: existing.image,
      });
    }

    imagePath = newImagePath;
  }

  const news = await prisma.news.update({
    where: { id },
    data: {
      title: validated.title,
      slug: finalSlug,
      content: validated.content,
      image: imagePath,
    },
  });

  revalidatePath("/dashboard/berita");
  revalidatePath(`/dashboard/berita/${id}/edit`);
  revalidatePath("/berita");
  revalidatePath(`/berita/${finalSlug}`);

  return {
    success: true,
    message: "Berita berhasil diperbarui.",
    data: news,
  };
}

export async function deleteNewsAction(id) {
  if (!id) {
    throw new Error("ID berita tidak ditemukan.");
  }

  const existing = await prisma.news.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new Error("Data berita tidak ditemukan.");
  }

  await prisma.news.delete({
    where: { id },
  });

  if (existing.image) {
    await deleteFile({
      bucket: "images",
      path: existing.image,
    });
  }

  revalidatePath("/dashboard/berita");
  revalidatePath("/berita");

  return {
    success: true,
    message: "Berita berhasil dihapus.",
  };
}

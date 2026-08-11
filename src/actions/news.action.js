"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";
import { uploadImage, deleteFile } from "@/services/storage.service";
import { newsSchema } from "@/validation/news.validation";

function isFileObject(file) {
  return Boolean(
    file &&
      typeof file === "object" &&
      typeof file.size === "number" &&
      file.size > 0 &&
      Boolean(file.name)
  );
}

export async function createNewsAction(formData) {
  let imagePath = null;
  const image = formData.get("image");

  try {
    const title = formData.get("title");
    const rawSlug = formData.get("slug");
    const content = formData.get("content");

    const validated = newsSchema.parse({
      title,
      slug: rawSlug || undefined,
      content,
    });

    const finalSlug =
      rawSlug && rawSlug.trim() !== ""
        ? slugify(rawSlug)
        : slugify(title);

    if (isFileObject(image)) {
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
      data: JSON.parse(JSON.stringify(news)),
    };
  } catch (error) {
    if (imagePath) {
      await deleteFile({
        bucket: "images",
        path: imagePath,
      });
    }
    return {
      success: false,
      message: error?.message || "Gagal menambahkan berita.",
    };
  }
}

export async function updateNewsAction(id, formData) {
  try {
    if (!id) {
      return {
        success: false,
        message: "ID berita tidak ditemukan.",
      };
    }

    const existing = await prisma.news.findUnique({
      where: { id },
    });

    if (!existing) {
      return {
        success: false,
        message: "Data berita tidak ditemukan.",
      };
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

    const finalSlug =
      rawSlug && rawSlug.trim() !== ""
        ? slugify(rawSlug)
        : slugify(title);

    let imagePath = existing.image;

    if (isFileObject(image)) {
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
      data: JSON.parse(JSON.stringify(news)),
    };
  } catch (error) {
    return {
      success: false,
      message: error?.message || "Gagal memperbarui berita.",
    };
  }
}

export async function deleteNewsAction(id) {
  try {
    if (!id) {
      return {
        success: false,
        message: "ID berita tidak ditemukan.",
      };
    }

    const existing = await prisma.news.findUnique({
      where: { id },
    });

    if (!existing) {
      return {
        success: false,
        message: "Data berita tidak ditemukan.",
      };
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
  } catch (error) {
    return {
      success: false,
      message: error?.message || "Gagal menghapus berita.",
    };
  }
}

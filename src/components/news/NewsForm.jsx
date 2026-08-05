"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { newsSchema } from "@/validation/news.validation";

import {
  createNewsAction,
  updateNewsAction,
} from "@/actions/news.action";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function NewsForm({
  news = null,
}) {
  const [isPending, startTransition] =
    useTransition();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(newsSchema),

    defaultValues: {
      title: news?.title ?? "",

      content: news?.content ?? "",

      image: news?.image ?? "",

      status: news?.status ?? "DRAFT",
    },
  });

  const status = watch("status");

  async function onSubmit(data) {
    startTransition(async () => {
      try {
        if (news) {
          await updateNewsAction(news.id, data);

          toast.success(
            "Berita berhasil diperbarui."
          );
        } else {
          await createNewsAction(data);

          toast.success(
            "Berita berhasil ditambahkan."
          );
        }
      } catch (err) {
        toast.error(err.message);
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div>
        <label className="text-sm font-medium">
          Judul
        </label>

        <Input
          {...register("title")}
        />
      </div>

      <div>
        <label className="text-sm font-medium">
          Thumbnail
        </label>

        <Input
          {...register("image")}
          placeholder="https://..."
        />
      </div>

      <div>
        <label className="text-sm font-medium">
          Status
        </label>

        <Select
          value={status}
          onValueChange={(value) =>
            setValue("status", value)
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>

            <SelectItem value="DRAFT">
              Draft
            </SelectItem>

            <SelectItem value="PUBLISHED">
              Publish
            </SelectItem>

          </SelectContent>

        </Select>
      </div>

      <div>
        <label className="text-sm font-medium">
          Isi Berita
        </label>

        <Textarea
          rows={12}
          {...register("content")}
        />
      </div>

      <Button
        type="submit"
        disabled={isPending}
      >
        {isPending
          ? "Menyimpan..."
          : "Simpan"}
      </Button>
    </form>
  );
}
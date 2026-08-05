"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { createNewsAction, updateNewsAction } from "@/actions/news.action";

import { newsSchema } from "@/validation/news.validation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewsForm({ news = null }) {
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(newsSchema),

    defaultValues: {
      title: news?.title ?? "",
      content: news?.content ?? "",
      image: news?.image ?? "",
    },
  });

  function onSubmit(data) {
    startTransition(async () => {
      try {
        if (news) {
          const res = await updateNewsAction(news.id, data);

          toast.success(res.message);
        } else {
          const res = await createNewsAction(data);

          toast.success(res.message);
        }
      } catch (err) {
        toast.error(err.message);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informasi Berita</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Judul</label>

            <Input {...register("title")} placeholder="Masukkan judul berita" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Thumbnail</label>

            <Input {...register("image")} placeholder="https://..." />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Isi Berita</label>

            <Textarea
              rows={12}
              {...register("content")}
              placeholder="Tulis isi berita..."
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? "Menyimpan..."
            : news
              ? "Update Berita"
              : "Tambah Berita"}
        </Button>
      </div>
    </form>
  );
}

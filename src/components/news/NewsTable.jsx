"use client";

import Image from "next/image";
import { Newspaper } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPublicImageUrl } from "@/lib/storage-utils";

import NewsActions from "./NewsActions";

export default function NewsTable({ news, data }) {
  const newsList = news || data || [];

  if (!newsList || newsList.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center bg-white shadow-xs">
        <p className="text-muted-foreground">Belum ada berita yang ditambahkan.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Foto</TableHead>
            <TableHead>Judul Berita</TableHead>
            <TableHead>Slug (URL)</TableHead>
            <TableHead>Tanggal Dibuat</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {newsList.map((item) => {
            const imageUrl = getPublicImageUrl(item.image);
            const dateFormatted = item.createdAt
              ? new Date(item.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "-";

            return (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Newspaper className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </TableCell>

                <TableCell className="font-medium text-slate-900">
                  {item.title}
                </TableCell>

                <TableCell className="font-mono text-xs text-slate-500">
                  {item.slug}
                </TableCell>

                <TableCell className="text-slate-600 text-xs">
                  {dateFormatted}
                </TableCell>

                <TableCell className="text-right">
                  <NewsActions news={item} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

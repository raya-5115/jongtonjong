"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import NewsActions from "./NewsActions";

export default function NewsTable({ news }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Judul</TableHead>

          <TableHead>Tanggal</TableHead>

          <TableHead className="text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {news.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} className="text-center">
              Belum ada berita.
            </TableCell>
          </TableRow>
        ) : (
          news.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>

              <TableCell>
                {new Date(item.createdAt).toLocaleDateString("id-ID")}
              </TableCell>

              <TableCell className="text-right">
                <NewsActions news={item} />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

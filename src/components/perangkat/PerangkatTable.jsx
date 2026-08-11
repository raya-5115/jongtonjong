"use client";

import Image from "next/image";
import { User } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPublicImageUrl } from "@/lib/storage-utils";

import PerangkatActions from "./PerangkatActions";

export default function PerangkatTable({ perangkat }) {
  if (!perangkat || perangkat.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center bg-white shadow-xs">
        <p className="text-muted-foreground">Belum ada data perangkat desa.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Foto</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Jabatan</TableHead>
            <TableHead>NIP</TableHead>
            <TableHead>No. Telpon</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {perangkat.map((item) => {
            const imageUrl = getPublicImageUrl(item.foto);

            return (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={item.nama}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </TableCell>

                <TableCell className="font-medium text-slate-900">
                  {item.nama}
                </TableCell>

                <TableCell className="text-slate-700">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {item.jabatan}
                  </span>
                </TableCell>

                <TableCell className="text-slate-500 font-mono text-xs">
                  {item.nip || "-"}
                </TableCell>

                <TableCell className="text-slate-600 font-mono text-xs">
                  {item.telepon || "-"}
                </TableCell>

                <TableCell className="text-right">
                  <PerangkatActions perangkat={item} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
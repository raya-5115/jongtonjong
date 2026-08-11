"use client";

import Image from "next/image";
import { Store } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPublicImageUrl } from "@/lib/storage-utils";

import UmkmActions from "./UmkmActions";

export default function UmkmTable({ data }) {
  if (data.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center bg-white shadow-xs">
        <p className="text-muted-foreground">Belum ada data UMKM.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Foto</TableHead>
            <TableHead>Nama Usaha</TableHead>
            <TableHead>Pemilik</TableHead>
            <TableHead>Telepon</TableHead>
            <TableHead>Alamat</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item) => {
            const imageUrl = getPublicImageUrl(item.productImage);

            return (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={item.businessName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Store className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </TableCell>

                <TableCell className="font-medium text-slate-900">
                  {item.businessName}
                </TableCell>

                <TableCell className="text-slate-700">
                  {item.ownerName}
                </TableCell>

                <TableCell className="text-slate-600">
                  {item.phone}
                </TableCell>

                <TableCell className="text-slate-600">
                  {item.address}
                </TableCell>

                <TableCell className="text-right">
                  <UmkmActions umkm={item} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
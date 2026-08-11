import Image from "next/image";
import { Building2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPublicImageUrl } from "@/lib/storage-utils";

import FacilityActions from "./FacilityActions";

const categoryLabels = {
  PENDIDIKAN: "Pendidikan",
  KESEHATAN: "Kesehatan",
  KEAGAMAAN: "Keagamaan",
  OLAHRAGA: "Olahraga",
  PEMERINTAHAN: "Pemerintahan",
  SOSIAL: "Sosial",
  LAINNYA: "Lainnya",
};

export default function FacilityTable({ facilities }) {
  if (facilities.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center bg-white shadow-xs">
        <p className="text-muted-foreground">
          Belum ada fasilitas yang ditambahkan.
        </p>
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
            <TableHead>Kategori</TableHead>
            <TableHead>Alamat</TableHead>
            <TableHead>Kontak</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {facilities.map((facility) => {
            const imageUrl = getPublicImageUrl(facility.image);

            return (
              <TableRow key={facility.id}>
                <TableCell>
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={facility.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Building2 className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </TableCell>

                <TableCell className="font-medium text-slate-900">
                  {facility.name}
                </TableCell>

                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                    {categoryLabels[facility.category] || facility.category}
                  </span>
                </TableCell>

                <TableCell className="text-slate-600">
                  {facility.address || "-"}
                </TableCell>

                <TableCell className="text-slate-600">
                  {facility.phone || "-"}
                </TableCell>

                <TableCell className="text-right">
                  <FacilityActions facility={facility} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

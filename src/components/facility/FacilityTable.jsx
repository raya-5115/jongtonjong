import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      <div className="rounded-lg border p-8 text-center">
        <p className="text-muted-foreground">
          Belum ada fasilitas yang ditambahkan.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Alamat</TableHead>
            <TableHead>Kontak</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {facilities.map((facility) => (
            <TableRow key={facility.id}>
              <TableCell className="font-medium">{facility.name}</TableCell>

              <TableCell>{categoryLabels[facility.category]}</TableCell>

              <TableCell>{facility.address || "-"}</TableCell>

              <TableCell>{facility.phone || "-"}</TableCell>

              <TableCell className="text-right">
                <FacilityActions facility={facility} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

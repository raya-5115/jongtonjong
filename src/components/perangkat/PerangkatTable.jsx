"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import PerangkatActions from "./PerangkatActions";

export default function PerangkatTable({ perangkat }) {
  return (
    <Table>

      <TableHeader>

        <TableRow>

          <TableHead>Nama</TableHead>

          <TableHead>Jabatan</TableHead>

          <TableHead>Urutan</TableHead>

          <TableHead className="text-right">
            Aksi
          </TableHead>

        </TableRow>

      </TableHeader>

      <TableBody>

        {perangkat.length === 0 ? (

          <TableRow>

            <TableCell
              colSpan={5}
              className="text-center"
            >
              Belum ada data perangkat desa.
            </TableCell>

          </TableRow>

        ) : (

          perangkat.map((item) => (

            <TableRow key={item.id}>

              <TableCell>
                {item.nama}
              </TableCell>

              <TableCell>
                {item.jabatan}
              </TableCell>

              <TableCell>
                {item.urutan}
              </TableCell>

              <TableCell className="text-right">
                <PerangkatActions perangkat={item} />
              </TableCell>

            </TableRow>

          ))

        )}

      </TableBody>

    </Table>
  );
}
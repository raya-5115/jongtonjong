"use client";

import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import UmkmActions from "./UmkmActions";

export default function UmkmTable({
  data,
}) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>

            <TableHead>
              Nama Usaha
            </TableHead>

            <TableHead>
              Pemilik
            </TableHead>

            <TableHead>
              Telepon
            </TableHead>

            <TableHead>
              Alamat
            </TableHead>

            <TableHead className="text-right">
              Aksi
            </TableHead>

          </TableRow>
        </TableHeader>

        <TableBody>

          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-8"
              >
                Belum ada data UMKM.
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.id}>

                <TableCell className="font-medium">
                  {item.businessName}
                </TableCell>

                <TableCell>
                  {item.ownerName}
                </TableCell>

                <TableCell>
                  {item.phone}
                </TableCell>

                <TableCell>
                  {item.address}
                </TableCell>

                <TableCell className="text-right">
                  <UmkmActions umkm={item} />
                </TableCell>

              </TableRow>
            ))
          )}

        </TableBody>
      </Table>
    </div>
  );
}
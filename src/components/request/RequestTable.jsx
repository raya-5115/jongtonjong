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

import { Badge } from "@/components/ui/badge";

import RequestActions from "./RequestActions";

export default function RequestTable({ requests }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No Pengajuan</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead>Layanan</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Tanggal</TableHead>
          <TableHead className="text-right">
            Aksi
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {requests.map((request) => (
          <TableRow key={request.id}>
            <TableCell>
              {request.submissionNumber}
            </TableCell>

            <TableCell>{request.fullName}</TableCell>

            <TableCell>
              {request.service.name}
            </TableCell>

            <TableCell>
              <Badge>
                {request.status}
              </Badge>
            </TableCell>

            <TableCell>
              {new Date(
                request.createdAt
              ).toLocaleDateString("id-ID")}
            </TableCell>

            <TableCell className="text-right">
              <RequestActions request={request} />
            </TableCell>
          </TableRow>
        ))}

        {requests.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center text-muted-foreground"
            >
              Belum ada pengajuan.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
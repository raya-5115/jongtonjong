import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { ArrowRight } from "lucide-react";

import { getRequestStatus } from "@/lib/requestStatus";

import { Badge } from "@/components/ui/badge";

export default function RecentRequestTable({ requests }) {
  return (
    <Card>

      <CardHeader className="flex flex-row items-center justify-between">

        <CardTitle>
          Pengajuan Terbaru
        </CardTitle>

        <Button
          asChild
          variant="outline"
          size="sm"
        >
          <Link href="/dashboard/pengajuan">
            <Button variant="outline" size="sm">
              Lihat Semua
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </Button>

      </CardHeader>

      <CardContent>

        <Table>

          <TableHeader>

            <TableRow>

              <TableHead>Nomor</TableHead>

              <TableHead>Nama</TableHead>

              <TableHead>Status</TableHead>

            </TableRow>

          </TableHeader>

          <TableBody>

            {requests.length === 0 ? (

              <TableRow>

                <TableCell
                  colSpan={3}
                  className="text-center"
                >
                  Belum ada pengajuan.
                </TableCell>

              </TableRow>

            ) : (

              requests.map((request) => {

                const status =
                  getRequestStatus(request.status);

                return (

                  <TableRow key={request.id}>

                    <TableCell>
                      {request.submissionNumber}
                    </TableCell>

                    <TableCell>
                      {request.fullName}
                    </TableCell>

                    <TableCell>

                      <Badge className={status.className}>
                        {status.label}
                      </Badge>

                    </TableCell>

                  </TableRow>

                );

              })

            )}

          </TableBody>

        </Table>

      </CardContent>

    </Card>
  );
}
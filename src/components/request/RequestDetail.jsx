"use client";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

import RequestProcessCard from "./RequestProcessCard";

export default function RequestDetail({ request }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Detail Pengajuan</CardTitle>

          <p className="text-muted-foreground">{request.submissionNumber}</p>
        </CardHeader>

        <CardContent>
          <Badge>{request.status}</Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Pemohon</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <Info title="Layanan" value={request.service.name} />

            <Info title="Nama" value={request.fullName} />

            <Info title="NIP" value={request.nip} />

            <Info title="No. HP" value={request.phone} />

            <Info title="Alamat" value={request.address} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Keterangan</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground">{request.description || "-"}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lampiran</CardTitle>
        </CardHeader>

        <CardContent>
          {request.attachments.length === 0 ? (
            <p className="text-muted-foreground">Belum ada lampiran.</p>
          ) : (
            <div className="space-y-3">
              {request.attachments.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <span>{file.fileName}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <RequestProcessCard request={request} />
    </div>
  );
}

function Info({ title, value }) {
  return (
    <div className="space-y-1">

      <p className="text-sm text-muted-foreground">
        {title}
      </p>

      <Separator />

      <p className="font-medium break-words">
        {value}
      </p>

    </div>
  );
}
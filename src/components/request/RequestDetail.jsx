"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getPublicImageUrl } from "@/lib/storage-utils";
import { ExternalLink, FileText } from "lucide-react";

import RequestProcessCard from "./RequestProcessCard";

export default function RequestDetail({ request }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Detail Pengajuan</CardTitle>
          <p className="text-muted-foreground font-mono">{request.submissionNumber}</p>
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
            <Info title="Jenis Layanan" value={request.service?.name || "-"} />
            <Info title="Nama Pemohon" value={request.fullName} />
            <Info title="NIK" value={request.nik} />
            <Info title="No. HP / WhatsApp" value={request.phone} />
            <Info title="Alamat Pemohon" value={request.address} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Keterangan / Alasan Pengajuan</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground whitespace-pre-line">
            {request.description || "-"}
          </p>
        </CardContent>
      </Card>

      {/* Attachments Section */}
      <Card>
        <CardHeader>
          <CardTitle>Dokumen Lampiran ({request.attachments?.length || 0})</CardTitle>
        </CardHeader>

        <CardContent>
          {!request.attachments || request.attachments.length === 0 ? (
            <p className="text-muted-foreground text-sm">Belum ada dokumen lampiran yang diunggah.</p>
          ) : (
            <div className="space-y-3">
              {request.attachments.map((file) => {
                const fileUrl = getPublicImageUrl(file.fileUrl);

                return (
                  <div
                    key={file.id}
                    className="flex items-center justify-between rounded-xl border border-slate-200 p-3.5 bg-slate-50/50 hover:bg-white transition"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-slate-800 text-sm truncate">
                        {file.fileName}
                      </span>
                    </div>

                    {fileUrl && (
                      <a
                        href={fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs transition shrink-0"
                      >
                        <span>Lihat Dokumen</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                );
              })}
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
      <p className="text-sm text-muted-foreground">{title}</p>
      <Separator />
      <p className="font-medium break-words">{value}</p>
    </div>
  );
}
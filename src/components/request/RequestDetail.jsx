"use client";

import { Badge } from "@/components/ui/badge";

export default function RequestDetail({ request }) {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold">
          Detail Pengajuan
        </h1>

        <p className="text-muted-foreground">
          {request.submissionNumber}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">

        <Info
          title="Layanan"
          value={request.service.name}
        />

        <div>
          <p className="text-sm text-muted-foreground">
            Status
          </p>

          <Badge>
            {request.status}
          </Badge>
        </div>

        <Info
          title="Nama"
          value={request.fullName}
        />

        <Info
          title="NIK"
          value={request.nik}
        />

        <Info
          title="No. HP"
          value={request.phone}
        />

        <Info
          title="Alamat"
          value={request.address}
        />

      </div>

      <div>
        <p className="font-medium">
          Keterangan
        </p>

        <p className="text-muted-foreground">
          {request.description || "-"}
        </p>
      </div>

      <div>
        <p className="font-medium mb-2">
          Lampiran
        </p>

        {request.attachments.length === 0 ? (
          <p className="text-muted-foreground">
            Belum ada lampiran.
          </p>
        ) : (
          request.attachments.map((file) => (
            <div key={file.id}>
              {file.fileName}
            </div>
          ))
        )}
      </div>

    </div>
  );
}

function Info({ title, value }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">
        {title}
      </p>

      <p className="font-medium">
        {value}
      </p>
    </div>
  );
}
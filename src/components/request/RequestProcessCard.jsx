"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { updateServiceRequestAction } from "@/actions/serviceRequest.action";

export default function RequestProcessCard({ request }) {
  const router = useRouter();

  const [status, setStatus] = useState(request.status);

  const [note, setNote] = useState(request.note ?? "");

  const [isPending, startTransition] = useTransition();

  function handleSave() {
    startTransition(async () => {
      try {
        const res = await updateServiceRequestAction(request.id, {
          status,
          note,
        });

        toast.success(res.message);
        router.push("/dashboard/pengajuan");
      } catch (err) {
        toast.error(err.message);
      }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Proses Pengajuan</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Status</label>

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="PENDING">Pending</SelectItem>

              <SelectItem value="PROCESS">Diproses</SelectItem>

              <SelectItem value="FINISHED">Selesai</SelectItem>

              <SelectItem value="REJECTED">Ditolak</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium">Catatan Admin</label>

          <Textarea
            rows={5}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <Button className="w-full" disabled={isPending} onClick={handleSave}>
          {isPending ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </CardContent>
    </Card>
  );
}

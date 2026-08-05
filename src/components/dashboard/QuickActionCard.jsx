import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  Newspaper,
  FileText,
  Briefcase,
} from "lucide-react";

export default function QuickActionCard() {
  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Aksi Cepat
        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-3">

        <Link href="/dashboard/layanan">

          <Button
            className="w-full justify-start"
            variant="outline"
          >
            <Briefcase className="mr-2 h-4 w-4" />
            Kelola Layanan
          </Button>

        </Link>

        <Link href="/dashboard/pengajuan">

          <Button
            className="w-full justify-start"
            variant="outline"
          >
            <FileText className="mr-2 h-4 w-4" />
            Lihat Pengajuan
          </Button>

        </Link>

        <Button
          disabled
          className="w-full justify-start"
          variant="outline"
        >
          <Newspaper className="mr-2 h-4 w-4" />
          Kelola Berita
        </Button>

      </CardContent>

    </Card>
  );
}
import Link from "next/link";
import { getDashboardStats } from "@/services/dashboard.service";

import StatCard from "@/components/dashboard/StatCard";
import RecentRequestTable from "@/components/dashboard/RecentRequestTable";
import QuickActionCard from "@/components/dashboard/QuickActionCard";

import {
  Briefcase,
  FileText,
  Clock3,
  Newspaper,
  Store,
  Download,
  Plus,
} from "lucide-react";

export default async function DashboardPage() {
  const data = await getDashboardStats();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[24px] border border-slate-200 bg-white/80 p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)] md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-[28px] font-semibold text-slate-900">
            Selamat Datang, Admin Desa Tonjong
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Berikut adalah ringkasan informasi desa hari ini.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="TOTAL PENGAJUAN"
          value={data.totalRequests}
          icon={FileText}
          accent="blue"
        />

        <StatCard
          title="BERITA TERPUBLIKASI"
          value={data.totalNews}
          icon={Newspaper}
          accent="indigo"
        />

        <StatCard
          title="JUMLAH UMKM"
          value={data.totalUmkm}
          icon={Store}
          accent="green"
        />

        <StatCard
          title="PENGAJUAN BARU"
          value={data.pendingRequests}
          icon={Clock3}
          accent="amber"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentRequestTable requests={data.recentRequests} />
        </div>

        <QuickActionCard />
      </div>
    </div>
  );
}

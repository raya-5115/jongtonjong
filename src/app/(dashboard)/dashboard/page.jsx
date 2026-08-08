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
} from "lucide-react";

export default async function DashboardPage() {
  const data = await getDashboardStats();

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-muted-foreground">
          Selamat datang di Dashboard Website Desa.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="TOTAL PENGAJUAN"
          value={data.totalRequests}
          icon={FileText}
        />

        <StatCard
          title="BERITA TERPUBLIKASI"
          value={data.totalNews}
          icon={Newspaper}
        />

        <StatCard
          title="JUMLAH UMKM"
          value={data.totalUmkm}
          icon={Store}
        />

        <StatCard
          title="PENGAJUAN BARU"
          value={data.pendingRequests}
          icon={Clock3}
        />
        
      </div>

      <div className="grid gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">

          <RecentRequestTable
            requests={data.recentRequests}
          />

        </div>

        <QuickActionCard />

      </div>

    </div>
  );
}
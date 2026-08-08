import {
  LayoutDashboard,
  Users,
  Newspaper,
  Store,
  UserCog,
  Building2,
  Briefcase,
  FileText,
} from "lucide-react";

export const dashboardMenu = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Perangkat Desa",
    href: "/dashboard/perangkat",
    icon: Users,
  },
  {
    title: "Berita",
    href: "/dashboard/berita",
    icon: Newspaper,
  },
  {
    title: "UMKM",
    href: "/dashboard/umkm",
    icon: Store,
  },
  {
    title: "Pengguna",
    href: "/dashboard/users",
    icon: UserCog,
  },
  {
    title: "Fasilitas",
    href: "/dashboard/fasilitas",
    icon: Building2,
  },
  {
    title: "Layanan",
    href: "/dashboard/layanan",
    icon: Briefcase,
  },
  {
    title: "Pengajuan",
    href: "/dashboard/pengajuan",
    icon: FileText,
  },
];

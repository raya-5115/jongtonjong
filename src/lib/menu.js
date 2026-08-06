import {
  LayoutDashboard,
  Newspaper,
  Images,
  Store,
  Users,
  Building2,
  MessageSquare,
} from "lucide-react";

export const dashboardMenu = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
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
    title: "User",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Layanan",
    href: "/dashboard/layanan",
    icon: MessageSquare,
  },
];
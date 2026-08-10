import Link from "next/link";
import { Eye, PhoneCall } from "lucide-react";

const FACILITY_DATA = [
  {
    id: 1,
    category: "Pendidikan",
    title: "SDIT Darussalam",
    description: "Fasilitas pendidikan dasar berasrama dengan kurikulum terpadu dan lingkungan belajar yang asri.",
    href: "/fasilitas",
  },
  {
    id: 2,
    category: "Kesehatan",
    title: "TASTE (Tonjong Atasi)",
    description: "Poskesdes dan sarana kesehatan masyarakat terpadu untuk pelayanan medis awal warga.",
    href: "/fasilitas",
  },
  {
    id: 3,
    category: "Keagamaan",
    title: "Tonjong Update",
    description: "Masjid utama dan pusat kegiatan keagamaan serta pembinaan karakter masyarakat Desa.",
    href: "/fasilitas",
  },
];

export default function FacilitySection() {
  return (
    <section className="w-full bg-slate-50 py-12 sm:py-16 md:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-extrabold text-[#0c183a] sm:text-3xl lg:text-4xl">
            Fasilitas Desa Tonjong
          </h2>
          <div className="mx-auto mt-3 h-[2px] w-full max-w-2xl bg-indigo-200/80" />
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FACILITY_DATA.map((item) => (
            <div
              key={item.id}
              className="flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200/80 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Card Image Placeholder with Category Badge */}
              <div className="relative aspect-[16/9] w-full bg-indigo-50/80 border-b border-indigo-100 flex items-center justify-center text-slate-400">
                <span className="absolute top-3 left-3 rounded-md bg-[#0c183a]/10 px-2.5 py-1 text-xs font-semibold text-[#0c183a] backdrop-blur-sm">
                  {item.category}
                </span>
                <svg className="h-10 w-10 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4" />
                </svg>
              </div>

              {/* Card Content */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold text-[#0c183a] line-clamp-1">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                {/* 2 Action Buttons */}
                <div className="mt-6 flex items-center gap-3">
                  <Link
                    href={item.href}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-indigo-200/80 bg-indigo-50/50 py-2 text-xs font-bold text-[#0c183a] transition-colors hover:bg-indigo-100/80"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>Detail</span>
                  </Link>

                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-indigo-200/80 bg-indigo-50/50 py-2 text-xs font-bold text-[#0c183a] transition-colors hover:bg-indigo-100/80"
                  >
                    <PhoneCall className="h-3.5 w-3.5" />
                    <span>Hubungi</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

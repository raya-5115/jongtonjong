import Link from "next/link";

const NEWS_DATA = [
  {
    id: 1,
    title: "BULAT (Buah Olah Tepat)",
    excerpt: "Program inovasi pengolahan hasil pertanian dan buah lokal Desa Tonjong untuk meningkatkan nilai ekonomi warga.",
    date: "10 Agustus 2026",
    href: "/berita",
  },
  {
    id: 2,
    title: "TASTE (Tonjong Atasi)",
    excerpt: "Kegiatan gotong royong dan aksi penanganan lingkungan bersih serta penataan fasilitas desa.",
    date: "08 Agustus 2026",
    href: "/berita",
  },
  {
    id: 3,
    title: "Tonjong Update",
    excerpt: "Pembaruan informasi terkini mengenai agenda rutin pelayanan dan pembangunan infrastruktur desa.",
    date: "05 Agustus 2026",
    href: "/berita",
  },
];

export default function LatestNewsSection() {
  return (
    <section className="w-full bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-extrabold text-[#0c183a] sm:text-3xl lg:text-4xl">
            Berita Desa Tonjong
          </h2>
          <div className="mx-auto mt-3 h-[2px] w-full max-w-2xl bg-indigo-200/80" />
        </div>

        {/* 3 Column News Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {NEWS_DATA.map((item) => (
            <article
              key={item.id}
              className="flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200/80 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Card Image Placeholder */}
              <div className="aspect-[16/9] w-full bg-indigo-50/80 border-b border-indigo-100 flex items-center justify-center text-slate-400">
                <svg className="h-10 w-10 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>

              {/* Card Content */}
              <div className="flex flex-1 flex-col p-5">
                <span className="text-xs font-semibold text-slate-400 mb-1">{item.date}</span>
                <h3 className="text-lg font-bold text-[#0c183a] line-clamp-1 hover:underline">
                  <Link href={item.href}>{item.title}</Link>
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {item.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

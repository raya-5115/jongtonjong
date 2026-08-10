import Link from "next/link";
import Image from "next/image";

export default function NewsGrid({ newsList = [] }) {
  if (newsList.length === 0) {
    return null;
  }

  return (
    <div className="w-full pt-8">
      {/* 3 Column News Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {newsList.map((item) => (
          <article
            key={item.id}
            className="flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200/80 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            {/* Card Thumbnail */}
            <div className="relative aspect-[16/9] w-full bg-indigo-50/80 border-b border-indigo-100 flex items-center justify-center text-slate-400">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <svg className="h-10 w-10 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              )}
            </div>

            {/* Card Body */}
            <div className="flex flex-1 flex-col p-5">
              <span className="text-xs font-semibold text-slate-400 mb-1">
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "Berita Desa"}
              </span>

              <h3 className="text-lg font-extrabold text-[#0c183a] line-clamp-2 hover:underline">
                <Link href={`/berita/${item.slug || item.id}`}>{item.title}</Link>
              </h3>

              <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
                {item.content || item.excerpt || "Informasi seputar perkembangan dan kegiatan Desa Tonjong."}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

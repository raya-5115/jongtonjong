import Link from "next/link";
import Image from "next/image";
import { getPublicImageUrl } from "@/lib/storage-utils";

export default function LatestNewsSection({ news = [] }) {
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

        {news.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <p>Belum ada berita terbaru.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => {
              const formattedDate = item.createdAt
                ? new Date(item.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "";

              const newsHref = `/berita/${item.slug || item.id}`;
              const imageUrl = getPublicImageUrl(item.image);

              return (
                <article
                  key={item.id}
                  className="flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200/80 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Card Image */}
                  <div className="relative aspect-[16/9] w-full bg-indigo-50/80 border-b border-indigo-100 flex items-center justify-center text-slate-400 overflow-hidden">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover object-center"
                        unoptimized={true}
                      />
                    ) : (
                      <svg className="h-10 w-10 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col p-5">
                    {formattedDate && (
                      <span className="text-xs font-semibold text-slate-400 mb-1">{formattedDate}</span>
                    )}
                    <h3 className="text-lg font-bold text-[#0c183a] line-clamp-1 hover:underline">
                      <Link href={newsHref}>{item.title}</Link>
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {item.content}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}

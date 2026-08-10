import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, User, Eye } from "lucide-react";

export default function NewsDetailContent({ article }) {
  if (!article) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-[#0c183a]">Berita tidak ditemukan</h1>
        <p className="mt-2 text-slate-600">Maaf, berita yang Anda cari tidak tersedia atau telah dihapus.</p>
        <Link
          href="/berita"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0c183a] px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-[#152a60]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Daftar Berita</span>
        </Link>
      </div>
    );
  }

  const formattedDate = article.createdAt
    ? new Date(article.createdAt).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    : "10 Agustus 2026";

  const authorName = article.author?.name || "Admin Desa";

  // Split content into paragraphs for clean typography
  const paragraphs = article.content
    ? article.content.split("\n").filter((p) => p.trim() !== "")
    : ["Berita ini berisi informasi terbaru dari Pemerintah Desa Tonjong."];

  return (
    <div className="w-full bg-slate-50 py-8 sm:py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Back Link */}
        <Link
          href="/berita"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-[#0c183a] mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Daftar Berita</span>
        </Link>

        {/* Main Article Container */}
        <article className="overflow-hidden rounded-3xl bg-white p-5 sm:p-8 md:p-10 border border-slate-200/80 shadow-sm">

          {/* Featured Hero Image Container */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#0c183a] shadow-md">
            {article.image ? (
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover object-center"
                priority
              />
            ) : (
              <Image
                src="/hero-bg.png"
                alt="Berita Desa Tonjong"
                fill
                className="object-cover object-center"
                priority
              />
            )}

            {/* Dark Gradient Overlay for Title readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c183a]/95 via-[#0c183a]/60 to-transparent" />

            {/* Overlay Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 flex flex-col items-start gap-3">
              <span className="inline-block rounded-full bg-[#0d9488] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                BERITA DESA
              </span>
              <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl leading-tight drop-shadow-sm">
                {article.title}
              </h1>
            </div>
          </div>

          {/* Metadata Row */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-5 text-xs sm:text-sm font-medium text-slate-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#0c183a]" />
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-[#0c183a]" />
              <span>Oleh: {authorName}</span>
            </div>
          </div>

          {/* Body Content */}
          <div className="mt-8 space-y-5 text-base sm:text-lg leading-relaxed text-slate-700">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

        </article>
      </div>
    </div>
  );
}

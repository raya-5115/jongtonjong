import Image from "next/image";
import { getPublicImageUrl } from "@/lib/storage-utils";

export default function AboutSection({ profile }) {
  const title = profile?.title || "Mengenal Desa Tonjong";
  const villageName = profile?.villageName || "Desa Tonjong";
  const rawImage = profile?.image || "/kantor-desa.png";
  const imageUrl = getPublicImageUrl(rawImage) || "/kantor-desa.png";

  const descriptionParagraphs = profile?.description
    ? profile.description.split("\n").filter((p) => p.trim() !== "")
    : [
        "Desa Tonjong merupakan salah satu desa yang berada di wilayah Kecamatan Palabuhanratu, Kabupaten Sukabumi, Provinsi Jawa Barat. Berada di lingkungan pesisir dan perbukitan yang asri, Desa Tonjong kaya akan potensi pertanian, pariwisata, dan UMKM lokal.",
        "Pemerintah Desa Tonjong terus berkomitmen untuk memberikan pelayanan publik yang cepat, akuntabel, serta mendorong pembangunan infrastruktur dan pemberdayaan masyarakat secara berkelanjutan.",
      ];

  return (
    <section className="w-full bg-slate-50 pt-10 pb-12 sm:pt-14 sm:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#0c183a] sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <div className="mx-auto mt-4 h-[3px] w-full max-w-2xl bg-indigo-200/80 rounded-full" />
        </div>

        {/* Card Container */}
        <div className="mt-10 rounded-3xl bg-indigo-50/70 p-6 md:p-8 lg:p-10 border border-indigo-100/80 shadow-sm">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
            {/* Left: Office Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-md border border-slate-200/60 lg:col-span-6">
              <Image
                src={imageUrl}
                alt={`Kantor ${villageName}`}
                fill
                className="object-cover object-center"
                priority
                unoptimized={true}
              />
            </div>

            {/* Right: History & About Text */}
            <div className="flex flex-col justify-center lg:col-span-6">
              <h2 className="relative pb-2.5 text-2xl font-bold text-[#0c183a] sm:text-3xl after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-20 after:bg-[#0c183a] after:rounded-full">
                Tentang {villageName}
              </h2>

              <div className="mt-5 space-y-3">
                {descriptionParagraphs.map((para, idx) => (
                  <p
                    key={idx}
                    className="text-sm sm:text-base leading-relaxed text-slate-700"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

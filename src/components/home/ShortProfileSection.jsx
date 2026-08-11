"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getPublicImageUrl } from "@/lib/storage-utils";

export default function ShortProfileSection({ profile }) {
  const villageName = profile?.villageName || "Desa Tonjong";
  const title = profile?.title || "Mengenal Desa Tonjong";
  const imageUrl = profile?.image
    ? getPublicImageUrl(profile.image)
    : "/kantor-desa.png";

  const [hasError, setHasError] = useState(false);
  const [prevUrl, setPrevUrl] = useState(imageUrl);

  if (prevUrl !== imageUrl) {
    setPrevUrl(imageUrl);
    setHasError(false);
  }

  const displaySrc = hasError ? "/kantor-desa.png" : (imageUrl);

  const descriptionText =
    profile?.description?.split("\n")[0]

  return (
    <section className="w-full bg-slate-50 py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center md:gap-12 lg:gap-16">
          {/* Left Column: Image Card */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-indigo-50/80 border border-indigo-100/80 shadow-sm">
            <Image
              src={displaySrc}
              alt={`Foto Kantor ${villageName}`}
              fill
              className="object-cover object-center"
              unoptimized={true}
              onError={() => setHasError(true)}
            />
          </div>

          {/* Right Column: Content */}
          <div className="flex flex-col justify-center gap-3">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0c183a]">
              PROFIL SINGKAT
            </span>

            <h2 className="text-2xl font-extrabold text-[#0c183a] sm:text-3xl lg:text-4xl">
              {title}
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-slate-600 line-clamp-4">
              {descriptionText}
            </p>

            <div className="pt-2">
              <Link
                href="/profil"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0c183a] transition-all hover:gap-2.5 hover:underline"
              >
                <span>Pelajari Lebih Lanjut</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

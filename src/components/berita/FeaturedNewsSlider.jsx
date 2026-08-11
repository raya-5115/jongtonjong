"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from "lucide-react";
import { getPublicImageUrl } from "@/lib/storage-utils";

export default function FeaturedNewsSlider({ news = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter news published in the last 7 days
  const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
  const now = new Date().getTime();

  const recentNews = news.filter((item) => {
    if (!item.createdAt) return false;
    const itemTime = new Date(item.createdAt).getTime();
    return now - itemTime <= SEVEN_DAYS_MS;
  });

  const featuredItems =
    recentNews.length > 1
      ? recentNews
      : news.length > 0
      ? [news[0]]
      : [];

  const isSlider = featuredItems.length > 1;

  useEffect(() => {
    if (!isSlider) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isSlider, featuredItems.length]);

  if (featuredItems.length === 0) {
    return (
      <div className="w-full rounded-3xl bg-indigo-50/70 p-8 text-center text-slate-500 border border-indigo-100/80">
        Belum ada berita terbaru.
      </div>
    );
  }

  const currentItem = featuredItems[currentIndex] || featuredItems[0];
  const imageUrl = getPublicImageUrl(currentItem.image);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? featuredItems.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
  };

  return (
    <div className="relative w-full">
      {/* Featured Header Label */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#0c183a] sm:text-2xl">
          Terbaru dari Tonjong
        </h2>

        {isSlider && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-indigo-200 bg-white text-[#0c183a] shadow-sm transition-all hover:bg-indigo-50"
              aria-label="Berita Sebelumnya"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-indigo-200 bg-white text-[#0c183a] shadow-sm transition-all hover:bg-indigo-50"
              aria-label="Berita Selanjutnya"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Featured Big Card Container */}
      <div className="relative overflow-hidden rounded-3xl bg-indigo-50/70 p-6 md:p-8 border border-indigo-100/80 shadow-sm">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-center md:gap-8">
          
          {/* Card Image */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-indigo-100 border border-slate-200/60 md:col-span-6 lg:col-span-5 shrink-0">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={currentItem.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                unoptimized={true}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-indigo-300">
                <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
            )}
          </div>

          {/* Card Content Details */}
          <div className="flex flex-col justify-center md:col-span-6 lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
              <Calendar className="h-3.5 w-3.5" />
              <span>
                {currentItem.createdAt
                  ? new Date(currentItem.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "Terbaru"}
              </span>
            </div>

            <h3 className="text-xl font-extrabold text-[#0c183a] sm:text-2xl md:text-3xl leading-snug line-clamp-2">
              {currentItem.title}
            </h3>

            <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 line-clamp-3">
              {currentItem.content || currentItem.excerpt || "Informasi berita terkini dan pembaruan kegiatan dari Pemerintah Desa Tonjong."}
            </p>

            <div className="mt-6">
              <Link
                href={`/berita/${currentItem.slug || currentItem.id}`}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0c183a] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all hover:bg-[#152a60] hover:shadow-lg"
              >
                <span>Baca Selengkapnya</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>

        {/* Slide Indicator Dots */}
        {isSlider && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {featuredItems.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all ${
                  idx === currentIndex
                    ? "w-8 bg-[#0c183a]"
                    : "w-2.5 bg-indigo-200 hover:bg-indigo-300"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

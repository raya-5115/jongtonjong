import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ShortProfileSection() {
  return (
    <section className="w-full bg-slate-50 py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center md:gap-12 lg:gap-16">
          
          {/* Left Column: Image Card */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-indigo-50/80 border border-indigo-100/80 shadow-sm flex items-center justify-center">
            <div className="p-8 text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-[#0c183a]">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4" />
                </svg>
              </div>
              <p className="mt-3 text-sm font-medium text-slate-500">Foto Kantor & Wilayah Desa Tonjong</p>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="flex flex-col justify-center gap-3">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0c183a]">
              PROFIL SINGKAT
            </span>
            
            <h2 className="text-2xl font-extrabold text-[#0c183a] sm:text-3xl lg:text-4xl">
              Mengenal Desa Tonjong
            </h2>
            
            <p className="text-sm sm:text-base leading-relaxed text-slate-600">
              Desa Tonjong adalah desa yang terletak di Kecamatan Palabuhanratu, Kabupaten Sukabumi, Jawa Barat. Berkomitmen untuk mewujudkan tata kelola pemerintahan desa yang transparan, profesional, serta memberikan pelayanan publik terbaik demi kesejahteraan masyarakat.
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

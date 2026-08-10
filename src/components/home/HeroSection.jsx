import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0c183a] text-white">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt="Lanskap Desa Tonjong"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c183a]/85 via-[#0c183a]/70 to-[#0c183a]/95" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-20 pb-32 sm:px-6 sm:pt-28 sm:pb-40 md:pt-36 md:pb-48 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Selamat Datang di <br />
            <span className="text-[#FFD600] drop-shadow-md">Desa Tonjong</span>
          </h1>
          
          <div className="mt-8">
            <Link
              href="/profil"
              className="inline-flex items-center justify-center rounded-xl bg-[#0c183a] px-7 py-3.5 text-base font-bold text-white shadow-lg transition-all duration-200 hover:bg-[#142659] hover:shadow-xl hover:-translate-y-0.5 border border-white/20"
            >
              Mengenal Profil Desa
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Curve Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 z-10 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block h-16 w-full text-slate-50 sm:h-24 md:h-32"
          fill="currentColor"
        >
          <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,60 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
}

export default function VisiMisiSection() {
  return (
    <section className="w-full bg-slate-50 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* 2 Column Visi Misi Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">

          {/* Visi Column */}
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-extrabold text-[#0c183a] sm:text-3xl">
              Visi
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700 max-w-md">
              Mewujudkan Desa Tonjong yang Mandiri, Sejahtera, Transparan, dan Berdaya Saing Tinggi melalui Pembangunan Berkelanjutan dan Pelayanan Masyarakat yang Prima.
            </p>
          </div>

          {/* Misi Column */}
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-extrabold text-[#0c183a] sm:text-3xl">
              Misi
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700 max-w-md">
              Meningkatkan kualitas tata kelola pemerintahan desa yang bersih dan akuntabel, mengembangkan potensi ekonomi warga berbasis UMKM dan pertanian, serta mengoptimalkan sarana infrastruktur publik.
            </p>
          </div>

        </div>

        {/* Separator Line */}
        <div className="mt-16 h-[2px] w-full bg-indigo-200/80" />

      </div>
    </section>
  );
}

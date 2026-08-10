import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Clock, AtSign } from "lucide-react";

const NAV_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Profil Desa", href: "/profil" },
  { label: "Berita", href: "/berita" },
  { label: "UMKM Desa", href: "/umkm" },
  { label: "Fasilitas", href: "/fasilitas" },
  { label: "Pengajuan Layanan", href: "/layanan" },
];

export default function PublicFooter() {
  return (
    <footer className="w-full bg-[#0c183a] text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12 lg:gap-16">
          
          {/* Column 1: Brand & Alamat */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="inline-block transition-opacity hover:opacity-95">
              <div className="relative h-14 w-64 sm:h-16 sm:w-80 shrink-0">
                <Image
                  src="/logo-sukabumi.png"
                  alt="Logo Desa Tonjong"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-slate-200/90 max-w-sm">
              Jl. Raya Tonjong, Kecamatan Palabuhanratu, Kabupaten Sukabumi, Jawa Barat 43364
            </p>
          </div>

          {/* Column 2: Navigasi */}
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-base font-bold tracking-wider text-white uppercase">
                NAVIGASI
              </h3>
              <div className="mt-2 h-[2px] w-full max-w-[180px] bg-white/40" />
            </div>
            <ul className="flex flex-col gap-2.5 pt-1">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-slate-200 transition-colors hover:text-white hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Kontak */}
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-base font-bold tracking-wider text-white uppercase">
                KONTAK
              </h3>
              <div className="mt-2 h-[2px] w-full max-w-[180px] bg-white/40" />
            </div>
            <ul className="flex flex-col gap-3.5 pt-1 text-sm text-slate-200">
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-white" />
                <a 
                  href="mailto:desatonjong@gmail.com" 
                  className="transition-colors hover:text-white hover:underline"
                >
                  desatonjong@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-white" />
                <a 
                  href="tel:0211234567" 
                  className="transition-colors hover:text-white hover:underline"
                >
                  (021) 1234567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 shrink-0 text-white" />
                <span>Senin - Jumat 08:00 - 15:00</span>
              </li>
              <li className="flex items-center gap-3">
                <AtSign className="h-5 w-5 shrink-0 text-white" />
                <span className="font-medium">@pemdes.tonjong</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-slate-300">
          <p>© {new Date().getFullYear()} Pemerintah Desa Tonjong. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}

import { User } from "lucide-react";
import Image from "next/image";
import { getPerangkat } from "@/services/perangkat.service";

const FALLBACK_PERANGKAT = [
  { id: "1", nama: "Isep Firdaos", jabatan: "KEPALA DESA" },
  { id: "2", nama: "Isep Firdaos", jabatan: "SEKRETARIS DESA" },
  { id: "3", nama: "Isep Firdaos", jabatan: "KAUR KEUANGAN" },
  { id: "4", nama: "Isep Firdaos", jabatan: "KAUR PERENCANAAN" },
  { id: "5", nama: "Isep Firdaos", jabatan: "KASI PELAYANAN" },
  { id: "6", nama: "Isep Firdaos", jabatan: "KASI KESEJAHTERAAN" },
];

export default async function PerangkatDesaSection() {
  let listPerangkat = [];

  try {
    const data = await getPerangkat();
    if (data && data.length > 0) {
      listPerangkat = data;
    } else {
      listPerangkat = FALLBACK_PERANGKAT;
    }
  } catch (error) {
    console.error("Failed to fetch perangkat desa:", error);
    listPerangkat = FALLBACK_PERANGKAT;
  }

  return (
    <section className="w-full bg-slate-50 py-12 sm:py-16 md:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold text-[#0c183a] sm:text-4xl lg:text-5xl">
            Perangkat Desa
          </h2>
        </div>

        {/* 3 Column x 2 Row Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {listPerangkat.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-center rounded-xl border-2 border-[#0c183a]/80 bg-white p-8 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Photo or Solid Silhouette Avatar */}
              {item.foto ? (
                <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-[#0c183a]">
                  <Image
                    src={item.foto}
                    alt={item.nama}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-20 w-20 items-center justify-center text-[#0c183a]">
                  <User className="h-16 w-16 fill-[#0c183a] stroke-none" />
                </div>
              )}

              {/* Official Name */}
              <h3 className="mt-4 text-xl font-extrabold text-[#0c183a]">
                {item.nama}
              </h3>

              {/* Official Jabatan */}
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#1a3059]">
                {item.jabatan}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

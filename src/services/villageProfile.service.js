import { prisma } from "@/lib/prisma";

export const DEFAULT_VILLAGE_PROFILE = {
  villageName: "Desa Tonjong",
  title: "Mengenal Desa Tonjong",
  image: "/kantor-desa.png",
  description:
    "Desa Tonjong merupakan salah satu desa yang berada di wilayah Kecamatan Palabuhanratu, Kabupaten Sukabumi, Provinsi Jawa Barat. Berada di lingkungan pesisir dan perbukitan yang asri, Desa Tonjong kaya akan potensi pertanian, pariwisata, dan UMKM lokal.\n\nPemerintah Desa Tonjong terus berkomitmen untuk memberikan pelayanan publik yang cepat, akuntabel, serta mendorong pembangunan infrastruktur dan pemberdayaan masyarakat secara berkelanjutan.",
  vision:
    "Mewujudkan Desa Tonjong yang Mandiri, Sejahtera, Transparan, dan Berdaya Saing Tinggi melalui Pembangunan Berkelanjutan dan Pelayanan Masyarakat yang Prima.",
  mission:
    "Meningkatkan kualitas tata kelola pemerintahan desa yang bersih dan akuntabel, mengembangkan potensi ekonomi warga berbasis UMKM dan pertanian, serta mengoptimalkan sarana infrastruktur publik.",
};

export async function getVillageProfile() {
  try {
    let profile = await prisma.villageProfile.findFirst();

    if (!profile) {
      profile = await prisma.villageProfile.create({
        data: DEFAULT_VILLAGE_PROFILE,
      });
    }

    return profile;
  } catch (error) {
    console.error("Gagal membaca data profil desa dari database:", error);
    return DEFAULT_VILLAGE_PROFILE;
  }
}

export async function updateVillageProfile(id, data) {
  if (id) {
    return prisma.villageProfile.update({
      where: { id },
      data,
    });
  }

  const existing = await prisma.villageProfile.findFirst();

  if (existing) {
    return prisma.villageProfile.update({
      where: { id: existing.id },
      data,
    });
  }

  return prisma.villageProfile.create({
    data: {
      ...DEFAULT_VILLAGE_PROFILE,
      ...data,
    },
  });
}

import HeroSection from "@/components/home/HeroSection";
import ShortProfileSection from "@/components/home/ShortProfileSection";
import LatestNewsSection from "@/components/home/LatestNewsSection";
import UmkmSection from "@/components/home/UmkmSection";
import FacilitySection from "@/components/home/FacilitySection";

import { getNews } from "@/services/news.service";
import { getUmkm } from "@/services/umkm.service";
import { getFacilities } from "@/services/facility.service";
import { getVillageProfile } from "@/services/villageProfile.service";

export default async function Home() {
  let newsList = [];
  let umkmList = [];
  let facilityList = [];
  let villageProfile = null;

  try {
    const [newsData, umkmData, facilityData, profileData] = await Promise.all([
      getNews().catch(() => []),
      getUmkm().catch(() => []),
      getFacilities().catch(() => []),
      getVillageProfile().catch(() => null),
    ]);

    newsList = newsData ? newsData.slice(0, 3) : [];
    umkmList = umkmData ? umkmData.slice(0, 3) : [];
    facilityList = facilityData ? facilityData.slice(0, 3) : [];
    villageProfile = profileData;
  } catch (error) {
    console.error("Gagal mengambil data halaman utama:", error);
  }

  return (
    <div className="flex w-full flex-col min-h-screen bg-slate-50">
      <HeroSection />
      <ShortProfileSection profile={villageProfile} />
      <LatestNewsSection news={newsList} />
      <UmkmSection umkmList={umkmList} />
      <FacilitySection facilities={facilityList} />
    </div>
  );
}

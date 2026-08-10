import HeroSection from "@/components/home/HeroSection";
import ShortProfileSection from "@/components/home/ShortProfileSection";
import LatestNewsSection from "@/components/home/LatestNewsSection";
import UmkmSection from "@/components/home/UmkmSection";
import FacilitySection from "@/components/home/FacilitySection";

export default function Home() {
  return (
    <div className="flex w-full flex-col min-h-screen bg-slate-50">
      <HeroSection />
      <ShortProfileSection />
      <LatestNewsSection />
      <UmkmSection />
      <FacilitySection />
    </div>
  );
}

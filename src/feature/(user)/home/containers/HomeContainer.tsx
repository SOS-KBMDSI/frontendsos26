import Image from "next/image";
import Hero from "../components/Hero";
import Kegiatan from "../components/Kegiatan/Kegiatan";
import CaturPattern from "@/assets/user/pembatas.svg";
import ProdiSection from "../components/Prodi/ProdiSection";
import RangkaianSection from "../components/Rangkaian/RangkaianSection";
import FaqSection from "../components/FAQ/FaqSection";

const HomeContainer = () => {
  return (
    <main className="overflow-hidden">
      <Hero />
      <Image
        src={CaturPattern}
        alt="Pattern"
        className="w-full bg-secondary-500 h-18 object-cover md:h-auto"
        aria-hidden="true"
      />
      <Kegiatan />
      <ProdiSection />
      <Image
        src={CaturPattern}
        alt="Pattern"
        className="w-full bg-secondary-500 h-18 object-cover md:h-auto"
        aria-hidden="true"
      />
      <RangkaianSection />
      <Image
        src={CaturPattern}
        alt="Pattern"
        className="w-full bg-secondary-500 h-18 object-cover md:h-auto"
        aria-hidden="true"
      />
      <FaqSection />
    </main>
  );
};

export default HomeContainer;

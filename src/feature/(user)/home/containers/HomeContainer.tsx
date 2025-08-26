import Image from "next/image";
import Hero from "../components/Hero";
import Kegiatan from "../components/Kegiatan/Kegiatan";
import CaturPattern from "@/assets/user/pembatas.svg";
import ProdiSection from "../components/Prodi/ProdiSection";

const HomeContainer = () => {
  return (
    <main className="overflow-hidden min-h-screen">
      <Hero />
      <Image
        src={CaturPattern}
        alt="Pattern"
        className="w-full bg-secondary-500 h-18 object-cover md:h-auto"
        aria-hidden="true"
      />
      <Kegiatan />
      <ProdiSection />
    </main>
  );
};

export default HomeContainer;

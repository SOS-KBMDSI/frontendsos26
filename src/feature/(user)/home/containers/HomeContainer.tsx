import Image from "next/image";
import Hero from "../components/Hero";
import Kegiatan from "../components/Kegiatan/Kegiatan";
import CaturPattern from "@/assets/user/pembatas.svg";

const HomeContainer = () => {
  return (
    <main className="overflow-x-hidden min-h-screen">
      <Hero />
      <Image
        src={CaturPattern}
        alt="Footer Pattern"
        className="w-full bg-secondary-500 h-18 object-cover md:h-auto"
        aria-hidden="true"
      />
      <Kegiatan />
    </main>
  );
};

export default HomeContainer;

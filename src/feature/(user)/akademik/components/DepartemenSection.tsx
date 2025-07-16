import Image from "next/image";
import LogoDSI from "@/assets/user/logo-dsi.svg";
import CaturPattern from "@/assets/user/pembatas.svg";
import BgPattern from "@/assets/user/bg-patern.svg";
import PerkamentBg from "@/assets/user/parchment-bg.png";
import { SectionTitle } from "./SectionTitle";

export const DepartemenSection = () => {
  return (
    <section
      className="bg-no-repeat bg-cover bg-secondary-200"
      style={{ backgroundImage: `url(${BgPattern.src})` }}
    >
      <div className="mycontainer text-center py-24 md:py-32">
        <SectionTitle lineColor="bg-primary-500">Apa sih itu DSI?</SectionTitle>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 p-1 md:p-8 rounded-2xl">
          <div
            className="
              flex-shrink-0 w-48 md:w-64 flex items-center justify-center 
              bg-cover bg-center p-6 
              backdrop-blur-sm
              drop-shadow-xl drop-shadow-[#B0354D]/75
            "
            style={{ backgroundImage: `url(${PerkamentBg.src})` }}
          >
            <Image
              src={LogoDSI}
              alt="Logo Departemen Sistem Informasi"
              className="w-full h-full"
            />
          </div>
          <div className="max-w-full md:max-w-[34rem] text-justify text-default-dark text-lg md:text-xl">
            <p>
              Departemen Sistem Informasi (DSI) adalah salah satu departemen di
              Fakultas Ilmu Komputer (FILKOM) Universitas Brawijaya (UB). DSI
              fokus pada pengembangan sistem informasi yang terintegrasi dengan
              kebutuhan bisnis dan manajemen, serta menghasilkan lulusan yang
              kompeten di bidang teknologi informasi. DSI juga membawahi tiga
              program studi, yaitu Sistem Informasi, Teknologi Informasi, dan
              Pendidikan Teknologi Informasi.
            </p>
          </div>
        </div>
      </div>

      <Image
        src={CaturPattern}
        alt="Pembatas"
        className="w-full h-18 object-cover md:h-auto"
        aria-hidden="true"
      />
    </section>
  );
};

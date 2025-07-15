import Image from "next/image";
import LogoDSI from "@/assets/user/logo-dsi.svg";
import CaturPattern from "@/assets/user/pembatas.svg";
import BgPattern from "@/assets/user/bg-patern.svg";
import PerkamentBg from "@/assets/user/parchment-bg.png";

export const DepartemenSection = () => {
  return (
    <section
      className="bg-no-repeat bg-cover bg-secondary-200"
      style={{ backgroundImage: `url(${BgPattern.src})` }}
    >
      <div className="mycontainer text-center py-24 md:py-32">
        <div className="flex flex-col items-center gap-3 w-full mb-12 px-2">
          <h2 className="text-3xl md:text-7xl font-semibold text-default-dark">
            Apa sih itu DSI?
          </h2>
          <div className="h-2 w-full md:w-1/2 bg-primary-500 rounded-full"></div>
        </div>

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
          <div className="max-w-full md:max-w-[37rem] text-justify text-default-dark text-lg md:text-2xl">
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

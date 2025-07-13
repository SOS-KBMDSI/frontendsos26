import { AuthProfile } from "@/api/services/auth";
import React from "react";
import AktivitasBackground from "./AktivitasBackground";
import Maskor2 from "@/assets/user/masket-sos-2.svg";
import Image from "next/image";
import AktivitasListSection from "./AktivitasListSection";
import PatternImg from "@/assets/login/pattern.svg";

interface AktivitasAfterLoginProps {
  user: AuthProfile;
}

const AktivitasAfterLogin = ({ user }: AktivitasAfterLoginProps) => {
  return (
    <div className="w-screen  flex flex-col min-h-screen relative  pt-20 lg:pt-40">
      <div className="flex  mycontainer flex-col-reverse lg:flex-row   items-center">
        <div className="bg-secondary-100 w-full border rounded-2xl lg:w-[800px] xl:w-[1000px] z-20 border-secondary-700 p-6">
          <div className="bg-primary-500 p-5 rounded-2xl text-white">
            <h4 className="lg:text-3xl xl:text-4xl">Fasilitator</h4>
            <div className="grid grid-cols-2 lg:text-xl xl:text-2xl mt-3">
              {user.kelompok?.distrik?.list_pjl.map((pjl, idx) => (
                <span key={idx}>
                  {pjl.nama} - {pjl.line}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 p-5">
            <div>
              <p className="text-primary-500 lg:text-xl xl:text-2xl font-medium">
                Nama Lengkap
              </p>
              <p className="lg:text-lg xl:text-xl text-black mt-1">
                Nama Lengkap
              </p>
            </div>
            <div>
              <p className="text-primary-500 lg:text-xl xl:text-2xl font-medium">
                Distrik
              </p>
              <p className="lg:text-lg xl:text-xl text-black mt-1">
                {user.kelompok?.distrik?.nama_distrik}
              </p>
            </div>
            <div>
              <p className="text-primary-500 lg:text-xl xl:text-2xl font-medium">
                Program Studi
              </p>
              <p className="lg:text-lg xl:text-xl text-black mt-1">
                {user.prodi}
              </p>
            </div>
            <div>
              <p className="text-primary-500 lg:text-xl xl:text-2xl font-medium">
                Kelompok
              </p>
              <p className="lg:text-lg xl:text-xl text-black mt-1">
                {user.kelompok?.nama_kelompok}
              </p>
            </div>
            <div>
              <p className="text-primary-500 lg:text-xl xl:text-2xl font-medium">
                NIM
              </p>
              <p className="lg:text-lg xl:text-xl text-black mt-1">
                {user.nim}
              </p>
            </div>
          </div>
        </div>
        <Image className="lg:-ml-40 lg:w-1/3 z-30" src={Maskor2} alt="Maskot" />
      </div>
      <AktivitasBackground />
      <Image
        src={PatternImg}
        alt=" Pattern"
        className="w-full h-14 object-cover md:h-auto mt-20"
        aria-hidden="true"
      />
      <AktivitasListSection />
    </div>
  );
};

export default AktivitasAfterLogin;

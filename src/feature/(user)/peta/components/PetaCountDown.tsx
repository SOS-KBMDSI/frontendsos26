import React from "react";
import PetaBg from "@/assets/peta/peta-bg.png";
import Image from "next/image";

const PetaCountDown = () => {
  return (
    <div className="mt-64">
      <div className="w-2/5 mx-auto flex flex-col gap-6">
        <div className="text-primary-500 font-semibold text text-base md:text-4xl">
          <h3>
            Synergy of Symphony <br />
            (Nama Rangkaian)
          </h3>
        </div>
        <p className="text-black text-sm md:text-2xl">
          Hitung mundur menuju petualangan seru selanjutnya!
        </p>
        <div className="flex justify-center items-center gap-16 mt-7">
          <div className="flex flex-col gap-6 items-center justify-center">
            <p className="text-6xl font-semibold text-primary-500">12</p>
            <span className="text-2xl text-black font-medium">Hari</span>
          </div>
          <div className="flex flex-col gap-6 items-center justify-center">
            <p className="text-6xl font-semibold text-primary-500">20</p>
            <span className="text-2xl text-black font-medium">Jam</span>
          </div>
          <div className="flex flex-col gap-6 items-center justify-center">
            <p className="text-6xl font-semibold text-primary-500">31</p>
            <span className="text-2xl text-black font-medium">Menit</span>
          </div>
          <div className="flex flex-col gap-6 items-center justify-center">
            <p className="text-6xl font-semibold text-primary-500">05</p>
            <span className="text-2xl text-black font-medium">Detik</span>
          </div>
        </div>
      </div>
      <Image
        src={PetaBg}
        width={300}
        height={300}
        alt="Footer Pattern"
        className="w-2/4 mx-auto absolute top-96 left-0 right-0 -z-10"
        aria-hidden="true"
      />
    </div>
  );
};

export default PetaCountDown;

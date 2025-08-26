import Image from "next/image";
import CaturPattern from "@/assets/user/pembatas.svg";
import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-no-repeat bg-cover bg-login">
      <div className="mycontainer text-center py-24 md:py-32 text-default-dark flex flex-col justify-center items-center gap-9">
        <h2 className="w-7/8 text-4xl font-semibold text-center leading-10 md:leading-16 md:text-[3.75rem] md:w-3/4 ">
          Halo, Kenalan Yuk Sama Calon Ketua Angkatan!
        </h2>
        <p className="text-base text-justify md:text-center md:text-xl w-11/12">
          Calon Ketua Angkatan 2025 hadir sebagai sosok yang membawa semangat
          perubahan dan komitmen untuk membangun angkatan yang lebih solid,
          aktif, dan berdampak. Yuk kenali mereka lebih dekat dengan cari info
          visi dan misi, serta tujuan mereka. Karena setiap suara yang kamu
          berikan, menentukan masa depan kita bersama.
        </p>
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

export default HeroSection;

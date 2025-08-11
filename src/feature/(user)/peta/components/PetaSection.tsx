"use client";
import React from "react";
import { motion } from "framer-motion";
import BgPattern from "@/assets/user/bg-patern.svg";
import { SectionTitle } from "../../akademik/components/SectionTitle";
import PetaContent from "./PetaContent";
import Example1 from "@/assets/peta/example-1.png";
import Example2 from "@/assets/peta/example-2.png";
import CaturPattern from "@/assets/user/pembatas.svg";
import Image from "next/image";
import PetaCountDown from "./PetaCountDown";

const PetaSection = () => {
  return (
    <section
      className="bg-no-repeat bg-cover bg-secondary-200 relative overflow-hidden"
      style={{ backgroundImage: `url(${BgPattern.src})` }}
    >
      <div className="mycontainer text-center py-24 md:py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionTitle lineColor="bg-primary-500">Rangkaian</SectionTitle>
        </motion.div>

        <PetaCountDown />

        <div className="flex flex-col gap-48 mt-64 relative z-10">
          <PetaContent
            title="Initiating the Odyssey"
            description="Berisi pengenalan Departemen Sistem Informasi, prospek karier di bidang IT, serta cara menyusun surat lamaran kerja yang dikemas secara interaktif melalui aktivitas dan games yang seru."
            image={Example1}
            isDecoration
          />
          <PetaContent
            mode="right"
            title="Navigating the Currents"
            description="Membahas pengembangan diri dan personal branding, dengan berdiskusi mahasiswa baru saling bertukar pendapat sekaligus menentukan calon pemimpin angkatan dari tiap prodi."
            image={Example2}
            isDecoration
          />
        </div>
      </div>
      <div>
        <Image
          src={CaturPattern}
          alt="Footer Pattern"
          className="w-full h-18 object-cover md:h-auto"
          aria-hidden="true"
        />
      </div>
    </section>
  );
};

export default PetaSection;

"use client";
import React from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "../../akademik/components/SectionTitle";
import PetaContent from "./PetaContent";
import Rangkaian11 from "@/assets/peta/rangkaian1-1.png";
import Rangkaian12 from "@/assets/peta/rangkaian1-2.png";
import Rangkaian21 from "@/assets/peta/rangkaian2-1.png";
import Rangkaian22 from "@/assets/peta/rangkaian2-2.png";
import CaturPattern from "@/assets/user/pembatas.svg";
import Image from "next/image";
import PetaCountDown from "./PetaCountDown";
import { useAuthContext } from "@/shared/hooks/useAuthContext";

const PetaSection = () => {
  const { user } = useAuthContext();
  return (
    <section className="bg-login relative overflow-hidden">
      <div className="text-center py-24 md:py-32 relative z-10 mycontainer">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionTitle lineColor="bg-primary-500">Rangkaian</SectionTitle>
        </motion.div>

        {user && <PetaCountDown />}

        <div className="flex flex-col gap-48 mt-64 relative px-24">
          <PetaContent
            title="Initiating the Odyssey"
            description="Berisi pengenalan Departemen Sistem Informasi, prospek karier di bidang IT, serta cara menyusun surat lamaran kerja yang dikemas secara interaktif melalui aktivitas dan games yang seru."
            imageTop={Rangkaian11}
            imageBottom={Rangkaian12}
            altTop="Rangkaian 1-1"
            altBottom="Rangkaian 1-2"
            rotate={0}
            isDecoration
          />
          <PetaContent
            mode="right"
            title="Navigating the Currents"
            description="Membahas pengembangan diri dan personal branding, dengan berdiskusi mahasiswa baru saling bertukar pendapat sekaligus menentukan calon pemimpin angkatan dari tiap prodi."
            imageTop={Rangkaian21}
            imageBottom={Rangkaian22}
            altTop="Rangkaian 2-1"
            altBottom="Rangkaian 2-2"
            rotate={0}
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

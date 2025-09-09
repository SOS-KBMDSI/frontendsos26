"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MascotAnimation } from "@/feature/not-found/components/MascotAnimation";

import RedHill from "@/assets/error/red-hill.svg";
import Pembatas from "@/assets/error/pembatas-bawah.svg";

export default function NotFound() {
  return (
    <div className="relative w-full h-screen bg-login bg-cover bg-no-repeat flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        className="absolute bottom-0 w-full h-1/3 md:h-[40%] z-0"
        initial={{ y: "100%" }}
        // 3. Animasikan ke posisi akhir (posisi normal)
        animate={{ y: 0 }}
        // 4. Atur durasi dan efek transisi
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <Image
          src={RedHill}
          alt="Red Hill Background"
          fill
          objectPosition="bottom"
        />
      </motion.div>
      <div className="absolute bottom-0 left-0 w-full h-12 md:h-16 z-40">
        <Image
          src={Pembatas}
          alt="Pembatas Catur"
          fill
          objectFit="cover"
          objectPosition="bottom"
        />
      </div>

      <div className="absolute z-10 top-[70%] -translate-y-1/2 left-[55%] md:left-[52%] -translate-x-1/2 md:top-2/6 md:-translate-y-[20%]">
        <MascotAnimation />
      </div>
    </div>
  );
}

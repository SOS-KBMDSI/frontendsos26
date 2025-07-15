"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { prodiData } from "../data/prodiData";
import { cn } from "@/shared/utils/cn";
import PerkamenBg from "@/assets/user/horizontal-perkament.svg";
import PerkamenBgMobile from "@/assets/user/mobile-perkament.svg";
import { motion, AnimatePresence } from "framer-motion";

export const ProdiSection = () => {
  const [activeProdiId, setActiveProdiId] = useState("sistem_informasi");

  const activeProdiData = useMemo(() => {
    return prodiData.find((p) => p.id === activeProdiId);
  }, [activeProdiId]);

  const contentVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
  };

  return (
    <section className="relative bg-primary-600 py-24 px-2 md:px-6 text-white">
      <div className="mycontainer flex flex-col items-center gap-10 md:gap-20">
        <div className="flex flex-col items-center gap-3 w-full px-2">
          <h2 className="text-3xl md:text-7xl font-semibold text-center">
            Kenalin Prodi DSI
          </h2>
          <div className="h-2 w-full md:w-1/2 bg-default-light rounded-full"></div>
        </div>

        <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 items-start">
          <div className="flex flex-row justify-center md:flex-col gap-4">
            {prodiData.map((prodi) => (
              <button
                key={prodi.id}
                onClick={() => setActiveProdiId(prodi.id)}
                className={cn(
                  "px-4 rounded-2xl border-2 transition-all duration-300 ease-in-out text-center w-full",
                  "py-3 md:py-6",
                  activeProdiId === prodi.id
                    ? "bg-secondary-500 border-none text-default-dark shadow-lg scale-105"
                    : "bg-transparent border-white/50 hover:bg-white/10",
                )}
              >
                <div
                  className={cn(
                    "hidden md:flex flex-col justify-center items-center gap-2",
                    activeProdiId === prodi.id && "min-h-[200px]",
                  )}
                >
                  {activeProdiId === prodi.id && (
                    <Image
                      src={prodi.logo}
                      alt={`Logo ${prodi.nama}`}
                      className="w-40 h-40"
                    />
                  )}
                  <span className="text-lg font-medium">{prodi.nama}</span>
                </div>
                <div className="md:hidden flex justify-center items-center">
                  <span className="text-base font-medium">
                    {prodi.shortName}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="md:col-span-2">
            <div
              className="text-default-dark md:hidden drop-shadow"
              style={{
                borderStyle: "solid",
                borderWidth: "40px",
                borderImageSource: `url(${PerkamenBgMobile.src})`,
                borderImageSlice: "45 fill",
                borderImageRepeat: "stretch",
                height: "780px",
              }}
            >
              <AnimatePresence mode="wait">
                {activeProdiData && (
                  <motion.div
                    key={activeProdiId}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <p className="mb-8 text-base text-justify">
                      {activeProdiData.deskripsi}
                    </p>
                    <h4 className="font-bold text-lg mb-4">
                      Adapun prospek kerja dari prodi ini sebagai berikut!
                    </h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {activeProdiData.prospek.map((item, index) => (
                        <li key={index} className="text-base">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div
              className="hidden md:block text-default-dark drop-shadow"
              style={{
                border: "60px solid transparent",
                borderImageSource: `url(${PerkamenBg.src})`,
                borderImageSlice: "80 fill",
                borderImageRepeat: "stretch",
                height: "800px",
              }}
            >
              <div className="p-8">
                <AnimatePresence mode="wait">
                  {activeProdiData && (
                    <motion.div
                      key={activeProdiId}
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <p className="mb-8 text-xl text-justify">
                        {activeProdiData.deskripsi}
                      </p>
                      <h4 className="font-bold text-xl mb-4">
                        Adapun prospek kerja dari prodi ini sebagai berikut!
                      </h4>
                      <ul className="list-disc pl-5 space-y-3.5">
                        {activeProdiData.prospek.map((item, index) => (
                          <li key={index} className="text-xl">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

"use client";
import { SectionTitle } from "@/feature/(user)/akademik/components/SectionTitle";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import CaturPattern from "@/assets/user/pembatas.svg";
import { ProdiTabs } from "./ProdiTabs";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { stfData2024 } from "../../data/stfData2024";

const CurrentSection = () => {
  const [activeProdiId, setActiveProdiId] = useState("sistem_informasi");

  const activeProdiData = useMemo(() => {
    return stfData2024.find((p) => p.id === activeProdiId);
  }, [activeProdiId]);

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
  };

  const slideLeftToRightVariants: Variants = {
    hidden: { opacity: 0, x: -500 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.2,
      },
    },
  };

  return (
    <section className="bg-no-repeat bg-cover bg-login">
      <div className="mycontainer text-center py-24 md:py-32">
        <SectionTitle underline={false}>Shaping The Future 2024</SectionTitle>
        <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 items-start">
          <div className="flex flex-row justify-center md:flex-col gap-4">
            <ProdiTabs
              activeProdiId={activeProdiId}
              onSelectProdi={setActiveProdiId}
            />
          </div>

          <div className="md:col-span-2">
            <div className="text-default-dark md:hidden drop-shadow">
              <AnimatePresence mode="wait">
                {activeProdiData && (
                  <motion.div
                    key={activeProdiId}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="bg-transparent">
                      <div className="w-11/12 h-fit bg-primary-500 border rounded-s-4xl rounded-e-3xl flex items-start gap-6">
                        <div className="w-full bg-white px-4 pt-4 pb-12 rounded-3xl">
                          <Image
                            src={activeProdiData.image}
                            alt="Dummy"
                            width={500}
                            height={500}
                            className="w-full h-[10rem] object-cover"
                          />
                        </div>
                        <div className="w-full text-secondary flex flex-col text-left items-start gap-y-2 py-4 pr-4">
                          <span className="text-sm font-normal">
                            Ketua dan Wakil Ketua
                          </span>
                          <h4 className="font-semibold text-2xl">
                            {activeProdiData.shortName} 2024
                          </h4>
                        </div>
                      </div>
                      <motion.div
                        className="bg-secondary absolute right-5 top-26 w-[10rem] h-[5.5rem] rounded-2xl shadow-2xl"
                        key={activeProdiId + "-animated"}
                        initial="hidden"
                        animate="visible"
                        variants={slideLeftToRightVariants}
                        style={{
                          skewX: -14,
                          rotate: -6,
                        }}
                      >
                        <div className="w-full h-full flex justify-center items-center">
                          <p className="text-default-dark font-semibold text-2xl">
                            {activeProdiData.ketangWaketang}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="hidden md:block text-default-dark drop-shadow">
              <div className="px-8">
                <AnimatePresence mode="wait">
                  {activeProdiData && (
                    <motion.div
                      key={activeProdiId}
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="bg-transparent">
                        <div className="w-8/9 h-fit bg-primary-500 border rounded-s-4xl rounded-e-3xl flex items-center gap-10">
                          <div className="w-fit bg-white px-6 pt-6 pb-18 rounded-3xl">
                            <Image
                              src={activeProdiData.image}
                              alt="Dummy"
                              width={500}
                              height={500}
                              className="w-[21rem] h-[23rem] object-cover"
                            />
                          </div>
                          <div className="h-[23rem] text-secondary flex flex-col items-start gap-y-2">
                            <span className="text-3xl font-normal">
                              Ketua dan Wakil Ketua
                            </span>
                            <h4 className="font-semibold text-6xl">
                              {activeProdiData.shortName} 2024
                            </h4>
                          </div>
                        </div>
                        <motion.div
                          className="bg-secondary absolute right-5 top-50 bottom-50 w-[28rem] h-[12rem] rounded-2xl shadow-2xl"
                          key={activeProdiId + "-animated"}
                          initial="hidden"
                          animate="visible"
                          variants={slideLeftToRightVariants}
                          style={{
                            skewX: -14,
                            rotate: -6,
                          }}
                        >
                          <div className="w-full h-full flex justify-center items-center">
                            <p className="text-default-dark font-bold text-5xl">
                              {activeProdiData.ketangWaketang}
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
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

export default CurrentSection;

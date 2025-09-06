"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { prodiData } from "../../data/prodi";
import ProdiCard from "./ProdiCard";

const ProdiSection = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, 300); // Add delay before triggering animation
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="h-fit lg:h-screen relative" ref={ref}>
      <motion.h4
        className="text-center rounded-xl border-2 border-[#B9B2A8] absolute left-1/2 -top-4 md:-top-10 -translate-x-1/2 bg-white text-black w-fit z-20 font-semibold text-xl md:text-4xl px-4 py-2 md:px-12 md:py-5"
        initial={{ opacity: 0, y: -30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        Program Studi
      </motion.h4>
      <div className="w-full py-10 sm:py-24 lg:py-0 content-container h-fit lg:h-screen relative bg-red-800 overflow-hidden">
        <div className="w-[2418.07px] h-[2416.17px] left-[1642.21px] top-[1514.48px] absolute origin-top-left rotate-[145.14deg] bg-[radial-gradient(ellipse_45.15%_45.21%_at_42.87%_63.48%,_#8C021E_0%,_rgba(234,_91,_67,_0.32)_100%)] rounded-full blur-3xl" />
        <div className="w-[1886.76px] h-[1885.28px] left-[3110.80px] top-[200.88px] absolute origin-top-left rotate-[145.14deg] bg-[radial-gradient(ellipse_44.88%_44.88%_at_50.29%_57.43%,_#7D021A_0%,_rgba(125,_2,_26,_0.34)_100%)] rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto grid relative place-content-center md:gap-10 lg:gap-16 gap-16 px-10 py-16 md:p-0 h-full z-40 md:grid-cols-3">
          {prodiData.map((prodi, index) => (
            <motion.div
              key={prodi.id}
              initial={{ opacity: 0, y: 60, scale: 0.8 }}
              animate={
                isVisible
                  ? {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }
                  : {}
              }
              transition={{
                duration: 1,
                delay: 0.5 + index * 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              whileHover={{
                scale: 1.03,
                y: -8,
                transition: {
                  duration: 0.4,
                  ease: "easeOut",
                },
              }}
              whileTap={{
                scale: 0.97,
                transition: { duration: 0.15 },
              }}
            >
              <ProdiCard prodi={prodi} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProdiSection;

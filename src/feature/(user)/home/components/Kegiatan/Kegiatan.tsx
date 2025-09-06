"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { kegiatanData } from "../../data/kegiatan";
import KegiatanCard from "./KegiatanCard";

const Kegiatan = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
    <section
      ref={ref}
      className="content-container bg-login md:overflow-hidden md:h-full py-20 md:py-20 lg:py-20"
    >
      <div className="grid md:grid-cols-2 max-w-7xl mx-auto w-full grid-cols-1 items-center gap-10 place-items-center">
        {kegiatanData.map((kegiatan, index) => (
          <motion.div
            key={kegiatan.id}
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
              duration: 0.7,
              delay: index * 0.15,
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 120,
              damping: 20,
            }}
            whileHover={{
              scale: 1.03,
              y: -8,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            }}
            whileTap={{
              scale: 0.97,
              transition: { duration: 0.1 },
            }}
          >
            <KegiatanCard kegiatan={kegiatan} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Kegiatan;

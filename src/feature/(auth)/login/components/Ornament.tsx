"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import Bintang from "@/assets/login/bintang.svg";
import Kompas from "@/assets/login/kompas.png";

interface StarProps {
  top: string;
  left: string;
  size: number;
  delay: number;
  duration: number;
}

export const Ornament = () => {
  const [stars, setStars] = useState<StarProps[]>([]);

  const NUM_STARS = 10;

  useEffect(() => {
    const generateStars = () => {
      const newStars: StarProps[] = [];
      for (let i = 0; i < NUM_STARS; i++) {
        newStars.push({
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          size: Math.random() * (70 - 25) + 25, // Ukuran acak antara 30px dan 80px
          delay: Math.random() * 5,
          duration: Math.random() * 2 + 1,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []); // Array dependensi kosong memastikan ini hanya berjalan sekali

  return (
    <div className="w-screen h-screen absolute z-10 pointer-events-none select-none overflow-hidden">
      {/* Ornamen Kompas Kanan Atas (tidak diubah) */}
      <motion.div
        className="absolute w-full xl:max-w-3xl lg:max-w-lg md:max-w-md max-w-xl -right-40 -top-60 md:-right-50 md:-top-[30rem]"
        initial={{ opacity: 0.25, x: 100, y: -100 }}
        animate={{
          opacity: 0.5,
          x: 0,
          y: 0,
          rotate: 360,
        }}
        transition={{
          delay: 0.2,
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Image
          src={Kompas}
          alt="kompas"
          width={800}
          height={800}
          draggable={false}
          priority
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/800x800/transparent/transparent";
          }}
        />
      </motion.div>

      {/* Ornamen Kompas Kiri Bawah (tidak diubah) */}
      <motion.div
        className="w-full xl:max-w-3xl lg:max-w-lg md:max-w-md max-w-xl absolute md:-left-70 -left-40 -bottom-40 md:-bottom-100"
        initial={{ opacity: 0.25, x: -100, y: 100 }}
        animate={{
          opacity: 0.5,
          x: 0,
          y: 0,
          rotate: -360,
        }}
        transition={{
          delay: 0.2,
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Image
          src={Kompas}
          alt="kompas"
          width={800}
          height={800}
          draggable={false}
          priority
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/800x800/transparent/transparent";
          }}
        />
      </motion.div>

      {/* Ornamen Bintang yang digenerate secara acak */}
      {stars.map((star, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute"
          style={{ top: star.top, left: star.left }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: star.delay,
            duration: star.duration,
            ease: "easeOut",
          }}
        >
          <Image
            src={Bintang}
            alt="bintang"
            width={star.size}
            height={star.size}
            draggable={false}
            onError={(e) => {
              e.currentTarget.src = `https://placehold.co/${Math.round(
                star.size,
              )}x${Math.round(star.size)}/transparent/transparent`;
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

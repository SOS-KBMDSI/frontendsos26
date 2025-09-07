"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import Mascot404 from "@/assets/error/mascot-404.svg";

export const MascotAnimation = () => {
  return (
    <motion.div
      className="w-[280px] md:w-[500px]"
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "backOut", delay: 1.5 }}
      whileInView={{
        rotate: [0, -1, 1, -1, 1, 0],
        scale: [1.25, 1.2, 1.25],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5,
        },
      }}
      viewport={{ once: true }}
    >
      <Image
        src={Mascot404}
        alt="Maskot 404"
        layout="responsive"
        width={500}
        height={500}
      />
    </motion.div>
  );
};

// src/feature/not-found/components/CloudAnimation.tsx

"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import CloudLeft from "@/assets/error/cloud-left.svg";
import CloudRight from "@/assets/error/cloud-right.svg";
import CloudCenter from "@/assets/error/cloud-center.svg";

interface CloudAnimationProps {
  isOpen: boolean;
}

export const CloudAnimation = ({ isOpen }: CloudAnimationProps) => {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      <motion.div
        className="absolute top-[18%] left-[-18%] w-[70%] md:top-[10%] md:left-[-20%] md:w-[50%]"
        animate={{ x: isOpen ? "-120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.1 }}
      >
        <Image src={CloudLeft} alt="Awan" />
      </motion.div>
      <motion.div
        className="absolute top-[32%] left-[-12%] w-[65%] md:top-[30%] md:left-[-15%] md:w-[45%]"
        animate={{ x: isOpen ? "-120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        <Image src={CloudLeft} alt="Awan" />
      </motion.div>
      <motion.div
        className="absolute bottom-[33%] left-[-8%] w-[60%] md:bottom-[25%] md:left-[-10%] md:w-[40%]"
        animate={{ x: isOpen ? "-120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
      >
        <Image src={CloudRight} alt="Awan" className="transform -scale-x-100" />
      </motion.div>
      <motion.div
        className="absolute bottom-[13%] left-[-22%] w-[75%] md:bottom-[5%] md:left-[-25%] md:w-[55%]"
        animate={{ x: isOpen ? "-120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.1 }}
      >
        <Image src={CloudRight} alt="Awan" className="transform -scale-x-100" />
      </motion.div>
      <motion.div
        className="absolute bottom-[13%] left-[-2%] w-[60%] md:bottom-[5%] md:left-[-5%] md:w-[40%]"
        animate={{ x: isOpen ? "-120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1.1, ease: "easeInOut", delay: 0.15 }}
      >
        <Image src={CloudLeft} alt="Awan" />
      </motion.div>{" "}
      <motion.div
        className="absolute bottom-[23%] left-[8%] w-[55%] md:bottom-[15%] md:left-[10%] md:w-[35%]"
        animate={{ x: isOpen ? "-120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1.3, ease: "easeInOut", delay: 0.25 }}
      >
        <Image src={CloudCenter} alt="Awan" />
      </motion.div>{" "}
      <motion.div
        className="absolute bottom-[10%] left-[23%] w-[50%] md:bottom-[2%] md:left-[25%] md:w-[30%]"
        animate={{ x: isOpen ? "-120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1.0, ease: "easeInOut", delay: 0.05 }}
      >
        <Image src={CloudCenter} alt="Awan" />
      </motion.div>{" "}
      <motion.div
        className="absolute bottom-[10%] left-[18%] w-[50%] md:bottom-[2%] md:left-[20%] md:w-[30%]"
        animate={{ x: isOpen ? "-120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1.0, ease: "easeInOut", delay: 0.05 }}
      >
        <Image src={CloudCenter} alt="Awan" />
      </motion.div>{" "}
      <motion.div
        className="absolute bottom-[10%] left-[8%] w-[55%] md:bottom-[2%] md:left-[10%] md:w-[35%]"
        animate={{ x: isOpen ? "-120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1.0, ease: "easeInOut", delay: 0.05 }}
      >
        <Image src={CloudCenter} alt="Awan" />
      </motion.div>{" "}
      <motion.div
        className="absolute bottom-[43%] left-[13%] w-[60%] md:bottom-[40%] md:left-[15%] md:w-[40%]"
        animate={{ x: isOpen ? "-120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1.0, ease: "easeInOut", delay: 0.05 }}
      >
        <Image src={CloudCenter} alt="Awan" />
      </motion.div>{" "}
      <motion.div
        className="absolute top-[8%] left-[-2%] w-[65%] md:top-[0%] md:left-[-10%] md:w-[45%]"
        animate={{ x: isOpen ? "-120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1.3, ease: "easeInOut", delay: 0.2 }}
      >
        <Image src={CloudLeft} alt="Awan" />
      </motion.div>{" "}
      <motion.div
        className="absolute top-[13%] left-[18%] w-[50%] md:top-[5%] md:left-[20%] md:w-[30%]"
        animate={{ x: isOpen ? "-120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1.1, ease: "easeInOut", delay: 0.1 }}
      >
        <Image src={CloudCenter} alt="Awan" />
      </motion.div>{" "}
      <motion.div
        className="absolute top-[26%] left-[-2%] w-[60%] md:top-[18%] md:left-[0%] md:w-[40%]"
        animate={{ x: isOpen ? "-120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1.4, ease: "easeInOut", delay: 0.3 }}
      >
        <Image src={CloudCenter} alt="Awan" />
      </motion.div>{" "}
      <motion.div
        className="absolute top-[28%] left-[18%] w-[50%] md:top-[20%] md:left-[20%] md:w-[30%]"
        animate={{ x: isOpen ? "-120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1.1, ease: "easeInOut", delay: 0.1 }}
      >
        <Image src={CloudCenter} alt="Awan" />
      </motion.div>
      <motion.div
        className="absolute top-[28%] left-[28%] w-[50%] md:top-[20%] md:left-[30%] md:w-[30%]"
        animate={{ x: isOpen ? "-120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1.1, ease: "easeInOut", delay: 0.1 }}
      >
        <Image src={CloudCenter} alt="Awan" />
      </motion.div>
      <motion.div
        className="absolute top-[13%] left-1/2 -translate-x-[75%] w-[65%] md:top-[5%] md:left-1/2 md:-translate-x-[80%] md:w-[40%]"
        animate={{ x: isOpen ? "-120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
      >
        <Image src={CloudCenter} alt="Awan" />
      </motion.div>
      <motion.div
        className="absolute top-[28%] left-1/2 -translate-x-[15%] w-[70%] md:top-[20%] md:left-1/2 md:-translate-x-[20%] md:w-[50%]"
        animate={{ x: isOpen ? "120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1.1, ease: "easeInOut", delay: 0.1 }}
      >
        <Image src={CloudCenter} alt="Awan" />
      </motion.div>
      <motion.div
        className="absolute top-1/2 -translate-y-[85%] left-1/2 -translate-x-1/2 w-[85%] md:top-1/2 md:-translate-y-1/2 md:left-1/2 md:-translate-x-1/2 md:w-[60%]"
        animate={{ y: isOpen ? "120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <Image src={CloudCenter} alt="Awan" />
      </motion.div>
      <motion.div
        className="absolute bottom-[28%] left-1/2 -translate-x-[65%] w-[65%] md:bottom-[20%] md:left-1/2 md:-translate-x-[70%] md:w-[45%]"
        animate={{ x: isOpen ? "-120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.15 }}
      >
        <Image src={CloudCenter} alt="Awan" />
      </motion.div>
      <motion.div
        className="absolute bottom-[18%] left-1/2 -translate-x-[25%] w-[70%] md:bottom-[10%] md:left-1/2 md:-translate-x-[30%] md:w-[50%]"
        animate={{ x: isOpen ? "120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1.1, ease: "easeInOut", delay: 0.05 }}
      >
        <Image src={CloudCenter} alt="Awan" />
      </motion.div>
      <motion.div
        className="absolute bottom-[38%] left-1/2 -translate-x-[85%] w-[50%] md:bottom-[35%] md:left-1/2 md:-translate-x-[90%] md:w-[30%]"
        animate={{ x: isOpen ? "-120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
      >
        <Image src={CloudCenter} alt="Awan" />
      </motion.div>
      <motion.div
        className="absolute top-[38%] left-1/2 -translate-x-[5%] w-[55%] md:top-[35%] md:left-1/2 md:-translate-x-[10%] md:w-[35%]"
        animate={{ x: isOpen ? "120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1.1, ease: "easeInOut", delay: 0.25 }}
      >
        <Image src={CloudCenter} alt="Awan" />
      </motion.div>
      <motion.div
        className="absolute bottom-[23%] right-[8%] w-[55%] md:bottom-[15%] md:right-[10%] md:w-[35%]"
        animate={{ x: isOpen ? "120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1.3, ease: "easeInOut", delay: 0.25 }}
      >
        <Image src={CloudCenter} alt="Awan" />
      </motion.div>
      <motion.div
        className="absolute bottom-[10%] right-[23%] w-[50%] md:bottom-[2%] md:right-[25%] md:w-[30%]"
        animate={{ x: isOpen ? "120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1.0, ease: "easeInOut", delay: 0.05 }}
      >
        <Image src={CloudCenter} alt="Awan" />
      </motion.div>
      <motion.div
        className="absolute top-[23%] right-[-12%] w-[60%] md:top-[15%] md:right-[-15%] md:w-[40%]"
        animate={{ x: isOpen ? "120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.15 }}
      >
        <Image src={CloudRight} alt="Awan" />
      </motion.div>
      <motion.div
        className="absolute top-[46%] right-[-18%] w-[75%] md:top-[45%] md:right-[-20%] md:w-[55%]"
        animate={{ x: isOpen ? "120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        <Image src={CloudRight} alt="Awan" />
      </motion.div>
      <motion.div
        className="absolute top-[8%] right-[-2%] w-[65%] md:top-[0%] md:right-[-10%] md:w-[45%]"
        animate={{ x: isOpen ? "120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1.3, ease: "easeInOut", delay: 0.2 }}
      >
        <Image src={CloudRight} alt="Awan" />
      </motion.div>
      <motion.div
        className="absolute top-[26%] right-[-2%] w-[60%] md:top-[18%] md:right-[0%] md:w-[40%]"
        animate={{ x: isOpen ? "120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1.4, ease: "easeInOut", delay: 0.3 }}
      >
        <Image src={CloudCenter} alt="Awan" />
      </motion.div>
      <motion.div
        className="absolute top-[18%] right-[8%] w-[60%] md:top-[10%] md:right-[10%] md:w-[40%]"
        animate={{ x: isOpen ? "120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1.4, ease: "easeInOut", delay: 0.3 }}
      >
        <Image src={CloudCenter} alt="Awan" />
      </motion.div>
      <motion.div
        className="absolute top-[18%] right-[18%] w-[60%] md:top-[10%] md:right-[20%] md:w-[40%]"
        animate={{ x: isOpen ? "120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1.4, ease: "easeInOut", delay: 0.3 }}
      >
        <Image src={CloudCenter} alt="Awan" />
      </motion.div>
      <motion.div
        className="absolute top-[16%] right-[23%] w-[60%] md:top-[8%] md:right-[25%] md:w-[40%]"
        animate={{ x: isOpen ? "120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1.4, ease: "easeInOut", delay: 0.3 }}
      >
        <Image src={CloudCenter} alt="Awan" />
      </motion.div>
      <motion.div
        className="absolute bottom-[13%] right-[-2%] w-[60%] md:bottom-[5%] md:right-[-5%] md:w-[40%]"
        animate={{ x: isOpen ? "120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1.1, ease: "easeInOut", delay: 0.15 }}
      >
        <Image src={CloudRight} alt="Awan" />
      </motion.div>
      <motion.div
        className="absolute bottom-[33%] right-[-8%] w-[65%] md:bottom-[30%] md:right-[-10%] md:w-[45%]"
        animate={{ x: isOpen ? "120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.25 }}
      >
        <Image src={CloudLeft} alt="Awan" className="transform -scale-x-100" />
      </motion.div>
      <motion.div
        className="absolute bottom-[18%] right-[-15%] w-[60%] md:bottom-[10%] md:right-[-18%] md:w-[40%]"
        animate={{ x: isOpen ? "120%" : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.1 }}
      >
        <Image src={CloudLeft} alt="Awan" className="transform -scale-x-100" />
      </motion.div>
    </div>
  );
};

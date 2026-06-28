"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import rockLeft from "@/assets/coming-soon/rockLeft.svg";
import rockRight from "@/assets/coming-soon/rockRight.svg";

interface RockDecorationsProps {
  active: boolean;
}

export function RockDecorations({ active }: RockDecorationsProps) {
  return (
    <>
      <motion.div
        className="absolute z-10 pointer-events-none select-none
                   w-[85%] sm:w-[68%] md:w-[65%] lg:w-[62%] xl:w-[58%]
                   bottom-[-2vh] md:bottom-[-2vh] lg:bottom-[-8vh] xl:bottom-[-10vh]"
        style={{ left: "-3%" }}
        initial={{ y: "100%" }}
        animate={active ? { y: 0 } : { y: "100%" }}
        transition={{
          duration: 0.9,
          ease: [0.34, 1.56, 0.64, 1],
          delay: 1.0,
        }}
      >
        <Image
          src={rockLeft}
          alt=""
          className="w-full h-auto"
          draggable={false}
          priority
        />
      </motion.div>

      <motion.div
        className="absolute z-20 pointer-events-none select-none
                   w-[115%] sm:w-[95%] md:w-[92%] lg:w-[88%] xl:w-[82%]
                   bottom-[-2vh] md:bottom-[-2vh] lg:bottom-[-8vh] xl:bottom-[-10vh]"
        style={{ right: "-3%" }}
        initial={{ y: "100%" }}
        animate={active ? { y: 0 } : { y: "100%" }}
        transition={{
          duration: 0.9,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      >
        <Image
          src={rockRight}
          alt=""
          className="w-full h-auto"
          draggable={false}
          priority
        />
      </motion.div>
    </>
  );
}

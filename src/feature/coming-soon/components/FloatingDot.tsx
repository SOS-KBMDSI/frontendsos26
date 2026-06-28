"use client";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";

interface FloatingDotProps {
  src: StaticImageData;
  top: string;
  left: string;
  size: number;
  floatDuration: number;
  glowDuration: number;
  delay: number;
}

export function FloatingDot({
  src,
  top,
  left,
  size,
  floatDuration,
  glowDuration,
  delay,
}: FloatingDotProps) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ top, left, width: size, height: size }}
      animate={{
        y: [-6, 6, -6],
        opacity: [0.4, 1, 0.4],
        filter: [
          "drop-shadow(0 0 2px rgba(255,255,255,0.3))",
          "drop-shadow(0 0 10px rgba(255,255,255,0.95))",
          "drop-shadow(0 0 2px rgba(255,255,255,0.3))",
        ],
      }}
      transition={{
        y: {
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
        opacity: {
          duration: glowDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
        filter: {
          duration: glowDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
    >
      <Image src={src} alt="" width={size} height={size} draggable={false} />
    </motion.div>
  );
}

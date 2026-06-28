"use client";
import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import bgComingSoon from "@/assets/coming-soon/bg-comingsoon.webp";
import star from "@/assets/coming-soon/star.svg";
import greenDot from "@/assets/coming-soon/greenDot.svg";
import orangeDot from "@/assets/coming-soon/orangeDot.svg";
import redDot from "@/assets/coming-soon/redDot.svg";
import { FloatingDot } from "./FloatingDot";

const STAR_COUNT = 14;
const COLORED_DOT_COUNT = 8;
const COLORED_ASSETS: StaticImageData[] = [greenDot, orangeDot, redDot];

interface DotConfig {
  id: string;
  src: StaticImageData;
  top: string;
  left: string;
  size: number;
  floatDuration: number;
  glowDuration: number;
  delay: number;
}

interface WaveConfig {
  top: string;
  opacity: number;
  duration: number;
  delay: number;
  fill: string;
  reverse: boolean;
}

const WAVES: WaveConfig[] = [
  {
    top: "3%",
    opacity: 0.1,
    duration: 14,
    delay: 0.0,
    fill: "#FFFFFF",
    reverse: false,
  },
  {
    top: "18%",
    opacity: 0.1,
    duration: 18,
    delay: 1.5,
    fill: "#FFFFFF",
    reverse: true,
  },
  {
    top: "33%",
    opacity: 0.1,
    duration: 12,
    delay: 0.8,
    fill: "#FFFFFF",
    reverse: false,
  },
  {
    top: "48%",
    opacity: 0.1,
    duration: 16,
    delay: 2.0,
    fill: "#FFFFFF",
    reverse: true,
  },
  {
    top: "63%",
    opacity: 0.1,
    duration: 13,
    delay: 0.4,
    fill: "#FFFFFF",
    reverse: false,
  },
  {
    top: "78%",
    opacity: 0.1,
    duration: 17,
    delay: 1.2,
    fill: "#FFFFFF",
    reverse: true,
  },
];

const WAVE_PATH =
  "M 0,30 " +
  "Q 150,5 300,30 Q 450,55 600,30 Q 750,5 900,30 Q 1050,55 1200,30 " +
  "Q 1350,5 1500,30 Q 1650,55 1800,30 Q 1950,5 2100,30 Q 2250,55 2400,30 " +
  "L 2400,70 " +
  "Q 2250,95 2100,70 Q 1950,45 1800,70 Q 1650,95 1500,70 Q 1350,45 1200,70 " +
  "Q 1050,95 900,70 Q 750,45 600,70 Q 450,95 300,70 Q 150,45 0,70 " +
  "Z";

export function BackgroundLayers() {
  const [dots, setDots] = useState<DotConfig[]>([]);

  useEffect(() => {
    const stars: DotConfig[] = Array.from({ length: STAR_COUNT }).map(
      (_, i) => ({
        id: `star-${i}`,
        src: star,
        top: `${Math.random() * 94}%`,
        left: `${Math.random() * 96}%`,
        size: 14 + Math.random() * 12,
        floatDuration: 3 + Math.random() * 2.5,
        glowDuration: 1.4 + Math.random() * 1.6,
        delay: Math.random() * 2,
      }),
    );

    const coloredDots: DotConfig[] = Array.from({
      length: COLORED_DOT_COUNT,
    }).map((_, i) => ({
      id: `dot-${i}`,
      src: COLORED_ASSETS[Math.floor(Math.random() * COLORED_ASSETS.length)],
      top: `${Math.random() * 94}%`,
      left: `${Math.random() * 96}%`,
      size: 4 + Math.random() * 5,
      floatDuration: 3 + Math.random() * 2.5,
      glowDuration: 1.4 + Math.random() * 1.6,
      delay: Math.random() * 2,
    }));

    setDots([...stars, ...coloredDots]);
  }, []);

  return (
    <>
      <div className="absolute inset-0 z-0">
        <Image
          src={bgComingSoon}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {WAVES.map((w, i) => (
          <motion.div
            key={`wave-${i}`}
            className="absolute left-0 w-[200%] h-[20vh]"
            style={{
              top: w.top,
              opacity: w.opacity,
            }}
            animate={{
              x: w.reverse ? ["0%", "-50%"] : ["-50%", "0%"],
            }}
            transition={{
              duration: w.duration,
              delay: w.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg
              viewBox="0 0 2400 100"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
              fill={w.fill}
            >
              <path d={WAVE_PATH} />
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {dots.map((dot) => (
          <FloatingDot
            key={dot.id}
            src={dot.src}
            top={dot.top}
            left={dot.left}
            size={dot.size}
            floatDuration={dot.floatDuration}
            glowDuration={dot.glowDuration}
            delay={dot.delay}
          />
        ))}
      </div>
    </>
  );
}

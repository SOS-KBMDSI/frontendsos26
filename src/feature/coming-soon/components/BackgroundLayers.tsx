"use client";
import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import bgComingSoon from "@/assets/coming-soon/bg-comingsoon.webp";
import star from "@/assets/coming-soon/star.svg";
import greenDot from "@/assets/coming-soon/greenDot.svg";
import orangeDot from "@/assets/coming-soon/orangeDot.svg";
import redDot from "@/assets/coming-soon/redDot.svg";
import { FloatingDot } from "./FloatingDot";

const STAR_COUNT = 28;
const COLORED_DOT_COUNT = 18; // sebelumnya 6, tambah lebih banyak
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

      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
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

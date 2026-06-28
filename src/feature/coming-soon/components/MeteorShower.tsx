"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const METEOR_COUNT = 10;

interface FirePalette {
  tail: string;
  body: string;
  head: string;
}

const FIRE_PALETTES: FirePalette[] = [
  { tail: "#7A1500", body: "#FF4500", head: "#FFD466" },
  { tail: "#8C1A00", body: "#FF6A00", head: "#FFE680" },
  { tail: "#6E1200", body: "#FF5500", head: "#FFC94D" },
  { tail: "#9F2200", body: "#FF7A1A", head: "#FFEB99" },
];

interface MeteorConfig {
  id: number;
  startTop: number;
  startLeft: number;
  length: number;
  thickness: number;
  angle: number;
  palette: FirePalette;
  duration: number;
  initialDelay: number;
  repeatDelay: number;
  travelDistance: number;
}

export function MeteorShower() {
  const [meteors, setMeteors] = useState<MeteorConfig[]>([]);

  useEffect(() => {
    const generated: MeteorConfig[] = Array.from({ length: METEOR_COUNT }).map(
      (_, i) => ({
        id: i,
        startTop: Math.random() * 25 - 15,
        startLeft: -10 + Math.random() * 110,
        length: 90 + Math.random() * 110,
        thickness: 2 + Math.random() * 2,
        angle: 40 + Math.random() * 10,
        palette:
          FIRE_PALETTES[Math.floor(Math.random() * FIRE_PALETTES.length)],
        duration: 2.8 + Math.random() * 1.4,
        initialDelay: Math.random() * 8,
        repeatDelay: 3 + Math.random() * 5,
        travelDistance: 70 + Math.random() * 40,
      }),
    );
    setMeteors(generated);
  }, []);

  return (
    <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
      {meteors.map((m) => {
        const rad = (m.angle * Math.PI) / 180;
        const dx = m.travelDistance * Math.cos(rad);
        const dy = m.travelDistance * Math.sin(rad);
        return (
          <motion.div
            key={m.id}
            className="absolute"
            style={{
              top: `${m.startTop}%`,
              left: `${m.startLeft}%`,
            }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: ["0vw", `${dx}vw`],
              y: ["0vh", `${dy}vh`],
              opacity: [0, 0.95, 0.95, 0],
            }}
            transition={{
              duration: m.duration,
              delay: m.initialDelay,
              repeat: Infinity,
              repeatDelay: m.repeatDelay,
              ease: "easeIn",
              opacity: {
                duration: m.duration,
                times: [0, 0.1, 0.45, 0.6],
                repeat: Infinity,
                repeatDelay: m.repeatDelay,
                delay: m.initialDelay,
                ease: "easeOut",
              },
            }}
          >
            <div
              style={{
                width: `${m.length}px`,
                height: `${m.thickness}px`,
                background: `linear-gradient(90deg,
                  transparent 0%,
                  ${m.palette.tail}00 4%,
                  ${m.palette.tail}66 15%,
                  ${m.palette.tail} 32%,
                  ${m.palette.body} 60%,
                  ${m.palette.head} 88%,
                  #FFFFFF 100%
                )`,
                borderRadius: "999px",
                transform: `rotate(${m.angle}deg)`,
                transformOrigin: "right center",
                filter: `
                  drop-shadow(0 0 ${m.thickness * 3}px ${m.palette.head})
                  drop-shadow(0 0 ${m.thickness * 6}px ${m.palette.body})
                  drop-shadow(0 0 ${m.thickness * 10}px ${m.palette.tail}AA)
                `,
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

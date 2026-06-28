"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import meteor from "@/assets/coming-soon/meteor.svg";

const METEOR_COUNT = 12;

interface MeteorConfig {
  id: number;
  startTop: number;
  startLeft: number;
  duration: number;
  initialDelay: number;
  repeatDelay: number;
  size: number;
}

export function MeteorShower() {
  const [meteors, setMeteors] = useState<MeteorConfig[]>([]);

  useEffect(() => {
    const generated: MeteorConfig[] = Array.from({ length: METEOR_COUNT }).map(
      (_, i) => ({
        id: i,
        startTop: Math.random() * 25 - 15,
        startLeft: -10 + Math.random() * 55,
        duration: 1.6 + Math.random() * 1.4,
        initialDelay: Math.random() * 5,
        repeatDelay: 1.5 + Math.random() * 4,
        size: 32 + Math.random() * 48,
      }),
    );
    setMeteors(generated);
  }, []);

  return (
    <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
      {meteors.map((m) => (
        <motion.div
          key={m.id}
          className="absolute"
          style={{
            top: `${m.startTop}%`,
            left: `${m.startLeft}%`,
            width: m.size,
            height: m.size,
          }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{
            x: ["0%", "200%"],
            y: ["0%", "260%"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: m.duration,
            delay: m.initialDelay,
            repeat: Infinity,
            repeatDelay: m.repeatDelay,
            ease: "linear",
            opacity: {
              duration: m.duration,
              times: [0, 0.1, 0.7, 1],
              repeat: Infinity,
              repeatDelay: m.repeatDelay,
              ease: "linear",
              delay: m.initialDelay,
            },
          }}
        >
          <Image
            src={meteor}
            alt=""
            width={m.size}
            height={m.size}
            draggable={false}
          />
        </motion.div>
      ))}
    </div>
  );
}

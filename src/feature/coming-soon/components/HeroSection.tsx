"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import comingSoonLogo from "@/assets/coming-soon/comingsoon.svg";

interface HeroSectionProps {
  showLogo: boolean;
  showSubtitle: boolean;
}

interface SubtitleWord {
  text: string;
  strokeColor: string;
}

const SUBTITLE_WORDS: SubtitleWord[] = [
  { text: "SYNERGY", strokeColor: "#FF484B" },
  { text: "OF", strokeColor: "#FF484B" },
  { text: "SYMPHONY", strokeColor: "#FF9601" },
  { text: "&", strokeColor: "#FF9601" },
  { text: "SHAPING", strokeColor: "#FF9601" },
  { text: "THE", strokeColor: "#65995B" },
  { text: "FUTURE", strokeColor: "#65995B" },
  { text: "2026", strokeColor: "#65995B" },
];

export function HeroSection({ showLogo, showSubtitle }: HeroSectionProps) {
  return (
    <div
      className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4 pointer-events-none
                 pb-0 sm:pb-0 md:pb-0 lg:pb-[22vh] xl:pb-[26vh]"
    >
      <div className="relative w-full flex flex-col items-center">
        <motion.div
          animate={showLogo ? { y: [0, -10, 0] } : { y: 0 }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-[95%] sm:w-[88%] md:w-[80%] lg:w-[72%] xl:w-[68%] max-w-300"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={
              showLogo ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
            }
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 16,
              mass: 0.9,
            }}
            className="relative"
          >
            <Image
              src={comingSoonLogo}
              alt="Coming Soon"
              className="block w-full h-auto"
              draggable={false}
              priority
            />
          </motion.div>
        </motion.div>

        {/* Subtitle: float up-down wrapper */}
        <motion.div
          animate={showSubtitle ? { y: [0, -6, 0] } : { y: 0 }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2,
          }}
          className="mt-4 sm:mt-5 md:mt-7 lg:mt-8 flex flex-wrap items-center justify-center
                     gap-x-2 sm:gap-x-3 md:gap-x-4
                     text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl
                     text-center pointer-events-auto"
        >
          {SUBTITLE_WORDS.map((word, wordIdx) => (
            <motion.span
              key={`${word.text}-${wordIdx}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={
                showSubtitle
                  ? { scale: 1, opacity: 1 }
                  : { scale: 0, opacity: 0 }
              }
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 18,
                mass: 0.8,
                delay: wordIdx * 0.09,
              }}
              className="inline-flex [-webkit-text-stroke-width:1px] sm:[-webkit-text-stroke-width:2px]"
              style={{
                color: "#FFF",
                WebkitTextStrokeColor: word.strokeColor,
                fontFamily: "var(--font-supermario)",
                fontWeight: 400,
                lineHeight: "normal",
                fontStyle: "normal",
              }}
            >
              {word.text.split("").map((char, charIdx) => (
                <motion.span
                  key={`${char}-${charIdx}`}
                  whileHover={{
                    y: -10,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    },
                  }}
                  className="inline-block cursor-default"
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

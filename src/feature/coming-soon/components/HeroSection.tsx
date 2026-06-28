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

const ZOOM_SCALE: number[] = [0, 0.5, 1, 1.15, 1];
const ZOOM_TIMES: number[] = [0, 0.3, 0.6, 0.85, 1];

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
          className="relative w-[95%] sm:w-[88%] md:w-[80%] lg:w-[72%] xl:w-[68%] max-w-[1200px]"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={showLogo ? { scale: ZOOM_SCALE } : { scale: 0 }}
            transition={{
              duration: 0.8,
              times: ZOOM_TIMES,
              ease: "easeOut",
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

            {showLogo && (
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{
                  WebkitMaskImage: `url(${comingSoonLogo.src})`,
                  maskImage: `url(${comingSoonLogo.src})`,
                  WebkitMaskSize: "100% 100%",
                  maskSize: "100% 100%",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                }}
              >
                <motion.div
                  className="absolute top-0 bottom-0 w-[40%] -skew-x-12"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255, 50, 50, 0.95) 50%, transparent 100%)",
                    mixBlendMode: "screen",
                  }}
                  initial={{ left: "-50%" }}
                  animate={{ left: ["-50%", "150%"] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                    ease: "linear",
                  }}
                />
              </div>
            )}
          </motion.div>
        </motion.div>

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
              initial={{ scale: 0 }}
              animate={showSubtitle ? { scale: ZOOM_SCALE } : { scale: 0 }}
              transition={{
                duration: 0.6,
                times: ZOOM_TIMES,
                delay: wordIdx * 0.08,
                ease: "easeOut",
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

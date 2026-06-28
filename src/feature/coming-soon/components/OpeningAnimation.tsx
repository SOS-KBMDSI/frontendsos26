"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import spaceship from "@/assets/coming-soon/spaceship.png";
import type { Phase } from "../hooks/useOpeningSequence";

interface OpeningAnimationProps {
  phase: Phase;
}

const GRADIENT_BG = "linear-gradient(180deg, #4A0010 0%, #C30022 100%)";

export function OpeningAnimation({ phase }: OpeningAnimationProps) {
  const isVisible = phase === "opening" || phase === "revealing";
  const isRevealing = phase === "revealing";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="opening-layer"
          className="absolute inset-0 z-50 overflow-hidden"
          initial={{ y: 0 }}
          animate={isRevealing ? { y: "-100%" } : { y: 0 }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 1.5,
            ease: [0.65, 0, 0.35, 1],
          }}
          style={{ background: GRADIENT_BG }}
        >
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-180px sm:w-220px md:w-280px lg:w-[320px]"
            initial={{ y: "100vh", scale: 0.6, opacity: 0 }}
            animate={
              isRevealing
                ? {
                    y: "-120vh",
                    scale: 0.5,
                    opacity: 1,
                  }
                : {
                    y: ["100vh", "30vh", "30vh"],
                    scale: [0.6, 1, 1],
                    opacity: [0, 1, 1],
                  }
            }
            transition={
              isRevealing
                ? {
                    duration: 1.5,
                    ease: [0.42, 0, 1, 1],
                  }
                : {
                    y: {
                      duration: 3.5,
                      times: [0, 0.43, 1],
                      ease: "easeOut",
                    },
                    scale: {
                      duration: 3.5,
                      times: [0, 0.43, 1],
                      ease: "easeOut",
                    },
                    opacity: {
                      duration: 1,
                      times: [0, 0.3, 1],
                      ease: "easeOut",
                    },
                  }
            }
            style={{ top: 0 }}
          >
            <motion.div
              animate={
                !isRevealing
                  ? {
                      y: [0, -18, 0],
                      rotate: [-2, 2, -2],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
            >
              <Image
                src={spaceship}
                alt="Spaceship"
                className="w-full h-auto"
                priority
                draggable={false}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

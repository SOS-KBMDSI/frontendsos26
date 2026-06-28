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
            className="absolute left-1/2 -translate-x-1/2 w-45 sm:w-55 md:w-70 lg:w-80"
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
              className="relative"
            >
              <Image
                src={spaceship}
                alt="Spaceship"
                className="w-full h-auto relative z-10"
                priority
                draggable={false}
              />

              <div
                className="absolute left-1/2 -translate-x-1/2 z-0"
                style={{ top: "88%", width: "30%" }}
              >
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2"
                  style={{
                    top: 0,
                    width: "220%",
                    aspectRatio: "1 / 2.3",
                    background: `radial-gradient(ellipse at 50% 15%,
                      rgba(255, 255, 255, 0.85) 0%,
                      rgba(255, 210, 100, 0.65) 20%,
                      rgba(255, 130, 30, 0.45) 48%,
                      rgba(220, 40, 0, 0.22) 75%,
                      transparent 100%
                    )`,
                    borderRadius: "50% 50% 45% 45% / 20% 20% 70% 70%",
                    filter: "blur(18px)",
                    transformOrigin: "top center",
                  }}
                  animate={{
                    scaleY: [1, 1.35, 0.95, 1.25, 1.05, 1],
                    scaleX: [1, 1.1, 0.9, 1.05, 0.95, 1],
                    opacity: [0.7, 1, 0.85, 1, 0.8, 0.7],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <motion.div
                  className="absolute left-1/2 -translate-x-1/2"
                  style={{
                    top: 0,
                    width: "100%",
                    aspectRatio: "1 / 1.9",
                    background: `linear-gradient(180deg,
                      rgba(255, 255, 255, 1) 0%,
                      rgba(255, 240, 130, 0.95) 18%,
                      rgba(255, 180, 40, 0.92) 42%,
                      rgba(255, 80, 0, 0.78) 70%,
                      rgba(180, 0, 0, 0.35) 92%,
                      transparent 100%
                    )`,
                    borderRadius: "50% 50% 40% 40% / 25% 25% 80% 80%",
                    filter: "blur(3px)",
                    transformOrigin: "top center",
                  }}
                  animate={{
                    scaleY: [1, 1.45, 1.05, 1.32, 1.15, 1],
                    scaleX: [1, 0.92, 1.08, 0.94, 1.06, 1],
                    opacity: [0.9, 1, 0.95, 1, 0.92, 0.9],
                  }}
                  transition={{
                    duration: 0.38,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <motion.div
                  className="absolute left-1/2 -translate-x-1/2"
                  style={{
                    top: 0,
                    width: "55%",
                    aspectRatio: "1 / 1.6",
                    background: `linear-gradient(180deg,
                      rgba(255, 255, 255, 1) 0%,
                      rgba(255, 250, 200, 0.95) 35%,
                      rgba(255, 200, 80, 0.7) 70%,
                      transparent 100%
                    )`,
                    borderRadius: "50% 50% 50% 50% / 20% 20% 85% 85%",
                    filter: "blur(1.5px)",
                    transformOrigin: "top center",
                  }}
                  animate={{
                    scaleY: [1, 1.3, 0.95, 1.2, 1.1, 1],
                    opacity: [0.95, 1, 0.9, 1, 0.95, 0.95],
                  }}
                  transition={{
                    duration: 0.28,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";
import { motion, type TargetAndTransition } from "framer-motion";
import { useOpeningSequence } from "../hooks/useOpeningSequence";
import type { CameraPhase } from "../hooks/useOpeningSequence";
import { BackgroundLayers } from "../components/BackgroundLayers";
import { RockDecorations } from "../components/RockDecorations";
import { HeroSection } from "../components/HeroSection";
import { OpeningAnimation } from "../components/OpeningAnimation";

const CAMERA_STATES: Record<CameraPhase, TargetAndTransition> = {
  normal: { scale: 1, x: "0vw", y: "0vh" },
  zoomRight: { scale: 1.3, x: "-12vw", y: "-10vh" },
  zoomLeft: { scale: 1.3, x: "12vw", y: "-10vh" },
};

export default function ComingSoonContainer() {
  const {
    phase,
    isMainVisible,
    isHeroVisible,
    isSubtitleVisible,
    cameraPhase,
  } = useOpeningSequence();

  return (
    <main className="relative h-screen w-screen overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={CAMERA_STATES[cameraPhase]}
        transition={{
          duration: 1,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{
          transformOrigin: "center center",
          willChange: "transform",
        }}
      >
        <BackgroundLayers />
        <RockDecorations active={isMainVisible} />
        <HeroSection
          showLogo={isHeroVisible}
          showSubtitle={isSubtitleVisible}
        />
      </motion.div>

      <OpeningAnimation phase={phase} />
    </main>
  );
}

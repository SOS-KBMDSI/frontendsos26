"use client";
import { useOpeningSequence } from "../hooks/useOpeningSequence";
import { BackgroundLayers } from "../components/BackgroundLayers";
import { RockDecorations } from "../components/RockDecorations";
import { HeroSection } from "../components/HeroSection";
import { MeteorShower } from "../components/MeteorShower";
import { OpeningAnimation } from "../components/OpeningAnimation";

export default function ComingSoonContainer() {
  const {
    phase,
    isMainVisible,
    isHeroVisible,
    isSubtitleVisible,
    isMeteorActive,
  } = useOpeningSequence();

  return (
    <main className="relative h-screen w-screen overflow-hidden">
      <BackgroundLayers />
      <RockDecorations active={isMainVisible} />
      <HeroSection showLogo={isHeroVisible} showSubtitle={isSubtitleVisible} />
      {isMeteorActive && <MeteorShower />}
      <OpeningAnimation phase={phase} />
    </main>
  );
}

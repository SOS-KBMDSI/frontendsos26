"use client";
import { useEffect, useState } from "react";

export type Phase = "opening" | "revealing" | "main" | "complete";

export interface OpeningSequenceState {
  phase: Phase;
  isOpeningVisible: boolean;
  isMainVisible: boolean;
  isHeroVisible: boolean;
  isSubtitleVisible: boolean;
  isMeteorActive: boolean;
}

export function useOpeningSequence(): OpeningSequenceState {
  const [phase, setPhase] = useState<Phase>("opening");
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isSubtitleVisible, setIsSubtitleVisible] = useState(false);
  const [isMeteorActive, setIsMeteorActive] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // 0s    : spaceship mulai naik (phase: opening)
    // 1.5s  : spaceship sampai tengah, float
    // 3.5s  : phase -> revealing (spaceship + gradient mulai naik)
    timers.push(setTimeout(() => setPhase("revealing"), 3500));

    // 5s    : phase -> main (rocks mulai)
    timers.push(setTimeout(() => setPhase("main"), 5000));

    // 5.8s  : COMING SOON text zoom in (setelah rocks 5.0-5.4-5.8)
    timers.push(setTimeout(() => setIsHeroVisible(true), 5800));

    // 6.6s  : subtitle per-word stagger
    timers.push(setTimeout(() => setIsSubtitleVisible(true), 6600));

    // 7.5s  : meteor shower aktif + phase complete
    timers.push(
      setTimeout(() => {
        setIsMeteorActive(true);
        setPhase("complete");
      }, 7500),
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  return {
    phase,
    isOpeningVisible: phase === "opening" || phase === "revealing",
    isMainVisible: phase === "main" || phase === "complete",
    isHeroVisible,
    isSubtitleVisible,
    isMeteorActive,
  };
}

"use client";
import { useEffect, useState } from "react";

export type Phase = "opening" | "revealing" | "main" | "complete";
export type CameraPhase = "normal" | "zoomRight" | "zoomLeft";

export interface OpeningSequenceState {
  phase: Phase;
  isOpeningVisible: boolean;
  isMainVisible: boolean;
  isHeroVisible: boolean;
  isSubtitleVisible: boolean;
  cameraPhase: CameraPhase;
}

export function useOpeningSequence(): OpeningSequenceState {
  const [phase, setPhase] = useState<Phase>("opening");
  const [cameraPhase, setCameraPhase] = useState<CameraPhase>("normal");
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isSubtitleVisible, setIsSubtitleVisible] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setPhase("revealing"), 3500));

    timers.push(
      setTimeout(() => {
        setPhase("main");
        setCameraPhase("zoomRight");
      }, 5000),
    );

    timers.push(setTimeout(() => setCameraPhase("zoomLeft"), 6000));

    timers.push(setTimeout(() => setCameraPhase("normal"), 7000));

    timers.push(setTimeout(() => setIsHeroVisible(true), 8000));

    timers.push(setTimeout(() => setIsSubtitleVisible(true), 8800));

    timers.push(setTimeout(() => setPhase("complete"), 9500));

    return () => timers.forEach(clearTimeout);
  }, []);

  return {
    phase,
    isOpeningVisible: phase === "opening" || phase === "revealing",
    isMainVisible: phase === "main" || phase === "complete",
    isHeroVisible,
    isSubtitleVisible,
    cameraPhase,
  };
}

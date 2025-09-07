// StfContainer.tsx

"use client";
import React, { useEffect, useState } from "react";
import HeroSection from "../components/after/HeroSection";
import PemilihanSection from "../components/after/PemilihanSection";
import VisiMisiSection from "../components/after/VisiMisiSection";
import CurrentSection from "../components/before/CurrentSection";
import CtaSection from "../components/before/CtaSection";
import { useGetStfData } from "../hooks/useGetStfData";
import GradientBackground from "@/shared/components/background/GradientBackground";
import { useAuthContext } from "@/shared/hooks/useAuthContext";

const StfContainer = () => {
  const { stfData, caketangList, isLoading, error } = useGetStfData();
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const { user } = useAuthContext();

  useEffect(() => {
    if (
      stfData?.pemilihan_is_active &&
      caketangList?.length > 0 &&
      !activeCardId
    ) {
      const selectedId =
        caketangList.length > 1
          ? caketangList[1].id_caketang
          : caketangList[0].id_caketang;

      setActiveCardId(selectedId);
    }
  }, [stfData, caketangList, activeCardId]);

  if (isLoading) {
    return (
      <GradientBackground>
        <div className="mx-auto flex h-screen items-center justify-center text-default-white">
          <p className="text-xl">Loading candidate data...</p>
        </div>
      </GradientBackground>
    );
  }

  return (
    <>
      {user && stfData?.pemilihan_is_active ? (
        <>
          <HeroSection />
          <VisiMisiSection
            caketangList={caketangList || []}
            isLoading={isLoading}
            error={error}
            activeCardId={activeCardId}
            setActiveCardId={setActiveCardId}
          />
          <PemilihanSection
            caketangList={caketangList || []}
            isLoading={isLoading}
            error={error}
            activeCardId={activeCardId}
            setActiveCardId={setActiveCardId}
            kesempatan={stfData.kesempatan}
          />
        </>
      ) : (
        <>
          <CurrentSection />
          <CtaSection />
        </>
      )}
    </>
  );
};

export default StfContainer;

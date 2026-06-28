import GradientBackground from "@/shared/components/background/GradientBackground";
import React from "react";

const CtaSection = () => {
  return (
    <GradientBackground>
      <div className="mx-auto lg:px-8 md:px-12 px-4 xl:px-24 text-default-white flex flex-col justify-center items-center h-screen gap-6">
        <h2 className="w-7/8 text-4xl font-semibold text-center md:leading-16 md:text-[3.75rem] lg:w-2/4 ">
          Are you ready for Shaping The Future 2026?
        </h2>
        <p className="text-base text-center md:text-3xl lg:text-2xl">
          Yuk tunjukkan suaramu dan dukunganmu untuk menciptakan angkatan yang
          solid.
        </p>
      </div>
    </GradientBackground>
  );
};

export default CtaSection;

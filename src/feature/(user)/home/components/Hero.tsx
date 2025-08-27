"use client";
import BintangAcak from "@/feature/(auth)/login/components/RandomStars";
import React from "react";
const Hero = () => {
  return (
    <section
      className={`h-screen w-full hero-bg flex  items-center justify-center relative`}
    >
      <h1 className="font-upanddownnormal -mt-20 text-center 2xl:text-9xl md:text-8xl text-6xl z-20 text-secondary-500 [-webkit-text-stroke:1px_theme(colors.primary.700)] md:[-webkit-text-stroke:2px_theme(colors.primary.700)] leading-[40px] md:leading-[80px] tracking-[0px]">
        Synergy Of Symphony
      </h1>
      <BintangAcak />
    </section>
  );
};

export default Hero;

"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import SwiperFrame from "@/assets/peta/swiper-frame.svg";
import KilasBalik from "@/assets/peta/kilas-balik.jpg";
import PrevArrow from "@/assets/peta/prev.svg";
import NextArrow from "@/assets/peta/next.svg";
import { Title } from "./Title";

const KilasBalikSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [animateFrames, setAnimateFrames] = useState(false);

  const images = [
    { src: KilasBalik, alt: "Kilas Balik 1" },
    { src: KilasBalik, alt: "Kilas Balik 2" },
    { src: KilasBalik, alt: "Kilas Balik 3" },
    { src: KilasBalik, alt: "Kilas Balik 4" },
  ];

  const handlePrevious = () => {
    setDirection(-1);
    setAnimateFrames(true);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setAnimateFrames(true);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (animateFrames) {
      const timer = setTimeout(() => {
        setAnimateFrames(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [animateFrames]);

  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 80 : -80,
      opacity: 0,
    }),
  };

  const arrowVariants: Variants = {
    idle: {
      scale: 1,
    },
    hover: {
      scale: 1.05,
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <div className="bg-primary-500 relative overflow-hidden py-24">
      <div
        className="absolute top-0 right-0 w-[1886px] h-[1886px] opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle, #7D021A 0%, #7D021A 34%, transparent 70%)`,
          transform: "translate(25%, -25%)",
        }}
      />

      <div
        className="absolute bottom-0 left-0 w-[1886px] h-[1886px] opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle, #8C021E 0%, #EA5B43 32%, transparent 70%)`,
          transform: "translate(-25%, 25%)",
        }}
      />

      <div className="relative z-10 pt-16 pb-8 flex justify-center">
        <Title>Kilas Balik SOS 2024</Title>
      </div>

      <div className="min-h-[70vh] flex justify-center items-center relative overflow-hidden">
        <div className="relative flex justify-center items-center">
          <div className="absolute inset-0 flex justify-center items-center">
            <motion.div
              animate={{
                scale: animateFrames ? [1, 1.02, 1] : 1,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
                times: [0, 0.5, 1],
              }}
              className="absolute z-10"
            >
              <Image
                src={SwiperFrame}
                width={500}
                height={500}
                className="w-[527px] h-auto rotate-[-5deg]"
                alt="Swiper Frame Background 1"
              />
            </motion.div>

            <motion.div
              animate={{
                scale: animateFrames ? [1, 1.02, 1] : 1,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
                times: [0, 0.5, 1],
                delay: 0.1,
              }}
              className="absolute z-20"
            >
              <Image
                src={SwiperFrame}
                width={500}
                height={500}
                className="w-[527px] h-auto rotate-[5deg]"
                alt="Swiper Frame Background 2"
              />
            </motion.div>
          </div>

          <div className="relative z-30 w-[527px] h-[527px] flex justify-center items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className="absolute"
              >
                <Image
                  src={images[currentIndex].src}
                  width={500}
                  height={500}
                  className="w-[527px] border-5 border-default-light h-auto"
                  alt={images[currentIndex].alt}
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.button
          variants={arrowVariants}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
          onClick={handlePrevious}
          className="absolute left-[calc(50%-350px)] z-40 cursor-pointer transform -translate-x-1/2"
          aria-label="Previous image"
        >
          <Image
            src={PrevArrow}
            width={72}
            height={72}
            className="w-16 h-16"
            alt="Previous Arrow"
          />
        </motion.button>

        <motion.button
          variants={arrowVariants}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
          onClick={handleNext}
          className="absolute right-[calc(50%-350px)] z-40 cursor-pointer transform translate-x-1/2"
          aria-label="Next image"
        >
          <Image
            src={NextArrow}
            width={72}
            height={72}
            className="w-16 h-16"
            alt="Next Arrow"
          />
        </motion.button>
      </div>
    </div>
  );
};

export default KilasBalikSection;

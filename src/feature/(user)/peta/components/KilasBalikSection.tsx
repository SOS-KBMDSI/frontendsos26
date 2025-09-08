"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import KilasBalik from "@/assets/peta/kilas-balik.jpg";
import Rangkaian11 from "@/assets/peta/rangkaian1-1.png";
import Rangkaian12 from "@/assets/peta/rangkaian1-2.png";
import Rangkaian21 from "@/assets/peta/rangkaian2-1.png";
import Rangkaian22 from "@/assets/peta/rangkaian2-2.png";
import PrevArrow from "@/assets/peta/prev.svg";
import NextArrow from "@/assets/peta/next.svg";
import { Title } from "./Title";
import GradientBackground from "@/shared/components/background/GradientBackground";

const KilasBalikSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [animateFrames, setAnimateFrames] = useState(false);

  const images = [
    { src: KilasBalik, alt: "Kilas Balik 1" },
    { src: Rangkaian11, alt: "Rangkaian 1 - 1" },
    { src: Rangkaian12, alt: "Rangkaian 1 - 2" },
    { src: Rangkaian21, alt: "Rangkaian 2 - 1" },
    { src: Rangkaian22, alt: "Rangkaian 2 - 2" },
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

  const getNextIndex = (currentIndex: number, offset: number): number => {
    return (currentIndex + offset) % images.length;
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
    <GradientBackground className="py-12 md:py-18 lg:py-20 min-h-[50vh] sm:min-h-[40vh] md:min-h-[40vh] lg:min-h-[45vh]">
      <div className="relative z-10 flex justify-center px-4">
        <Title marginBottom={false}>Kilas Balik SOS 2024</Title>
      </div>

      <div className="flex justify-center items-center relative overflow-hidden px-4">
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
                src={images[getNextIndex(currentIndex, 1)].src}
                width={500}
                height={500}
                className="w-[280px] sm:w-[350px] md:w-[450px] lg:w-[596px] h-[140px] sm:h-[200px] md:h-[250px] lg:h-80 rotate-[-6deg] object-cover border-[3px] sm:border-4 lg:border-5 border-default-light"
                alt={`Image ${getNextIndex(currentIndex, 1)}`}
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
                src={images[getNextIndex(currentIndex, 2)].src}
                width={500}
                height={500}
                className="w-[280px] sm:w-[350px] md:w-[450px] lg:w-[596px] h-[140px] sm:h-[200px] md:h-[250px] lg:h-80 rotate-[6deg] object-cover border-[3px] sm:border-4 lg:border-5 border-default-light"
                alt={`Image ${getNextIndex(currentIndex, 2)}`}
              />
            </motion.div>
          </div>

          <div
            className="relative z-30 w-[240px] sm:w-[350px] md:w-[450px] lg:w-[596px] 
                          h-[240px] sm:h-[350px] md:h-[450px] lg:h-[527px] 
                          flex justify-center items-center"
          >
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
                  className="w-[240px] sm:w-[350px] md:w-[450px] lg:w-[596px] 
                            h-[140px] sm:h-[200px] md:h-[250px] lg:h-80 
                            object-cover border-[3px] sm:border-4 lg:border-5 border-default-light"
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
          className="absolute left-2 sm:left-4 md:left-8 
                     lg:left-[calc(50%-420px)] z-40 cursor-pointer 
                     lg:transform lg:-translate-x-1/2"
          aria-label="Previous image"
        >
          <Image
            src={PrevArrow}
            width={72}
            height={72}
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
            alt="Previous Arrow"
          />
        </motion.button>

        <motion.button
          variants={arrowVariants}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
          onClick={handleNext}
          className="absolute right-2 sm:right-4 md:right-8 
                     lg:right-[calc(50%-420px)] z-40 cursor-pointer 
                     lg:transform lg:translate-x-1/2"
          aria-label="Next image"
        >
          <Image
            src={NextArrow}
            width={72}
            height={72}
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
            alt="Next Arrow"
          />
        </motion.button>
      </div>
    </GradientBackground>
  );
};

export default KilasBalikSection;

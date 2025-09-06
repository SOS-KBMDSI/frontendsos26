"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Elips from "@/assets/home/ellips.svg";
import Image from "next/image";
import { rangkaianData } from "../../data/rangkaian";
import PolaroidCard from "./PolaroidCard";
import { Button } from "@/shared/components/ui/Button";

const MotionButton = motion(Button);

const RangakainList = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);

    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    if (newDirection > 0) {
      setCurrentIndex((prev) =>
        prev === rangkaianData.length - 1 ? 0 : prev + 1,
      );
    } else {
      setCurrentIndex((prev) =>
        prev === 0 ? rangkaianData.length - 1 : prev - 1,
      );
    }
  };

  const desktopContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const sliderVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <section className="relative min-h-[100vh] overflow-hidden">
      <div className="relative  inset-0 flex justify-center items-center">
        <div className=" lg:-mb-14 -mb-10 sm:-mb-12 xl:-mb-18 2xl:-mb-14">
          <Image
            className="w-[100vw]  left-0 top-0 scale-105  max-w-none object-cover"
            src={Elips}
            alt="elips"
            priority
          />
        </div>
      </div>

      {isDesktop ? (
        <motion.div
          className=" z-10 lg:flex gap-[30vh]  -mt-2 justify-center  min-h-[100vh]"
          variants={desktopContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {rangkaianData.map((rangkaian) => (
            <motion.div
              key={rangkaian.id}
              variants={{
                hidden: {
                  y: 20,
                  opacity: 0,
                },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: "spring" as const,
                    stiffness: 100,
                  },
                },
              }}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <PolaroidCard
                rotation={
                  rangkaian.id === 1 ? 10 : rangkaian.id === 2 ? -10 : 0
                }
                rangkaian={rangkaian}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="relative z-10 flex flex-col  -mt-4 items-center min-h-[100vh]">
          <div className="relative w-full max-w-xl h-[60vh] mb-8 flex items-center justify-center overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                className="absolute w-full flex justify-center"
                custom={direction}
                variants={sliderVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
              >
                <PolaroidCard
                  rotation={0}
                  rangkaian={rangkaianData[currentIndex]}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-between content-container items-center w-full max-w-sm mb-6">
            <MotionButton
              arrow="left"
              variant="outline"
              onClick={() => paginate(-1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
            <MotionButton
              arrow="right"
              variant="outline"
              onClick={() => paginate(1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default RangakainList;

"use client";
import { motion, Variants, AnimatePresence } from "framer-motion";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Ornament } from "@/feature/(auth)/login/components/Ornament";
import LogoSoS from "@/assets/logo-sos.svg";

interface ComingSoonLoaderProps {
  text?: string;
  showProgress?: boolean;
  showPulse?: boolean;
  autoHide?: boolean;
  hideDelay?: number;
  onComplete?: () => void;
  customLogo?: string;
  theme?: "default" | "dark" | "light" | "gradient";
  className?: string;
  logoSize?: number;
  textSize?: "sm" | "md" | "lg" | "xl";
}

// Enhanced animation variants with more sophisticated effects
const mainContainerVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -30,
    filter: "blur(5px)",
    transition: {
      duration: 0.8,
      ease: [0.55, 0.06, 0.68, 0.19],
    },
  },
};

const logoContainerVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.3,
    rotate: -180,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 1.2,
      ease: [0.34, 1.56, 0.64, 1],
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const logoVariants: Variants = {
  visible: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const textContainerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.4,
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    rotateX: -90,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
};

const pulseVariants: Variants = {
  pulse: {
    scale: [1, 1.2, 1],
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const backgroundVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export const ComingSoonLoader: React.FC<ComingSoonLoaderProps> = ({
  text = "Cook Some Things Up",
  showPulse = true,
  autoHide = false,
  hideDelay = 5000,
  customLogo,
  theme = "default",
  className = "",
  logoSize = 140,
  textSize = "md",
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, hideDelay);

      return () => clearTimeout(timer);
    }
  }, [autoHide, hideDelay]);

  const getThemeClasses = (): string => {
    switch (theme) {
      case "dark":
        return "bg-gray-900 text-white";
      case "light":
        return "bg-white text-gray-900";
      case "gradient":
        return "bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 text-white";
      default:
        return "bg-secondary-400 text-primary-500";
    }
  };

  const getTextSizeClasses = (): string => {
    switch (textSize) {
      case "sm":
        return "text-lg md:text-xl";
      case "md":
        return "text-xl md:text-2xl";
      case "lg":
        return "text-2xl md:text-3xl";
      case "xl":
        return "text-3xl md:text-4xl";
      default:
        return "text-xl md:text-2xl";
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="enhanced-loader"
        variants={backgroundVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={`fixed inset-0 flex items-center justify-center z-50 ${getThemeClasses()} ${className}`}
        role="dialog"
        aria-label="Loading screen"
        aria-live="polite"
      >
        {showPulse && (
          <motion.div
            variants={pulseVariants}
            animate="pulse"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          />
        )}

        <Ornament />

        <motion.div
          variants={mainContainerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex flex-col items-center justify-center gap-8 z-20 px-4"
        >
          <motion.div variants={logoContainerVariants} className="relative">
            {showPulse && (
              <motion.div
                variants={pulseVariants}
                animate="pulse"
                className="absolute inset-0 rounded-full  -m-4"
              />
            )}
            <motion.div variants={logoVariants}>
              <Image
                src={customLogo || LogoSoS}
                alt="Logo"
                width={logoSize}
                height={logoSize}
                priority
                className="drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>

          <motion.div
            variants={textContainerVariants}
            className="flex flex-col items-center gap-4"
          >
            <motion.div className="flex items-center justify-center">
              <motion.h1
                className={`${getTextSizeClasses()} font-bold tracking-wider text-center`}
                aria-label={text}
              >
                {text.split("").map((char, index) => (
                  <motion.span
                    key={`${char}-${index}`}
                    variants={letterVariants}
                    className="inline-block"
                    style={{
                      transformOrigin: "center bottom",
                      perspective: "1000px",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="flex space-x-1"
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 bg-current rounded-full opacity-60"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

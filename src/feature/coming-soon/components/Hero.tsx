import React, { useEffect, useMemo, useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useQuizGame } from "../hooks/useQuizGame";
const waveContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.1 },
  },
};
const waveCharacterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 100,
    scale: 0.3,
    rotateY: -180,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    filter: "blur(0px)",
    transition: { type: "spring", damping: 8, stiffness: 100, duration: 1.2 },
  },
};
const complexFloatingVariants: Variants = {
  animate: {
    y: [-4, 4, -4],
    rotate: [-1.5, 1.5, -1.5],
    scale: [1, 1.02, 1],
    transition: {
      y: { duration: 5, ease: "easeInOut", repeat: Infinity },
      rotate: { duration: 7, ease: "easeInOut", repeat: Infinity },
      scale: { duration: 6, ease: "easeInOut", repeat: Infinity },
    },
  },
};
const subtitleFloatingVariants: Variants = {
  animate: {
    y: [-2, 2, -2],
    transition: { duration: 4.5, ease: "easeInOut", repeat: Infinity },
  },
};

const Hero = () => {
  const {
    hasWon,
    currentChallengeIndex,
    clickedSequence,
    quizChallenges,
    handleCharacterClick,
    resetGame,
  } = useQuizGame();
  const [isQuizVisible, setQuizVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuizVisible(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);
  const renderWaveText = useMemo(() => {
    const WaveText = (
      text: string,
      className: string,
      floatingVariant: Variants,
    ) => (
      <motion.div
        variants={waveContainerVariants}
        initial="hidden"
        animate="visible"
        className={`${className} inline-block relative text-center`}
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={waveCharacterVariants}
            className="inline-block relative cursor-pointer"
            style={{
              transformOrigin: "center bottom",
              zIndex: text.length - index,
            }}
            whileHover={{
              scale: 1.2,
              rotate: Math.random() * 20 - 10,
              y: -15,
              zIndex: 100,
              filter: "brightness(1.3) saturate(1.2)",
              transition: { duration: 0.3, type: "spring", stiffness: 300 },
            }}
            whileTap={{ scale: 0.95, rotate: Math.random() * 40 - 20 }}
            onTap={() => handleCharacterClick(char)}
          >
            <motion.span
              variants={floatingVariant}
              animate="animate"
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
            <motion.span
              className="absolute inset-0 inline-block opacity-20 blur-sm"
              style={{ transform: "translate(2px, 2px)", zIndex: -1 }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.1,
                },
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          </motion.span>
        ))}
      </motion.div>
    );
    WaveText.displayName = "WaveText";
    return WaveText;
  }, [handleCharacterClick]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-20 justify-center overflow-hidden py-8">
      <div className="w-full min-h-screen flex flex-col items-center justify-center font-upanddownnormal overflow-hidden ">
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
          className="relative z-10 text-center"
        >
          {renderWaveText(
            "COMING SOON",
            "lg:text-8xl xl:text-9xl md:text-9xl text-6xl text-primary-700 [-webkit-text-stroke:1px_theme(colors.primary.300)] md:[-webkit-text-stroke:3px_theme(colors.primary.300)] leading-[60px] md:leading-[100px] tracking-[0px]",
            complexFloatingVariants,
          )}
        </motion.div>

        <motion.div
          layout
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
          className="relative z-10 text-center mt-1 md:mt-2"
        >
          {renderWaveText(
            "Synergy Of Symphony 2025",
            "lg:text-5xl xl:text-6xl md:text-6xl text-3xl text-primary-700 [-webkit-text-stroke:1px_theme(colors.primary.300)] md:[-webkit-text-stroke:2px_theme(colors.primary.300)] leading-[40px] md:leading-[80px] tracking-[0px]",
            subtitleFloatingVariants,
          )}
        </motion.div>

        <AnimatePresence>
          {isQuizVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 50 }}
              className="mt-8 w-[90%] max-w-md z-20"
            >
              <div className="bg-gray-800/50 font-poppins backdrop-blur-md rounded-2xl shadow-2xl p-6 min-h-[170px] flex flex-col justify-center">
                {hasWon ? (
                  <motion.div key="win-screen" className="text-center">
                    <h2 className="text-xl font-bold text-green-400">
                      KEREN!!!
                    </h2>
                    <p className="mt-2 text-sm text-white">
                      Udah siap banget nih jadi keluarga Departemen Sistem
                      Informasi!
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={resetGame}
                      className="mt-4 bg-green-500 text-white font-bold py-2 px-6 rounded-full text-base"
                    >
                      Main Lagi
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    key={currentChallengeIndex}
                    className="text-center"
                  >
                    <p className="block text-white text-xl font-semibold">
                      {quizChallenges[currentChallengeIndex].question}
                    </p>
                    <p className="text-sm text-yellow-200 mt-2">
                      Klik huruf di layar untuk menjawab!
                    </p>
                    <div className="mt-3 h-10 bg-black/20 rounded-lg flex items-center justify-center font-mono text-2xl tracking-widest text-green-400">
                      {clickedSequence.join("") || (
                        <span className="text-gray-500 text-lg">...</span>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Hero;

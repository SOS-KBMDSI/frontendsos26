// components/Hero.tsx
import React, { useMemo } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";

interface HeroProps {
  quizState: {
    hasWon: boolean;
    showQuiz: boolean;
    clickedSequence: string[];
    currentQuestion: string;
  };
  quizActions: {
    resetGame: () => void;
    handleCharacterClick: (char: string) => void;
  };
}

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

interface AnimatedTextBlockProps {
  renderWaveText: (
    text: string,
    className: string,
    floatingVariant: Variants,
  ) => React.ReactElement;
}

const AnimatedTextBlockComponent: React.FC<AnimatedTextBlockProps> = ({
  renderWaveText,
}) => {
  return (
    <div className="relative z-10 text-center">
      {renderWaveText(
        "COMING SOON",
        "lg:text-8xl xl:text-9xl md:text-9xl text-6xl text-primary-700 [-webkit-text-stroke:1px_theme(colors.primary.300)] md:[-webkit-text-stroke:3px_theme(colors.primary.300)] leading-[60px] md:leading-[100px] tracking-[0px]",
        complexFloatingVariants,
      )}
      <div className="mt-1 md:mt-2">
        {renderWaveText(
          "Synergy Of Symphony 2025",
          "lg:text-5xl xl:text-6xl md:text-6xl text-3xl text-primary-700 [-webkit-text-stroke:1px_theme(colors.primary.300)] md:[-webkit-text-stroke:2px_theme(colors.primary.300)] leading-[40px] md:leading-[80px] tracking-[0px]",
          subtitleFloatingVariants,
        )}
      </div>
    </div>
  );
};

AnimatedTextBlockComponent.displayName = "AnimatedTextBlockComponent";

const AnimatedTextBlock = React.memo(AnimatedTextBlockComponent);
AnimatedTextBlock.displayName = "AnimatedTextBlock";

const Hero: React.FC<HeroProps> = ({ quizState, quizActions }) => {
  const { hasWon, showQuiz, clickedSequence, currentQuestion } = quizState;
  const { resetGame, handleCharacterClick } = quizActions;

  const renderWaveText = useMemo(() => {
    const WaveTextRenderer = (
      text: string,
      className: string,
      floatingVariant: Variants,
    ) => (
      <motion.div
        variants={waveContainerVariants}
        initial="hidden"
        animate="visible"
        className={`${className} inline-block relative`}
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
              y: -15,
              zIndex: 100,
              transition: { duration: 0.3 },
            }}
            onTap={() => handleCharacterClick(char)}
          >
            <motion.span
              variants={floatingVariant}
              animate="animate"
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          </motion.span>
        ))}
      </motion.div>
    );

    return WaveTextRenderer;
  }, [handleCharacterClick]);

  return (
    <div className="w-screen h-screen flex justify-center items-center font-upanddownnormal">
      <AnimatePresence mode="wait">
        {!showQuiz ? (
          <motion.div
            key="initial-state"
            className="w-full h-screen flex flex-col items-center justify-center"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <AnimatedTextBlock renderWaveText={renderWaveText} />
          </motion.div>
        ) : (
          <motion.div
            key="final-state"
            className="flex items-center flex-col pt-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}
          >
            <AnimatedTextBlock renderWaveText={renderWaveText} />
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
              className="mt-8 w-[90%] max-w-md z-20"
            >
              <div className="bg-gray-800/50 font-poppins backdrop-blur-md rounded-2xl shadow-2xl p-6 min-h-[170px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {hasWon ? (
                    <motion.div key="win" className="text-center">
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
                    <motion.div key={currentQuestion} className="text-center">
                      <p className="block text-white text-xl font-semibold">
                        {currentQuestion}
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
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;

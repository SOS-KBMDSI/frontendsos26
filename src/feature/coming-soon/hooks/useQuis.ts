import { useState, useEffect, useCallback } from "react";

interface QuizChallenge {
  question: string;
  answer: string[];
}

export const useQuis = (challenges: QuizChallenge[]) => {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [clickedSequence, setClickedSequence] = useState<string[]>([]);
  const [hasWon, setHasWon] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowQuiz(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const resetGame = useCallback(() => {
    setHasWon(false);
    setTimeout(() => {
      setCurrentChallengeIndex(0);
      setClickedSequence([]);
    }, 300);
  }, []);

  const handleCharacterClick = useCallback(
    (char: string) => {
      if (hasWon) return;

      const upperChar = char.toUpperCase();
      const targetSequence = challenges[currentChallengeIndex].answer;
      const currentSequenceIndex = clickedSequence.length;

      if (upperChar === targetSequence[currentSequenceIndex]) {
        const newSequence = [...clickedSequence, upperChar];
        setClickedSequence(newSequence);

        if (newSequence.length === targetSequence.length) {
          setTimeout(() => {
            if (currentChallengeIndex >= challenges.length - 1) {
              setHasWon(true);
            } else {
              setCurrentChallengeIndex(currentChallengeIndex + 1);
              setClickedSequence([]);
            }
          }, 800);
        }
      } else {
        if (upperChar === targetSequence[0]) {
          setClickedSequence([upperChar]);
        } else {
          setClickedSequence([]);
        }
      }
    },
    [currentChallengeIndex, clickedSequence, hasWon, challenges],
  );

  return {
    quizState: {
      hasWon,
      showQuiz,
      clickedSequence,
      currentQuestion: challenges[currentChallengeIndex].question,
    },
    quizActions: {
      resetGame,
      handleCharacterClick,
    },
  };
};

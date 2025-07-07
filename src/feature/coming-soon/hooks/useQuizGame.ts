import { useState, useCallback } from "react";

const quizChallenges = [
  { question: "Synergy of Symphony disingkat jadi?", answer: ["S", "O", "S"] },
  { question: "Singkatan Departemen Kita:", answer: ["S", "I"] },
  { question: "Ada Berapa Banyak Prodi S1 Di FILKOM ?", answer: ["5"] },
];

export const useQuizGame = () => {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [clickedSequence, setClickedSequence] = useState<string[]>([]);
  const [hasWon, setHasWon] = useState(false);

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
      const targetSequence = quizChallenges[currentChallengeIndex].answer;
      const currentSequenceIndexInClicker = clickedSequence.length;

      if (upperChar === targetSequence[currentSequenceIndexInClicker]) {
        const newSequence = [...clickedSequence, upperChar];
        setClickedSequence(newSequence);

        if (newSequence.length === targetSequence.length) {
          setTimeout(() => {
            if (currentChallengeIndex >= quizChallenges.length - 1) {
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
    [currentChallengeIndex, clickedSequence, hasWon],
  );

  return {
    hasWon,
    currentChallengeIndex,
    clickedSequence,
    quizChallenges,
    handleCharacterClick,
    resetGame,
  };
};

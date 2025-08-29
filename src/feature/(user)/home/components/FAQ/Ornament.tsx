"use client";
import React, { memo } from "react";
import Image from "next/image";
import QuestionMark from "@/assets/user/question.png";

interface QuestionMarkPosition {
  id: number;
  top: number;
  left: number;
  size: number;
  opacity: number;
  rotation: number;
}

const QuestionMarkImage = memo(({ pos }: { pos: QuestionMarkPosition }) => (
  <div
    key={pos.id}
    className="absolute animate-pulse"
    style={{
      top: `${pos.top}%`,
      left: `${pos.left}%`,
      transform: `translate(-50%, -50%) rotate(${pos.rotation}deg)`,
      animationDelay: `${pos.id * 0.2}s`,
      animationDuration: "3s",
    }}
  >
    <Image
      src={QuestionMark}
      alt="Question mark decoration"
      width={pos.size}
      height={pos.size}
      style={{
        opacity: pos.opacity,
        filter: "hue-rotate(320deg) saturate(0.8) brightness(1.1)",
      }}
      className="transition-all duration-700 hover:scale-125 hover:opacity-60"
    />
  </div>
));

QuestionMarkImage.displayName = "QuestionMarkImage";

const FloatingQuestionMark = memo(
  ({
    top,
    left,
    delay,
    duration,
    size,
    opacity,
    rotation,
  }: {
    top: string;
    left: string;
    delay: string;
    duration: string;
    size: number;
    opacity: number;
    rotation: string;
  }) => (
    <div
      className="absolute animate-bounce"
      style={{
        top,
        left,
        animationDelay: delay,
        animationDuration: duration,
      }}
    >
      <Image
        src={QuestionMark}
        alt="Floating question mark"
        width={size}
        height={size}
        style={{
          opacity,
          filter: "hue-rotate(320deg) saturate(0.8) brightness(1.1)",
        }}
        className={`transform ${rotation}`}
      />
    </div>
  ),
);

FloatingQuestionMark.displayName = "FloatingQuestionMark";

const Ornament: React.FC = () => {
  const questionMarkPositions: QuestionMarkPosition[] = [
    { id: 1, top: 5, left: 10, size: 45, opacity: 0.3, rotation: -25 },
    { id: 2, top: 8, left: 35, size: 28, opacity: 0.2, rotation: 45 },
    { id: 3, top: 12, left: 65, size: 85, opacity: 0.4, rotation: 15 },
    { id: 5, top: 25, left: 8, size: 65, opacity: 0.35, rotation: 30 },
    { id: 6, top: 35, left: 15, size: 22, opacity: 0.2, rotation: -15 },
    { id: 8, top: 30, left: 85, size: 50, opacity: 0.3, rotation: -35 },
  ];

  return (
    <div className="absolute w-full h-full left-0 top-0 overflow-hidden pointer-events-none">
      {questionMarkPositions.map((pos) => (
        <QuestionMarkImage key={pos.id} pos={pos} />
      ))}

      <FloatingQuestionMark
        top="18%"
        left="50%"
        delay="1s"
        duration="4s"
        size={24}
        opacity={0.15}
        rotation="rotate-12"
      />

      <FloatingQuestionMark
        top="78%"
        left="25%"
        delay="2.5s"
        duration="5s"
        size={35}
        opacity={0.18}
        rotation="-rotate-25"
      />
    </div>
  );
};

export default memo(Ornament);

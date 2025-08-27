"use client";
import React from "react";
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

const Ornament: React.FC = () => {
  const questionMarkPositions: QuestionMarkPosition[] = [
    { id: 1, top: 5, left: 10, size: 45, opacity: 0.3, rotation: -25 },
    { id: 2, top: 8, left: 35, size: 28, opacity: 0.2, rotation: 45 },
    { id: 3, top: 12, left: 65, size: 85, opacity: 0.4, rotation: 15 },

    { id: 5, top: 25, left: 8, size: 65, opacity: 0.35, rotation: 30 },
    { id: 6, top: 35, left: 15, size: 22, opacity: 0.2, rotation: -15 },
    { id: 8, top: 30, left: 85, size: 50, opacity: 0.3, rotation: -35 },
    { id: 9, top: 40, left: 92, size: 30, opacity: 0.2, rotation: 25 },

    { id: 11, top: 35, left: 25, size: 20, opacity: 0.15, rotation: 45 },
    { id: 12, top: 55, left: 75, size: 25, opacity: 0.18, rotation: -45 },

    { id: 13, top: 65, left: 12, size: 90, opacity: 0.45, rotation: 20 },
    { id: 14, top: 75, left: 40, size: 32, opacity: 0.25, rotation: -30 },
    { id: 15, top: 80, left: 70, size: 55, opacity: 0.35, rotation: 40 },

    { id: 17, top: 92, left: 20, size: 42, opacity: 0.3, rotation: 35 },
    { id: 18, top: 95, left: 60, size: 28, opacity: 0.2, rotation: -40 },

    { id: 19, top: 3, left: 3, size: 25, opacity: 0.18, rotation: 50 },
    { id: 20, top: 97, left: 97, size: 30, opacity: 0.22, rotation: -50 },
  ];

  return (
    <div className="absolute w-full h-full left-0 top-0 overflow-hidden pointer-events-none">
      {questionMarkPositions.map((pos: QuestionMarkPosition) => (
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
      ))}

      <div
        className="absolute animate-bounce"
        style={{
          top: "18%",
          left: "50%",
          animationDelay: "1s",
          animationDuration: "4s",
        }}
      >
        <Image
          src={QuestionMark}
          alt="Floating question mark"
          width={24}
          height={24}
          style={{
            opacity: 0.15,
            filter: "hue-rotate(320deg) saturate(0.8) brightness(1.1)",
          }}
          className="transform rotate-12"
        />
      </div>

      <div
        className="absolute animate-bounce"
        style={{
          top: "78%",
          left: "25%",
          animationDelay: "2.5s",
          animationDuration: "5s",
        }}
      >
        <Image
          src={QuestionMark}
          alt="Floating question mark"
          width={35}
          height={35}
          style={{
            opacity: 0.18,
            filter: "hue-rotate(320deg) saturate(0.8) brightness(1.1)",
          }}
          className="transform -rotate-25"
        />
      </div>
    </div>
  );
};

export default Ornament;

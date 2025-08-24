// components/GradientBackground.tsx

import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const GradientBackground = ({ className, children }: Props) => {
  return (
    <>
      <div className={`relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-primary-600"></div>
        <div
          className="absolute bottom-0 left-0 w-[2418px] h-[2418px] pointer-events-none bg-radial-kiri"
          style={{
            transform: "translate(-25%, 25%)",
          }}
        />
        <div
          className="absolute top-0 right-0 w-[2418px] h-[2418px] pointer-events-none bg-radial-kanan"
          style={{
            transform: "translate(25%, -25%)",
          }}
        />

        <div className="relative z-10 w-full h-full">{children}</div>
      </div>
    </>
  );
};

export default GradientBackground;

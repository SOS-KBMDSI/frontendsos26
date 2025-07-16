import React from "react";
import PatternImg from "@/assets/login/pattern.svg";

const Pattern = () => {
  return (
    <div
      className="w-screen h-16 absolute   bottom-0 bg-contain  bg-repeat-x bg-bottom"
      style={{
        backgroundImage: `url(${PatternImg.src})`,
      }}
    />
  );
};

export default Pattern;

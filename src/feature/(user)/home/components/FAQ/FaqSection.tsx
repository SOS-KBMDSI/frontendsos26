import React from "react";
import { faqData } from "../../data/faq";
import FaqList from "./FaqList";
import Ornament from "./Ornament";

const FaqSection = () => {
  return (
    <div className="h-fit">
      <div className="w-full content-container h-full relative  bg-red-800 overflow-hidden">
        <div className="w-[2418.07px] h-[2416.17px] left-[1642.21px] top-[1514.48px] absolute origin-top-left rotate-[145.14deg] bg-[radial-gradient(ellipse_45.15%_45.21%_at_42.87%_63.48%,_#8C021E_0%,_rgba(234,_91,_67,_0.32)_100%)] rounded-full blur-3xl" />
        <div className="w-[1886.76px] h-[1885.28px] left-[3110.80px] top-[200.88px] absolute origin-top-left rotate-[145.14deg] bg-[radial-gradient(ellipse_44.88%_44.88%_at_50.29%_57.43%,_#7D021A_0%,_rgba(125,_2,_26,_0.34)_100%)] rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto relative my-40 flex justify-center items-center flex-col  space-y-4  md:p-0 h-full z-40 ">
          <h4 className="text-5xl font-bold mb-14 text-secondary-200 text-center">
            FAQ
          </h4>
          {faqData.map((faq) => (
            <FaqList key={faq.id} faq={faq} />
          ))}
        </div>
        <Ornament />
      </div>
    </div>
  );
};

export default FaqSection;

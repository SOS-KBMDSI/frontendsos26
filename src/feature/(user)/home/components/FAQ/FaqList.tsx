"use client";
import { useState } from "react";
import { Button } from "@/shared/components/ui/Button";
import { FAQ } from "../../data/faq";

const FaqList = ({ faq }: { faq: FAQ }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFaq = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full border-1 rounded-xl border-white">
      <div
        className="flex items-center justify-between px-3 py-3 md:px-4 md:py-4 cursor-pointer"
        onClick={toggleFaq}
      >
        <h4 className="text-white text-sm md:text-base">{faq.question}</h4>
        <Button
          arrow={isOpen ? "top" : "bottom"}
          variant={"transparent"}
          className="text-primary-500 bg-white w-6 h-6 md:w-10 md:h-10 aspect-square rounded-full transition-transform duration-200"
        />
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-3 md:px-4 pb-3 md:pb-4 border-t border-white/20">
          <p className="text-white/80 mt-2 md:mt-3 text-sm md:text-base leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FaqList;

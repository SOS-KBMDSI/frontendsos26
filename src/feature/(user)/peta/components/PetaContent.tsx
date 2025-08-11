import Image, { StaticImageData } from "next/image";
import React from "react";
import { motion } from "framer-motion";
import PhotoFrame from "@/assets/peta/photo-frame.svg";
import Ship from "@/assets/peta/ship.svg";
import Map from "@/assets/peta/map.svg";

interface PetaContentProps {
  mode?: "left" | "right";
  title: string;
  description: string;
  image: StaticImageData;
  isDecoration?: boolean;
}

const PetaContent = ({
  mode = "left",
  title,
  description,
  image,
  isDecoration = false,
}: PetaContentProps) => {
  return (
    <div
      className={`w-full flex ${
        mode === "left" ? "mr-auto" : "ml-auto"
      } relative`}
    >
      <div className="w-2/4 flex gap-x-12 items-center order-2 relative z-10">
        <div
          className={`flex flex-col w-1/2 gap-y-5 ${
            mode === "left" ? "text-left" : "order-2 text-right"
          }`}
        >
          <motion.h3
            className="text-5xl text-primary-500 font-semibold leading-[48px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {title}
          </motion.h3>
          <motion.p
            className="text-xl font-normal leading-[32px] text-default-dark"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {description}
          </motion.p>
        </div>
        <motion.div
          className="w-1/2 flex justify-end items-end relative"
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 9 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="relative">
            <Image
              src={PhotoFrame}
              width={400}
              height={400}
              className="w-full h-auto"
              alt="Frame Rangkaian Photo"
            />
            <div className="absolute inset-0 flex items-center justify-center px-[4.4rem] py-[3.7rem] mb-1">
              <Image
                src={image}
                width={300}
                height={300}
                className="w-full h-full object-cover"
                alt="Rangkaian Photo"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {isDecoration && (
        <motion.div
          className={`${
            mode == "left" ? "order-2 justify-end" : "order-1 justify-start"
          } w-2/4 flex relative z-10`}
          initial={{ opacity: 0, x: mode === "left" ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {mode == "left" ? (
            <Image
              src={Map}
              width={300}
              height={300}
              className="w-2/3 h-full object-cover"
              alt="Map Decoration"
            />
          ) : (
            <Image
              src={Ship}
              width={300}
              height={300}
              className="w-2/3 h-full object-cover"
              alt="Ship Decoration"
            />
          )}
        </motion.div>
      )}
    </div>
  );
};

export default PetaContent;

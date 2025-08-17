import Image, { StaticImageData } from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Ship from "@/assets/peta/ship.svg";
import Map from "@/assets/peta/map.svg";
import PhotoWithFrame from "./PhotoWithFrame";

interface PetaContentProps {
  mode?: "left" | "right";
  title: string;
  description: string;
  imageTop: StaticImageData;
  altTop: string;
  imageBottom?: StaticImageData;
  altBottom?: string;
  isDecoration?: boolean;
  rotate?: number;
}

const PetaContent = ({
  mode = "left",
  title,
  description,
  imageTop,
  altTop,
  imageBottom,
  altBottom,
  rotate = 7,
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
          className="w-1/2 relative min-h-[450px]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {imageBottom && altBottom && (
            <div
              className={`absolute top-[40%] w-[85%] z-10 ${
                mode === "left" ? "left-38" : "left-0"
              }`}
              style={{
                rotate: mode === "left" ? `15deg` : `-15deg`,
              }}
            >
              <PhotoWithFrame image={imageBottom} alt={altBottom} />
            </div>
          )}

          <div
            className={`absolute w-[90%] z-0 top-0  ${
              mode === "left" ? "right-0 " : "right-40"
            }`}
            style={{ rotate: `${rotate}deg` }}
          >
            <PhotoWithFrame image={imageTop} alt={altTop} />
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

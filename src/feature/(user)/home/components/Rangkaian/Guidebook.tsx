"use client";
import { Button } from "@/shared/components/ui/Button";
import { FileDownIcon } from "lucide-react";
import MaskotSOS from "@/assets/user/maskot-sos-basic.svg";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const MotionImage = motion(Image);
const MotionButton = motion(Button);

const Guidebook = () => {
  const [isCardHovered, setIsCardHovered] = useState(false);

  const handleDownload = () => {
    window.open(
      "https://drive.google.com/file/d/1PT3LB-lS2XSwt73y-VXolrVd2H8e1M_R/view?usp=drive_link",
      "_blank",
    );
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="content-container flex flex-col md:flex-row md:justify-center items-center"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div
        className="md:max-w-3/5 w-full h-fit rounded-xl shadow-lg overflow-hidden"
        variants={{
          hidden: { x: -50, opacity: 0 },
          visible: {
            x: 0,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 80,
              damping: 15,
            },
          },
        }}
        whileHover={{
          scale: 1.05,
          rotate: 3,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
          },
        }}
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(false)}
      >
        <div className="w-full bg-white h-3/4 space-y-2 md:px-10 px-4 py-4 md:py-7">
          <p className="text-center text-black mx-auto text-base lg:text-3xl md:w-4/5 font-bold">
            Biar Nggak Bingung, Yuk Unduh Buku Panduannya
          </p>
          <p className="text-xs text-justify lg:text-base md:text-center text-[#383023]">
            Buku Panduan SOS & STF berisi informasi dan panduan bagi mahasiswa
            baru untuk lebih mengenal Departemen Sistem Informasi. Buku panduan
            ini berisi informasi seputar ospek, tata tertib, dan pelanggaran.
            Yuk, segera unduh Buku Panduan SOS & STF!
          </p>
        </div>
        <div className="w-full md:px-10 px-4 py-5 flex items-center justify-start h-[5rem] bg-gradient-to-b from-primary-500 rounded-b-xl to-primary-700">
          <MotionButton
            onClick={handleDownload}
            className="md:px-10 mx-auto md:mx-0 text-sm cursor-pointer flex font-medium text-primary-500 hover:text-white items-center justify-center space-x-2 rounded-lg h-full w-full md:w-fit bg-white focus:text-white hover:border-none focus:border-none hover:bg-primary-500 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <FileDownIcon className="w-4 h-4" />
            <span className="text-base">Unduh Sekarang</span>
          </MotionButton>
        </div>
      </motion.div>

      <motion.div
        variants={{
          hidden: { x: 50, opacity: 0, scale: 0.8 },
          visible: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: { type: "spring" as const, stiffness: 50, damping: 12 },
          },
        }}
      >
        <MotionImage
          className="max-w-[15rem] lg:max-w-[20rem] md:-ml-6 mt-10 md:mt-0 scale-x-[-1]"
          alt="maskotSOS"
          src={MaskotSOS}
          animate={isCardHovered ? { y: [0, -15, 0] } : { y: 0 }}
          transition={{
            duration: 1.5,
            repeat: isCardHovered ? Infinity : 0,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Guidebook;

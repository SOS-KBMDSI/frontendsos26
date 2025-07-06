import Frame1 from "@/assets/coming-soon/frame-bawah.svg";
import Frame2 from "@/assets/coming-soon/frame-atas.svg";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

const FramePhoto = () => {
  const floatingVariants2: Variants = {
    animate: {
      y: [3, -3, 3],
      x: [1, -1, 1],
      rotate: [0.5, -0.5, 0.5],
      transition: {
        duration: 2.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
        delay: 1,
      },
    },
  };

  return (
    <div className="absolute w-full h-full">
      <div className="relative w-full h-full">
        <motion.div
          variants={floatingVariants2}
          animate="animate"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute -bottom-4 scale-150 md:scale-100 md:bottom-[-23%] md:left-[-5%]"
        >
          <Image
            className="rotate-12 backface-hidden w-[200vh] h-auto"
            src={Frame1}
            alt="frame"
            width={1920}
            height={1080}
            style={{ border: "none" }}
          />
        </motion.div>

        <motion.div
          variants={floatingVariants2}
          animate="animate"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute md:top-[-30%] xl:top-[-50%] lg:top-[-35%] -top-8 right-[-10%]"
        >
          <Image
            className="rotate-12 backface-hidden scale-150 md:scale-100 w-[220vh]"
            src={Frame2}
            alt="frame"
            style={{ border: "none" }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default FramePhoto;

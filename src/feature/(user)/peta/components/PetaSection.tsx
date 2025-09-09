"use client";
import React from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "../../akademik/components/SectionTitle";
import PetaContent from "./PetaContent";
import CaturPattern from "@/assets/user/pembatas.svg";
import Image from "next/image";
import PetaCountDown from "./PetaCountDown";
import { useAuthContext } from "@/shared/hooks/useAuthContext";

const PetaSection = () => {
  const { user } = useAuthContext();
  return (
    <section className="bg-login relative overflow-hidden">
      <div className="content-container py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionTitle lineColor="bg-primary-500">Rangkaian</SectionTitle>
        </motion.div>

        {user && <PetaCountDown />}

        <PetaContent />
      </div>
      <div>
        <Image
          src={CaturPattern}
          alt="Footer Pattern"
          className="w-full h-18 object-cover md:h-auto"
          aria-hidden="true"
        />
      </div>
    </section>
  );
};

export default PetaSection;

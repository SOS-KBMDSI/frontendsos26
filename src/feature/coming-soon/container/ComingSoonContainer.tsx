"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import FramePhoto from "../components/FramePhoto";
import Hero from "../components/Hero";
import { ComingSoonLoader } from "../components/ComingSoonLoader";
import { useQuis } from "../hooks/useQuis";

export default function ComingSoonContainer() {
  const [loading, setLoading] = useState(true);
  const quizChallenges = [
    {
      question: "Synergy of Symphony disingkat jadi?",
      answer: ["S", "O", "S"],
    },
    { question: "Singkatan Departemen Kita:", answer: ["S", "I"] },
  ];
  const { quizState, quizActions } = useQuis(quizChallenges);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="h-screen w-screen bg-login relative overflow-hidden">
      <AnimatePresence mode="wait">
        {loading ? (
          <ComingSoonLoader />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75 }}
          >
            <FramePhoto />
            <Hero quizState={quizState} quizActions={quizActions} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

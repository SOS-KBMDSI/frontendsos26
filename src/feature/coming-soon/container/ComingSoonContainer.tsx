"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import FramePhoto from "../components/FramePhoto";
import Hero from "../components/Hero";
import { ComingSoonLoader } from "../components/ComingSoonLoader";

export default function ComingSoonContainer() {
  const [loading, setLoading] = useState(true);

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
            <Hero />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

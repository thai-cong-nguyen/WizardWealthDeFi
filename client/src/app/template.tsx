"use client";

import { motion } from "framer-motion";
// hooks
import useScrollProgress from "@/hooks/useScrollProgress";
import React, { useEffect } from "react";

// variants
const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Template = ({ children }: { children: React.ReactNode }) => {
  const completion = useScrollProgress();
  return (
    <>
      <motion.main
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ type: "linear", delay: 0.2, duration: 0.4 }}
      >
        {children}
      </motion.main>
      {/* completion bar */}
      <span
        style={{ transform: `translateY(${completion - 100}%)` }}
        className="fixed z-50 bg-primary w-1 top-0 right-0 bottom-0 transition-all duration-600"
      ></span>
    </>
  );
};

export default Template;

"use client";

import { motion } from "framer-motion";

export default function Template({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "tween",
        ease: "easeOut", 
        duration: 0.75, 
        delay: 0.2 
      }}
      className="w-full min-h-screen"
    >
      {children}
    </motion.div>
  );
}

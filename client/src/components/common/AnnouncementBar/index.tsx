"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { theme } from "@/config/theme";
import { X } from "lucide-react";

export default function AnnouncementBar() {
  const { enabled, messages, rotationInterval } = theme.announcement;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!enabled || messages.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, rotationInterval);

    return () => clearInterval(timer);
  }, [enabled, messages, rotationInterval]);

  if (!enabled || !isVisible) return null;

  return (
    <div className="relative w-full overflow-hidden bg-[#D4AF37] px-8 py-2 text-center text-xs font-semibold tracking-wider text-white uppercase z-50 select-none shadow-sm flex items-center justify-center min-h-[32px]">
      <div className="relative flex items-center justify-center w-full max-w-4xl h-4 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute text-center select-text w-full truncate leading-none"
          >
            {messages[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors duration-150"
        aria-label="Dismiss announcement"
      >
        <X size={14} />
      </button>
    </div>
  );
}

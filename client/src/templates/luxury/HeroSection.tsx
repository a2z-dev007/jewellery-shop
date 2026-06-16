"use client";

import { useState, useRef, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { useUIStore } from "@/store/ui.store";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  const { toggleAppointmentModal } = useUIStore();

  const heroVideos = [
    "/videos/main-hero.mp4",
    "/videos/main-hero-2.mp4",
    "/videos/main-hero-3.mp4",
  ];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoVisible, setIsVideoVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnded = () => {
    setIsVideoVisible(false);
  };

  const handleTransitionComplete = () => {
    if (!isVideoVisible) {
      setCurrentVideoIndex((prev) => (prev + 1) % heroVideos.length);
      setIsVideoVisible(true);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch((err) => {
        console.log("Autoplay failed or was interrupted:", err);
      });
    }
  }, [currentVideoIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative isolate w-full h-screen overflow-hidden flex items-center justify-center bg-black">
      {/* Background Video */}
      <motion.video
        ref={videoRef}
        src={heroVideos[currentVideoIndex]}
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: isVideoVisible ? 1 : 1.08, opacity: isVideoVisible ? 0.72 : 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        onAnimationComplete={handleTransitionComplete}
        className="absolute inset-0 z-0 h-full w-full object-cover"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleVideoEnded}
        poster="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1920&auto=format&fit=crop"
      />

      {/* Gold & Dark Radial Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-black/45 to-black/20" />
      <div className="absolute inset-0 z-0 bg-radial-gradient-to-c from-transparent to-black/80" />

      {/* Hero Content */}
      <div className="max-w-4xl mx-auto px-6 text-center text-white z-10 select-none">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Eyebrow */}
          <motion.p
            variants={itemVariants}
            className="text-[#D4AF37] font-sans text-xs md:text-sm tracking-[0.35em] uppercase font-semibold"
          >
            Crafted with Love Since 1985
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-4xl sm:text-6xl md:text-7xl tracking-wide leading-[1.15]"
          >
            Jewellery That Tells <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5E6C8] via-[#D4AF37] to-[#B8960C] italic">
              Your Story
            </span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto font-sans text-sm md:text-base text-white/70 leading-relaxed font-light tracking-wide"
          >
            Explore our curated collections of pure gold, pristine diamonds, and majestic bridal treasures. Crafted for heritage, made for forever.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="/products"
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#F5E6C8] via-[#D4AF37] to-[#B8960C] hover:from-[#EADAB8] hover:via-[#B8960C] hover:to-[#967508] text-black text-xs font-semibold uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all duration-300 rounded-[2px] shadow-lg flex items-center justify-center"
            >
              Explore Collections
            </a>
            <button
              onClick={() => toggleAppointmentModal(true)}
              className="w-full sm:w-auto px-8 py-3.5 border border-white text-white text-xs font-semibold uppercase tracking-widest hover:bg-white hover:text-black hover:scale-[1.02] active:scale-95 transition-all duration-300 rounded-[2px]"
            >
              Book Consultation
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-50 animate-bounce cursor-pointer">
        <span className="text-[10px] text-white tracking-[0.3em] font-sans uppercase">Scroll</span>
        <ArrowDown size={14} className="text-white" />
      </div>
    </section>
  );
}

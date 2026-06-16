"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";

const collectionTiles = [
  {
    id: "bridal",
    name: "The Royal Bridal Couture",
    desc: "Exquisite jadau, kundan, and diamond sets hand-crafted for the modern Indian bride.",
    image: "https://images.unsplash.com/photo-1549417229-aa67d3263c09?q=80&w=800&auto=format&fit=crop",
    video: "/videos/hero-3.mp4",
    href: "/products?category=bridal",
  },
  {
    id: "gold",
    name: "Heritage Gold Classics",
    desc: "Traditional necklaces, bangles, and temple sets designed in pure 22 Karat gold.",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=800&auto=format&fit=crop",
    video: "/videos/hero-2.mp4",
    href: "/products?category=gold",
  },
  {
    id: "diamond",
    name: "Modern Solitaires & Sets",
    desc: "IGI-certified diamond necklaces, earrings, and bands set in platinum and white gold.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
    video: "/videos/hero-1.mp4",
    href: "/products?category=diamond",
  },
  {
    id: "silver",
    name: "Artisanal Silver Creations",
    desc: "Minimalist 925 sterling silver bracelets, rings, and anklets for contemporary wear.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
    video: "/videos/hero-4.mp4",
    href: "/products?category=silver",
  },
];

function IntroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0px", "-80px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="sticky top-0 h-screen w-full overflow-hidden bg-black flex flex-col items-center justify-center text-white z-0"
    >
      {/* Background Video with parallax */}
      <motion.video
        src="/videos/main-hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover scale-110"
        style={{ y: videoY }}
      />
      {/* Dark overlays for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/30 z-10" />
      <div className="absolute inset-0 bg-radial-gradient-to-c from-transparent to-black/75 z-10" />

      {/* Intro Text */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-20 text-center space-y-6 max-w-3xl px-6 select-none"
      >
        <span className="text-[#D4AF37] text-xs md:text-sm tracking-[0.35em] uppercase font-bold block">
          Showcase
        </span>
        <h1 className="font-serif text-5xl md:text-7xl font-light tracking-wide leading-tight">
          Our Legendary <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5E6C8] via-[#D4AF37] to-[#B8960C] italic">
            Collections
          </span>
        </h1>
        <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto my-6" />
        <p className="text-sm md:text-base text-white/60 leading-relaxed font-light max-w-xl mx-auto">
          Explore our portfolios. Generational gold, conflict-free certified diamonds, and majestic bridal treasures. Each set is handcrafted to tell your story.
        </p>
      </motion.div>

      {/* Down Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-50 animate-bounce cursor-pointer z-20"
      >
        <span className="text-[10px] text-white/50 tracking-[0.3em] font-sans uppercase">Scroll Down</span>
        <ArrowDown size={14} className="text-[#D4AF37]" />
      </motion.div>
    </section>
  );
}

function CollectionSection({ tile, index }: { tile: typeof collectionTiles[0]; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Background video parallax translation
  const videoY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  // Content parallax translation and opacity
  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], ["80px", "0px", "-80px"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center"
      style={{ zIndex: index + 1 }}
    >
      {/* Background Video with parallax */}
      <motion.video
        src={tile.video}
        poster={tile.image}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover scale-110"
        style={{ y: videoY }}
      />
      {/* Dark overlays for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/30 z-10" />
      <div className="absolute inset-0 bg-radial-gradient-to-c from-transparent to-black/75 z-10" />

      {/* Floating Category Info */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 max-w-4xl mx-auto px-6 text-center text-white space-y-6 select-none"
      >
        <span className="text-[#D4AF37] font-sans text-xs md:text-sm tracking-[0.35em] uppercase font-bold">
          {tile.id} collection
        </span>
        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl tracking-wide leading-tight">
          {tile.name}
        </h2>
        <p className="max-w-2xl mx-auto font-sans text-sm md:text-base text-white/70 leading-relaxed font-light tracking-wide">
          {tile.desc}
        </p>
        <div className="pt-6">
          <Link
            id={`explore-collection-${tile.id}`}
            href={tile.href}
            className="inline-flex items-center space-x-3 bg-[#D4AF37] hover:bg-[#B8960C] text-black px-8 py-4 text-xs font-semibold uppercase tracking-widest transition-all duration-300 rounded-[2px] shadow-lg hover:scale-[1.02] active:scale-95"
          >
            <span>Explore Collection</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default function CollectionsPage() {
  return (
    <main className="relative bg-black min-h-screen">
      <IntroSection />
      {collectionTiles.map((tile, index) => (
        <CollectionSection key={tile.id} tile={tile} index={index} />
      ))}
    </main>
  );
}

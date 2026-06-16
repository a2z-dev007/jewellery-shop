"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Collection {
  id: string;
  name: string;
  count: string;
  image: string;
  video: string;
  href: string;
  gridSpan?: string;
}

const collections: Collection[] = [
  {
    id: "gold",
    name: "The Gold Heritage",
    count: "120+ Items",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=800&auto=format&fit=crop",
    video: "/videos/hero-2.mp4",
    href: "/products?category=gold",
    gridSpan: "col-span-1 md:col-span-2 md:row-span-1",
  },
  {
    id: "diamond",
    name: "Diamond Solitaires",
    count: "85+ Items",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
    video: "/videos/hero-3.mp4",
    href: "/products?category=diamond",
  },
  {
    id: "bridal",
    name: "Bridal Couture",
    count: "50+ Sets",
    image: "https://images.unsplash.com/photo-1549417229-aa67d3263c09?q=80&w=800&auto=format&fit=crop",
    video: "/videos/hero-4.mp4",
    href: "/products?category=bridal",
  },
  {
    id: "silver",
    name: "Silver Artisanal",
    count: "90+ Items",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
    video: "/videos/hero-1.mp4",
    href: "/products?category=silver",
    gridSpan: "col-span-1 md:col-span-2",
  },
];

export default function CollectionShowcase() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-[#FAFAF8] py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-[#D4AF37] font-sans text-xs tracking-[0.3em] uppercase font-bold">Curated Selections</span>
          <h2 className="font-serif text-3xl md:text-5xl text-black font-light leading-tight">Explore Our Masterpieces</h2>
          <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mt-4" />
        </div>

        {/* 2x2 Grid with Variable Column Spans */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {collections.map((col) => (
            <motion.div
              key={col.id}
              variants={cardVariants}
              className={`relative overflow-hidden group h-[380px] border border-[#E8E0D0]/30 shadow-md rounded-[2px] ${col.gridSpan || ""}`}
            >
              {/* Cover Video */}
              <video
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={col.image}
              >
                <source src={col.video} type="video/mp4" />
              </video>

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

              {/* Text Information */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <span className="text-[#D4AF37] font-sans text-xs tracking-widest font-semibold uppercase mb-1">
                  {col.count}
                </span>
                <h3 className="font-serif text-2xl tracking-wide mb-4 group-hover:text-[#F5E6C8] transition-colors">
                  {col.name}
                </h3>
                
                {/* CTA Link reveal on hover */}
                <Link
                  href={col.href}
                  className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-white/80 group-hover:text-[#D4AF37] transition-all duration-300"
                >
                  <span>Discover Now</span>
                  <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const collectionTiles = [
  {
    id: "bridal",
    name: "The Royal Bridal Couture",
    desc: "Exquisite jadau, kundan, and diamond sets hand-crafted for the modern Indian bride.",
    image: "https://images.unsplash.com/photo-1549417229-aa67d3263c09?q=80&w=800&auto=format&fit=crop",
    video: "/videos/hero-4.mp4",
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
    video: "/videos/hero-3.mp4",
    href: "/products?category=diamond",
  },
  {
    id: "silver",
    name: "Artisanal Silver Creations",
    desc: "Minimalist 925 sterling silver bracelets, rings, and anklets for contemporary wear.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
    video: "/videos/hero-1.mp4",
    href: "/products?category=silver",
  },
];

export default function CollectionsPage() {
  return (
    <div className="pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto font-sans">
      <div className="text-center mb-16 space-y-3">
        <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-bold">Showcase</span>
        <h1 className="font-serif text-4xl md:text-5xl text-black font-light leading-tight">Our Legendary Collections</h1>
        <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {collectionTiles.map((tile) => (
          <div
            key={tile.id}
            className="group relative overflow-hidden h-[450px] border border-[#E8E0D0]/30 shadow-lg rounded-[2px]"
          >
            <video
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={tile.image}
            >
              <source src={tile.video} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end text-white space-y-4">
              <h3 className="font-serif text-2xl md:text-3xl tracking-wide group-hover:text-[#F5E6C8] transition-colors">
                {tile.name}
              </h3>
              <p className="text-xs text-white/70 max-w-sm font-light leading-relaxed">
                {tile.desc}
              </p>
              <div className="pt-2">
                <Link
                  href={tile.href}
                  className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-[#D4AF37] group-hover:text-white transition-all duration-300"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

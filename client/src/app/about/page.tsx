"use client";

import { CheckCircle, Eye, ShieldCheck, HeartHandshake } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 font-sans text-black">
      {/* Brand Hero */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 text-center space-y-6">
        <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-bold">Our Heritage</span>
        <h1 className="font-serif text-4xl md:text-6xl font-light leading-tight">Crafting Memories Since 1985</h1>
        <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mt-4" />
        <p className="text-sm md:text-base text-black/60 leading-relaxed font-light max-w-2xl mx-auto">
          Founded in Lucknow, Aura Jewellers began with a singular promise: to craft heritage-quality gold and certified diamonds that honor life's most precious occasions. For over four decades, our family-owned business has stood as a beacon of trust, purity, and exceptional design.
        </p>
      </section>

      {/* Craftsmanship Section */}
      <section className="bg-[#111111] text-white py-20 px-4 md:px-8 mt-20 border-y border-[#D4AF37]/25">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-bold">Uncompromising Art</span>
            <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide">The Hands Behind the Heritage</h2>
            <p className="text-white/70 text-xs md:text-sm font-light leading-relaxed">
              Every curve, filigree pattern, and stone setting in our showroom is handmade by generational artisans. We preserve the ancient techniques of Jadau, Meenakari, and hand-embossed gold engraving, blending them with state-of-the-art diamond laser settings.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-3">
                <CheckCircle size={16} className="text-[#D4AF37] shrink-0" />
                <span className="text-xs uppercase tracking-wider font-semibold">Generational Karigars (Artisans)</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle size={16} className="text-[#D4AF37] shrink-0" />
                <span className="text-xs uppercase tracking-wider font-semibold">Conflict-free Diamond Sourcing</span>
              </div>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] border border-white/10 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=800&auto=format&fit=crop"
              alt="Artisan workspace"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Certifications and Pillars */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="text-center mb-16 space-y-2">
          <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-bold font-sans">Guarantees</span>
          <h2 className="font-serif text-3xl font-light">Pillars of Aura Trust</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-[#E8E0D0] p-8 space-y-4 rounded-[2px] shadow-sm">
            <ShieldCheck size={32} className="text-[#D4AF37]" />
            <h3 className="font-serif text-lg font-semibold uppercase tracking-wider">BIS Hallmarked Gold</h3>
            <p className="text-xs text-black/60 leading-relaxed font-light">
              Every single gram of gold leaving our boutique is stamped with the Bureau of Indian Standards (BIS) hallmark, certifying its exact purity value (22K/18K/14K).
            </p>
          </div>

          <div className="border border-[#E8E0D0] p-8 space-y-4 rounded-[2px] shadow-sm">
            <Eye size={32} className="text-[#D4AF37]" />
            <h3 className="font-serif text-lg font-semibold uppercase tracking-wider">IGI & GIA Solitaires</h3>
            <p className="text-xs text-black/60 leading-relaxed font-light">
              Our diamonds carry certified grading indices from the International Gemological Institute (IGI) and Gemological Institute of America (GIA), ensuring complete transparency.
            </p>
          </div>

          <div className="border border-[#E8E0D0] p-8 space-y-4 rounded-[2px] shadow-sm">
            <HeartHandshake size={32} className="text-[#D4AF37]" />
            <h3 className="font-serif text-lg font-semibold uppercase tracking-wider">Lifetime Buyback</h3>
            <p className="text-xs text-black/60 leading-relaxed font-light">
              We stand by our work. We offer a transparent, lifetime buyback policy on all our jewellery pieces based on current gold rates and certified diamond values.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { theme } from "@/config/theme";
import { useUIStore } from "@/store/ui.store";
import { useCartStore } from "@/store/cart.store";
import HeroSection from "./HeroSection";
import CollectionShowcase from "./CollectionShowcase";
import {
  Award,
  RotateCcw,
  Gem,
  Truck,
  ArrowRight,
  TrendingUp,
  MessageSquare,
  Star,
  Calendar,
  CheckCircle,
  Heart,
} from "lucide-react";
import { useWishlistStore } from "@/store/wishlist.store";
import { useMemo, useState } from "react";

// Mock Products
const featuredProducts = [
  {
    id: "fp1",
    name: "Imperial Bridal Gold Choker Necklace",
    price: 185000,
    weight: 24.5,
    purity: "22K Gold",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "fp2",
    name: "Classic Diamond Eternity Ring",
    price: 98000,
    weight: 4.2,
    purity: "18K Diamond",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "fp3",
    name: "Heritage Jadau Gold Jhumka Earrings",
    price: 135000,
    weight: 18.0,
    purity: "22K Gold",
    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "fp4",
    name: "Artisanal Silver Floral Bracelet",
    price: 15500,
    weight: 15.5,
    purity: "925 Silver",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop",
  },
];

// Mock Testimonials
const testimonials = [
  {
    name: "Anjali Sharma",
    city: "Delhi",
    occasion: "Bridal Suite, 2025",
    quote: "Aura Jewellers crafted my dream bridal choker. The design is breathtaking, and the detailing in the gold work is sheer perfection.",
  },
  {
    name: "Vikram Mehta",
    city: "Mumbai",
    occasion: "Anniversary Gift, 2026",
    quote: "The diamond solitaire ring exceeded my expectations. Certified clarity and stellar customer service made it a seamless purchase.",
  },
];

const goldRate = { 22: 7240, 18: 5920, 14: 4610 };

export default function HomePage() {
  const { toggleAppointmentModal } = useUIStore();
  const addToCart = useCartStore((state) => state.addToCart);
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  // Add mock interactive state for gold rate calculator on landing page
  const [calcWeight, setCalcWeight] = useState("10");
  const [calcPurity, setCalcPurity] = useState("22");

  const calcResult = useMemo(() => {
    const rate = goldRate[calcPurity as unknown as 22 | 18 | 14] || 7240;
    const weightVal = parseFloat(calcWeight) || 0;
    const baseValue = rate * weightVal;
    const makingCharges = baseValue * 0.12; // 12% making charges
    const tax = (baseValue + makingCharges) * 0.03; // 3% GST
    return Math.round(baseValue + makingCharges + tax);
  }, [calcWeight, calcPurity]);

  return (
    <div className="w-full bg-[#FAFAF8] overflow-hidden">
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. ANNOUNCEMENT STRIP */}
      <section className="bg-[#111111] border-y border-[#D4AF37]/20 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center space-x-4 justify-center">
            <Award className="text-[#D4AF37]" size={28} />
            <div className="text-left">
              <h4 className="text-white text-xs font-semibold tracking-wider uppercase">BIS Hallmarked</h4>
              <p className="text-[10px] text-white/50">100% Certified Purity Guaranteed</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 justify-center">
            <RotateCcw className="text-[#D4AF37]" size={28} />
            <div className="text-left">
              <h4 className="text-white text-xs font-semibold tracking-wider uppercase">30-Day Returns</h4>
              <p className="text-[10px] text-white/50">Hassle-Free Exchange & Return</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 justify-center">
            <Gem className="text-[#D4AF37]" size={28} />
            <div className="text-left">
              <h4 className="text-white text-xs font-semibold tracking-wider uppercase">Genuine Stones</h4>
              <p className="text-[10px] text-white/50">IGI/GIA Lab Certified Diamonds</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 justify-center">
            <Truck className="text-[#D4AF37]" size={28} />
            <div className="text-left">
              <h4 className="text-white text-xs font-semibold tracking-wider uppercase">Complimentary Shipping</h4>
              <p className="text-[10px] text-white/50">Insured Delivery on Orders ₹50k+</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COLLECTION SHOWCASE */}
      <CollectionShowcase />

      {/* 4. LIVE GOLD RATE & CALCULATOR STRIP */}
      <section className="py-20 bg-[#111111] text-white px-4 md:px-8 border-y border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Gold rate display */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[#D4AF37] font-sans text-xs tracking-[0.3em] uppercase font-bold">Real-time Rates</span>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">Live Gold Rate Today</h2>
            <p className="text-white/60 text-sm font-light">
              Gold rates are updated regularly. Invest with transparent, real-time market valuations.
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/5 p-4 rounded-[2px] border border-white/10 text-center">
                <span className="text-[10px] text-white/50 uppercase tracking-widest font-sans">22K Gold</span>
                <p className="text-lg md:text-xl font-semibold text-[#D4AF37] mt-1">₹{goldRate[22]}/g</p>
              </div>
              <div className="bg-white/5 p-4 rounded-[2px] border border-white/10 text-center">
                <span className="text-[10px] text-white/50 uppercase tracking-widest font-sans">18K Gold</span>
                <p className="text-lg md:text-xl font-semibold text-[#D4AF37] mt-1">₹{goldRate[18]}/g</p>
              </div>
              <div className="bg-white/5 p-4 rounded-[2px] border border-white/10 text-center">
                <span className="text-[10px] text-white/50 uppercase tracking-widest font-sans">14K Gold</span>
                <p className="text-lg md:text-xl font-semibold text-[#D4AF37] mt-1">₹{goldRate[14]}/g</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-xs text-white/40">
              <TrendingUp size={12} className="text-green-500" />
              <span>+0.8% rise since yesterday. Last updated: 10 mins ago.</span>
            </div>
          </div>

          {/* Calculator widget */}
          <div className="lg:col-span-7 bg-[#1c1c1c] border border-[#D4AF37]/30 p-8 rounded-[4px] space-y-6">
            <h3 className="font-serif text-xl text-[#D4AF37] tracking-wider uppercase font-semibold">Gold Value Estimator</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-white/70 uppercase tracking-wider font-semibold">Weight (Grams)</label>
                <input
                  type="number"
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(e.target.value)}
                  placeholder="E.g., 10"
                  className="w-full bg-[#111111] border border-white/15 focus:border-[#D4AF37] outline-none text-white px-4 py-3 text-sm rounded-[2px]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/70 uppercase tracking-wider font-semibold">Purity</label>
                <select
                  value={calcPurity}
                  onChange={(e) => setCalcPurity(e.target.value)}
                  className="w-full bg-[#111111] border border-white/15 focus:border-[#D4AF37] outline-none text-white px-4 py-3 text-sm rounded-[2px]"
                >
                  <option value="22">22 Karat (Standard)</option>
                  <option value="18">18 Karat (Diamond Base)</option>
                  <option value="14">14 Karat (Modern)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-white/40 uppercase tracking-widest block font-sans">Estimated Valuation</span>
                <p className="text-2xl font-serif text-[#D4AF37] font-semibold mt-1">
                  ₹{calcResult?.toLocaleString() || "0"}
                </p>
                <span className="text-[9px] text-white/30 block mt-0.5">Includes ~12% making charges & 3% GST.</span>
              </div>
              <a
                href={`https://wa.me/${theme.contact.whatsapp}?text=Hi%20Aura%20Jewellers,%20I%20would%20like%20to%20get%20a%20valuation%20for%20a%20${calcWeight}g%20${calcPurity}K%20jewellery%20set.`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#D4AF37] text-black px-6 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#B8960C] transition-colors rounded-[2px]"
              >
                Inquire Rates
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED PRODUCTS */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="space-y-3">
              <span className="text-[#D4AF37] font-sans text-xs tracking-[0.3em] uppercase font-bold">Curated Treasures</span>
              <h2 className="font-serif text-3xl md:text-5xl text-black font-light leading-tight">Handcrafted Highlights</h2>
              <div className="w-16 h-[1px] bg-[#D4AF37]" />
            </div>
            <Link
              href="/products"
              className="mt-6 md:mt-0 inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-[#D4AF37] hover:text-black transition-colors"
            >
              <span>View Full Catalog</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((prod) => (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group bg-white border border-[#E8E0D0]/40 rounded-[2px] overflow-hidden shadow-sm flex flex-col justify-between"
              >
                {/* Photo container */}
                <div className="relative aspect-square overflow-hidden bg-gray-50 border-b border-gray-100">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-[#D4AF37] text-black text-[9px] uppercase tracking-wider font-semibold font-sans px-2.5 py-1 rounded-[2px]">
                    {prod.purity}
                  </span>
                  <button
                    onClick={() => toggleWishlist({
                      id: prod.id,
                      name: prod.name,
                      price: prod.price,
                      weight: prod.weight || 0, // Fallback if weight is missing in featuredProducts
                      purity: prod.purity,
                      image: prod.image,
                    })}
                    className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white text-black hover:text-[#D4AF37] rounded-full shadow-md transition-all duration-300 z-10"
                    aria-label={isInWishlist(prod.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                  >
                    <Heart
                      size={16}
                      className={`transition-colors duration-300 ${
                        isInWishlist(prod.id)
                          ? "fill-[#D4AF37] stroke-[#D4AF37]"
                          : "stroke-black hover:stroke-[#D4AF37]"
                      }`}
                    />
                  </button>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-serif text-base text-[#111111] line-clamp-2 leading-snug group-hover:text-[#D4AF37] transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-black/50 tracking-wider">Weight: {prod.weight}g</p>
                  </div>
                  <div className="pt-2 flex items-center justify-between border-t border-[#E8E0D0]/20">
                    <span className="font-serif text-base font-semibold text-black">
                      ₹{prod.price.toLocaleString()}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => addToCart({
                          id: prod.id,
                          name: prod.name,
                          price: prod.price,
                          weight: prod.weight,
                          purity: prod.purity,
                          image: prod.image,
                        })}
                        className="p-2 border border-black/10 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 text-black rounded-[2px] transition-colors"
                        aria-label="Add to cart"
                      >
                        Add to Cart
                      </button>
                      <a
                        href={`https://wa.me/${theme.contact.whatsapp}?text=Hi,%20I'm%20interested%20in%20inquiring%20about%20the%20${encodeURIComponent(prod.name)}.`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-[#25D366] text-white rounded-[2px] flex items-center justify-center hover:bg-[#20ba5a] transition-colors"
                        aria-label="Inquire on WhatsApp"
                      >
                        <MessageSquare size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BRIDAL JEWELLERY SECTION */}
      <section className="relative min-h-[500px] flex items-center bg-[#0d0d0d] text-white">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4 md:px-8 py-20">
          <div className="space-y-6">
            <span className="text-[#D4AF37] font-sans text-xs tracking-[0.3em] uppercase font-bold">The Royal Trousseau</span>
            <h2 className="font-serif text-4xl md:text-5xl tracking-wide leading-tight">Your Bridal Journey Starts Here</h2>
            <p className="text-white/70 text-sm font-light leading-relaxed max-w-lg">
              Adorn yourself with necklaces, chokers, and intricate set designs built by master artisans. Aura provides customized bridal concierge suites for complete trousseau designs.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center space-x-3">
                <CheckCircle size={16} className="text-[#D4AF37]" />
                <span className="text-xs uppercase tracking-wider font-semibold">Artisanal Customization</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle size={16} className="text-[#D4AF37]" />
                <span className="text-xs uppercase tracking-wider font-semibold">Insured Safe Logistics</span>
              </div>
            </div>
            <div className="pt-6">
              <button
                onClick={() => toggleAppointmentModal(true)}
                className="bg-[#D4AF37] hover:bg-[#B8960C] text-black px-8 py-4 text-xs font-semibold uppercase tracking-widest transition-colors rounded-[2px]"
              >
                Book Bridal Consultation
              </button>
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] border border-white/10 shadow-2xl">
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="https://images.unsplash.com/photo-1549417229-aa67d3263c09?q=80&w=800&auto=format&fit=crop"
            >
              <source src="/videos/hero-3.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-24 bg-[#FAFAF8] text-black px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-2">
            <span className="text-[#D4AF37] font-sans text-xs tracking-[0.3em] uppercase font-bold">Patron Stories</span>
            <h2 className="font-serif text-3xl md:text-4xl">Words of Trust</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white border border-[#E8E0D0]/40 p-8 text-left rounded-[2px] shadow-sm flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-[#D4AF37] stroke-none" />
                    ))}
                  </div>
                  <p className="text-sm font-light leading-relaxed text-black/80 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="pt-6 border-t border-gray-100 mt-6">
                  <h4 className="font-serif text-sm font-semibold">{t.name}</h4>
                  <p className="text-[10px] text-black/50 tracking-wider mt-0.5">{t.occasion} &bull; {t.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. APPOINTMENT CTA SECTION */}
      <section className="relative isolate overflow-hidden bg-[#0a0a0a] text-white py-20 px-4 text-center border-t border-[#D4AF37]/35">
        <video
          className="absolute inset-0 z-0 h-full w-full object-cover opacity-30"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop"
        >
          <source src="/videos/hero-4.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#1c1c1c]/95 via-black/80 to-[#0a0a0a]/95" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl md:text-5xl leading-tight">Visit Us. Experience The Legacy.</h2>
          <p className="font-sans text-sm md:text-base text-white/70 max-w-xl mx-auto font-light leading-relaxed">
            Schedule a private concierge session at our luxury Lucknow boutique for custom bridal designs and solitaire certifications.
          </p>
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => toggleAppointmentModal(true)}
              className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] text-black text-xs font-semibold uppercase tracking-widest hover:bg-[#B8960C] transition-all duration-300 rounded-[2px] flex items-center justify-center space-x-2"
            >
              <Calendar size={14} />
              <span>Schedule Viewing</span>
            </button>
            <a
              href={`https://wa.me/${theme.contact.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white text-xs font-semibold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 rounded-[2px] flex items-center justify-center space-x-2"
            >
              <MessageSquare size={14} />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

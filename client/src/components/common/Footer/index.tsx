"use client";

import Link from "next/link";
import { theme } from "@/config/theme";
import { Send, Phone, Mail, MapPin, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterInput = {
  email: string;
};

export default function Footer() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = (data: NewsletterInput) => {
    // Lead capture simulation
    console.log("Newsletter lead captured:", data);
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <footer className="bg-[#0f0f0f] border-t border-[#D4AF37]/10 text-white font-sans pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Column */}
        <div className="space-y-6">
          <Link href="/" className="flex flex-col select-none">
            <span className="font-serif text-2xl tracking-widest text-[#D4AF37] font-bold">
              {theme.brandName.toUpperCase()}
            </span>
            <span className="text-[9px] tracking-[0.3em] text-white/50 font-sans uppercase">
              {theme.tagline}
            </span>
          </Link>
          <p className="text-sm text-white/60 leading-relaxed font-light">
            Crafting premium, certified gold, diamonds, and bridal treasures since 1985. Experience absolute trust, precision, and unparalleled elegance.
          </p>
          <div className="flex space-x-4">
            <a href={theme.social.instagram} target="_blank" rel="noopener noreferrer" className="p-2 border border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all rounded-full" aria-label="Instagram">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a href={theme.social.facebook} target="_blank" rel="noopener noreferrer" className="p-2 border border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all rounded-full" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
              </svg>
            </a>
            <a href={theme.social.youtube} target="_blank" rel="noopener noreferrer" className="p-2 border border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all rounded-full" aria-label="Youtube">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="space-y-6">
          <h4 className="font-serif text-lg tracking-wider text-[#D4AF37] uppercase font-semibold">Exquisite Collections</h4>
          <ul className="space-y-3 text-sm text-white/60 font-light">
            <li><Link href="/products?category=gold" className="hover:text-[#D4AF37] transition-colors">Gold Jewellery</Link></li>
            <li><Link href="/products?category=diamond" className="hover:text-[#D4AF37] transition-colors">Diamond Collection</Link></li>
            <li><Link href="/products?category=bridal" className="hover:text-[#D4AF37] transition-colors">Bridal Couture</Link></li>
            <li><Link href="/calculators" className="hover:text-[#D4AF37] transition-colors">Calculator Hub</Link></li>
            <li><Link href="/blog" className="hover:text-[#D4AF37] transition-colors">Jewellery Care & Blogs</Link></li>
          </ul>
        </div>

        {/* Customer Support Column */}
        <div className="space-y-6">
          <h4 className="font-serif text-lg tracking-wider text-[#D4AF37] uppercase font-semibold">Customer Services</h4>
          <ul className="space-y-3 text-sm text-white/60 font-light">
            <li><Link href="/about" className="hover:text-[#D4AF37] transition-colors">Our Story & Trust</Link></li>
            <li><Link href="/contact" className="hover:text-[#D4AF37] transition-colors">Visit Our Showroom</Link></li>
            <li><Link href="/appointments" className="hover:text-[#D4AF37] transition-colors">Book Private Viewing</Link></li>
            <li><Link href="/faq" className="hover:text-[#D4AF37] transition-colors">FAQs & Certifications</Link></li>
          </ul>
        </div>

        {/* Newsletter / Contact Column */}
        <div className="space-y-6">
          <h4 className="font-serif text-lg tracking-wider text-[#D4AF37] uppercase font-semibold">Concierge Service</h4>
          <div className="space-y-3 text-sm text-white/60 font-light">
            <div className="flex items-start space-x-3">
              <MapPin size={16} className="text-[#D4AF37] mt-1 shrink-0" />
              <span>{theme.contact.address}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone size={16} className="text-[#D4AF37] shrink-0" />
              <span>{theme.contact.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail size={16} className="text-[#D4AF37] shrink-0" />
              <span>{theme.contact.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock size={16} className="text-[#D4AF37] shrink-0" />
              <span>Mon-Sun: {theme.hours.weekdays}</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <p className="text-xs text-white/50">Subscribe for gold rate alerts and releases:</p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex border border-white/20 rounded-[2px] overflow-hidden focus-within:border-[#D4AF37] transition-colors">
              <input
                type="email"
                placeholder="Enter email address"
                className="bg-transparent px-3 py-2 text-xs w-full text-white outline-none border-none"
                {...register("email")}
              />
              <button type="submit" className="bg-[#D4AF37] text-black px-4 hover:bg-[#B8960C] transition-colors duration-200" aria-label="Send email">
                <Send size={14} />
              </button>
            </form>
            {errors.email && <p className="text-red-500 text-[10px]">{errors.email.message}</p>}
            {isSubmitted && <p className="text-green-500 text-[10px]">Thank you for subscribing!</p>}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 border-t border-white/5 text-center md:flex justify-between items-center text-xs text-white/40 font-light space-y-4 md:space-y-0">
        <div>
          &copy; {new Date().getFullYear()} {theme.brandName}. All Rights Reserved. GSTIN: 09ABCDE1234F1Z5 (India Compliance)
        </div>
        <div className="flex justify-center space-x-6">
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "@/config/theme";
import { useCartStore } from "@/store/cart.store";
import { useUIStore } from "@/store/ui.store";
import { useWishlistStore } from "@/store/wishlist.store";
import { ShoppingBag, Heart, Menu, X, PhoneCall, Calendar } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [isHomePage, setIsHomePage] = useState(pathname === "/");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsHomePage(window.location.pathname === "/");
  }, [pathname]);
  const cartItemsCount = useCartStore((state) => state.items.reduce((acc, i) => acc + i.quantity, 0));
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const { toggleCart, toggleAppointmentModal } = useUIStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/collections" },
    { name: "Products", href: "/products" },
    { name: "Calculators", href: "/calculators" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <>
      <header
        className={`fixed left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "top-0 backdrop-blur-md border-b border-[#D4AF37]/20 py-4 shadow-lg"
            : isHomePage
            ? "top-8 bg-transparent py-6"
            : "top-8 backdrop-blur-md border-b border-[#D4AF37]/20 py-4 shadow-md"
        }`}
        style={{
          backgroundColor: isScrolled
            ? "rgba(17, 17, 17, 0.9)"
            : isHomePage
            ? "transparent"
            : "rgba(17, 17, 17, 0.95)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col group select-none">
            <span className="font-serif text-2xl md:text-3xl tracking-widest text-[#D4AF37] font-bold group-hover:text-[#F5E6C8] transition-colors duration-300">
              {theme.brandName.toUpperCase()}
            </span>
            <span className="text-[9px] tracking-[0.3em] text-white/60 font-sans uppercase -mt-1 group-hover:text-white transition-colors duration-300">
              {theme.tagline}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-sm uppercase tracking-widest font-medium transition-colors text-white/80 hover:text-[#D4AF37]"
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavLine"
                      className="absolute left-0 bottom-[-6px] w-full h-[2px] bg-[#D4AF37]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-6">
            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="text-white hover:text-[#D4AF37] relative transition-colors duration-200"
              aria-label="Wishlist"
            >
              <Heart size={22} className="stroke-[1.5]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black font-sans font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => toggleCart(true)}
              className="text-white hover:text-[#D4AF37] relative transition-colors duration-200"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={22} className="stroke-[1.5]" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black font-sans font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Book Appointment CTA */}
            <button
              onClick={() => toggleAppointmentModal(true)}
              className="hidden lg:flex items-center space-x-2 border border-[#D4AF37] text-[#D4AF37] px-4 py-2 text-xs uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all duration-300 rounded-[2px]"
            >
              <Calendar size={14} />
              <span>Book Consultation</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white hover:text-[#D4AF37] transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-black/95 z-50 flex flex-col p-8 justify-between md:hidden"
          >
            <div>
              <div className="flex justify-between items-center mb-16">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex flex-col"
                >
                  <span className="font-serif text-2xl tracking-widest text-[#D4AF37] font-bold">
                    {theme.brandName.toUpperCase()}
                  </span>
                  <span className="text-[8px] tracking-[0.3em] text-white/50 font-sans uppercase">
                    {theme.tagline}
                  </span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:text-[#D4AF37]"
                >
                  <X size={26} />
                </button>
              </div>

              <nav className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xl uppercase tracking-widest font-serif text-white hover:text-[#D4AF37]"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="border-t border-[#D4AF37]/20 pt-8 space-y-6">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  toggleAppointmentModal(true);
                }}
                className="w-full flex items-center justify-center space-x-2 bg-[#D4AF37] text-black py-4 uppercase tracking-widest text-xs font-semibold rounded-[2px]"
              >
                <Calendar size={16} />
                <span>Book Consultation</span>
              </button>
              <div className="flex items-center justify-center space-x-4 text-white/60 text-xs">
                <PhoneCall size={14} />
                <span>{theme.contact.phone}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

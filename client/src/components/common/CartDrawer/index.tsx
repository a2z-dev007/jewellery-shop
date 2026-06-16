"use client";

import { useCartStore } from "@/store/cart.store";
import { useUIStore } from "@/store/ui.store";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, Plus, Minus } from "lucide-react";
import { theme } from "@/config/theme";

export default function CartDrawer() {
  const { isCartOpen, toggleCart } = useUIStore();
  const { items, updateQuantity, removeFromCart, subtotal } = useCartStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleCart(false)}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#111111] text-white z-50 shadow-2xl flex flex-col justify-between border-l border-[#D4AF37]/20 font-sans"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#D4AF37]/20 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingBag size={20} className="text-[#D4AF37]" />
                <h3 className="font-serif text-lg tracking-wider uppercase font-semibold text-[#D4AF37]">
                  Your Treasure Bag
                </h3>
              </div>
              <button
                onClick={() => toggleCart(false)}
                className="text-white/70 hover:text-white hover:bg-white/5 p-1.5 rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X size={22} />
              </button>
            </div>

            {/* Item List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 text-center">
                  <ShoppingBag size={48} className="text-white/20 stroke-[1]" />
                  <p className="text-sm text-white/50 font-light">Your cart is currently empty.</p>
                  <button
                    onClick={() => toggleCart(false)}
                    className="border border-[#D4AF37] text-[#D4AF37] px-6 py-2.5 text-xs uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-colors rounded-[2px]"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex space-x-4 pb-6 border-b border-white/5 last:border-b-0"
                  >
                    <div className="relative w-20 h-20 bg-white/5 border border-white/10 rounded-[2px] overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <h4 className="text-xs font-serif font-medium line-clamp-1 text-white/90">
                          {item.name}
                        </h4>
                        <p className="text-[10px] text-white/40 uppercase tracking-wider">
                          {item.purity} &bull; {item.weight}g
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Qty adjustments */}
                        <div className="flex items-center border border-white/15 rounded-[2px]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-white/5 text-white/70 transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-2 text-xs font-semibold select-none font-sans min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-white/5 text-white/70 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        {/* Price & Delete */}
                        <div className="flex items-center space-x-3">
                          <span className="text-xs font-semibold font-serif text-[#D4AF37]">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-white/40 hover:text-red-400 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer calculations & CTAs */}
            {items.length > 0 && (
              <div className="p-6 bg-[#1c1c1c] border-t border-[#D4AF37]/20 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/60 font-light">Subtotal</span>
                  <span className="font-serif font-bold text-lg text-[#D4AF37]">
                    ₹{subtotal().toLocaleString()}
                  </span>
                </div>
                <p className="text-[10px] text-white/40 font-light text-center leading-relaxed">
                  Making charges and taxes computed at checkout stage. Free secure logistics applies.
                </p>
                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => {
                      alert("Demo Checkout: Proceeding to secure gateway simulator.");
                    }}
                    className="w-full bg-[#D4AF37] hover:bg-[#B8960C] text-black py-4 uppercase tracking-widest text-xs font-semibold transition-colors duration-200 rounded-[2px] text-center"
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={() => toggleCart(false)}
                    className="w-full border border-white/20 hover:border-white text-white py-3 uppercase tracking-widest text-[10px] font-semibold transition-colors rounded-[2px] text-center"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

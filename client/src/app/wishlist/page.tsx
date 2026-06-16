"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlistStore } from "@/store/wishlist.store";
import { useCartStore } from "@/store/cart.store";
import { theme } from "@/config/theme";
import {
  Heart,
  Trash2,
  ShoppingBag,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

export default function WishlistPage() {
  const { items: wishlistItems, toggleWishlist } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddAllToCart = () => {
    wishlistItems.forEach((item) => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        weight: item.weight,
        purity: item.purity,
        image: item.image,
      });
    });
  };

  return (
    <main className="pt-32 pb-24 font-sans text-black min-h-[80vh] bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Page Header */}
        <section className="text-center mb-12 space-y-3">
          <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-bold">
            Your Collection
          </span>
          <h1 id="wishlist-page-title" className="font-serif text-4xl md:text-5xl text-black font-light leading-tight">
            My Wishlist
          </h1>
          <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mt-4" />
        </section>

        <AnimatePresence mode="popLayout">
          {wishlistItems.length === 0 ? (
            /* Empty State */
            <motion.section
              key="empty-state"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="max-w-md mx-auto text-center py-16 px-6 bg-white border border-[#E8E0D0]/40 rounded-[2px] shadow-sm space-y-6"
            >
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center bg-[#FAFAF8] rounded-full border border-[#E8E0D0]/30">
                <Heart size={36} className="text-[#D4AF37]/60 stroke-[1.2]" />
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full border border-dashed border-[#D4AF37]/30"
                />
              </div>

              <div className="space-y-2">
                <h2 className="font-serif text-xl text-black font-medium">Your Wishlist is Empty</h2>
                <p className="text-xs text-black/50 leading-relaxed font-light">
                  Save your favorite handcrafted creations here as you browse our collections, so they are ready for checkout or WhatsApp inquiries.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  id="wishlist-empty-explore-btn"
                  href="/products"
                  className="inline-flex items-center space-x-2 bg-black hover:bg-[#D4AF37] text-white hover:text-black px-6 py-3 text-xs uppercase tracking-widest font-semibold transition-all duration-300 rounded-[2px] shadow-sm hover:shadow-md"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.section>
          ) : (
            /* Wishlist Items List */
            <motion.div
              key="wishlist-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-center pb-4 border-b border-[#E8E0D0]/30 mb-8 space-y-4 sm:space-y-0">
                <p className="text-xs text-black/60 font-semibold uppercase tracking-wider">
                  Showing {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"}
                </p>

                <div className="flex space-x-4">
                  <button
                    id="wishlist-add-all-cart-btn"
                    onClick={handleAddAllToCart}
                    className="flex items-center space-x-2 border border-[#D4AF37] text-white bg-black hover:bg-[#D4AF37] hover:text-black px-4 py-2 text-xs uppercase tracking-widest font-semibold transition-all duration-300 rounded-[2px]"
                  >
                    <ShoppingBag size={14} />
                    <span>Add All to Cart</span>
                  </button>
                </div>
              </div>

              {/* Grid */}
              <motion.div
                layout
                id="wishlist-items-grid"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <AnimatePresence>
                  {wishlistItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="group bg-white border border-[#E8E0D0]/40 rounded-[2px] overflow-hidden shadow-sm flex flex-col justify-between"
                    >
                      {/* Photo Container */}
                      <div className="relative aspect-square overflow-hidden bg-gray-50 border-b border-gray-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <span className="absolute top-3 left-3 bg-[#D4AF37] text-black text-[9px] uppercase tracking-wider font-semibold font-sans px-2.5 py-1 rounded-[2px]">
                          {item.purity}
                        </span>

                        {/* Remove Button */}
                        <button
                          id={`remove-wishlist-item-${item.id}`}
                          onClick={() => toggleWishlist(item)}
                          className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-red-50 text-black hover:text-red-600 rounded-full shadow-md transition-all duration-300 z-10"
                          aria-label="Remove from Wishlist"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      {/* Details */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <h3 className="font-serif text-base text-[#111111] line-clamp-2 leading-snug group-hover:text-[#D4AF37] transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-xs text-black/50 tracking-wider">
                            Weight: {item.weight}g
                          </p>
                        </div>

                        <div className="pt-2 flex items-center justify-between border-t border-[#E8E0D0]/20">
                          <span className="font-serif text-base font-semibold text-black">
                            ₹{item.price.toLocaleString()}
                          </span>

                          <div className="flex space-x-2">
                            {/* Add to Cart */}
                            <button
                              id={`wishlist-add-to-cart-${item.id}`}
                              onClick={() => {
                                addToCart({
                                  id: item.id,
                                  name: item.name,
                                  price: item.price,
                                  weight: item.weight,
                                  purity: item.purity,
                                  image: item.image,
                                });
                              }}
                              className="p-2 border border-black/10 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 text-black rounded-[2px] transition-colors text-xs uppercase font-semibold tracking-wider"
                            >
                              Add to Cart
                            </button>

                            {/* WhatsApp Inquiry */}
                            <a
                              id={`wishlist-whatsapp-inquire-${item.id}`}
                              href={`https://wa.me/${
                                theme.contact.whatsapp
                              }?text=Hi,%20I'm%20interested%20in%20inquiring%20about%20the%20${encodeURIComponent(
                                item.name
                              )}%20saved%20in%20my%20wishlist.`}
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
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

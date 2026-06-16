"use client";

import { useState } from "react";
import { theme } from "@/config/theme";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import { MessageSquare, ShoppingBag, SlidersHorizontal, Heart } from "lucide-react";

const allProducts = [
  {
    id: "p1",
    name: "Imperial Bridal Gold Choker Necklace",
    price: 185000,
    weight: 24.5,
    purity: "22K Gold",
    category: "bridal",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "p2",
    name: "Classic Diamond Eternity Ring",
    price: 98000,
    weight: 4.2,
    purity: "18K Diamond",
    category: "diamond",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "p3",
    name: "Heritage Jadau Gold Jhumka Earrings",
    price: 135000,
    weight: 18.0,
    purity: "22K Gold",
    category: "gold",
    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "p4",
    name: "Artisanal Silver Floral Bracelet",
    price: 15500,
    weight: 15.5,
    purity: "925 Silver",
    category: "silver",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "p5",
    name: "Maharani Kundan Har Necklace",
    price: 245000,
    weight: 38.2,
    purity: "22K Gold",
    category: "bridal",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "p6",
    name: "Royal Peacock Gold Bangle Set",
    price: 165000,
    weight: 22.0,
    purity: "22K Gold",
    category: "gold",
    image: "https://images.unsplash.com/photo-1549417229-aa67d3263c09?q=80&w=600&auto=format&fit=crop",
  },
];

export default function ProductsPage() {
  const addToCart = useCartStore((state) => state.addToCart);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");

  const filteredProducts = allProducts
    .filter((p) => selectedCategory === "all" || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortOrder === "low-to-high") return a.price - b.price;
      if (sortOrder === "high-to-high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto font-sans">
      {/* Title */}
      <div className="text-center mb-16 space-y-3">
        <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-bold">Catalog</span>
        <h1 className="font-serif text-4xl md:text-5xl text-black font-light leading-tight">Handcrafted Pieces</h1>
        <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mt-4" />
      </div>

      {/* Toolbar / Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center pb-6 border-b border-[#E8E0D0]/30 mb-8 space-y-4 md:space-y-0">
        <div className="flex flex-wrap gap-2">
          {["all", "gold", "diamond", "bridal", "silver"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold rounded-[2px] transition-all border ${
                selectedCategory === cat
                  ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                  : "bg-transparent text-black/70 hover:text-black border-black/10 hover:border-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-xs uppercase tracking-wider font-semibold text-black/60 flex items-center space-x-1">
            <SlidersHorizontal size={14} />
            <span>Sort:</span>
          </span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-transparent border border-black/10 text-xs px-3 py-2 outline-none uppercase tracking-wider font-semibold focus:border-[#D4AF37] rounded-[2px]"
          >
            <option value="default">Default</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="group bg-white border border-[#E8E0D0]/40 rounded-[2px] overflow-hidden shadow-sm flex flex-col justify-between"
          >
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
                  weight: prod.weight,
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
                    className="p-2 border border-black/10 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 text-black rounded-[2px] transition-colors text-xs uppercase font-semibold tracking-wider"
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
          </div>
        ))}
      </div>
    </div>
  );
}

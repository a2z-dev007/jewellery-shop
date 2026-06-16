import { create } from "zustand";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  weight: number;
  purity: string;
  image: string;
}

interface WishlistState {
  items: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => void;
  isInWishlist: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],
  toggleWishlist: (item) => {
    const exists = get().items.some((i) => i.id === item.id);
    if (exists) {
      set({ items: get().items.filter((i) => i.id !== item.id) });
    } else {
      set({ items: [...get().items, item] });
    }
  },
  isInWishlist: (id) => get().items.some((i) => i.id === id),
}));

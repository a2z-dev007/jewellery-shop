import { create } from "zustand";

interface UIState {
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isAppointmentModalOpen: boolean;
  selectedProductForInquiry: any | null;
  toggleCart: (open?: boolean) => void;
  toggleWishlist: (open?: boolean) => void;
  toggleAppointmentModal: (open?: boolean) => void;
  setSelectedProductForInquiry: (product: any | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isCartOpen: false,
  isWishlistOpen: false,
  isAppointmentModalOpen: false,
  selectedProductForInquiry: null,
  toggleCart: (open) => set((state) => ({ isCartOpen: open !== undefined ? open : !state.isCartOpen })),
  toggleWishlist: (open) => set((state) => ({ isWishlistOpen: open !== undefined ? open : !state.isWishlistOpen })),
  toggleAppointmentModal: (open) => set((state) => ({ isAppointmentModalOpen: open !== undefined ? open : !state.isAppointmentModalOpen })),
  setSelectedProductForInquiry: (product) => set({ selectedProductForInquiry: product }),
}));

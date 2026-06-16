import { create } from "zustand";

interface UIState {
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isAppointmentModalOpen: boolean;
  isAIChatOpen: boolean;
  selectedProductForInquiry: any | null;
  toggleCart: (open?: boolean) => void;
  toggleWishlist: (open?: boolean) => void;
  toggleAppointmentModal: (open?: boolean) => void;
  toggleAIChat: (open?: boolean) => void;
  setSelectedProductForInquiry: (product: any | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isCartOpen: false,
  isWishlistOpen: false,
  isAppointmentModalOpen: false,
  isAIChatOpen: false,
  selectedProductForInquiry: null,
  toggleCart: (open) => set((state) => ({ isCartOpen: open !== undefined ? open : !state.isCartOpen })),
  toggleWishlist: (open) => set((state) => ({ isWishlistOpen: open !== undefined ? open : !state.isWishlistOpen })),
  toggleAppointmentModal: (open) => set((state) => ({ isAppointmentModalOpen: open !== undefined ? open : !state.isAppointmentModalOpen })),
  toggleAIChat: (open) => set((state) => ({ isAIChatOpen: open !== undefined ? open : !state.isAIChatOpen })),
  setSelectedProductForInquiry: (product) => set({ selectedProductForInquiry: product }),
}));

export const theme = {
  // Business Identity
  businessType: "jewellery",
  brandName: "Aura Jewellers",
  tagline: "Crafting Memories Since 1985",
  logo: {
    light: "/assets/logo-light.svg",
    dark: "/assets/logo-dark.svg",
    favicon: "/favicon.ico",
  },

  // Colors
  colors: {
    primary: "#D4AF37",       // Gold
    primaryLight: "#F5E6C8",  // Champagne
    primaryDark: "#B8960C",   // Deep gold
    secondary: "#111111",     // Near black
    surface: "#FAFAF8",       // Off-white
    accent: "#F5E6C8",        // Accent warm
    text: {
      primary: "#111111",
      secondary: "#4A4A4A",
      muted: "#9A9A9A",
      inverse: "#FFFFFF",
    },
    border: "#E8E0D0",
    error: "#DC2626",
    success: "#16A34A",
  },

  // Typography
  fonts: {
    heading: "var(--font-cormorant)", // Cormorant Garamond
    body: "var(--font-inter)",        // Inter
    accent: "var(--font-playfair)",   // Playfair Display
  },

  // Contact
  contact: {
    phone: "+91-9876543210",
    whatsapp: "+919876543210",
    whatsappMessage: "Hi Aura Jewellers, I'm interested in booking a bridal consultation.",
    email: "concierge@aurajewellers.com",
    address: "12, Luxury Galleria, Hazratganj, Lucknow, UP 226001",
    mapUrl: "https://maps.google.com",
  },

  // Business Hours
  hours: {
    weekdays: "10:00 AM – 8:00 PM",
    weekends: "10:00 AM – 9:00 PM",
    holidays: "Closed",
  },

  // Social Media
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    pinterest: "https://pinterest.com",
  },

  // SEO Defaults
  seo: {
    defaultTitle: "Aura Jewellers | Fine Gold & Exquisite Diamond Jewellery",
    titleTemplate: "%s | Aura Jewellers",
    description: "Discover handcrafted premium gold, bridal, and certified diamond jewellery at Aura Jewellers. Legacy of trust since 1985.",
    keywords: ["gold jewellery", "diamond jewellery", "bridal jewellery", "Lucknow premium jewellers", "handcrafted necklaces"],
    ogImage: "/assets/og-default.jpg",
  },

  // Feature Flags
  features: {
    enableCart: true,
    enableWishlist: true,
    enableAppointments: true,
    enableCalculators: true,
    enableBlog: true,
    enableOrders: true,
    enableAIChat: true,
    enableGoldRate: true,
    enableEMICalculator: true,
  },

  // Active Template
  activeTemplate: "luxury",   // "luxury" | "bridal" | "modern" | "minimal"

  // Announcement Bar
  announcement: {
    enabled: true,
    messages: [
      "Today's Gold Rate: ₹7,240/gram (22K Hallmarked)",
      "Exclusive Bridal Showcase: Book private viewing session",
      "Complimentary insured shipping across India",
    ],
    rotationInterval: 4500,
  },
};

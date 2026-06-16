import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { theme } from "@/config/theme";
import AnnouncementBar from "@/components/common/AnnouncementBar";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import CartDrawer from "@/components/common/CartDrawer";
import AppointmentModal from "@/components/common/AppointmentModal";
import WhatsAppButton from "@/components/widgets/WhatsAppButton";
import CallButton from "@/components/widgets/CallButton";
import AIChat from "@/components/widgets/AIChat";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: theme.seo.defaultTitle,
  description: theme.seo.description,
  keywords: theme.seo.keywords,
  openGraph: {
    title: theme.seo.defaultTitle,
    description: theme.seo.description,
    images: [{ url: theme.seo.ogImage }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${cormorant.variable} ${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAFAF8] text-[#111111] selection:bg-[#D4AF37]/30 selection:text-[#111111]">
        {/* Layout Container */}
        <AnnouncementBar />
        <Header />
        
        <main className="flex-1">
          {children}
        </main>
        
        <Footer />

        {/* Global Widget/Modal Overlays */}
        <CartDrawer />
        <AppointmentModal />
        <WhatsAppButton />
        <CallButton />
        <AIChat />
      </body>
    </html>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { theme } from "@/config/theme";
import { motion } from "framer-motion";
import { useUIStore } from "@/store/ui.store";

export default function WhatsAppButton() {
  const pathname = usePathname();
  const { isAIChatOpen } = useUIStore();

  // Hide WhatsApp on Checkout and Order Success pages
  const hiddenRoutes = ["/checkout", "/checkout/success", "/checkout/confirmation"];
  if (hiddenRoutes.includes(pathname)) return null;

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(theme.contact.whatsappMessage);
    const url = `https://wa.me/${theme.contact.whatsapp}?text=${encodedMessage}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const telephoneVariants = {
    idle: {
      rotate: [0, -10, 10, -10, 10, 0],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        repeatDelay: 4, // shake every 4 seconds
        ease: "easeInOut",
      }
    },
    hover: {
      rotate: [0, -15, 15, -15, 15, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  };

  return (
    <motion.button
      onClick={handleWhatsAppClick}
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{ 
        opacity: isAIChatOpen ? 0 : 1, 
        scale: isAIChatOpen ? 0 : 1, 
        y: isAIChatOpen ? 50 : [0, -6, 0],
        pointerEvents: isAIChatOpen ? "none" : "auto" as any,
      }}
      transition={{
        y: {
          duration: 3,
          delay: 0.25, // offset float timing from Chatbot
          repeat: isAIChatOpen ? 0 : Infinity,
          ease: "easeInOut",
        },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      }}
      whileHover={{ 
        scale: isAIChatOpen ? 0 : 1.08,
        boxShadow: "0 12px 40px rgba(37, 211, 102, 0.45)",
      }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-24 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.3)] group flex items-center justify-center cursor-pointer border border-[#25D366]/20"
      aria-label="Contact us on WhatsApp"
    >
      {/* Animated Green Concentric Ripples */}
      <div className="absolute inset-0 -z-10 rounded-full flex items-center justify-center">
        <motion.div
          className="absolute inset-0 rounded-full border border-[#25D366]/60"
          animate={{ scale: isAIChatOpen ? 1 : [1, 1.8], opacity: isAIChatOpen ? 0 : [0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border border-[#25D366]/40"
          animate={{ scale: isAIChatOpen ? 1 : [1, 2.4], opacity: isAIChatOpen ? 0 : [0.4, 0] }}
          transition={{ duration: 2, delay: 0.7, repeat: Infinity, ease: "easeOut" }}
        />
      </div>
      
      {/* Animated WhatsApp Icon */}
      <div className="w-6 h-6 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 stroke-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Solid Chat Bubble Background */}
          <path d="M12.004 2c-5.523 0-10 4.477-10 10 0 1.91.537 3.69 1.466 5.22L2 22l4.92-1.29c1.53.93 3.31 1.47 5.22 1.47 5.523 0 10-4.477 10-10s-4.477-10-10-10z" fill="white" />
          
          {/* Telephone Handset inside (Wiggles) */}
          <motion.path
            variants={telephoneVariants}
            animate="idle"
            whileHover="hover"
            style={{ originX: "12px", originY: "12px" }}
            fill="#25D366"
            d="M15.894 13.047c-.27-.135-1.597-.787-1.844-.877-.247-.09-.427-.135-.607.135-.18.27-.697.877-.854 1.057-.157.18-.315.202-.585.067-.27-.135-1.14-.42-2.17-1.34-.8-.713-1.34-1.597-1.497-1.867-.157-.27-.017-.416.118-.55.121-.12.27-.315.405-.472.135-.157.18-.27.27-.45.09-.18.045-.337-.022-.472-.068-.135-.607-1.462-.832-2.002-.22-.53-.443-.45-.607-.458-.157-.008-.337-.008-.517-.008-.18 0-.472.067-.72.337-.247.27-.945.922-.945 2.25 0 1.327.967 2.61 1.102 2.79.135.18 1.902 2.903 4.606 4.072.643.278 1.145.444 1.536.568.647.206 1.235.177 1.7.108.518-.077 1.597-.652 1.822-1.282.225-.63.225-1.17.157-1.282-.067-.113-.247-.18-.517-.315"
          />
        </svg>
      </div>
      
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 text-xs font-semibold uppercase tracking-wider font-sans select-none whitespace-nowrap transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
        Whatsapp Chat
      </span>
    </motion.button>
  );
}

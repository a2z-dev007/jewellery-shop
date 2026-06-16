"use client";

import { usePathname } from "next/navigation";
import { theme } from "@/config/theme";
import { MessageSquare } from "lucide-react";

export default function WhatsAppButton() {
  const pathname = usePathname();

  // Hide WhatsApp on Checkout and Order Success pages
  const hiddenRoutes = ["/checkout", "/checkout/success", "/checkout/confirmation"];
  if (hiddenRoutes.includes(pathname)) return null;

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(theme.contact.whatsappMessage);
    const url = `https://wa.me/${theme.contact.whatsapp}?text=${encodedMessage}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 hover:bg-[#20ba5a] active:scale-95 transition-all duration-300 group flex items-center justify-center cursor-pointer"
      aria-label="Contact us on WhatsApp"
    >
      {/* Ripple Animation Effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping duration-1000 -z-10" />
      
      <MessageSquare className="w-6 h-6 fill-white stroke-none group-hover:rotate-12 transition-transform duration-300" />
      
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 text-xs font-semibold uppercase tracking-wider font-sans select-none whitespace-nowrap transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
        WhatsApp Concierge
      </span>
    </button>
  );
}

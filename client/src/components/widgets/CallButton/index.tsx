"use client";

import { usePathname } from "next/navigation";
import { theme } from "@/config/theme";
import { PhoneCall } from "lucide-react";

export default function CallButton() {
  const pathname = usePathname();

  // Hide Call on Checkout pages
  const hiddenRoutes = ["/checkout", "/checkout/success", "/checkout/confirmation"];
  if (hiddenRoutes.includes(pathname)) return null;

  return (
    <a
      href={`tel:${theme.contact.phone}`}
      className="fixed bottom-6 left-6 z-40 md:hidden bg-[#D4AF37] text-black p-4 rounded-full shadow-2xl active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer"
      aria-label="Call concierge service"
    >
      <span className="absolute inset-0 rounded-full bg-[#D4AF37]/40 animate-ping duration-1500 -z-10" />
      <PhoneCall className="w-6 h-6 stroke-[2]" />
    </a>
  );
}

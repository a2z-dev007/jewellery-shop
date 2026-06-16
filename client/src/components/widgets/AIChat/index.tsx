"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "@/config/theme";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/store/ui.store";
import { MessageCircle, X, Send, Sparkles, User } from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
}

export default function AIChat() {
  const pathname = usePathname();
  const { isAIChatOpen, toggleAIChat } = useUIStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: `Welcome to ${theme.brandName} Concierge. How may I assist you with our jewellery collection today?`,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Hide AI Concierge on Checkout and Order Success pages
  const hiddenRoutes = ["/checkout", "/checkout/success", "/checkout/confirmation"];
  if (hiddenRoutes.includes(pathname)) return null;

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputValue.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate canned AI response after a short delay
    setTimeout(() => {
      setIsTyping(false);
      const query = userMsg.text.toLowerCase();
      let botText = "Thank you for asking. Our showroom concierge is ready to assist you further. You can connect with us directly on WhatsApp or book a private consultation session.";

      if (query.includes("gold rate") || query.includes("price")) {
        botText = "Today's gold rate for 22K Hallmarked Gold is ₹7,240/gram. We also offer certified 18K and 14K custom diamond settings.";
      } else if (query.includes("bridal") || query.includes("wedding")) {
        botText = "We specialize in bridal jewellery sets. You can book an exclusive bridal consultation session via the button at the top header, or chat with our wedding curator directly on WhatsApp.";
      } else if (query.includes("shipping") || query.includes("delivery")) {
        botText = "We offer secure, insured home delivery across India. Delivery is complimentary for orders above ₹50,000.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: botText,
        },
      ]);
    }, 1500);
  };

  return (
    <>
      {/* Collapsed floating button */}
      <motion.button
        onClick={() => toggleAIChat()}
        initial={{ opacity: 0, scale: 0.5, y: 50 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: [0, -6, 0],
        }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
          opacity: { duration: 0.4 },
          scale: { duration: 0.4 },
        }}
        whileHover={{ 
          scale: 1.08,
          boxShadow: "0 12px 40px rgba(212, 175, 55, 0.45)",
        }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-br from-[#111111] to-[#1d1d1d] border border-[#D4AF37]/50 text-[#D4AF37] p-4 rounded-full shadow-[0_8px_30px_rgba(212,175,55,0.2)] group flex items-center justify-center cursor-pointer"
        aria-label="Open AI Concierge"
      >
        {/* Animated Gold Concentric Ripples */}
        <div className="absolute inset-0 -z-10 rounded-full flex items-center justify-center">
          <motion.div
            className="absolute inset-0 rounded-full border border-[#D4AF37]/60"
            animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border border-[#D4AF37]/40"
            animate={{ scale: [1, 2.4], opacity: [0.4, 0] }}
            transition={{ duration: 2.2, delay: 0.8, repeat: Infinity, ease: "easeOut" }}
          />
        </div>

        {/* Animated Chatbot SVG Icon */}
        <div className="w-6 h-6 flex items-center justify-center">
          <motion.svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="w-6 h-6 text-[#D4AF37]"
            animate={{
              y: [0, -1, 1, -1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Antenna with pulsing light */}
            <path d="M12 6V3" stroke="#D4AF37" strokeWidth="1.5" />
            <motion.circle
              cx="12"
              cy="2.5"
              r="1.2"
              fill="#D4AF37"
              stroke="none"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Robot Head Body */}
            <rect x="4" y="6" width="16" height="13" rx="4" stroke="#D4AF37" strokeWidth="1.7" fill="#111111" />
            
            {/* Left Eye */}
            <motion.ellipse
              cx="9"
              cy="12.5"
              rx="1.3"
              ry="1.3"
              fill="#D4AF37"
              animate={{
                scaleY: [1, 1, 0.1, 1, 1, 1, 1],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ originX: "9px", originY: "12.5px" }}
            />
            
            {/* Right Eye */}
            <motion.ellipse
              cx="15"
              cy="12.5"
              rx="1.3"
              ry="1.3"
              fill="#D4AF37"
              animate={{
                scaleY: [1, 1, 0.1, 1, 1, 1, 1],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ originX: "15px", originY: "12.5px" }}
            />
            
            {/* Mouth / Smile */}
            <motion.path
              d="M9.5 15.5C10.5 16.3 13.5 16.3 14.5 15.5"
              stroke="#D4AF37"
              strokeWidth="1.5"
              strokeLinecap="round"
              animate={{
                d: [
                  "M9.5 15.5C10.5 16.3 13.5 16.3 14.5 15.5",
                  "M9.5 15.8C10.5 16.1 13.5 16.1 14.5 15.8",
                  "M9.5 15.5C10.5 16.3 13.5 16.3 14.5 15.5",
                ]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Side ears */}
            <rect x="2" y="10" width="2" height="5" rx="1" fill="#D4AF37" />
            <rect x="20" y="10" width="2" height="5" rx="1" fill="#D4AF37" />

            {/* Sparkles floating around */}
            <motion.path
              d="M21 4L21 8M19 6L23 6"
              stroke="#D4AF37"
              strokeWidth="1"
              animate={{
                rotate: 360,
                scale: [0.8, 1.2, 0.8],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ originX: "21px", originY: "6px" }}
            />
            <motion.path
              d="M4 18L4 22M2 20L6 20"
              stroke="#D4AF37"
              strokeWidth="1"
              animate={{
                rotate: -360,
                scale: [0.8, 1.2, 0.8],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ originX: "4px", originY: "20px" }}
            />
          </motion.svg>
        </div>

        {/* Slide-out Text Label */}
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 text-xs font-semibold uppercase tracking-wider font-sans select-none whitespace-nowrap transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
          Ask AI
        </span>
      </motion.button>

      {/* Chat window modal */}
      <AnimatePresence>
        {isAIChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed bottom-24 right-6 w-[380px] h-[520px] max-w-[calc(100vw-32px)] bg-[#111111] border border-[#D4AF37]/30 shadow-2xl flex flex-col z-50 rounded-[4px] overflow-hidden text-white font-sans"
          >
            {/* Header */}
            <div className="bg-[#1c1c1c] border-b border-[#D4AF37]/20 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-1 bg-[#D4AF37]/15 rounded-full">
                  <Sparkles size={16} className="text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-semibold tracking-wider text-[#D4AF37]">Aura Assistant</h3>
                  <p className="text-[10px] text-white/50">Online concierge advisor</p>
                </div>
              </div>
              <button
                onClick={() => toggleAIChat(false)}
                className="text-white/60 hover:text-white hover:bg-white/5 p-1 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#111111] to-[#0a0a0a]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "bot" && (
                    <div className="p-1 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full shrink-0 text-[#D4AF37]">
                      <Sparkles size={12} />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-3.5 py-2.5 text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[#D4AF37] text-black rounded-l-[8px] rounded-tr-[8px] font-medium"
                        : "bg-[#1c1c1c] text-white border border-white/5 rounded-r-[8px] rounded-tl-[8px]"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.sender === "user" && (
                    <div className="p-1 bg-white/10 rounded-full shrink-0 text-white">
                      <User size={12} />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start space-x-2">
                  <div className="p-1 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full shrink-0 text-[#D4AF37]">
                    <Sparkles size={12} />
                  </div>
                  <div className="bg-[#1c1c1c] text-white border border-white/5 px-4 py-3 rounded-r-[8px] rounded-tl-[8px] flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-3 bg-[#1c1c1c] border-t border-white/5 flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask about rates, bridal items, delivery..."
                className="bg-[#111111] border border-white/10 rounded-[2px] px-3 py-2 text-xs flex-1 outline-none text-white focus:border-[#D4AF37] transition-all"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 bg-[#D4AF37] hover:bg-[#B8960C] text-black rounded-[2px] transition-colors"
                aria-label="Send message"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

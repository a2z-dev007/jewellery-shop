"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "@/config/theme";
import { MessageCircle, X, Send, Sparkles, User } from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
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
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-24 z-40 bg-[#111111] hover:bg-[#222222] border border-[#D4AF37]/50 text-[#D4AF37] p-4 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer"
        aria-label="Open AI Concierge"
      >
        <Sparkles size={22} className="animate-pulse" />
      </button>

      {/* Chat window modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed bottom-24 right-6 md:right-24 w-[380px] h-[520px] max-w-[calc(100vw-32px)] bg-[#111111] border border-[#D4AF37]/30 shadow-2xl flex flex-col z-50 rounded-[4px] overflow-hidden text-white font-sans"
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
                onClick={() => setIsOpen(false)}
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

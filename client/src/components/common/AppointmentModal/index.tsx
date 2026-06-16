"use client";

import { useUIStore } from "@/store/ui.store";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Sparkles, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { theme } from "@/config/theme";

const appointmentSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters long"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian phone number"),
  occasion: z.string().min(1, "Please choose an occasion"),
  date: z.string().min(1, "Please select a booking date"),
  timeSlot: z.string().min(1, "Please select a time slot"),
  notes: z.string().optional(),
});

type AppointmentInput = z.infer<typeof appointmentSchema>;

export default function AppointmentModal() {
  const { isAppointmentModalOpen, toggleAppointmentModal } = useUIStore();
  const [isBooked, setIsBooked] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<AppointmentInput | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AppointmentInput>({
    resolver: zodResolver(appointmentSchema),
  });

  const onSubmit = (data: AppointmentInput) => {
    console.log("Appointment Lead Captured:", data);
    setBookingDetails(data);
    setIsBooked(true);
    reset();
  };

  const handleClose = () => {
    toggleAppointmentModal(false);
    setIsBooked(false);
    setBookingDetails(null);
  };

  return (
    <AnimatePresence>
      {isAppointmentModalOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg md:h-auto bg-[#111111] text-white border border-[#D4AF37]/35 rounded-[4px] shadow-2xl z-50 flex flex-col overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="bg-[#1c1c1c] p-6 border-b border-[#D4AF37]/20 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="text-[#D4AF37]" size={20} />
                <h3 className="font-serif text-lg tracking-wider uppercase font-semibold text-[#D4AF37]">
                  Private Viewing Booking
                </h3>
              </div>
              <button
                onClick={handleClose}
                className="text-white/70 hover:text-white hover:bg-white/5 p-1 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {!isBooked ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <p className="text-xs text-white/60 leading-relaxed font-light mb-4">
                    Book an exclusive, personalized viewing consultation at our Lucknow showroom. A dedicated concierge consultant will guide your selection.
                  </p>

                  <div className="space-y-1">
                    <label className="text-[10px] text-white/70 uppercase tracking-widest font-semibold">Full Name</label>
                    <input
                      type="text"
                      placeholder="E.g., Anjali Sharma"
                      className="w-full bg-[#1c1c1c] border border-white/10 rounded-[2px] px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#D4AF37] transition-all"
                      {...register("fullName")}
                    />
                    {errors.fullName && <p className="text-red-500 text-[10px]">{errors.fullName.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-white/70 uppercase tracking-widest font-semibold">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="10-digit number"
                        className="w-full bg-[#1c1c1c] border border-white/10 rounded-[2px] px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#D4AF37] transition-all"
                        {...register("phone")}
                      />
                      {errors.phone && <p className="text-red-500 text-[10px]">{errors.phone.message}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-white/70 uppercase tracking-widest font-semibold">Occasion</label>
                      <select
                        className="w-full bg-[#1c1c1c] border border-white/10 rounded-[2px] px-3 py-2.5 text-xs text-white outline-none focus:border-[#D4AF37] transition-all"
                        {...register("occasion")}
                      >
                        <option value="">Select occasion</option>
                        <option value="wedding">Bridal / Wedding Trousseau</option>
                        <option value="anniversary">Anniversary gift</option>
                        <option value="birthday">Birthday celebrations</option>
                        <option value="browsing">Just browsing collections</option>
                      </select>
                      {errors.occasion && <p className="text-red-500 text-[10px]">{errors.occasion.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-white/70 uppercase tracking-widest font-semibold">Preferred Date</label>
                      <input
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full bg-[#1c1c1c] border border-white/10 rounded-[2px] px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#D4AF37] transition-all"
                        {...register("date")}
                      />
                      {errors.date && <p className="text-red-500 text-[10px]">{errors.date.message}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-white/70 uppercase tracking-widest font-semibold">Preferred Time</label>
                      <select
                        className="w-full bg-[#1c1c1c] border border-white/10 rounded-[2px] px-3 py-2.5 text-xs text-white outline-none focus:border-[#D4AF37] transition-all"
                        {...register("timeSlot")}
                      >
                        <option value="">Select slot</option>
                        <option value="11-1">11:00 AM – 01:00 PM</option>
                        <option value="1-3">01:00 PM – 03:00 PM</option>
                        <option value="3-5">03:00 PM – 05:00 PM</option>
                        <option value="5-7">05:00 PM – 07:00 PM</option>
                      </select>
                      {errors.timeSlot && <p className="text-red-500 text-[10px]">{errors.timeSlot.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-white/70 uppercase tracking-widest font-semibold">Special Request Notes (Optional)</label>
                    <textarea
                      placeholder="Specify customizing preferences, metal requirements..."
                      className="w-full bg-[#1c1c1c] border border-white/10 rounded-[2px] px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#D4AF37] transition-all h-20 resize-none"
                      {...register("notes")}
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-[#D4AF37] hover:bg-[#B8960C] text-black py-4 uppercase tracking-widest text-xs font-semibold transition-colors duration-200 rounded-[2px]"
                    >
                      Book Session
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8 space-y-6 flex flex-col items-center">
                  <CheckCircle size={56} className="text-[#D4AF37] animate-bounce" />
                  <div className="space-y-2">
                    <h4 className="font-serif text-xl text-[#D4AF37] font-semibold">Viewing Reservation Confirmed!</h4>
                    <p className="text-xs text-white/60 font-light leading-relaxed max-w-sm">
                      Thank you, <strong className="text-white font-medium">{bookingDetails?.fullName}</strong>. Your appointment on <strong className="text-white font-medium">{bookingDetails?.date}</strong> for a private consultation is reserved.
                    </p>
                  </div>

                  <div className="w-full bg-[#1c1c1c] p-4 rounded-[2px] text-left border border-white/5 space-y-2 text-xs font-light">
                    <p><strong className="text-white/80 font-medium">Liaison Contact:</strong> {theme.contact.phone}</p>
                    <p><strong className="text-white/80 font-medium">Boutique Galleria:</strong> {theme.contact.address}</p>
                  </div>

                  <button
                    onClick={() => {
                      const msg = `Hi Aura Jewellers, I have booked a private bridal viewing session for ${bookingDetails?.date} at ${bookingDetails?.timeSlot} slot under the name ${bookingDetails?.fullName}. Please verify my reservation.`;
                      const url = `https://wa.me/${theme.contact.whatsapp}?text=${encodeURIComponent(msg)}`;
                      window.open(url, "_blank");
                    }}
                    className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 text-xs font-semibold uppercase tracking-widest transition-colors rounded-[2px] flex items-center justify-center space-x-2"
                  >
                    <span>Instant WhatsApp Confirm</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState } from "react";
import { theme } from "@/config/theme";
import { Calculator, Milestone, TrendingUp, DollarSign } from "lucide-react";

export default function CalculatorsHub() {
  // Calculator 1: Gold Price Estimator
  const [goldWeight, setGoldWeight] = useState("10");
  const [goldPurity, setGoldPurity] = useState("22");
  const [goldResult, setGoldResult] = useState<number>(72400);

  // Calculator 2: EMI Calculator
  const [loanAmount, setLoanAmount] = useState("100000");
  const [tenure, setTenure] = useState("12");
  const [interestRate, setInterestRate] = useState("10.5");
  const [emiResult, setEmiResult] = useState<number>(8815);

  const calculateGold = (weight: string, purity: string) => {
    const rateMap = { 22: 7240, 18: 5920, 14: 4610 };
    const rate = rateMap[purity as unknown as 22 | 18 | 14] || 7240;
    const wt = parseFloat(weight) || 0;
    const base = rate * wt;
    const making = base * 0.12; // 12% making charges
    const tax = (base + making) * 0.03; // 3% GST
    setGoldResult(Math.round(base + making + tax));
  };

  const calculateEmi = (amt: string, months: string, rate: string) => {
    const p = parseFloat(amt) || 0;
    const n = parseFloat(months) || 0;
    const r = (parseFloat(rate) || 0) / 12 / 100;
    
    if (r === 0) {
      setEmiResult(Math.round(p / n));
      return;
    }

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setEmiResult(Math.round(emi));
  };

  return (
    <div className="pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto font-sans">
      <div className="text-center mb-16 space-y-3">
        <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-bold">Liaison Hub</span>
        <h1 className="font-serif text-4xl md:text-5xl text-black font-light leading-tight">Financial & Value Calculators</h1>
        <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Gold Value Calculator */}
        <div className="bg-[#111111] text-white p-8 rounded-[4px] border border-[#D4AF37]/20 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center space-x-3 text-[#D4AF37]">
              <Calculator size={22} />
              <h3 className="font-serif text-lg tracking-wider uppercase font-semibold">Gold Valuation Estimator</h3>
            </div>
            <p className="text-xs text-white/50 font-light leading-relaxed">
              Calculate estimated jewel valuation based on current live market gold pricing averages.
            </p>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] text-white/70 uppercase tracking-widest font-semibold">Purity Weight (Grams)</label>
                <input
                  type="number"
                  value={goldWeight}
                  onChange={(e) => {
                    setGoldWeight(e.target.value);
                    calculateGold(e.target.value, goldPurity);
                  }}
                  className="w-full bg-[#1c1c1c] border border-white/10 rounded-[2px] px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#D4AF37] transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-white/70 uppercase tracking-widest font-semibold">Gold Purity Choice</label>
                <select
                  value={goldPurity}
                  onChange={(e) => {
                    setGoldPurity(e.target.value);
                    calculateGold(goldWeight, e.target.value);
                  }}
                  className="w-full bg-[#1c1c1c] border border-white/10 rounded-[2px] px-3 py-2.5 text-xs text-white outline-none focus:border-[#D4AF37] transition-all"
                >
                  <option value="22">22 Karat - Standard Gold</option>
                  <option value="18">18 Karat - Fine Diamonds Base</option>
                  <option value="14">14 Karat - Minimal Modern Base</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-sans">Valuation Summary</span>
              <p className="text-2xl font-serif font-bold text-[#D4AF37]">₹{goldResult.toLocaleString()}</p>
              <span className="text-[9px] text-white/30 block mt-0.5">Includes avg making charges & 3% GST.</span>
            </div>
            <a
              href={`https://wa.me/${theme.contact.whatsapp}?text=Hi,%20I%20would%20like%20to%20book%20a%20private%20bridal%20viewing%20for%20a%20gold%20set%20estimated%20at%20%E2%82%B9${goldResult}`}
              target="_blank"
              rel="noreferrer"
              className="bg-[#D4AF37] hover:bg-[#B8960C] text-black px-6 py-3.5 text-xs font-semibold uppercase tracking-widest transition-colors rounded-[2px] w-full sm:w-auto text-center"
            >
              Get Official Quote
            </a>
          </div>
        </div>

        {/* EMI Calculator */}
        <div className="bg-[#111111] text-white p-8 rounded-[4px] border border-[#D4AF37]/20 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center space-x-3 text-[#D4AF37]">
              <Milestone size={22} />
              <h3 className="font-serif text-lg tracking-wider uppercase font-semibold">Jewellery EMI Calculator</h3>
            </div>
            <p className="text-xs text-white/50 font-light leading-relaxed">
              Plan buying your favorite handcrafted masterpieces with convenient, low-interest gold loan packages.
            </p>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] text-white/70 uppercase tracking-widest font-semibold">Estimated Purchase Amount (₹)</label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => {
                    setLoanAmount(e.target.value);
                    calculateEmi(e.target.value, tenure, interestRate);
                  }}
                  className="w-full bg-[#1c1c1c] border border-white/10 rounded-[2px] px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#D4AF37] transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-white/70 uppercase tracking-widest font-semibold">Tenure (Months)</label>
                  <input
                    type="number"
                    value={tenure}
                    onChange={(e) => {
                      setTenure(e.target.value);
                      calculateEmi(loanAmount, e.target.value, interestRate);
                    }}
                    className="w-full bg-[#1c1c1c] border border-white/10 rounded-[2px] px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-white/70 uppercase tracking-widest font-semibold">Interest Rate (% p.a.)</label>
                  <input
                    type="number"
                    value={interestRate}
                    onChange={(e) => {
                      setInterestRate(e.target.value);
                      calculateEmi(loanAmount, tenure, e.target.value);
                    }}
                    className="w-full bg-[#1c1c1c] border border-white/10 rounded-[2px] px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-sans">Monthly EMI Installment</span>
              <p className="text-2xl font-serif font-bold text-[#D4AF37]">₹{emiResult.toLocaleString()}/mo</p>
              <span className="text-[9px] text-white/30 block mt-0.5">Calculated at standard bank rates.</span>
            </div>
            <a
              href={`https://wa.me/${theme.contact.whatsapp}?text=Hi,%20I%20would%20like%2520to%20discuss%20the%20EMI%20options%20for%20purchasing%20jewellery%20valued%20at%20%E2%82%B9${loanAmount}.`}
              target="_blank"
              rel="noreferrer"
              className="bg-[#D4AF37] hover:bg-[#B8960C] text-black px-6 py-3.5 text-xs font-semibold uppercase tracking-widest transition-colors rounded-[2px] w-full sm:w-auto text-center"
            >
              Apply for Scheme
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

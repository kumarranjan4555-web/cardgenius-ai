import { useState } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, CreditCard, Info, ShieldAlert, Zap } from 'lucide-react';
import { CREDIT_CARDS } from '../constants';

export default function ChargesDetector() {
  const [selectedCardId, setSelectedCardId] = useState(CREDIT_CARDS[0].id);
  const card = CREDIT_CARDS.find(c => c.id === selectedCardId)!;

  const yearlyCost = card.annualFee + (card.joiningFee > 0 ? card.joiningFee / 3 : 0); // Amortized joining fee
  const worthItScore = Math.max(0, Math.min(100, 100 - (card.annualFee / 20)));

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white tracking-tight">Hidden Charges Detector</h1>
          <p className="text-gray-400 max-w-xl mx-auto">Select a card to reveal its true yearly cost and hidden fees.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Card Selection */}
          <div className="space-y-6">
            <div className="bg-[#0B0F0C] p-8 rounded-3xl border border-white/5 shadow-xl space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">Select Credit Card</label>
                <select
                  value={selectedCardId}
                  onChange={(e) => setSelectedCardId(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl border border-white/10 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-white/5 text-white focus:bg-white/10"
                >
                  {CREDIT_CARDS.map(c => (
                    <option key={c.id} value={c.id} className="bg-[#0B0F0C] text-white">{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="aspect-[1.6/1] rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="bg-amber-500/10 p-6 rounded-3xl flex gap-4 border border-amber-500/20">
              <ShieldAlert className="w-6 h-6 text-amber-400 shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-amber-300">Pro Tip</p>
                <p className="text-xs text-amber-200/80 leading-relaxed">Always pay your full statement balance. Interest rates of 3.5% per month compound to over 42% per year!</p>
              </div>
            </div>
          </div>

          {/* Charges Analysis */}
          <div className="space-y-8">
            <motion.div
              key={card.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#0B0F0C] p-8 rounded-3xl border border-white/5 shadow-xl space-y-8"
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Annual Fee</p>
                  <p className="text-2xl font-bold text-white">₹{card.annualFee}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Interest Rate</p>
                  <p className="text-2xl font-bold text-white">{card.interestRate}% <span className="text-xs font-medium text-gray-500">p.m.</span></p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Late Payment</p>
                  <p className="text-2xl font-bold text-white">₹{card.latePaymentFee}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Real Yearly Cost</p>
                  <p className="text-2xl font-bold text-emerald-400">₹{yearlyCost}</p>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 text-center space-y-4">
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={352}
                      strokeDashoffset={352 - (352 * worthItScore) / 100}
                      className="text-emerald-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-white">{Math.round(worthItScore)}</span>
                    <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Score</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white">Is this card worth it?</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {worthItScore > 80 ? 'Highly recommended for its low fees and high rewards.' : 
                   worthItScore > 50 ? 'Good card, but make sure your rewards exceed the annual fee.' : 
                   'High maintenance card. Only get this if you are a heavy spender.'}
                </p>
              </div>
            </motion.div>

            <div className="bg-blue-500/10 p-6 rounded-3xl flex gap-4 border border-blue-500/20">
              <Info className="w-6 h-6 text-blue-400 shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-blue-300">Did you know?</p>
                <p className="text-xs text-blue-200/80 leading-relaxed">Most banks waive the annual fee if you spend above a certain threshold (usually ₹1-2 Lakhs per year).</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

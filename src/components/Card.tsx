import { CreditCard, ExternalLink, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CreditCard as CardType } from '../types';
import { motion } from 'motion/react';
import { trackAffiliateClick } from '../utils/tracking';

interface CardProps {
  card: CardType;
  featured?: boolean;
  monthlySpend?: number;
}

export default function Card({ card, featured = false, monthlySpend = 0 }: CardProps) {
  // Fake savings calculation for demo based on monthly spend
  const savingsRate = card.name.includes('Cashback') ? 0.05 : 0.03;
  const monthlySavings = Math.round(monthlySpend * savingsRate);
  const yearlySavings = monthlySavings * 12;

  // Determine best for tag
  let bestFor = 'Rewards';
  if (card.name.toLowerCase().includes('cashback') || card.benefits.some(b => b.toLowerCase().includes('cashback'))) bestFor = 'Cashback';
  if (card.name.toLowerCase().includes('fuel') || card.benefits.some(b => b.toLowerCase().includes('fuel'))) bestFor = 'Fuel';
  if (card.name.toLowerCase().includes('travel') || card.benefits.some(b => b.toLowerCase().includes('lounge'))) bestFor = 'Travel';

  const handleApplyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Track the click asynchronously
    trackAffiliateClick(card.id, card.applyUrl);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`bg-[#111814] rounded-3xl border ${
        featured ? 'border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)]' : 'border-white/5'
      } overflow-hidden transition-all flex flex-col h-full`}
    >
      <div className="relative aspect-[1.6/1] overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 p-6 flex items-center justify-center">
        {/* Placeholder for actual card image, using a stylized div for now if image fails */}
        <div className="absolute inset-0 opacity-50 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <img
          src={card.image}
          alt={card.name}
          className="w-[85%] h-[85%] object-contain drop-shadow-2xl relative z-10 rounded-xl"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback if image fails to load
            (e.target as HTMLImageElement).style.display = 'none';
            (e.target as HTMLImageElement).parentElement!.innerHTML += `<div class="w-[85%] h-[85%] bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl border border-white/10 flex items-center justify-center text-white font-bold text-xl shadow-2xl relative z-10">${card.name}</div>`;
          }}
        />
        {featured && (
          <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1.5 z-20 shadow-lg shadow-emerald-500/20">
            <Zap className="w-3.5 h-3.5" />
            Top Pick
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4">
          <div className="inline-block px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-3">
            Best for {bestFor}
          </div>
          <h3 className="text-xl font-bold text-white leading-tight mb-1">{card.name}</h3>
          <p className="text-sm text-gray-500 font-medium">{card.bank}</p>
        </div>

        {monthlySpend > 0 && (
          <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-4 mb-6">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-gray-400 font-medium mb-1">Est. Yearly Savings</p>
                <p className="text-2xl font-bold text-emerald-400">₹{yearlySavings.toLocaleString('en-IN')}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 font-medium mb-1">Monthly</p>
                <p className="text-sm font-bold text-gray-300">₹{monthlySavings.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5 mb-6">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">Joining Fee</p>
            <p className="text-sm font-bold text-white">₹{card.joiningFee === 0 ? 'FREE' : card.joiningFee}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">Annual Fee</p>
            <p className="text-sm font-bold text-white">₹{card.annualFee === 0 ? 'FREE' : card.annualFee}</p>
          </div>
        </div>

        <div className="flex-1">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Key Benefits</p>
          <ul className="space-y-3">
            {card.benefits.slice(0, 3).map((benefit, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-snug">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <a
            href={card.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleApplyClick}
            className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              featured 
                ? 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Apply Now
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

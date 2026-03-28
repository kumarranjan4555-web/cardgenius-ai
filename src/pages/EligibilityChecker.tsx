import { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, TrendingUp, AlertCircle, CheckCircle2, Info, Loader2, ArrowRight } from 'lucide-react';
import { auth, db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../utils/errorHandlers';
import { CREDIT_CARDS } from '../constants';

export default function EligibilityChecker() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    income: '',
    jobType: 'salaried',
    cibil: 750
  });
  const [result, setResult] = useState<{ chance: number; status: string; color: string } | null>(null);
  const [recommendedCards, setRecommendedCards] = useState<typeof CREDIT_CARDS>([]);

  const calculateEligibility = async () => {
    setLoading(true);
    let score = 0;
    const income = Number(formData.income);
    const cibil = Number(formData.cibil);

    if (income >= 100000) score += 40;
    else if (income >= 50000) score += 30;
    else if (income >= 25000) score += 20;

    if (cibil >= 800) score += 60;
    else if (cibil >= 750) score += 50;
    else if (cibil >= 700) score += 30;
    else if (cibil >= 650) score += 10;

    if (formData.jobType === 'salaried') score += 10;

    let status = 'Low';
    let color = 'text-red-500';
    if (score >= 90) { status = 'Excellent'; color = 'text-emerald-500'; }
    else if (score >= 70) { status = 'High'; color = 'text-emerald-500'; }
    else if (score >= 50) { status = 'Moderate'; color = 'text-yellow-500'; }

    const chance = Math.min(score, 99);
    setResult({ chance, status, color });

    // Calculate recommended cards
    const eligibleCards = CREDIT_CARDS.filter(card => income >= card.minIncome && cibil >= card.minCibil)
      .sort((a, b) => b.minCibil - a.minCibil)
      .slice(0, 3);
    
    // If no exact match, just show the easiest ones to get
    if (eligibleCards.length === 0) {
      setRecommendedCards([...CREDIT_CARDS].sort((a, b) => a.minCibil - b.minCibil).slice(0, 2));
    } else {
      setRecommendedCards(eligibleCards);
    }

    if (auth.currentUser) {
      const path = 'eligibilityChecks';
      try {
        await addDoc(collection(db, path), {
          uid: auth.currentUser.uid,
          income,
          jobType: formData.jobType,
          cibilScore: cibil,
          approvalChance: chance,
          createdAt: serverTimestamp()
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, path);
      }
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white tracking-tight">Eligibility Checker</h1>
            <p className="text-gray-400">Check your approval probability before applying to avoid credit score dips.</p>
          </div>

          <div className="bg-[#0B0F0C] p-8 rounded-3xl border border-white/5 shadow-xl space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-300">Monthly Income</label>
              <input
                type="number"
                value={formData.income}
                onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                placeholder="e.g. 50000"
                className="w-full px-5 py-4 rounded-2xl border border-white/10 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-white/5 text-white placeholder:text-gray-600 focus:bg-white/10"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-300">Job Type</label>
              <div className="grid grid-cols-2 gap-4">
                {['salaried', 'self-employed'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFormData({ ...formData, jobType: type })}
                    className={`py-4 rounded-2xl font-bold capitalize border transition-all ${
                      formData.jobType === type
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-gray-300">Approx CIBIL Score</label>
                <span className="text-lg font-bold text-emerald-400">{formData.cibil}</span>
              </div>
              <input
                type="range"
                min="300"
                max="900"
                value={formData.cibil}
                onChange={(e) => setFormData({ ...formData, cibil: Number(e.target.value) })}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                <span>Poor</span>
                <span>Good</span>
                <span>Excellent</span>
              </div>
            </div>

            <button
              onClick={calculateEligibility}
              disabled={!formData.income || loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-2xl font-bold text-lg shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              Check Approval Chance
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {result ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0B0F0C] p-10 rounded-3xl border border-white/5 shadow-xl text-center space-y-8"
            >
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-white/5"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={440}
                    strokeDashoffset={440 - (440 * result.chance) / 100}
                    className={result.color}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-white">{result.chance}%</span>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Chance</span>
                </div>
              </div>

              <div>
                <h3 className={`text-2xl font-bold ${result.color} mb-2`}>{result.status} Probability</h3>
                <p className="text-gray-400">Based on your profile, you have a {result.status.toLowerCase()} chance of getting approved for premium cards.</p>
              </div>

              <div className="grid grid-cols-1 gap-4 text-left">
                <div className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-300">Your income meets the criteria for 80% of available cards.</p>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <TrendingUp className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-300">A CIBIL score above 750 is considered excellent by most banks.</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-[#0B0F0C] p-10 rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center space-y-4 h-full min-h-[400px]">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center shadow-sm">
                <ShieldCheck className="w-8 h-8 text-gray-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Result will appear here</h3>
                <p className="text-gray-500 text-sm max-w-[200px] mx-auto">Fill in your details to see your credit card approval probability.</p>
              </div>
            </div>
          )}

          <div className="bg-blue-500/10 p-6 rounded-3xl flex gap-4 border border-blue-500/20">
            <Info className="w-6 h-6 text-blue-400 shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-bold text-blue-300">Why check eligibility?</p>
              <p className="text-xs text-blue-200/80 leading-relaxed">Every rejected application can lower your CIBIL score by 5-10 points. Checking here first is a "soft check" and doesn't affect your score.</p>
            </div>
          </div>
        </div>
      </div>

      {result && recommendedCards.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16 space-y-8"
        >
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-white tracking-tight">Recommended Cards Based on Your Profile</h2>
            <p className="text-gray-400">These cards have a high approval probability for you.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {recommendedCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-[#0B0F0C] rounded-3xl border border-white/5 shadow-xl overflow-hidden flex flex-col"
              >
                <div className="p-6 flex-1 flex flex-col items-center text-center space-y-4">
                  <div className="h-24 w-full flex items-center justify-center mb-2">
                    <img 
                      src={card.image} 
                      alt={card.name} 
                      className="max-h-full object-contain drop-shadow-lg"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest">{card.bank}</p>
                    <h3 className="text-xl font-bold text-white">{card.name}</h3>
                  </div>

                  <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    High Approval Chance
                  </div>

                  <p className="text-gray-400 text-sm flex-1">
                    {card.benefits[0]}
                  </p>
                </div>

                <div className="p-6 pt-0 mt-auto">
                  <button 
                    onClick={() => window.open(card.applyUrl, '_blank')}
                    className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-bold text-sm border border-white/10 transition-all flex items-center justify-center gap-2"
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

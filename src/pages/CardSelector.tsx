import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { IndianRupee, MapPin, ShoppingBag, Plane, Fuel, Utensils, CreditCard, Loader2, Receipt } from 'lucide-react';
import { getRecommendedCards } from '../services/geminiService';
import { auth, db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../utils/errorHandlers';

export default function CardSelector() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    income: '',
    city: '',
    email: '',
    spending: {
      food: '',
      shopping: '',
      fuel: '',
      bills: '',
      travel: ''
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSpendingChange = (category: string, value: string) => {
    setFormData({
      ...formData,
      spending: { ...formData.spending, [category]: value }
    });
  };

  const totalSpend = Object.values(formData.spending).reduce((acc, val) => acc + (Number(val) || 0), 0);

  const handleAnalyze = () => {
    setStep(3);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const recommendations = await getRecommendedCards(
        Number(formData.income),
        formData.spending,
        formData.city
      );

      if (auth.currentUser) {
        const path = 'userSelections';
        try {
          await addDoc(collection(db, path), {
            uid: auth.currentUser.uid,
            email: formData.email,
            monthlyIncome: Number(formData.income),
            spendingCategories: formData.spending,
            city: formData.city,
            recommendedCards: recommendations.map(c => c.id),
            createdAt: serverTimestamp()
          });
        } catch (error) {
          handleFirestoreError(error, OperationType.CREATE, path);
        }
      }

      navigate('/results', { state: { recommendations, formData } });
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-12">
      <div className={`rounded-2xl md:rounded-3xl border shadow-xl overflow-hidden transition-colors duration-500 bg-[#0B0F0C] border-white/5`}>
        {/* Progress Bar */}
        <div className={`h-1 bg-white/5`}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(step / 3) * 100}%` }}
            className="h-full bg-gradient-to-r from-emerald-400 to-teal-500"
          />
        </div>

        <div className="p-6 md:p-12">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-emerald-500 tracking-wider uppercase">Step 1 of 3</span>
                <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-emerald-500" />
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Find Your Best Credit Card</h2>
                <p className="text-sm md:text-base text-gray-400">Answer 2 quick questions to get personalized card recommendations</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">Monthly Income</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                    <input
                      type="number"
                      name="income"
                      value={formData.income}
                      onChange={handleInputChange}
                      placeholder="e.g. 50000 per month"
                      className="w-full pl-8 pr-5 py-3 md:py-4 rounded-xl md:rounded-2xl border border-white/10 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-white/5 text-white placeholder:text-gray-600 focus:bg-white/10"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Higher income unlocks better credit card offers</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">City</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 md:py-4 rounded-xl md:rounded-2xl border border-white/10 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-[#0B0F0C] text-white focus:bg-white/5"
                  >
                    <option value="" disabled className="text-gray-500">Select your city (for better offers)</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!formData.income || !formData.city}
                  onClick={() => setStep(2)}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-base md:text-lg shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Check Best Cards &rarr;
                </motion.button>
                
                <p className="text-center text-xs font-medium text-gray-500 flex items-center justify-center gap-1.5">
                  <span className="text-gray-400">🔒</span> 100% Free &bull; No CIBIL impact &bull; Instant results
                </p>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">Step 2 of 3</span>
                <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-emerald-500" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Monthly Expenses</h2>
                <p className="text-sm md:text-base text-gray-400">Enter your average monthly spend to find the most rewarding cards.</p>
              </div>

              <div className="space-y-4">
                {[
                  { id: 'food', label: 'Food & Dining', icon: Utensils, color: 'text-orange-400', bg: 'bg-orange-400/10' },
                  { id: 'shopping', label: 'Shopping', icon: ShoppingBag, color: 'text-purple-400', bg: 'bg-purple-400/10' },
                  { id: 'fuel', label: 'Fuel & Transit', icon: Fuel, color: 'text-blue-400', bg: 'bg-blue-400/10' },
                  { id: 'bills', label: 'Bills & Utilities', icon: Receipt, color: 'text-pink-400', bg: 'bg-pink-400/10' },
                  { id: 'travel', label: 'Travel & Flights', icon: Plane, color: 'text-sky-400', bg: 'bg-sky-400/10' }
                ].map((cat) => (
                  <div key={cat.id} className="flex items-center gap-4 bg-white/5 p-3 md:p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${cat.bg}`}>
                      <cat.icon className={`w-6 h-6 ${cat.color}`} />
                    </div>
                    <div className="flex-1">
                      <label className="text-sm font-medium text-gray-300 block mb-1">{cat.label}</label>
                      <div className="relative">
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                        <input
                          type="number"
                          value={formData.spending[cat.id as keyof typeof formData.spending]}
                          onChange={(e) => handleSpendingChange(cat.id, e.target.value)}
                          placeholder="Enter amount"
                          className="w-full pl-4 pr-0 py-1 bg-transparent border-none text-white text-lg font-semibold focus:ring-0 outline-none placeholder:text-gray-600 placeholder:font-normal"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-gray-400 font-medium">Total Monthly Spend</span>
                  <span className="text-3xl font-bold text-white">₹{totalSpend.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex gap-3 md:gap-4">
                    <button
                      onClick={() => setStep(1)}
                      className="px-6 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-sm md:text-base text-gray-400 bg-white/5 hover:bg-white/10 hover:text-white transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleAnalyze}
                      disabled={totalSpend === 0}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-base md:text-lg shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      Continue
                      <CreditCard className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-center text-xs font-medium text-gray-500 flex items-center justify-center gap-1.5">
                    <span className="text-gray-400">🔒</span> No data stored, instant results
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">Step 3 of 3</span>
                <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-emerald-500" />
                </div>
              </div>
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CreditCard className="w-10 h-10 text-emerald-500" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Your Report is Ready!</h2>
                <p className="text-sm md:text-base text-gray-400 max-w-sm mx-auto">
                  We've found the perfect cards to maximize your savings based on your ₹{totalSpend.toLocaleString('en-IN')} monthly spend.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Where should we send your full savings report?</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="w-full px-5 py-3 md:py-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={loading || !formData.email.includes('@')}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-xl md:rounded-2xl font-bold text-lg shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Analyzing 200+ Cards...</span>
                      <motion.div 
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      />
                    </div>
                  ) : (
                    <>
                      Unlock Full Savings Report
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-gray-500 mt-4">
                  Track, optimize & save ₹10,000+ yearly
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

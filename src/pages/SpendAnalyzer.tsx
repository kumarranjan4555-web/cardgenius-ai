import { useState } from 'react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ShoppingBag, Utensils, Fuel, Receipt, Plane, TrendingUp, Wallet, Loader2 } from 'lucide-react';
import { CREDIT_CARDS } from '../constants';
import { auth, db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../utils/errorHandlers';
import { toast } from 'sonner';

export default function SpendAnalyzer() {
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState({
    food: 5000,
    shopping: 10000,
    fuel: 3000,
    bills: 5000,
    travel: 2000
  });

  const handleInputChange = (category: string, value: number) => {
    setExpenses({ ...expenses, [category]: value });
  };

  const calculateSavings = (card: typeof CREDIT_CARDS[0]) => {
    let totalCashback = 0;
    Object.entries(expenses).forEach(([cat, amount]) => {
      const rate = (card.cashbackRate as any)[cat] || 1;
      totalCashback += (Number(amount) * Number(rate)) / 100;
    });
    return Math.round(totalCashback);
  };

  const results = CREDIT_CARDS.map(card => ({
    ...card,
    savings: calculateSavings(card)
  })).sort((a, b) => b.savings - a.savings);

  const bestCard = results[0];

  const chartData = [
    { name: 'Food', value: expenses.food, color: '#10b981' },
    { name: 'Shopping', value: expenses.shopping, color: '#3b82f6' },
    { name: 'Fuel', value: expenses.fuel, color: '#f59e0b' },
    { name: 'Bills', value: expenses.bills, color: '#ef4444' },
    { name: 'Travel', value: expenses.travel, color: '#8b5cf6' }
  ];

  const handleSave = async () => {
    if (!auth.currentUser) {
      toast.error('Please login to save your analysis.');
      return;
    }
    setLoading(true);
    const path = 'spendAnalyses';
    try {
      await addDoc(collection(db, path), {
        uid: auth.currentUser.uid,
        expenses,
        bestCard: bestCard.id,
        monthlySavings: bestCard.savings,
        createdAt: serverTimestamp()
      });
      toast.success('Analysis saved successfully!');
    } catch (error) {
      toast.error('Failed to save analysis.');
      handleFirestoreError(error, OperationType.CREATE, path);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Input Section */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white tracking-tight">Spend Analyzer</h1>
            <p className="text-gray-400">Enter your monthly expenses to find the card that saves you the most.</p>
          </div>

          <div className="bg-[#0B0F0C] p-8 rounded-3xl border border-white/5 shadow-xl space-y-6">
            {[
              { id: 'food', label: 'Food & Dining', icon: Utensils },
              { id: 'shopping', label: 'Shopping', icon: ShoppingBag },
              { id: 'fuel', label: 'Fuel', icon: Fuel },
              { id: 'bills', label: 'Bills & Utilities', icon: Receipt },
              { id: 'travel', label: 'Travel', icon: Plane }
            ].map((item) => (
              <div key={item.id} className="space-y-2">
                <label className="text-sm font-bold text-gray-300 flex items-center gap-2">
                  <item.icon className="w-4 h-4" /> {item.label}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                  <input
                    type="number"
                    value={expenses[item.id as keyof typeof expenses]}
                    onChange={(e) => handleInputChange(item.id, Number(e.target.value))}
                    className="w-full pl-8 pr-5 py-4 rounded-2xl border border-white/10 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-white/5 text-white placeholder:text-gray-600 focus:bg-white/10"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-8">
          {/* Chart Card */}
          <div className="bg-[#0B0F0C] p-8 rounded-3xl border border-white/5 shadow-xl h-[400px]">
            <h3 className="text-lg font-bold text-white mb-4">Expense Distribution</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111814', borderColor: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend wrapperStyle={{ color: '#9ca3af' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Best Match Result */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 rounded-3xl text-white shadow-[0_0_30px_rgba(16,185,129,0.2)] relative overflow-hidden"
          >
            <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest mb-1">Best Card for You</p>
                  <h2 className="text-3xl font-bold">{bestCard.name}</h2>
                </div>
                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest mb-1">Monthly Savings</p>
                  <p className="text-4xl font-bold">₹{bestCard.savings}</p>
                </div>
                <div>
                  <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest mb-1">Yearly Savings</p>
                  <p className="text-4xl font-bold">₹{bestCard.savings * 12}</p>
                </div>
              </div>

              <button 
                onClick={handleSave}
                disabled={loading || !auth.currentUser}
                className="w-full bg-white text-emerald-600 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wallet className="w-5 h-5" />}
                {auth.currentUser ? 'Save Analysis' : 'Login to Save'}
              </button>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

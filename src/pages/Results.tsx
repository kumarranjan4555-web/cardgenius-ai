import { useLocation, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Info, AlertTriangle, CheckCircle2, Zap, TrendingUp, Lock, Star, ChevronRight, PieChart } from 'lucide-react';
import Card from '../components/Card';
import { CreditCard } from '../types';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function Results() {
  const location = useLocation();
  const recommendations = location.state?.recommendations as CreditCard[] || [];
  const formData = location.state?.formData;

  if (recommendations.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">No Recommendations Found</h2>
        <p className="text-gray-600">We couldn't find any cards matching your criteria. Try adjusting your income or spending habits.</p>
        <Link to="/selector" className="inline-block bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold">
          Try Again
        </Link>
      </div>
    );
  }

  // Calculate insights
  const spending = formData?.spending || { food: 0, shopping: 0, fuel: 0, bills: 0, travel: 0 };
  const totalSpend: number = Object.values(spending).reduce((acc: number, val: any) => acc + (Number(val) || 0), 0) as number;
  
  const categories = Object.entries(spending).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value: Number(value) || 0
  })).filter(c => c.value > 0).sort((a, b) => b.value - a.value);

  const topCategory = categories.length > 0 ? categories[0] : { name: 'None', value: 0 };
  const topCategoryPercentage = totalSpend > 0 ? Math.round((topCategory.value / totalSpend) * 100) : 0;
  
  // Fake savings calculation for demo
  const monthlySavings = Math.round(totalSpend * 0.05); // Assume 5% average savings
  const yearlySavings = monthlySavings * 12;

  const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899'];

  return (
    <div className="bg-[#0B0F0C] min-h-screen pb-24 font-sans text-white selection:bg-emerald-500/30">
      {/* Header */}
      <div className="bg-[#111814] border-b border-white/5 pt-8 pb-12 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <Link to="/selector" className="text-emerald-500 font-medium flex items-center gap-2 text-sm hover:text-emerald-400 transition-colors w-fit">
            <ArrowLeft className="w-4 h-4" /> Back to Editor
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 fill-emerald-400" />
                Analysis Complete
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Your Savings Report</h1>
              <p className="text-gray-400 max-w-2xl text-lg">We analyzed your ₹{totalSpend.toLocaleString('en-IN')} monthly spend against 200+ credit cards.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        
        {/* Smart Insights Panel */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            <div className="bg-[#111814] border border-white/5 rounded-3xl p-6 relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors" />
              <div className="relative space-y-4">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-gray-400 font-medium mb-1">Potential Yearly Savings</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-4xl font-bold text-white">₹{yearlySavings.toLocaleString('en-IN')}</h3>
                    <span className="text-emerald-400 font-medium">~5% back</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500">By switching to our top recommended card.</p>
              </div>
            </div>

            <div className="bg-[#111814] border border-white/5 rounded-3xl p-6 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors" />
              <div className="relative space-y-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                  <PieChart className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400 font-medium mb-1">Top Spend Category</p>
                  <h3 className="text-3xl font-bold text-white">{topCategory.name}</h3>
                </div>
                <p className="text-sm text-blue-400 bg-blue-400/10 px-3 py-1.5 rounded-lg inline-block font-medium">
                  {topCategoryPercentage}% of your total spend
                </p>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-[#111814] border border-white/5 rounded-3xl p-6 flex flex-col">
            <h3 className="text-lg font-bold text-white mb-6">Spending Breakdown</h3>
            <div className="flex-1 min-h-[200px] relative">
              {totalSpend > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={categories}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                      animationBegin={0}
                      animationDuration={1500}
                    >
                      {categories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`}
                      contentStyle={{ backgroundColor: '#1A231C', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                      itemStyle={{ color: '#fff' }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">No data</div>
              )}
              {totalSpend > 0 && (
                <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total</span>
                  <span className="text-xl font-bold text-white">₹{totalSpend >= 1000 ? `${(totalSpend/1000).toFixed(1)}k` : totalSpend}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recommended Cards Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Top 3 Card Matches</h2>
            <span className="text-sm text-gray-400 hidden sm:block">Sorted by highest rewards</span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendations.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card card={card} featured={i === 0} monthlySpend={totalSpend} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">Detailed Comparison</h2>
          </div>
          <div className="overflow-x-auto bg-[#111814] rounded-3xl border border-white/5 shadow-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/5">
                  <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Feature</th>
                  {recommendations.map(card => (
                    <th key={card.id} className="p-6 text-sm font-bold text-white">{card.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Annual Fee', key: 'annualFee', prefix: '₹' },
                  { label: 'Interest Rate', key: 'interestRate', suffix: '% p.m.' },
                  { label: 'Late Payment Fee', key: 'latePaymentFee', prefix: '₹' },
                  { label: 'Min. Income', key: 'minIncome', prefix: '₹' }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                    <td className="p-6 text-sm font-bold text-gray-400">{row.label}</td>
                    {recommendations.map(card => (
                      <td key={card.id} className="p-6 text-sm font-medium text-gray-300">
                        {row.prefix}{card[row.key as keyof CreditCard] as number}{row.suffix}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                  <td className="p-6 text-sm font-bold text-gray-400">Worth It Score</td>
                  {recommendations.map((_, i) => (
                    <td key={i} className="p-6">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, j) => (
                          <div key={j} className={`w-4 h-1.5 rounded-full ${j < (5 - i) ? 'bg-emerald-500' : 'bg-white/10'}`} />
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Trust & Next Steps */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#111814] p-8 rounded-3xl border border-white/5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500/10 p-2 rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Why trust these results?</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">Our algorithm cross-references your spending habits with over 200+ card benefit rules to ensure you get the absolute best value for every rupee you spend.</p>
          </div>
          <div className="bg-[#111814] p-8 rounded-3xl border border-white/5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/10 p-2 rounded-xl">
                <Info className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white">What's next?</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">Click "Apply Now" to be redirected to the official bank website. Make sure to have your PAN and Aadhaar ready for a smooth application process.</p>
          </div>
        </div>

        {/* Premium Features Lock */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#111814]">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
          <div className="p-8 md:p-12 text-center space-y-6 relative z-10">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-orange-500/20">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-2 max-w-xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-white">Unlock Advanced Insights</h2>
              <p className="text-gray-400 text-lg">Get access to hidden charges alerts, side-by-side card comparisons, and a personalized credit building strategy.</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 py-4">
              {['Card Comparison', 'Hidden Charges Alert', 'Best Card Strategy Plan'].map((feature, i) => (
                <div key={i} className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium text-gray-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  {feature}
                </div>
              ))}
            </div>

            <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all flex items-center justify-center gap-2 mx-auto">
              Upgrade to Pro ₹299/month
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Trust Section */}
        <section className="py-8 border-t border-white/10">
          <div className="text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white">Trusted by 10,000+ users</h2>
              <p className="text-emerald-400 font-medium text-lg">Average savings ₹8,500/year</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                { name: "Rahul Sharma", role: "Software Engineer", text: "I was using a basic card for years. This tool showed me I was losing ₹12,000 a year in cashback. Switched instantly." },
                { name: "Priya Patel", role: "Marketing Manager", text: "The UI is incredibly smooth. Found a card that gives me free lounge access and 5% on my Swiggy orders. Highly recommend!" },
                { name: "Amit Kumar", role: "Business Owner", text: "Finally a tool that doesn't just push random cards. The insights actually made sense based on my heavy travel spending." }
              ].map((testimonial, i) => (
                <div key={i} className="bg-[#111814] p-6 rounded-3xl border border-white/5 space-y-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-gray-300 leading-relaxed text-sm">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{testimonial.name}</p>
                      <p className="text-gray-500 text-xs">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#0B0F0C]/90 backdrop-blur-lg border-t border-white/10 md:hidden z-50">
        <a
          href={recommendations[0]?.applyUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
        >
          Apply for Top Match
          <ChevronRight className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}

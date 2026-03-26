import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, PieChart, Search, ShieldCheck, Star, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  const features = [
    {
      icon: Search,
      title: 'Smart Card Selector',
      desc: 'AI-powered recommendations based on your unique spending profile.',
      link: '/selector'
    },
    {
      icon: PieChart,
      title: 'Spend Analyzer',
      desc: 'Calculate potential cashback and find the most rewarding card for you.',
      link: '/analyzer'
    },
    {
      icon: ShieldCheck,
      title: 'Eligibility Checker',
      desc: 'Check your approval chances before you apply to save your credit score.',
      link: '/eligibility'
    }
  ];

  return (
    <div className="space-y-24 pb-24 bg-[#0B0F0C] min-h-screen font-sans selection:bg-emerald-500/30">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-1/4 w-[30rem] h-[30rem] bg-teal-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs font-bold uppercase tracking-widest backdrop-blur-sm"
            >
              <Zap className="w-4 h-4 fill-emerald-400" />
              AI-Powered Credit Card Discovery
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1]"
            >
              Find the Best Credit Card for You in <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">60 Seconds</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
              Stop guessing. Use CardGenius AI to analyze your spending and get personalized recommendations that maximize your rewards and savings.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Link
                to="/selector"
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2"
              >
                Find My Best Card
                <ArrowRight className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No CIBIL Impact
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#111814] p-8 rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors" />
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors relative z-10">
                <feature.icon className="w-7 h-7 text-emerald-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 relative z-10">{feature.title}</h3>
              <p className="text-gray-400 mb-8 leading-relaxed relative z-10">{feature.desc}</p>
              <Link to={feature.link} className="text-emerald-400 font-bold flex items-center gap-2 hover:gap-3 transition-all relative z-10">
                Try Tool <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 border-y border-white/5 bg-[#111814]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-10">Trusted by Experts & Users</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 font-bold text-2xl text-white"><CheckCircle2 className="w-8 h-8 text-emerald-500" /> Forbes</div>
            <div className="flex items-center gap-2 font-bold text-2xl text-white"><CheckCircle2 className="w-8 h-8 text-emerald-500" /> TechCrunch</div>
            <div className="flex items-center gap-2 font-bold text-2xl text-white"><CheckCircle2 className="w-8 h-8 text-emerald-500" /> Mint</div>
            <div className="flex items-center gap-2 font-bold text-2xl text-white"><CheckCircle2 className="w-8 h-8 text-emerald-500" /> Economic Times</div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">What Our Users Say</h2>
          <p className="text-emerald-400 font-medium">Join 50,000+ smart spenders</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: 'Rahul Sharma', role: 'Software Engineer', text: 'Found the perfect card for my Amazon shopping. Saving ₹2000+ every month now!' },
            { name: 'Priya Patel', role: 'Marketing Manager', text: 'The eligibility checker is a lifesaver. Avoided a rejection and got my first premium card.' },
            { name: 'Ankit Verma', role: 'Business Owner', text: 'Spend analyzer showed me exactly where I was losing out on rewards. Highly recommended!' }
          ].map((t, i) => (
            <div key={i} className="bg-[#111814] p-8 rounded-3xl border border-white/5">
              <div className="flex gap-1 text-amber-400 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-gray-300 italic mb-8 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-white">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {[
            { q: 'Is CardGenius AI free to use?', a: 'Yes, our core tools are completely free for all users.' },
            { q: 'How accurate are the recommendations?', a: 'Our AI analyzes real-time card benefits and your spending patterns to provide 95%+ accurate matches.' },
            { q: 'Does checking eligibility affect my credit score?', a: 'No, our eligibility checker performs a soft check which does not impact your CIBIL score.' }
          ].map((faq, i) => (
            <details key={i} className="group bg-[#111814] border border-white/5 rounded-2xl p-6 cursor-pointer hover:border-white/10 transition-colors">
              <summary className="font-bold text-white flex justify-between items-center list-none">
                {faq.q}
                <span className="group-open:rotate-180 transition-transform text-emerald-500">▼</span>
              </summary>
              <p className="mt-4 text-gray-400 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}

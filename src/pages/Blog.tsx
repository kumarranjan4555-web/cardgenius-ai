import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';
import { BLOG_POSTS } from '../constants';

export default function Blog() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
          <BookOpen className="w-3 h-3" />
          Learning Center
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Master Your Credit</h1>
        <p className="text-gray-400">Expert advice on credit cards, rewards, and financial health in India.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {BLOG_POSTS.map((post, i) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="aspect-[2/1] rounded-3xl overflow-hidden mb-6 relative border border-white/5">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-[#0B0F0C]/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white flex items-center gap-1">
                  <Tag className="w-3 h-3 text-emerald-400" />
                  Guide
                </span>
                <span className="bg-[#0B0F0C]/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white flex items-center gap-1">
                  <Clock className="w-3 h-3 text-blue-400" />
                  5 min read
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight">
                {post.title}
              </h2>
              <p className="text-gray-400 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-2 text-emerald-400 font-bold group-hover:gap-3 transition-all">
                Read Article <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Newsletter */}
      <section className="bg-[#111814] border border-white/5 rounded-[40px] p-8 md:p-16 text-center space-y-8 relative overflow-hidden">
        <div className="relative z-10 max-w-xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Get the latest card offers in your inbox</h2>
          <p className="text-gray-400">Join 10,000+ subscribers and never miss a limited-time credit card deal again.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-[#0B0F0C] border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-gray-600"
            />
            <button className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-500 transition-all shadow-[0_0_20px_rgba(5,150,105,0.3)]">
              Subscribe
            </button>
          </div>
        </div>
        
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      </section>
    </div>
  );
}

import { CreditCard, Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0B0F0C] border-t border-white/5 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-emerald-500 p-2 rounded-xl group-hover:scale-105 transition-transform">
                <CreditCard className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">CardGenius <span className="text-emerald-500">AI</span></span>
            </Link>
            <p className="text-gray-400 max-w-sm leading-relaxed">
              Empowering Indian users to make smarter credit card choices through AI-driven insights and transparent analysis.
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Tools</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              <li><Link to="/selector" className="hover:text-emerald-400 transition-colors">Card Selector</Link></li>
              <li><Link to="/analyzer" className="hover:text-emerald-400 transition-colors">Spend Analyzer</Link></li>
              <li><Link to="/eligibility" className="hover:text-emerald-400 transition-colors">Eligibility Checker</Link></li>
              <li><Link to="/charges" className="hover:text-emerald-400 transition-colors">Charges Detector</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-emerald-400 transition-colors">Learning Center</Link></li>
              <li><Link to="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              <li><a href="mailto:support@cardgenius.ai" className="hover:text-emerald-400 transition-colors">Contact Support</a></li>
              <li><Link to="/faq" className="hover:text-emerald-400 transition-colors">Help Center</Link></li>
              <li><Link to="/feedback" className="hover:text-emerald-400 transition-colors">Give Feedback</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500 font-medium">
          <p>© 2024 CardGenius AI. All rights reserved.</p>
          <p className="flex items-center gap-1">Made with ❤️ for Indian Credit Users</p>
        </div>
      </div>
    </footer>
  );
}

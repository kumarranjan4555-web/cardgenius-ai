import { Link, useLocation } from 'react-router-dom';
import { CreditCard, Menu, X, User, PieChart, ShieldCheck, BookOpen, FileText, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(auth.currentUser);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const mainNavLinks = [
    { name: 'Card Selector', path: '/selector', icon: CreditCard },
    { name: 'Spend Analyzer', path: '/analyzer', icon: PieChart },
    { name: 'Eligibility', path: '/eligibility', icon: ShieldCheck },
    { name: 'Blog', path: '/blog', icon: BookOpen },
  ];

  const secondaryNavLinks = [
    { name: 'Saved Reports', path: '/reports', icon: FileText },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Help', path: '/help', icon: HelpCircle },
  ];

  const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
          <div className="bg-emerald-500 p-2.5 rounded-xl group-hover:scale-105 transition-transform shadow-lg shadow-emerald-500/20">
            <CreditCard className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-white">CardGenius <span className="text-emerald-500">AI</span></span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-8">
        <div className="space-y-1">
          <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Menu</p>
          {mainNavLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/10 text-emerald-400 font-bold border border-emerald-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 font-medium'
                }`}
              >
                <link.icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-gray-500'}`} />
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="space-y-1">
          <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Account</p>
          {secondaryNavLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/10 text-emerald-400 font-bold border border-emerald-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 font-medium'
                }`}
              >
                <link.icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-gray-500'}`} />
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="p-4 mt-auto">
        <div className="border-t border-white/5 pt-4">
          {user ? (
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full border border-white/10" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                )}
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-white truncate">{user.displayName}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="w-full flex items-center justify-center gap-2 text-sm font-bold text-red-400 hover:text-red-300 hover:bg-red-400/10 py-2.5 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <button
                onClick={() => { handleLogin(); setIsOpen(false); }}
                className="w-full bg-white text-gray-900 hover:bg-gray-100 px-4 py-3.5 rounded-2xl text-sm font-bold transition-colors flex items-center justify-center gap-3 shadow-lg"
              >
                <GoogleIcon />
                Continue with Google
              </button>
              <p className="text-xs text-center text-gray-500 font-medium">
                Save your analysis & track savings
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-[#0B0F0C] border-b border-white/5 sticky top-0 z-40 px-4 h-16 flex items-center justify-between backdrop-blur-md bg-opacity-80">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-emerald-500 p-1.5 rounded-lg">
            <CreditCard className="text-white w-5 h-5" />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-white">CardGenius</span>
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 fixed inset-y-0 left-0 bg-[#0B0F0C] border-r border-white/5 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-[#0B0F0C] border-r border-white/5 z-50 md:hidden flex flex-col shadow-2xl"
            >
              <div className="absolute right-4 top-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

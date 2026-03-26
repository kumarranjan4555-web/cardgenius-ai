import { Link, useLocation } from 'react-router-dom';
import { CreditCard, Menu, X, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
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

  const navLinks = [
    { name: 'Card Selector', path: '/selector' },
    { name: 'Spend Analyzer', path: '/analyzer' },
    { name: 'Eligibility', path: '/eligibility' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <nav className="bg-[#0B0F0C] border-b border-white/5 sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-emerald-500 p-2 rounded-xl group-hover:scale-105 transition-transform">
              <CreditCard className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">CardGenius <span className="text-emerald-500">AI</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold transition-colors ${
                  location.pathname === link.path
                    ? 'text-emerald-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full border border-white/10" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-400" />
                    </div>
                  )}
                  <span className="hidden lg:inline">{user.displayName?.split(' ')[0]}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm font-bold text-gray-400 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-white/10 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0B0F0C] border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-4 rounded-xl text-base font-bold ${
                    location.pathname === link.path
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/5 mt-4">
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 px-3">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full border border-white/10" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-bold text-white">{user.displayName}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => { handleLogout(); setIsOpen(false); }}
                      className="w-full text-left px-3 py-3 text-red-400 font-bold hover:bg-white/5 rounded-xl"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { handleLogin(); setIsOpen(false); }}
                    className="w-full bg-emerald-500 text-white px-4 py-4 rounded-xl font-bold text-base"
                  >
                    Sign In with Google
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

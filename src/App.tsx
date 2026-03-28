import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CardSelector from './pages/CardSelector';
import SpendAnalyzer from './pages/SpendAnalyzer';
import EligibilityChecker from './pages/EligibilityChecker';
import Results from './pages/Results';
import Blog from './pages/Blog';
import ChargesDetector from './pages/ChargesDetector';
import ErrorBoundary from './components/ErrorBoundary';
import { useEffect } from 'react';
import { db } from './firebase';
import { doc, getDocFromServer } from 'firebase/firestore';
import { Toaster } from 'sonner';

export default function App() {
  useEffect(() => {
    // Validate connection to Firestore as per guidelines
    const testConnection = async () => {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration.");
        }
      }
    };
    testConnection();
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-[#0B0F0C] flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0 md:pl-64">
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/selector" element={<CardSelector />} />
                <Route path="/analyzer" element={<SpendAnalyzer />} />
                <Route path="/eligibility" element={<EligibilityChecker />} />
                <Route path="/charges" element={<ChargesDetector />} />
                <Route path="/results" element={<Results />} />
                <Route path="/blog" element={<Blog />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster theme="dark" position="bottom-right" />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

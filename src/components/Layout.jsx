import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useData } from '../context/DataContext';

export default function Layout({ children }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const { loading } = useData();

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#0b1329] flex flex-col items-center justify-center z-[9999] gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-white animate-spin" />
        <span className="text-sm font-medium text-white/50 tracking-wide">Memuat...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdmin && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}

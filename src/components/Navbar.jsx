import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from './LanguageToggle';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/ziotech.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data } = useData();
  const { t } = useLanguage();
  const location = useLocation();

  const company = data?.company || { name: 'Ziotech' };

  const navLinks = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.about, path: '/about' },
    { name: t.nav.service, path: '/service' },
    { name: t.nav.project, path: '/project' },
    { name: t.nav.contact, path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    // Cek posisi awal (mis. reload di tengah halaman)
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[var(--primary-dark)]/95 backdrop-blur-md shadow-lg py-2.5'
          : 'bg-transparent py-4 md:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src={logo} 
              alt={company.name} 
              className={`transition-all duration-500 group-hover:scale-105 ${scrolled ? 'h-12 md:h-14' : 'h-14 md:h-16'}`} 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className={`font-medium transition-colors hover:text-white relative text-sm xl:text-base ${
                    isActive ? 'text-white font-semibold' : 'text-gray-200'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[var(--accent-gold)] rounded-full"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            
            {/* Translate Button Desktop */}
            <div className="pl-2 border-l border-white/20">
              <LanguageToggle />
            </div>
          </nav>

          {/* Mobile Right Controls (Toggle + Menu Button) */}
          <div className="flex items-center gap-3 lg:hidden">
            <LanguageToggle />
            <button 
              className="text-white hover:text-[var(--accent-gold)] transition-colors p-1"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Buka menu"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden overflow-hidden ${scrolled ? '' : 'bg-[var(--primary-dark)]/95 backdrop-blur-md'}`}
          >
            <div className="px-4 pt-4 pb-6 flex flex-col space-y-2 border-t border-white/10 mt-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive 
                    ? 'bg-[var(--accent-gold)]/15 text-[var(--accent-gold)] border border-[var(--accent-gold)]/30'
                    : 'text-gray-200 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/ziotech.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data } = useData();
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const company = data?.company || { name: 'Ziotech' };

  const navLinks = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.about, path: '/about' },
    { name: t.nav.service, path: '/service' },
    { name: t.nav.project, path: '/project' },
    { name: t.nav.contact, path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleNavClick = (path) => {
    setIsOpen(false);
    if (location.pathname === path) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      navigate(path);
    }
  };

  return (
    <>
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
          <button onClick={() => handleNavClick('/')} className="flex items-center gap-2 group">
            <img
              src={logo}
              alt={company.name}
              className={`transition-all duration-500 group-hover:scale-105 ${scrolled ? 'h-12 md:h-14' : 'h-14 md:h-16'}`}
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.path)}
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
                </button>
              );
            })}
            {/* Translate Button Desktop - DISABLED */}
            {/* <div className="pl-2 border-l border-white/20"><LanguageToggle /></div> */}
          </nav>

          {/* Mobile Hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* <LanguageToggle /> DISABLED */}
            <button
              className="text-white hover:text-[var(--accent-gold)] transition-colors p-1 relative z-[60]"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Buka menu"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>
      </header>

      {/* Mobile overlay */}
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-[9998] lg:hidden flex flex-col bg-black/80 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            >
              {/* Header bar overlay */}
              <div className="flex items-center justify-between px-5 py-4 shrink-0 border-b border-white/10 bg-transparent">
                <img src={logo} alt={company.name} className="h-12 no-placeholder" />
                <button
                  className="text-white hover:text-gray-300 transition-colors p-1"
                  onClick={() => setIsOpen(false)}
                  aria-label="Tutup menu"
                >
                  <X size={26} />
                </button>
              </div>

              {/* Nav items */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, delay: 0.05 }}
                className="flex flex-col w-full h-full pt-4 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {navLinks.map((link, idx) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.button
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + idx * 0.05 }}
                      onClick={() => handleNavClick(link.path)}
                      className={`w-full flex items-center justify-between px-6 py-5 text-left text-lg transition-colors border-b border-white/5 ${
                        isActive
                          ? 'text-white font-bold'
                          : 'text-gray-400 hover:text-white font-medium'
                      }`}
                    >
                      {link.name}
                      <ChevronRight size={20} className={isActive ? "text-white" : "text-gray-600"} />
                    </motion.button>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
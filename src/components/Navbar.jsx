import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Menu, X, ChevronRight, Home, Building2, Wrench, Briefcase, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/ziotech.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  const company = data?.company || { name: 'Ziotech' };

  const navLinks = [
    { name: 'Beranda', path: '/', icon: Home },
    { name: 'Tentang Kami', path: '/about', icon: Building2 },
    { name: 'Layanan', path: '/service', icon: Wrench },
    { name: 'Proyek', path: '/project', icon: Briefcase },
    { name: 'Kontak', path: '/contact', icon: Phone },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [trackedPath, setTrackedPath] = useState(location.pathname);
  if (location.pathname !== trackedPath) {
    setTrackedPath(location.pathname);
    setIsOpen(false);
  }

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
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/10 shadow-lg py-2.5'
            : 'bg-transparent py-4 md:py-5'
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button onClick={() => handleNavClick('/')} className="flex items-center gap-2 group cursor-pointer">
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
                  className={`font-medium transition-colors hover:text-white relative text-sm xl:text-base cursor-pointer ${
                    isActive ? 'text-white font-semibold' : 'text-gray-200'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-sky-400 origin-center"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              className="text-white hover:text-sky-400 p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer relative z-[60]"
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
              className="fixed inset-0 z-[9998] lg:hidden flex flex-col bg-black/75 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
            >
              {/* Header bar overlay */}
              <div className="flex items-center justify-between px-5 py-4 shrink-0 border-b border-white/10 bg-transparent">
                <div className="flex items-center gap-3">
                  <img src={logo} alt={company.name} className="h-9 w-auto no-placeholder object-contain" />
                  <span className="text-white text-lg font-bold tracking-tight">{company.name || 'Ziotech'}</span>
                </div>
                <button
                  className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={() => setIsOpen(false)}
                  aria-label="Tutup menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Nav items */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, delay: 0.05 }}
                className="flex flex-col w-full h-full pt-3 overflow-y-auto pb-6"
                onClick={(e) => e.stopPropagation()}
              >
                {navLinks.map((link, idx) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.button
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + idx * 0.04 }}
                      onClick={() => handleNavClick(link.path)}
                      className={`w-full flex items-center justify-between px-6 py-4 text-left text-base transition-colors border-b border-white/5 cursor-pointer ${
                        isActive
                          ? 'text-white font-bold bg-white/10'
                          : 'text-slate-300 hover:text-white font-medium hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <Icon size={20} className={isActive ? 'text-sky-400' : 'text-slate-400'} />
                        <span>{link.name}</span>
                      </div>
                      <ChevronRight size={18} className={isActive ? 'text-sky-400' : 'text-slate-600'} />
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
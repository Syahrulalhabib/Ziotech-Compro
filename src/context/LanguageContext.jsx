import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

// Helpers — strip/add /en prefix without touching React Router
function getLangFromUrl() {
  return window.location.pathname.startsWith('/en') ? 'en' : 'id';
}

function syncUrlToLang(lang) {
  const path = window.location.pathname;
  const search = window.location.search;
  const hash = window.location.hash;

  if (lang === 'en') {
    if (!path.startsWith('/en')) {
      const newPath = '/en' + (path === '/' ? '' : path);
      window.history.replaceState(null, '', newPath + search + hash);
    }
  } else {
    if (path.startsWith('/en')) {
      const stripped = path.slice(3) || '/';
      window.history.replaceState(null, '', stripped + search + hash);
    }
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    // URL wins over localStorage on first load
    const fromUrl = getLangFromUrl();
    if (fromUrl === 'en') return 'en';
    return localStorage.getItem('ziotech_lang') || 'id';
  });

  useEffect(() => {
    localStorage.setItem('ziotech_lang', lang);
    document.documentElement.lang = lang;
    syncUrlToLang(lang);
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => (prev === 'id' ? 'en' : 'id'));
  };

  const t = translations[lang] || translations.id;

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}

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
  // TRANSLATE_DISABLED: always default to 'id', ignore URL/localStorage lang state
  const [lang, setLang] = useState('id');

  useEffect(() => {
    document.documentElement.lang = 'id';
    localStorage.removeItem('ziotech_lang');
    // Strip /en prefix if user lands on it from old bookmark/cache
    if (window.location.pathname.startsWith('/en')) {
      const stripped = window.location.pathname.slice(3) || '/';
      window.history.replaceState(null, '', stripped + window.location.search + window.location.hash);
    }
  }, []);

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

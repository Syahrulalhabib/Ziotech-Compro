import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

// Keeps /en prefix in sync with React Router navigation
export default function LangUrlSync() {
  const { pathname } = useLocation();
  const { lang } = useLanguage();

  useEffect(() => {
    if (lang === 'en' && !pathname.startsWith('/en')) {
      // React Router navigated to a path without /en prefix — re-add it
      const newPath = '/en' + (pathname === '/' ? '' : pathname);
      window.history.replaceState(null, '', newPath + window.location.search + window.location.hash);
    }
  }, [pathname, lang]);

  return null;
}

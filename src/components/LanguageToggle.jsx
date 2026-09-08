import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

export default function LanguageToggle({ className = '' }) {
  const { lang, toggleLang } = useLanguage();
  const { translating } = useData();

  return (
    <button
      type="button"
      onClick={toggleLang}
      disabled={translating}
      title={lang === 'id' ? 'Switch to English' : 'Ubah ke Bahasa Indonesia'}
      aria-label="Toggle language"
      className={`relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold tracking-wider transition-all duration-300 border border-white/20 bg-white/10 hover:bg-white/20 text-white shadow-sm backdrop-blur-sm disabled:opacity-60 disabled:cursor-wait ${className}`}
    >
      {translating ? (
        <svg className="w-3.5 h-3.5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
        </svg>
      ) : (
        <>
          <span className="uppercase text-[11px] font-semibold tracking-normal text-white drop-shadow-sm">
            {lang === 'id' ? 'ID' : 'EN'}
          </span>
          {lang === 'id' ? (
            <svg
              className="w-4 h-4 rounded-full shadow-sm shrink-0 overflow-hidden ring-1 ring-white/30"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <clipPath id="circle-id">
                <circle cx="256" cy="256" r="256" />
              </clipPath>
              <g clipPath="url(#circle-id)">
                <rect width="512" height="256" fill="#e70011" />
                <rect y="256" width="512" height="256" fill="#ffffff" />
              </g>
            </svg>
          ) : (
            <svg
              className="w-4 h-4 rounded-full shadow-sm shrink-0 overflow-hidden ring-1 ring-white/30"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <clipPath id="circle-us">
                <circle cx="256" cy="256" r="256" />
              </clipPath>
              <g clipPath="url(#circle-us)">
                <rect width="512" height="512" fill="#bd3d44" />
                <path stroke="#fff" strokeWidth="39" d="M0,59H512M0,137H512M0,216H512M0,295H512M0,373H512M0,452H512" />
                <rect width="205" height="276" fill="#192f5d" />
                <circle cx="50" cy="50" r="10" fill="#fff" />
                <circle cx="102" cy="50" r="10" fill="#fff" />
                <circle cx="154" cy="50" r="10" fill="#fff" />
                <circle cx="76" cy="90" r="10" fill="#fff" />
                <circle cx="128" cy="90" r="10" fill="#fff" />
                <circle cx="50" cy="130" r="10" fill="#fff" />
                <circle cx="102" cy="130" r="10" fill="#fff" />
                <circle cx="154" cy="130" r="10" fill="#fff" />
                <circle cx="76" cy="170" r="10" fill="#fff" />
                <circle cx="128" cy="170" r="10" fill="#fff" />
                <circle cx="50" cy="210" r="10" fill="#fff" />
                <circle cx="102" cy="210" r="10" fill="#fff" />
                <circle cx="154" cy="210" r="10" fill="#fff" />
              </g>
            </svg>
          )}
        </>
      )}
    </button>
  );
}


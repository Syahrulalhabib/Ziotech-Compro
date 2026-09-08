import { useLanguage } from '../context/LanguageContext';

export default function LanguageToggle({ className = '' }) {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLang}
      title={lang === 'id' ? 'Switch to English' : 'Ubah ke Bahasa Indonesia'}
      aria-label="Toggle language"
      className={`relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold tracking-wider transition-all duration-300 border border-white/20 bg-white/10 hover:bg-white/20 text-white shadow-sm backdrop-blur-sm ${className}`}
    >
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
            {/* Simple star cluster representation */}
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
    </button>
  );
}

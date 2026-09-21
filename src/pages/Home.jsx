import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useCountUp } from '../hooks/useCountUp';
import { 
  ArrowRight, 
  ArrowUpRight,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getServiceIcon } from '../data/serviceIcons';

/** Parses "10+", "99%", ">50", "250+", "100" → { prefix, num, suffix } */
function parseStat(value) {
  const str = String(value ?? '').trim();
  const match = str.match(/^([^\d]*)(\d+)(.*)$/);
  if (!match) return { prefix: '', num: 0, suffix: str };
  return {
    prefix: match[1] || '',
    num: parseInt(match[2], 10) || 0,
    suffix: match[3] || ''
  };
}

function StatCounter({ value, className }) {
  const { prefix, num, suffix } = parseStat(value);
  const { count, ref } = useCountUp(num);
  return (
    <div ref={ref} className={className}>
      {prefix}{count}{suffix}
    </div>
  );
}

/**
 * Komponen rendering logo mitra.
 * Menggunakan tag <img> standar agar aset transparan dari cPanel / public assets
 * tampil tajam dan murni tanpa distorsi filter/canvas.
 */
function PartnerLogoImage({ src, alt }) {
  if (!src) return null;

  // Mendukung path lokal cpanel / public (cth: "/assets/partners/pertamina.png")
  const resolvedSrc = (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/') || src.startsWith('data:'))
    ? src
    : `/${src}`;

  return (
    <img 
      src={resolvedSrc} 
      alt={alt || 'Mitra'} 
      className="max-h-12 max-w-[85%] w-auto object-contain transition-all duration-300 group-hover:scale-105"
      loading="lazy"
    />
  );
}

export default function Home() {
  const { data } = useData();
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [activeTabCategory, setActiveTabCategory] = useState('ALL');
  const [activeNewsCategory, setActiveNewsCategory] = useState('Press Release');

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndX = useRef(0);
  const touchEndY = useRef(0);

  const heroData = {
    heroTitle: data?.home?.heroTitle || 'Keunggulan Rekayasa & Keandalan Infrastruktur Industri',
    heroSubtitle: data?.home?.heroSubtitle || 'PT. Ziotech Global Inovasi hadir sebagai mitra strategis dengan komitmen pada presisi teknik, efisiensi operasional, dan kepatuhan standar K3LH tinggi.',
    heroImages: (Array.isArray(data?.home?.heroImages) && data.home.heroImages.length > 0)
      ? data.home.heroImages
      : [
          'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
          'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
          'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
          'https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
        ],
    heroTitles: (Array.isArray(data?.home?.heroTitles) && data.home.heroTitles.length > 0)
      ? data.home.heroTitles
      : [
          'Rekayasa Sistem MEP',
          'Konstruksi Sipil & Bangunan',
          'Rantai Pasok Industri & Tambang',
          'Digitalisasi & Otomasi Gedung',
          'Keandalan Operasional'
        ],
    heroInterval: data?.home?.heroInterval || 5000,
    ...data?.home
  };
  const homeData = heroData;

  const images = heroData.heroImages;
  const interval = heroData.heroInterval;
  const heroTitles = heroData.heroTitles;
  const activeHeroIndex = images.length > 0 ? currentHeroIndex % images.length : 0;

  const prevSlide = () => {
    if (images.length === 0) return;
    setCurrentHeroIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    if (images.length === 0) return;
    setCurrentHeroIndex((prev) => (prev + 1) % images.length);
  };

  // Preload semua hero images dengan cleanup yang tepat
  useEffect(() => {
    const links = images.map((src, i) => {
      if (!src) return null;
      const link = document.createElement('link');
      link.rel = i === 0 ? 'preload' : 'prefetch';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
      return link;
    });
    return () => {
      links.forEach((link) => {
        if (link && link.parentNode) link.parentNode.removeChild(link);
      });
    };
  }, [images]);

  // Auto-slide hero slider
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const diffX = touchStartX.current - touchEndX.current;
    const diffY = touchStartY.current - touchEndY.current;
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) nextSlide();
      else prevSlide();
    }
  };

  const services = (() => {
    const rawList = Array.isArray(data?.services) ? data.services : [];
    return rawList
      .filter(s => Boolean(s.featured))
      .map((svc, idx) => ({
        id: svc.id || idx + 1,
        title: svc.title,
        icon: getServiceIcon(svc.icon, idx),
        desc: svc.description,
        image: svc.image
      }));
  })();

  const allProjects = Array.isArray(data?.projects) ? data.projects : [];
  const featuredProjects = allProjects.filter(p => Boolean(p.featured));

  const filteredProjects = activeTabCategory === 'ALL'
    ? featuredProjects
    : featuredProjects.filter(p => (p.category || '').toUpperCase().includes(activeTabCategory));

  const allNews = Array.isArray(data?.news) ? data.news : [];
  const newsCategories = Array.from(new Set(allNews.map(n => n.category).filter(Boolean)));
  const currentNewsCategory = (activeNewsCategory && newsCategories.some(c => c.toLowerCase() === activeNewsCategory.toLowerCase()))
    ? activeNewsCategory
    : (newsCategories[0] || '');
  const filteredNews = allNews.filter(item => 
    !currentNewsCategory || (item.category || '').toLowerCase() === currentNewsCategory.toLowerCase()
  );
  const featuredNews = filteredNews.find(n => n.featured) || filteredNews[0] || null;
  const gridNews = filteredNews
    .filter(n => n.id !== featuredNews?.id)
    .slice(0, 4);

  // Focus Pillars dinamis dari CMS — ikut layanan yang ada di database
  const FP_FALLBACK_IMAGES = [
    'https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  ];
  const allServicesRaw = Array.isArray(data?.services) ? data.services : [];
  const focusPillars = (allServicesRaw.length > 0 ? allServicesRaw : [
    { id: 1, title: 'Mechanical, Electrical & Plumbing (MEP)', description: 'Instalasi sistem engineering presisi tinggi gedung & fasilitas industri.', image: '' },
    { id: 2, title: 'Konstruksi Sipil & Bangunan Komersial', description: 'Pengerjaan struktur kokoh dengan standar keamanan dan K3 terdepan.', image: '' },
    { id: 3, title: 'Suplai & Penunjang Pertambangan', description: 'Pengadaan komponen teknis dan perawatan fasilitas operasional tambang.', image: '' },
    { id: 4, title: 'Solusi Digitalisasi & Otomasi Gedung', description: 'Sistem Building Automation & pemantauan energi pintar terintegrasi.', image: '' },
  ]).slice(0, 4).map((s, idx) => ({
    label: s.category || (idx === 0 ? 'LAYANAN UTAMA' : idx === 1 ? 'INFRASTRUKTUR' : idx === 2 ? 'INDUSTRI & TAMBANG' : 'TRANSFORMASI'),
    title: s.title,
    desc: s.description,
    link: `/service/${s.id}`,
    image: s.image || FP_FALLBACK_IMAGES[idx] || FP_FALLBACK_IMAGES[0],
  }));

  return (
    <div className="bg-white text-[#0f172a] selection:bg-[#0284c7] selection:text-white">
      {/* 1. HERO SECTION (Responsive proportional Banner ala PaperInk, Pertamina signature bottom bar) */}
      <section
        className="relative w-full min-h-[380px] sm:min-h-0 sm:aspect-[16/9] flex flex-col justify-between pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-2.5 sm:pb-4 md:pb-6 bg-[#0b1329] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background Slide Track */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#0b1329]">
          <div
            className="flex w-full h-full will-change-transform"
            style={{
              transform: `translateX(-${activeHeroIndex * 100}%)`,
              transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
            }}
          >
            {images.map((img, index) => (
              <div key={index} className="flex-[0_0_100%] w-full h-full relative overflow-hidden shrink-0 select-none">
                <img
                  src={img}
                  alt={`Hero Background ${index + 1}`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'low'}
                  className="w-full h-full object-cover object-center pointer-events-none"
                />
              </div>
            ))}
          </div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60 sm:bg-gradient-to-r sm:from-slate-950/90 sm:via-slate-950/50 sm:to-black/30 z-10 pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full my-auto py-2 sm:py-4 md:py-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight sm:leading-[1.15] tracking-tight mb-2 sm:mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] line-clamp-3 sm:line-clamp-none">
                {heroData.heroTitle}
              </h1>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/90 font-normal sm:font-medium leading-relaxed max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] line-clamp-3 sm:line-clamp-none">
                {heroData.heroSubtitle}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Hero Slider Horizontal Bar (Pertamina signature bottom bar) */}
        <div className="relative z-20 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Mobile: dot indicators with accessible touch targets */}
            <div className="flex sm:hidden justify-center items-center gap-1 border-t border-white/20 pt-1 pb-0.5">
              {images.slice(0, 5).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentHeroIndex(index)}
                  className="p-1 focus:outline-none"
                  aria-label={`Slide ${index + 1}`}
                >
                  <span className={`block h-1.5 rounded-none transition-all duration-300 ${index === activeHeroIndex ? 'bg-[#0284c7] w-4' : 'bg-white/40 w-1.5'}`} />
                </button>
              ))}
            </div>
            {/* Desktop: continuous segmented bar */}
            <div className="hidden sm:flex w-full justify-between gap-1.5 pb-4 md:pb-6">
              {images.slice(0, 5).map((_, index) => {
                const isActive = index === activeHeroIndex;
                const title = heroTitles[index % heroTitles.length];
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentHeroIndex(index)}
                    className="flex-1 group cursor-pointer focus:outline-none flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-3 px-1">
                      <span className={`inline-block w-2 h-2 rounded-sm shrink-0 transition-colors duration-300 ${isActive ? 'bg-[#0284c7]' : 'bg-white/20 group-hover:bg-white/40'}`}></span>
                      <span className={`text-xs sm:text-sm font-medium transition-colors duration-300 truncate drop-shadow-md ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white/80'}`}>
                        {title}
                      </span>
                    </div>
                    {/* Linear line indicator */}
                    <div className="w-full h-[2px] bg-white/20 overflow-hidden relative">
                      {isActive && (
                        <motion.div 
                          className="absolute inset-y-0 left-0 bg-[#0284c7]"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: interval / 1000, ease: "linear" }}
                          key={activeHeroIndex}
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2. KEY METRICS — langsung setelah hero untuk trust conversion B2B */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-6 items-end pb-10 mb-10 border-b border-slate-100">
            <div className="lg:col-span-6">
              <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-2 block">
                {data.home?.quickFactsBadge || 'KREDIBILITAS & PERFORMA'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a] leading-tight">
                {data.home?.quickFactsTitle || 'Kinerja Terpercaya untuk Kebutuhan Industri'}
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                {data.home?.quickFactsSubtitle || 'Kapasitas teknis yang teruji melalui ragam proyek strategis dan kemitraan berkelanjutan bersama para klien industri terkemuka.'}
              </p>
            </div>
            <div className="lg:col-span-2 lg:text-right">
              <Link 
                to="/about"
                className="pertamina-btn-pill"
              >
                Selengkapnya <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {(data.home?.stats && data.home.stats.length > 0
              ? data.home.stats
              : [
                  {
                    category: 'PENGALAMAN LAPANGAN',
                    value: '10+',
                    unit: 'Tahun',
                    label: 'Dedikasi melayani sektor infrastruktur dan industri nasional secara konsisten'
                  },
                  {
                    category: 'PORTOFOLIO PEKERJAAN',
                    value: '50+',
                    unit: 'Proyek Selesai',
                    label: 'Penyelesaian tepat waktu dengan pemenuhan standar mutu dan keselamatan kerja'
                  },
                  {
                    category: 'RETENSI KLIEN',
                    value: '99%',
                    unit: 'Kepuasan Klien',
                    label: 'Kemitraan berulang yang didasari pada kejelasan komunikasi dan keandalan hasil kerja'
                  },
                  {
                    category: 'KOMPETENSI TEKNIS',
                    value: '30+',
                    unit: 'Tenaga Profesional',
                    label: 'Tim rekayasa dan teknisi berlisensi keahlian resmi di bidangnya'
                  }
                ]
            ).map((stat, idx) => (
              <div key={stat.id || idx} className="border-l-2 border-slate-200 pl-4 sm:pl-6">
                <div className="text-[10px] sm:text-xs font-bold text-slate-400 tracking-wider uppercase mb-1">
                  {stat.category}
                </div>
                <StatCounter
                  value={stat.value}
                  className="text-3xl sm:text-5xl font-black text-[#0f172a] tracking-tight"
                />
                <div className="text-sm font-semibold text-slate-600 mt-1 mb-2">
                  {stat.unit}
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. EDITORIAL INTRO SECTION (Pertamina "Energizing You" Style) */}
      <section className="py-14 sm:py-28 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Editorial Content — first on mobile */}
            <div className="lg:col-span-7 order-1">
              <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-3 block">
                {homeData?.introBadge || 'INOVASI & KUALITAS'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a] leading-tight tracking-tight mb-6">
                {homeData?.introTitle || 'Menghadirkan Solusi Teknik dan Konstruksi Terbaik untuk Negeri'}
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6 font-normal">
                {homeData?.introDescription || homeData?.heroSubtitle || 'PT. Ziotech Global Inovasi hadir sebagai mitra strategis dengan komitmen pada kualitas, efisiensi, dan inovasi berkelanjutan khususnya di spesialisasi Mechanical, Electrical & Plumbing (MEP).'}
              </p>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-8">
                {homeData?.introDescription2 || 'Dengan tim profesional bersertifikasi, dedikasi tinggi, dan standar mutu ketat, kami siap memberikan solusi engineering terbaik yang efisien, tepat waktu, dan berorientasi jangka panjang.'}
              </p>

              <Link
                to="/about"
                className="pertamina-btn-pill"
              >
                Selengkapnya <ArrowRight className="w-4 h-4 text-slate-500" />
              </Link>
            </div>

            {/* Visual Branding Graphic — second on mobile */}
            <div className="lg:col-span-5 flex justify-center order-2">
              <div className="relative w-full max-w-md aspect-square rounded-2xl bg-gradient-to-tr from-slate-50 via-sky-50/50 to-blue-50 p-8 flex items-center justify-center border border-slate-100 shadow-sm overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-44 h-44 rounded-none bg-[#0284c7]/10 blur-2xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-none bg-[#1e3a8a]/10 blur-2xl pointer-events-none" />
                
                {homeData?.introImageUrl ? (
                  <div className="relative w-full h-full rounded-xl overflow-hidden shadow-inner flex items-center justify-center bg-slate-100">
                    <img 
                      src={homeData.introImageUrl} 
                      alt={homeData?.introTag || "Innovation & Integrity"} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 text-center">
                      <span className="text-[11px] font-bold tracking-[0.2em] text-white uppercase drop-shadow-sm">
                        {homeData?.introTag || 'INNOVATION & INTEGRITY'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Geometric Pattern Accent ala Pertamina */}
                    <div className="grid grid-cols-3 gap-3 w-4/5">
                      <div className="h-16 rounded-sm bg-gradient-to-br from-[#1e3a8a] to-[#0284c7] shadow-sm transform -rotate-6"></div>
                      <div className="h-16 rounded-sm bg-[#0284c7]/20 border border-[#0284c7]/30"></div>
                      <div className="h-16 rounded-sm bg-slate-900 shadow-sm"></div>
                      <div className="h-16 rounded-sm bg-sky-100"></div>
                      <div className="h-16 rounded-sm bg-gradient-to-br from-[#0284c7] to-sky-400 shadow-md"></div>
                      <div className="h-16 rounded-sm bg-slate-100 border border-slate-200"></div>
                      <div className="h-16 rounded-sm bg-[#1e3a8a]/80"></div>
                      <div className="h-16 rounded-sm bg-sky-200/50"></div>
                      <div className="h-16 rounded-sm bg-gradient-to-tr from-slate-800 to-slate-900"></div>
                    </div>

                    <div className="absolute bottom-6 text-center">
                      <span className="text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                        {homeData?.introTag || 'INNOVATION & INTEGRITY'}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CINEMATIC BANNER "SEKILAS TENTANG KAMI" (Pertamina "Sekilas Pertamina" Style) */}
      <section className="relative py-16 sm:py-24 lg:py-32 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={data?.home?.aboutPreviewImageUrl || data?.about?.image || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"} 
            alt="Sekilas Ziotech" 
            className="w-full h-full object-cover object-center sm:object-right opacity-45 sm:opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/65 sm:bg-gradient-to-r sm:from-slate-950 sm:via-slate-950/85 sm:to-slate-950/30 pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl text-white">
            <span className="text-[11px] sm:text-xs font-bold tracking-widest text-[#38bdf8] uppercase mb-2 sm:mb-3 block">
              {data?.home?.aboutSectionBadge || 'SEKILAS PERUSAHAAN'}
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 sm:mb-6 leading-tight tracking-tight">
              {data?.home?.aboutSectionTitle || 'Tentang Kami'}
            </h2>
            <p className="text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 font-light">
              {data?.home?.aboutSectionDescription || data?.about?.description || 'Didirikan dengan semangat profesionalisme dan integritas tinggi, PT Ziotech Global Inovasi fokus menghadirkan layanan teknik MEP dan konstruksi yang berorientasi nilai tambah.'}
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link 
                to="/about"
                className="pertamina-btn-pill-dark"
              >
                Profil Perusahaan <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/about"
                className="pertamina-btn-pill-dark"
              >
                Visi & Misi <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOUR EDITORIAL FOCUS CARDS (Pertamina 4 Image Cards: Layanan, PPID, Tata Kelola, Karir) */}
      <section className="py-20 sm:py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-12">
            <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-2 block">
              {data?.home?.ourFocusBadge || 'PILAR UTAMA'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a]">
              {data?.home?.ourFocusTitle || 'Spesialisasi dan Ruang Lingkup Kerja'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {focusPillars.map((item, idx) => (
              <Link
                key={idx}
                to={item.link}
                className="group relative h-[380px] sm:h-[420px] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-6 border border-slate-100"
              >
                {/* Image Background */}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/10 transition-opacity duration-300 group-hover:via-slate-950/50" />

                {/* Card Content */}
                <div className="relative z-10 text-white">
                  <span className="text-[10px] font-bold tracking-widest text-[#38bdf8] uppercase block mb-1.5">
                    {item.label}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug group-hover:text-[#38bdf8] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 mb-4 font-light">
                    {item.desc}
                  </p>

                  {/* Circular Action Arrow Ala Pertamina */}
                  <div className="w-9 h-9 rounded-lg border border-white/40 flex items-center justify-center text-white group-hover:border-white group-hover:bg-white group-hover:text-slate-950 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. LAYANAN UNGGULAN (Pertamina "Keberlanjutan" Grid Style) */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-6 items-end pb-12 mb-12 border-b border-slate-100">
            <div className="lg:col-span-6">
              <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-2 block">
                {data?.home?.serviceBadge || 'KOMPETENSI UTAMA'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a] leading-tight">
                {data?.home?.serviceTitle || 'Solusi Rekayasa Terpadu untuk Kebutuhan Industri'}
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                {data?.home?.serviceSubtitle || 'Spektrum layanan komprehensif mulai dari rancang bangun, instalasi mekanikal-elektrikal, hingga suplai suku cadang industri berstandar internasional.'}
              </p>
            </div>
            <div className="lg:col-span-2 lg:text-right">
              <Link 
                to="/service"
                className="pertamina-btn-pill"
              >
                Selengkapnya <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.slice(0, 3).map((service, idx) => (
                <div 
                  key={service.id || idx}
                  className="flex flex-col bg-white rounded-xl overflow-hidden border border-slate-100 hover:border-slate-300 transition-all duration-300 p-2 group"
                >
                  <div className="aspect-[16/10] rounded-lg overflow-hidden mb-5 relative">
                    <img 
                      src={service.image || "https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="px-3 pb-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#0f172a] mb-2 group-hover:text-[#0284c7] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 font-normal">
                        {service.desc}
                      </p>
                    </div>

                    <div>
                      <Link 
                        to={`/service/${service.id}`}
                        className="pertamina-btn-pill !py-2 !px-4 text-xs"
                      >
                        Selengkapnya <ArrowRight className="w-3 h-3 text-[#0284c7]" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400">
              Belum ada layanan unggulan yang dipilih untuk ditampilkan di Beranda.
            </div>
          )}
        </div>
      </section>
      {/* 7. SHOWCASE PROYEK / NEWS ROOM (Pertamina News Room Style) */}
      <section className="py-20 sm:py-28 bg-[#f8fafc] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-6 items-end pb-8 mb-8 border-b border-slate-200/80">
            <div className="lg:col-span-6">
              <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-2 block">
                {data?.home?.portfolioBadge || 'PORTOFOLIO & REKAM JEJAK'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a] leading-tight">
                {data?.home?.portfolioTitle || 'Proyek Unggulan Terkini'}
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                {data?.home?.portfolioSubtitle || 'Dokumentasi keberhasilan penyelesaian proyek konstruksi dan engineering.'}
              </p>
            </div>
            <div className="lg:col-span-2 lg:text-right">
              <Link to="/project" className="pertamina-btn-pill">
                Selengkapnya <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 mb-10">
            {[
              { key: 'ALL', label: 'Semua' },
              { key: 'MEP', label: 'MEP' },
              { key: 'KONSTRUKSI', label: 'Konstruksi' },
              { key: 'TAMBANG', label: 'Pertambangan' },
              { key: 'DIGITALISASI', label: 'Digitalisasi' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTabCategory(key)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeTabCategory === key
                    ? 'bg-[#1e3a8a] text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-400'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {filteredProjects.length > 0 ? (
              <>
                <div className="lg:col-span-6">
                  {filteredProjects[0] && (
                    <Link
                      to={`/project/${filteredProjects[0].id}`}
                      className="group relative block h-[420px] sm:h-[500px] rounded-xl overflow-hidden shadow-sm border border-slate-100"
                    >
                      <img 
                        src={filteredProjects[0].image} 
                        alt={filteredProjects[0].title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
                      <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 text-white">
                        <span className="text-[10px] font-bold tracking-widest text-[#38bdf8] uppercase block mb-2">
                          {filteredProjects[0].category || 'PROYEK UTAMA'}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight group-hover:text-[#38bdf8] transition-colors">
                          {filteredProjects[0].title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 mb-4 font-light">
                          {filteredProjects[0].description}
                        </p>
                        <div className="text-xs font-semibold text-slate-400 flex items-center gap-2">
                          <span>{filteredProjects[0].location || 'Indonesia'}</span>
                          <span>•</span>
                          <span>{filteredProjects[0].year || new Date().getFullYear()}</span>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>

                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {filteredProjects.slice(1, 5).map((project) => (
                    <Link
                      key={project.id}
                      to={`/project/${project.id}`}
                      className="group relative block h-[235px] rounded-xl overflow-hidden shadow-sm border border-slate-100"
                    >
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-white">
                        <span className="text-[9px] font-bold tracking-widest text-[#38bdf8] uppercase block mb-1">
                          {project.category}
                        </span>
                        <h4 className="text-sm font-bold text-white mb-1.5 leading-snug line-clamp-2 group-hover:text-[#38bdf8] transition-colors">
                          {project.title}
                        </h4>
                        <div className="text-[11px] text-slate-400">
                          {project.location || 'Indonesia'}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <div className="lg:col-span-12 py-12 text-center text-slate-400">
                Belum ada proyek untuk kategori ini.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 8. RUANG BERITA & PUBLIKASI (Pertamina Corporate Newsroom Style) */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-6 items-end pb-8 mb-8 border-b border-slate-200/80">
            <div className="lg:col-span-6">
              <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-2 block">
                {data?.home?.newsBadge || 'RUANG BERITA & INFORMASI'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a] leading-tight">
                {data?.home?.newsTitle || 'Berita & Informasi Terkini'}
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                {data?.home?.newsSubtitle || 'Dapatkan pembaruan siaran pers, liputan kegiatan operasional, dan inisiatif keberlanjutan perusahaan.'}
              </p>
            </div>
            <div className="lg:col-span-2 lg:text-right">
              <Link to="/news" className="pertamina-btn-pill">
                Semua Berita <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2.5 mb-8 sm:mb-10">
            {newsCategories.map((cat) => {
              const isActive = (currentNewsCategory || '').toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveNewsCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-[#002d72] text-white shadow-sm' 
                      : 'bg-[#f1f4f9] text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
            {filteredNews.length > 0 ? (
              <>
                {/* Featured Big Card (Left, Spanning full height of right 2x2 grid) */}
                <div className="lg:col-span-6 flex flex-col">
                  {featuredNews && (
                    <Link
                      to={`/news/${featuredNews.id}`}
                      className="group relative flex-1 min-h-[440px] sm:min-h-[480px] lg:min-h-[516px] rounded-2xl overflow-hidden shadow-sm block bg-slate-900"
                    >
                      <img
                        src={featuredNews.image}
                        alt={featuredNews.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />
                      <div className="absolute bottom-0 inset-x-0 p-6 sm:p-7 text-white">
                        <span className="text-[11px] font-bold tracking-wider text-white uppercase block mb-2">
                          {featuredNews.category || 'PRESS RELEASE'}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-snug line-clamp-3 group-hover:text-sky-300 transition-colors">
                          {featuredNews.title}
                        </h3>
                        <div className="text-xs font-normal text-white/90 flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-white shrink-0" />
                          <span>{featuredNews.date}</span>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>

                {/* 2x2 Cards Grid (Right) */}
                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {gridNews.map((item) => (
                    <Link
                      key={item.id}
                      to={`/news/${item.id}`}
                      className="group relative h-[235px] sm:h-[248px] rounded-2xl overflow-hidden shadow-sm block bg-slate-900"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-white">
                        <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-white uppercase block mb-1.5">
                          {item.category || 'PRESS RELEASE'}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-white leading-snug mb-2.5 line-clamp-3 group-hover:text-sky-300 transition-colors">
                          {item.title}
                        </h4>
                        <div className="text-xs font-normal text-white/90 flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-white shrink-0" />
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <div className="lg:col-span-12 py-12 text-center text-slate-400">
                Belum ada berita untuk kategori ini.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 8. GRUP BISNIS & MITRA KERJA (Pertamina "Grup Bisnis Kami / Subholding" Style) */}
      <section className="py-20 sm:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pb-8 mb-10 border-b border-slate-200">
            <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-2 block">
              {data?.home?.clientPartnersBadge || 'KEMITRAAN STRATEGIS'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a]">
              {data?.home?.clientPartnersTitle || 'Dipercaya oleh Ragam Institusi & Mitra Terkemuka'}
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {(homeData?.clientPartners && homeData.clientPartners.length > 0 ? homeData.clientPartners : [
              { name: 'PERTAMINA' },
              { name: 'PLN' },
              { name: 'WIKA' },
              { name: 'ANTAM' },
              { name: 'ADHI KARYA' }
            ]).map((partner, idx) => (
              <div 
                key={partner.id || idx}
                className="bg-white rounded-xl border border-slate-200/90 p-5 flex items-center justify-center h-28 w-[calc(50%-0.5rem)] sm:w-56 md:w-60 lg:w-64 max-w-[260px] shrink-0 hover:border-[#0284c7] hover:shadow-lg transition-all duration-300 group overflow-hidden"
              >
                {partner.logo ? (
                  <PartnerLogoImage 
                    src={partner.logo} 
                    alt={partner.name || 'Mitra'} 
                  />
                ) : (
                  <span className="text-sm sm:text-base font-extrabold tracking-wider text-slate-600 group-hover:text-[#1e3a8a] transition-colors text-center">
                    {partner.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CALL TO ACTION - Elevated Floating Card (Pertamina Corporate Style) */}
      <section className="py-14 sm:py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 shadow-2xl shadow-slate-900/15 border border-slate-800">
            {/* Background Image & Gradient */}
            <div className="absolute inset-0 z-0">
              <img 
                src={data?.home?.ctaBgImageUrl || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"} 
                alt="Kolaborasi Ziotech" 
                className="w-full h-full object-cover object-center sm:object-left opacity-40 sm:opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/60 sm:bg-gradient-to-l sm:from-slate-950 sm:via-slate-950/85 sm:to-slate-950/20 pointer-events-none" />
            </div>

            {/* Content Container - Right Aligned */}
            <div className="relative z-10 px-6 py-12 sm:px-14 sm:py-20 flex justify-end">
              <div className="max-w-2xl text-white text-left">
                <span className="text-[11px] sm:text-xs font-bold tracking-widest text-[#38bdf8] uppercase mb-2 sm:mb-3 block">
                  {data?.home?.ctaBadge || 'KOLABORASI & KONSULTASI'}
                </span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 sm:mb-5 leading-tight tracking-tight">
                  {data?.home?.ctaTitle || 'Siap Berkolaborasi Bersama Kami?'}
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 font-normal">
                  {data?.home?.ctaSubtitle || 'Konsultasikan kebutuhan proyek konstruksi, MEP, atau pengadaan industri Anda dengan tim ahli kami.'}
                </p>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <Link 
                    to="/contact"
                    className="pertamina-btn-pill-dark"
                  >
                    {data?.home?.ctaButton || 'Hubungi Sekarang'} <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <Link 
                    to="/service"
                    className="pertamina-btn-pill-dark"
                  >
                    Lihat Layanan <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
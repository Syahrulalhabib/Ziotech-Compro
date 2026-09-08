import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { useCountUp } from '../hooks/useCountUp';
import { 
  ArrowRight, 
  ArrowUpRight, 
  ChevronRight, 
  ChevronLeft,
  CalendarClock, 
  Briefcase, 
  Handshake, 
  Award,
  Building2, 
  Cpu, 
  Wrench, 
  Zap,
  ShieldCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getServiceIcon } from '../data/serviceIcons';

/** Parses "10+", "99%", "30+" → { num: 10, suffix: '+' } */
function parseStat(value) {
  const match = String(value).match(/^(\d+)([+%]?)$/);
  if (!match) return { num: 0, suffix: '' };
  return { num: parseInt(match[1], 10), suffix: match[2] };
}

function StatCounter({ value, className }) {
  const { num, suffix } = parseStat(value);
  const { count, ref } = useCountUp(num);
  return (
    <div ref={ref} className={className}>
      {count}{suffix}
    </div>
  );
}

export default function Home() {
  const { data, loading } = useData();
  const { t } = useLanguage();
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [activeTabCategory, setActiveTabCategory] = useState('ALL');

  const heroData = data?.home || {
    heroTitle: 'Mitra Strategis Solusi Industri & Infrastruktur',
    heroSubtitle: 'PT Ziotech Global Inovasi memberikan komitmen pada kualitas, efisiensi, dan inovasi berkelanjutan khususnya di spesialisasi Mechanical, Electrical & Plumbing (MEP).',
    heroImages: [
      'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    ],
    heroInterval: 5000
  };
  const homeData = heroData;

  const images = heroData.heroImages || [];
  const interval = heroData.heroInterval || 5000;

  // Preload semua hero images segera saat URL tersedia
  useEffect(() => {
    images.forEach((src, i) => {
      const link = document.createElement('link');
      link.rel = i === 0 ? 'preload' : 'prefetch';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }, [images.join(',')]);

  // Set up hero auto-slide effect
  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
    </div>
  );
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

  const heroTitles = heroData.heroTitles || [
    'Spesialisasi MEP',
    'Konstruksi & Infrastruktur',
    'Sektor Pertambangan',
    'Solusi Digitalisasi',
    'Inovasi Berkelanjutan'
  ];

  const allProjects = Array.isArray(data?.projects) ? data.projects : [];
  const featuredProjects = allProjects.filter(p => Boolean(p.featured));

  const filteredProjects = activeTabCategory === 'ALL'
    ? featuredProjects
    : featuredProjects.filter(p => (p.category || '').toUpperCase().includes(activeTabCategory));

  const focusPillars = [
    {
      label: t.home?.fp1Label || 'LAYANAN UTAMA',
      title: t.home?.fp1Title || 'Mechanical, Electrical & Plumbing (MEP)',
      desc: t.home?.fp1Desc || 'Instalasi sistem engineering presisi tinggi gedung & fasilitas industri.',
      link: '/service/1',
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      label: t.home?.fp2Label || 'INFRASTRUKTUR',
      title: t.home?.fp2Title || 'Konstruksi Sipil & Bangunan Komersial',
      desc: t.home?.fp2Desc || 'Pengerjaan struktur kokoh dengan standar keamanan dan K3 terdepan.',
      link: '/service/2',
      image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      label: t.home?.fp3Label || 'INDUSTRI & TAMBANG',
      title: t.home?.fp3Title || 'Suplai & Penunjang Pertambangan',
      desc: t.home?.fp3Desc || 'Pengadaan komponen teknis dan perawatan fasilitas operasional tambang.',
      link: '/service/3',
      image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      label: t.home?.fp4Label || 'TRANSFORMASI',
      title: t.home?.fp4Title || 'Solusi Digitalisasi & Otomasi Gedung',
      desc: t.home?.fp4Desc || 'Sistem Building Automation & pemantauan energi pintar terintegrasi.',
      link: '/service/4',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="bg-white text-[#0f172a] selection:bg-[#0284c7] selection:text-white">
      {/* 1. HERO SECTION (Pertamina Style: Cinematic visual, bottom progress line bar) */}
      <section className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-between pt-28 sm:pt-32 pb-4 sm:pb-6 bg-[#0b1329]">
        {/* Background Slider */}
        <div className="absolute inset-0 z-0 bg-[#0b1329]">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Hero Background ${index + 1}`}
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchpriority={index === 0 ? 'high' : 'low'}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${index === currentHeroIndex ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
          {/* 20% gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full my-auto py-8 sm:py-12">
          <div className="max-w-3xl">
            <motion.div
              key={currentHeroIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse"></span>
                {t.home?.badge || 'INOVASI & KUALITAS'}
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] tracking-tight mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                {heroData.heroTitle}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white font-medium leading-relaxed max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                {heroData.heroSubtitle}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Hero Slider Horizontal Bar (Pertamina signature bottom bar) */}
        <div className="relative z-20 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Mobile: dot indicators */}
            <div className="flex sm:hidden justify-center items-center gap-2 border-t border-white/20 pt-3 pb-1">
              {images.slice(0, 5).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentHeroIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentHeroIndex ? 'bg-[#0284c7] w-5' : 'bg-white/40'}`}
                />
              ))}
            </div>
            {/* Desktop: full bar */}
            <div className="hidden sm:flex flex-wrap justify-center items-center gap-4 sm:gap-6 border-t border-white/20 pt-3 pb-1">
              {images.slice(0, 5).map((_, index) => {
                const isActive = index === currentHeroIndex;
                const title = heroTitles[index % heroTitles.length];
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentHeroIndex(index)}
                    className="flex-1 min-w-[140px] max-w-[220px] text-left group cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-center justify-start gap-1.5 mb-2">
                      {isActive && <span className="inline-block w-2 h-2 rounded-full bg-[#0284c7] shrink-0"></span>}
                      <span className={`text-xs sm:text-sm font-semibold transition-colors duration-300 truncate drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] ${isActive ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                        {title}
                      </span>
                    </div>
                    {/* Linear line indicator */}
                    <div className="w-full h-1 bg-white/30 backdrop-blur-sm overflow-hidden relative rounded-full">
                      {isActive && (
                        <motion.div 
                          className="absolute inset-y-0 left-0 bg-[#0284c7] rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: interval / 1000, ease: "linear" }}
                          key={currentHeroIndex}
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



      {/* 2. EDITORIAL INTRO SECTION (Pertamina "Energizing You" Style) */}
      <section className="py-14 sm:py-28 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Editorial Content — first on mobile */}
            <div className="lg:col-span-7 order-1">
              <span className="text-[11px] font-bold tracking-widest text-[#0284c7] uppercase mb-3 block">
                {homeData?.introBadge || t.home?.badge || 'INOVASI & KUALITAS'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a] leading-tight tracking-tight mb-6">
                {homeData?.introTitle || 'Menghadirkan Solusi Teknik dan Konstruksi Terbaik untuk Negeri'}
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6 font-normal">
                {homeData?.introDescription || homeData?.heroSubtitle || 'PT. Ziotech Global Inovasi hadir sebagai mitra strategis dengan komitmen pada kualitas, efisiensi, dan inovasi berkelanjutan khususnya di spesialisasi Mechanical, Electrical & Plumbing (MEP).'}
              </p>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-8">
                {homeData?.introDescription2 || t.home?.aboutDesc2 || 'Dengan tim profesional bersertifikasi, dedikasi tinggi, dan standar mutu ketat, kami siap memberikan solusi engineering terbaik yang efisien, tepat waktu, dan berorientasi jangka panjang.'}
              </p>

              <Link
                to="/about"
                className="pertamina-btn-pill"
              >
                {t.home?.seeMore || 'Selengkapnya'} <ArrowRight className="w-4 h-4 text-[#0284c7]" />
              </Link>
            </div>

            {/* Visual Branding Graphic — second on mobile */}
            <div className="lg:col-span-5 flex justify-center order-2">
              <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-tr from-slate-50 via-sky-50/50 to-blue-50 p-8 flex items-center justify-center border border-slate-100 shadow-sm overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-[#0284c7]/10 blur-2xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-[#1e3a8a]/10 blur-2xl pointer-events-none" />
                
                {homeData?.introImageUrl ? (
                  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-inner flex items-center justify-center bg-slate-100">
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
                      <div className="h-16 rounded-2xl bg-gradient-to-br from-[#1e3a8a] to-[#0284c7] shadow-sm transform -rotate-6"></div>
                      <div className="h-16 rounded-2xl bg-[#0284c7]/20 border border-[#0284c7]/30"></div>
                      <div className="h-16 rounded-2xl bg-slate-900 shadow-sm"></div>
                      <div className="h-16 rounded-2xl bg-sky-100"></div>
                      <div className="h-16 rounded-2xl bg-gradient-to-br from-[#0284c7] to-sky-400 shadow-md"></div>
                      <div className="h-16 rounded-2xl bg-slate-100 border border-slate-200"></div>
                      <div className="h-16 rounded-2xl bg-[#1e3a8a]/80"></div>
                      <div className="h-16 rounded-2xl bg-sky-200/50"></div>
                      <div className="h-16 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-900"></div>
                    </div>

                    <div className="absolute bottom-6 text-center">
                      <span className="text-[11px] font-bold tracking-[0.2em] text-[#0284c7] uppercase">
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
      <section className="relative py-24 sm:py-32 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={data?.home?.aboutPreviewImageUrl || data?.about?.image || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"} 
            alt="Sekilas Ziotech" 
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-900/60 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl text-white">
            <span className="text-[11px] font-bold tracking-widest text-[#38bdf8] uppercase mb-3 block">
              {t.home?.aboutBadge || 'SEKILAS PERUSAHAAN'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              {t.nav?.about || 'Tentang Kami'}
            </h2>
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed mb-8 font-light">
              {data?.about?.description || 'Didirikan dengan semangat profesionalisme dan integritas tinggi, PT Ziotech Global Inovasi fokus menghadirkan layanan teknik MEP dan konstruksi yang berorientasi nilai tambah.'}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link 
                to="/about"
                className="pertamina-btn-pill-dark"
              >
                {t.home?.corporateProfile || 'Profil Perusahaan'} <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/about"
                className="pertamina-btn-pill-dark"
              >
                {t.home?.valuesAndVision || 'Visi & Misi'} <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. KEY METRICS & RECOGNITION (Pertamina Fortune 500 / Stats Style) */}
      <section className="py-20 sm:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-6 items-end pb-12 mb-12 border-b border-slate-100">
            <div className="lg:col-span-6">
              <span className="text-[11px] font-bold tracking-widest text-[#0284c7] uppercase mb-2 block">
                {t.home?.quickFactsBadge || 'KREDIBILITAS & PERFORMA'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a] leading-tight">
                {t.home?.quickFactsTitle || 'Kinerja Terpercaya untuk Kebutuhan Industri'}
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                {t.home?.quickFactsSubtitle || 'Kapasitas teknis yang teruji melalui ragam proyek strategis dan kemitraan berkelanjutan bersama para klien industri terkemuka.'}
              </p>
            </div>
            <div className="lg:col-span-2 lg:text-right">
              <Link 
                to="/about"
                className="pertamina-btn-pill"
              >
                {t.home?.seeMore || 'Selengkapnya'} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              {
                category: t.home?.stat1Category || 'PENGALAMAN INDUSTRI',
                value: '10+',
                unit: t.home?.stat1Unit || 'Tahun',
                label: t.home?.stat1Label || 'Dedikasi melayani sektor infrastruktur & industri nasional'
              },
              {
                category: t.home?.stat2Category || 'PORTOFOLIO PROYEK',
                value: '50+',
                unit: t.home?.stat2Unit || 'Proyek Selesai',
                label: t.home?.stat2Label || 'Penyelesaian tepat mutu, tepat waktu, dan standar K3 tinggi'
              },
              {
                category: t.home?.stat3Category || 'KEPUASAN KLIEN',
                value: '99%',
                unit: t.home?.stat3Unit || 'Tingkat Kepuasan',
                label: t.home?.stat3Label || 'Retensi dan kepercayaan berkesinambungan dari mitra'
              },
              {
                category: t.home?.stat4Category || 'TIM AHLI & TEKNIS',
                value: '30+',
                unit: t.home?.stat4Unit || 'Tenaga Profesional',
                label: t.home?.stat4Label || 'Insinyur & staf teknis bersertifikasi lisensi resmi'
              }
            ].map((stat, idx) => (
              <div key={idx} className="border-l-2 border-slate-200 pl-4 sm:pl-6">
                <div className="text-[10px] sm:text-xs font-bold text-slate-400 tracking-wider uppercase mb-1">
                  {stat.category}
                </div>
                <StatCounter
                  value={stat.value}
                  className="text-3xl sm:text-5xl font-black text-[#0f172a] tracking-tight"
                />
                <div className="text-sm font-semibold text-[#0284c7] mt-1 mb-2">
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

      {/* 5. FOUR EDITORIAL FOCUS CARDS (Pertamina 4 Image Cards: Layanan, PPID, Tata Kelola, Karir) */}
      <section className="py-20 sm:py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-12">
            <span className="text-[11px] font-bold tracking-widest text-[#0284c7] uppercase mb-2 block">
              {t.home?.ourFocusBadge || 'PILAR UTAMA'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a]">
              {t.home?.ourFocusTitle || 'Spesialisasi dan Ruang Lingkup Kerja'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {focusPillars.map((item, idx) => (
              <Link
                key={idx}
                to={item.link}
                className="group relative h-[380px] sm:h-[420px] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-6 border border-slate-100"
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
                  <div className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center text-white group-hover:border-white group-hover:bg-white group-hover:text-slate-950 transition-all">
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
              <span className="text-[11px] font-bold tracking-widest text-[#0284c7] uppercase mb-2 block">
                {t.home?.serviceBadge || 'LAYANAN UNGGULAN'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a] leading-tight">
                {t.home?.serviceTitle || 'Solusi Terintegrasi untuk Kebutuhan Industri'}
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                {t.home?.serviceSubtitle || 'Rangkaian layanan teknik komprehensif berstandar internasional demi kelancaran operasional dan investasi Anda.'}
              </p>
            </div>
            <div className="lg:col-span-2 lg:text-right">
              <Link 
                to="/service"
                className="pertamina-btn-pill"
              >
                {t.home?.seeMore || 'Selengkapnya'} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.slice(0, 3).map((service, idx) => (
                <div 
                  key={service.id || idx}
                  className="flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-slate-300 transition-all duration-300 p-2 group"
                >
                  <div className="aspect-[16/10] rounded-xl overflow-hidden mb-5 relative">
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
                        {t.home?.seeMore || 'Selengkapnya'} <ArrowRight className="w-3 h-3 text-[#0284c7]" />
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
              <span className="text-[11px] font-bold tracking-widest text-[#0284c7] uppercase mb-2 block">
                {t.home?.newsRoomBadge || 'PORTOFOLIO & REKAM JEJAK'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a] leading-tight">
                {t.home?.portfolioTitle || 'Proyek Unggulan Terkini'}
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                {t.home?.portfolioSubtitle || 'Dokumentasi keberhasilan penyelesaian proyek konstruksi dan engineering.'}
              </p>
            </div>
            <div className="lg:col-span-2 lg:text-right">
              <Link to="/project" className="pertamina-btn-pill">
                {t.home?.seeMore || 'Selengkapnya'} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 mb-10">
            {[
              { key: 'ALL', label: t.home?.catAll || 'Semua' },
              { key: 'MEP', label: t.home?.catMep || 'MEP' },
              { key: 'KONSTRUKSI', label: t.home?.catKonstruksi || 'Konstruksi' },
              { key: 'TAMBANG', label: t.home?.catTambang || 'Pertambangan' },
              { key: 'DIGITALISASI', label: t.home?.catDigitalisasi || 'Digitalisasi' },
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
                      className="group relative block h-[420px] sm:h-[500px] rounded-2xl overflow-hidden shadow-sm border border-slate-100"
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
                      className="group relative block h-[235px] rounded-2xl overflow-hidden shadow-sm border border-slate-100"
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

      {/* 8. GRUP BISNIS & MITRA KERJA (Pertamina "Grup Bisnis Kami / Subholding" Style) */}
      <section className="py-20 sm:py-24 bg-[#f8fafc] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pb-8 mb-10 border-b border-slate-200">
            <span className="text-[11px] font-bold tracking-widest text-[#0284c7] uppercase mb-2 block">
              {t.home?.clientPartnersTitle || 'KEMITRAAN STRATEGIS'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a]">
              {t.home?.partnersSectionTitle || 'Dipercaya oleh Ragam Institusi & Mitra Terkemuka'}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {(homeData?.clientPartners && homeData.clientPartners.length > 0 ? homeData.clientPartners : [
              { name: 'PERTAMINA' },
              { name: 'PLN' },
              { name: 'WIKA' },
              { name: 'ANTAM' },
              { name: 'ADHI KARYA' }
            ]).map((partner, idx) => (
              <div 
                key={partner.id || idx}
                className="bg-white rounded-xl border border-slate-200/80 p-6 flex items-center justify-center h-28 hover:border-[#0284c7] hover:shadow-sm transition-all duration-300 group"
              >
                {partner.logo ? (
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="max-h-12 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
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

      {/* 10. CALL TO ACTION - Clean & Direct */}
      <section className="py-20 sm:py-24 bg-[#0f172a] text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#0284c7] blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="text-[11px] font-bold tracking-widest text-[#38bdf8] uppercase mb-4 block">
            {t.home?.ctaBadge || 'KOLABORASI & KONSULTASI'}
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            {t.common?.readyToCollaborate || 'Siap Berkolaborasi Bersama Kami?'}
          </h2>
          <p className="text-slate-300 text-sm sm:text-lg mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            {t.common?.ctaDesc || 'Diskusikan spesifikasi kebutuhan MEP, konstruksi, atau pengadaan fasilitas industri Anda bersama tim teknisi kami.'}
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <Link 
              to="/contact"
              className="pertamina-btn-pill-dark !bg-white !text-[#0f172a] !border-white hover:!bg-slate-100 hover:!text-[#0284c7]"
            >
              {t.common?.contactNow || 'Hubungi Kami'} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/service"
              className="pertamina-btn-pill-dark"
            >
              {t.common?.viewServices || 'Jelajahi Layanan'} <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
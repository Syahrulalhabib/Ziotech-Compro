import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, CheckCircle2, ChevronRight, Activity, Building2, Cpu, Wrench, CalendarClock, Briefcase, Handshake, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { getServiceIcon } from '../data/serviceIcons';

export default function Home() {
  const { data, loading } = useData();
  const { t } = useLanguage();
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

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
    // Hanya tampilkan layanan yang ditandai featured di CMS
    const markedFeatured = rawList.filter(s => Boolean(s.featured));

    return markedFeatured.map((svc, idx) => ({
      id: svc.id || idx + 1,
      title: svc.title,
      icon: getServiceIcon(svc.icon, idx),
      desc: svc.description
    }));
  })();

    const features = [
      'Komitmen pada Kualitas',
      'Efisiensi Tinggi',
      'Inovasi Berkelanjutan',
      'Profesional & Berintegritas'
    ];

    const heroTitles = heroData.heroTitles || [
      'Spesialisasi MEP',
      'Konstruksi & Infrastruktur',
      'Sektor Pertambangan',
      'Solusi Digitalisasi',
      'Inovasi Berkelanjutan'
    ];

  // Proyek unggulan: hanya yang ditandai admin (featured) di CMS
  const allProjects = Array.isArray(data?.projects) ? data.projects : [];
  const displayProjects = allProjects.filter(p => Boolean(p.featured)).slice(0, 6);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#0f172a]/20 z-10 transition-opacity duration-1000" />
          {images.map((img, index) => (
            <img 
              key={index}
              src={img} 
              alt={`Hero Background ${index + 1}`} 
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${index === currentHeroIndex ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
        </div>
        
        {/* Custom Hero Navigation */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center items-end pb-4 sm:pb-8">
          <div className="flex w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar">
            {images.map((_, index) => (
              <div 
                key={index}
                onClick={() => setCurrentHeroIndex(index)}
                className="flex-1 min-w-[70px] cursor-pointer group"
              >
                <div className="flex flex-col mb-2 sm:mb-4 items-start justify-end h-10 sm:h-16">
                  <span className={`text-[9px] sm:text-sm font-bold transition-all duration-300 line-clamp-1 ${index === currentHeroIndex ? 'text-white flex items-center drop-shadow-md' : 'text-white/60 group-hover:text-white/90'}`}>
                    {index === currentHeroIndex && <span className="inline-block w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-[var(--primary-blue)] mr-1.5 sm:mr-2.5 shadow-[0_0_8px_rgba(30,58,138,0.8)] shrink-0"></span>}
                    {heroTitles[index % heroTitles.length]}
                  </span>
                </div>
                <div className="w-full h-1 bg-white/30 overflow-hidden relative rounded-full">
                  {index === currentHeroIndex && (
                    <motion.div 
                      className="absolute top-0 left-0 h-full bg-[var(--primary-blue)] rounded-full shadow-[0_0_10px_rgba(30,58,138,0.8)]"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: interval / 1000, ease: "linear" }}
                      key={currentHeroIndex}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full mt-[-6rem] sm:mt-[-8rem] md:mt-[-10rem] pb-16 sm:pb-24">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-[var(--accent-blue)]/20 border border-[var(--accent-blue)]/30 text-[var(--accent-gold)] text-xs sm:text-sm font-semibold tracking-wider mb-4 sm:mb-6">
                {t.home.badge}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6 mt-2 drop-shadow-lg break-words">
                {heroData.heroTitle}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/95 font-medium leading-relaxed max-w-2xl drop-shadow-md">
                {heroData.heroSubtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Company Stats - Professional content boxes */}
      <section className="py-12 sm:py-20 bg-[var(--bg-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[
              { icon: CalendarClock, value: '10+', label: t.home.yearsExp },
              { icon: Briefcase, value: '50+', label: t.home.completedProjects },
              { icon: Handshake, value: '99%', label: t.home.clientSatisfaction },
              { icon: Award, value: '30+', label: t.home.expertTeam }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-100 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.08)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-5 rounded-xl bg-[var(--primary-blue)]/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 sm:w-7 sm:h-7 text-[var(--primary-blue)]" />
                </div>
                <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-[var(--primary-dark)] mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-xs sm:text-sm md:text-base font-medium text-[var(--text-muted)] leading-tight">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section - NEW! (Builds Trust early on) */}
      <section className="py-12 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={data?.home?.aboutPreviewImageUrl || data?.about?.image || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"} 
                  alt="Tentang Ziotech" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[var(--primary-blue)] text-white p-6 sm:p-8 rounded-2xl shadow-xl hidden sm:block border-4 border-white">
                <div className="text-3xl sm:text-5xl font-bold text-[var(--accent-gold)] mb-1 sm:mb-2">10+</div>
                <div className="text-xs sm:text-sm font-medium tracking-wide">{t.home.yearsExp}</div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[var(--accent-blue)] font-semibold tracking-wider uppercase text-xs sm:text-sm">{t.home.aboutBadge}</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-4 sm:mb-6 leading-tight">{t.home.aboutTitle}</h2>
              <p className="text-[var(--text-muted)] text-base sm:text-lg mb-6 leading-relaxed">
                {t.home.aboutDesc1}
              </p>
              <p className="text-[var(--text-muted)] text-base sm:text-lg mb-6 leading-relaxed">
                {t.home.aboutDesc2}
              </p>
              <Link to="/about" className="btn-primary inline-flex items-center gap-2 text-sm sm:text-base">
                {t.common.learnMore} <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      {services.length > 0 && (
        <section className="py-12 sm:py-24 bg-[var(--bg-light)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-16">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[var(--accent-blue)] font-semibold tracking-wider uppercase text-xs sm:text-sm"
              >
                {t.home.serviceBadge}
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2"
              >
                {t.home.serviceTitle}
              </motion.h2>
              <div className="w-20 sm:w-24 h-1 bg-[var(--accent-gold)] mx-auto mt-4 sm:mt-6 rounded-full" />
            </div>

            <div className={`grid gap-6 sm:gap-8 ${
              services.length === 1
                ? 'max-w-md mx-auto'
                : services.length === 2
                ? 'max-w-3xl mx-auto sm:grid-cols-2'
                : services.length === 3
                ? 'max-w-5xl mx-auto sm:grid-cols-2 lg:grid-cols-3'
                : 'sm:grid-cols-2 lg:grid-cols-4'
            }`}>
              {services.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <motion.div 
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[var(--primary-blue)]/5 text-[var(--primary-blue)] rounded-xl flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-[var(--primary-blue)] group-hover:text-white transition-colors duration-300">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-[var(--primary-dark)] mb-3 sm:mb-4 group-hover:text-[var(--primary-blue)] transition-colors">{service.title}</h3>
                      <p className="text-[var(--text-muted)] font-medium mb-6 leading-relaxed text-sm sm:text-base">
                        {service.desc}
                      </p>
                    </div>
                    <Link to={`/service/${service.id}`} className="inline-flex items-center text-[var(--accent-blue)] font-semibold group/link mt-auto text-sm">
                      {t.common.viewDetail} 
                      <ChevronRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects Section - NEW! (Provides Proof of Work) */}
      {displayProjects.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <motion.span 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-[var(--accent-blue)] font-semibold tracking-wider uppercase text-xs sm:text-sm"
                >
                  {t.home.portfolioBadge}
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2"
                >
                  {t.home.portfolioTitle}
                </motion.h2>
                <div className="w-20 sm:w-24 h-1 bg-[var(--accent-gold)] mt-4 sm:mt-6 rounded-full" />
              </div>
              <Link to="/project" className="btn-outline hidden md:flex items-center gap-2 shrink-0">
                {t.common.viewAllProjects} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className={`grid gap-6 sm:gap-8 ${
              displayProjects.length === 1
                ? 'max-w-md mx-auto'
                : displayProjects.length === 2
                ? 'max-w-3xl mx-auto sm:grid-cols-2'
                : 'sm:grid-cols-2 lg:grid-cols-3'
            }`}>
              {displayProjects.map((project, idx) => (
                <motion.div
                  key={project.id || idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div className="absolute inset-0 bg-[var(--primary-dark)]/20 group-hover:bg-transparent transition-colors z-10 duration-500" />
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-white/95 backdrop-blur text-[var(--primary-dark)] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--primary-dark)] mb-3 group-hover:text-[var(--accent-blue)] transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    <Link to={`/project/${project.id}`} className="inline-flex items-center text-[var(--accent-blue)] text-sm font-semibold group/link mt-auto pt-2">
                      {t.common.viewDetail} <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 sm:mt-10 text-center md:hidden">
              <Link to="/project" className="btn-outline inline-flex items-center gap-2 text-sm">
                {t.common.viewAllProjects} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Partners/Clients Section - Social Proof */}
      <section className="py-12 sm:py-16 bg-[var(--bg-light)] border-t border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[var(--text-muted)] font-semibold mb-8 sm:mb-10 uppercase tracking-widest text-xs sm:text-sm">
            {homeData?.clientPartnersTitle || t.home.clientPartnersTitle}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-16 opacity-75">
            {(homeData?.clientPartners && homeData.clientPartners.length > 0) ? (
              homeData.clientPartners.map((partner, idx) => (
                <div key={partner.id || idx} className="flex items-center justify-center p-2">
                  {partner.logo ? (
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      className="max-h-8 sm:max-h-12 w-auto object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
                    />
                  ) : (
                    <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-wider text-gray-500 hover:text-[var(--primary-blue)] transition-colors">
                      {partner.name}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-sm">{t.home.noPartners}</div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-28 bg-[var(--primary-dark)] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[300px] sm:w-[600px] md:w-[1000px] h-[300px] sm:h-[600px] md:h-[1000px] rounded-full bg-blue-900/20 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#f8fafc] mb-4 sm:mb-8 drop-shadow-md"
          >
            {t.common.readyToCollaborate}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg md:text-xl text-white mb-8 sm:mb-12 drop-shadow-sm font-medium"
          >
            {t.common.ctaDesc}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/contact" className="btn-gold text-white inline-flex items-center gap-2 text-base sm:text-lg">
              {t.common.contactNow}
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
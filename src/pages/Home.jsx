import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowRight, CheckCircle2, ChevronRight, Activity, Building2, Cpu, Wrench, CalendarClock, Briefcase, Handshake, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const { data, loading } = useData();
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
  const services = [
    { id: 1, title: 'Mechanical, Electrical & Plumbing (MEP)', icon: Wrench, desc: 'Instalasi dan pemeliharaan sistem mekanikal, elektrikal, dan pemipaan profesional.' },
    { id: 2, title: 'Konstruksi & Infrastruktur', icon: Building2, desc: 'Pembangunan infrastruktur dengan standar kualitas dan keselamatan tinggi.' },
    { id: 3, title: 'Pertambangan', icon: Activity, desc: 'Dukungan operasional dan penyediaan barang untuk industri pertambangan.' },
    { id: 4, title: 'Solusi Digitalisasi', icon: Cpu, desc: 'Inovasi teknologi untuk meningkatkan efisiensi dan produktivitas industri.' }
  ];

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

  // Proyek unggulan: hanya yang ditandai admin (featured).
  // Fallback: jika belum ada yang ditandai, tampilkan 6 proyek pertama (perilaku lama).
  const allProjects = Array.isArray(data?.projects) ? data.projects : [];
  const markedFeatured = allProjects.filter(p => p.featured);
  const displayProjects = (markedFeatured.length > 0 ? markedFeatured : allProjects).slice(0, 6);

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
        <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center items-end pb-8">
          <div className="flex w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-x-1 sm:space-x-2">
            {images.map((_, index) => (
              <div 
                key={index}
                onClick={() => setCurrentHeroIndex(index)}
                className="flex-1 cursor-pointer group"
              >
                <div className="flex flex-col mb-4 items-start justify-end h-16">
                  <span className={`text-[10px] sm:text-sm font-bold transition-all duration-300 ${index === currentHeroIndex ? 'text-white flex items-center drop-shadow-md' : 'text-white/60 group-hover:text-white/90'}`}>
                    {index === currentHeroIndex && <span className="inline-block w-3 h-3 rounded-full bg-[var(--primary-blue)] mr-2.5 shadow-[0_0_8px_rgba(30,58,138,0.8)]"></span>}
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full mt-[-10rem]">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-[var(--accent-blue)]/20 border border-[var(--accent-blue)]/30 text-[var(--accent-gold)] text-sm font-semibold tracking-wider mb-6">
                INOVASI & KUALITAS
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 mt-2 drop-shadow-lg">
                {heroData.heroTitle}
              </h1>
              <p className="text-lg md:text-xl text-white font-medium leading-relaxed max-w-2xl drop-shadow-md">
                {heroData.heroSubtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Company Stats - Professional content boxes */}
      <section className="py-20 bg-[var(--bg-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: CalendarClock, value: '10+', label: 'Tahun Pengalaman' },
              { icon: Briefcase, value: '50+', label: 'Proyek Diselesaikan' },
              { icon: Handshake, value: '30+', label: 'Klien Terpercaya' },
              { icon: Award, value: '4', label: 'Sektor Industri' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.08)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-[var(--primary-blue)]/10 flex items-center justify-center">
                  <stat.icon className="w-7 h-7 text-[var(--primary-blue)]" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-[var(--primary-dark)] mb-2">{stat.value}</div>
                <div className="text-sm md:text-base font-medium text-[var(--text-muted)]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section - NEW! (Builds Trust early on) */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
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
              <div className="absolute -bottom-8 -right-8 bg-[var(--primary-blue)] text-white p-8 rounded-2xl shadow-xl hidden md:block border-4 border-white">
                <div className="text-5xl font-bold text-[var(--accent-gold)] mb-2">10+</div>
                <div className="text-sm font-medium tracking-wide">Tahun<br/>Pengalaman</div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[var(--accent-blue)] font-semibold tracking-wider uppercase text-sm">Tentang Ziotech</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 leading-tight">Solusi Terpercaya untuk Infrastruktur Anda</h2>
              <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
                Didirikan dengan semangat profesionalisme dan integritas, PT Ziotech Global Inovasi berfokus pada penyediaan layanan dan produk yang mampu meningkatkan produktivitas serta memberikan nilai tambah bagi setiap klien.
              </p>
              <ul className="space-y-4 mb-8">
                {['Tim Ahli Bersertifikasi & Profesional', 'Penerapan Standar K3 Terketat', 'Pendekatan Inovatif & Tepat Waktu'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--accent-blue)]/10 flex items-center justify-center text-[var(--accent-blue)] flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-[var(--text-main)]">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/about" className="btn-primary inline-flex items-center gap-2">
                Kenali Kami Lebih Dekat <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section - Updated background and card colors for better hierarchy */}
      <section className="py-24 bg-[var(--bg-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[var(--accent-blue)] font-semibold tracking-wider uppercase text-sm"
            >
              Layanan Kami
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mt-2"
            >
              Solusi Terintegrasi Untuk Bisnis Anda
            </motion.h2>
            <div className="w-24 h-1 bg-[var(--accent-gold)] mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div 
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-8 lg:p-10 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-[var(--primary-blue)]/5 text-[var(--primary-blue)] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[var(--primary-blue)] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--primary-dark)] mb-4 group-hover:text-[var(--primary-blue)] transition-colors">{service.title}</h3>
                  <p className="text-[var(--text-muted)] font-medium mb-6 leading-relaxed">
                    {service.desc}
                  </p>
                  <Link to="/service" className="inline-flex items-center text-[var(--accent-blue)] font-semibold group/link mt-auto">
                    Selengkapnya 
                    <ChevronRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects Section - NEW! (Provides Proof of Work) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[var(--accent-blue)] font-semibold tracking-wider uppercase text-sm"
              >
                Portofolio
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mt-2"
              >
                Proyek Unggulan Kami
              </motion.h2>
              <div className="w-24 h-1 bg-[var(--accent-gold)] mt-6 rounded-full" />
            </div>
            <Link to="/project" className="btn-outline hidden md:flex items-center gap-2 shrink-0">
              Lihat Semua Proyek <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProjects.map((project, idx) => (
              <motion.div
                key={project.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
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
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[var(--primary-dark)] mb-3 group-hover:text-[var(--accent-blue)] transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                  <Link to="/project" className="inline-flex items-center text-[var(--accent-blue)] text-sm font-semibold group/link">
                    Detail Proyek <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <Link to="/project" className="btn-outline inline-flex items-center gap-2">
              Lihat Semua Proyek <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Partners/Clients Section - NEW! (Social Proof) */}
      <section className="py-16 bg-[var(--bg-light)] border-t border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[var(--text-muted)] font-semibold mb-10 uppercase tracking-widest text-sm">Dipercaya Oleh Berbagai Perusahaan Terkemuka</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-60">
            {/* Dummy Logos text-based for now, can be replaced with real img tags */}
            <div className="text-2xl md:text-3xl font-black font-sans text-gray-400 hover:text-[var(--primary-blue)] transition-colors">PERTAMINA</div>
            <div className="text-2xl md:text-3xl font-black font-serif text-gray-400 hover:text-[var(--primary-blue)] transition-colors">PLN</div>
            <div className="text-2xl md:text-3xl font-black font-sans tracking-tighter text-gray-400 hover:text-[var(--primary-blue)] transition-colors">WIKA</div>
            <div className="text-2xl md:text-3xl font-black font-sans text-gray-400 hover:text-[var(--primary-blue)] transition-colors">ANTAM</div>
            <div className="text-2xl md:text-3xl font-black font-serif italic text-gray-400 hover:text-[var(--primary-blue)] transition-colors">Adhi</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-28 bg-[var(--primary-dark)] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-blue-900/20 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-[#f8fafc] mb-8 drop-shadow-md"
          >
            Siap Membangun Masa Depan Bersama Ziotech?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white mb-12 drop-shadow-sm font-medium"
          >
            Hubungi tim ahli kami untuk mendiskusikan kebutuhan proyek Anda.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/contact" className="btn-gold text-white inline-flex items-center gap-2 text-lg">
              Mulai Diskusi Proyek
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
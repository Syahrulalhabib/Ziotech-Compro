import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { Wrench, Building2, Activity, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getServiceIcon } from '../data/serviceIcons';

export default function Service() {
  const { data, loading } = useData();
  const { t } = useLanguage();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0284c7]"></div>
    </div>
  );

  const defaultServices = [
    {
      id: 'mep',
      title: 'Mechanical, Electrical & Plumbing (MEP)',
      icon: Wrench,
      description: 'Solusi terpadu untuk kebutuhan mekanikal, elektrikal, dan pemipaan pada berbagai skala proyek.',
      features: [
        'Desain dan Instalasi Sistem HVAC',
        'Pemasangan Sistem Kelistrikan Industri & Gedung',
        'Instalasi Pipa Air Bersih dan Air Kotor',
        'Sistem Proteksi Kebakaran (Fire Fighting)',
        'Pemeliharaan dan Perawatan Rutin'
      ],
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'construction',
      title: 'Konstruksi & Infrastruktur',
      icon: Building2,
      description: 'Layanan konstruksi komprehensif yang mengutamakan kualitas struktur dan keselamatan kerja.',
      features: [
        'Pembangunan Gedung Komersial',
        'Konstruksi Fasilitas Industri',
        'Pengembangan Infrastruktur Jalan',
        'Renovasi dan Perbaikan Struktur',
        'Manajemen Proyek Konstruksi'
      ],
      image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'mining',
      title: 'Solusi Pertambangan',
      icon: Activity,
      description: 'Penyediaan barang consumable dan dukungan infrastruktur untuk kelancaran operasional tambang.',
      features: [
        'Suplai Sparepart Alat Berat',
        'Penyediaan Consumable Barang Tambang',
        'Pembangunan Fasilitas Penunjang Tambang',
        'Sistem Kelistrikan Area Tambang',
        'Instalasi Pemipaan Industri Tambang'
      ],
      image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'digital',
      title: 'Solusi Digitalisasi',
      icon: Cpu,
      description: 'Transformasi digital untuk meningkatkan efisiensi operasional dan manajemen aset.',
      features: [
        'Sistem Otomasi Gedung (BMS)',
        'Pemantauan Energi Cerdas',
        'Digitalisasi Manajemen Aset',
        'Sistem Keamanan Terintegrasi',
        'IoT untuk Industri'
      ],
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const services = data?.services || defaultServices;
  const header = data?.pageHeaders?.service || {};

  return (
    <div className="overflow-hidden bg-[#f8fafc]">
      {/* 1. Header (Pertamina corporate style) */}
      <section className="relative bg-[#0b1329] text-white pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        {header.image ? (
          <div className="absolute inset-0 z-0 bg-[#1e293b]">
            <img src={header.image} alt="Background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ) : (
          <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:24px_24px]" />
        )}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="text-[11px] font-bold tracking-widest text-[#38bdf8] uppercase block mb-3">
              {t.servicePage.heroBadge}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              {header.title || t.servicePage.defaultHeaderTitle}
            </h1>
            <p className="text-sm sm:text-lg text-slate-300 font-light leading-relaxed">
              {header.subtitle || t.servicePage.defaultHeaderSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Services List */}
      <section className="py-20 sm:py-28 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          {services.map((service, idx) => {
            const Icon = typeof service.icon === 'function' ? service.icon : getServiceIcon(service.icon, idx);
            const isEven = idx % 2 === 1;
            
            return (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className={`bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-100 flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-14 items-center shadow-sm hover:shadow-md transition-shadow`}
              >
                {/* Image Side */}
                <div className="w-full lg:w-1/2">
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/11] border border-slate-100 group bg-slate-200">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-slate-100">
                      {Icon ? <Icon className="w-6 h-6 text-[#0284c7]" /> : <Wrench className="w-6 h-6 text-[#0284c7]" />}
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2">
                  <span className="text-[10px] font-bold tracking-widest text-[#0284c7] uppercase mb-2 block">
                    {t.servicePage.sectorLabel} 0{idx + 1}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] mb-3 leading-tight">
                    {service.title}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="bg-[#f8fafc] p-5 sm:p-6 rounded-2xl border border-slate-100 mb-8">
                    <h3 className="font-bold text-[#0f172a] mb-3 flex items-center gap-2 text-xs sm:text-sm tracking-wide uppercase">
                      {t.common.scopeOfWork}
                    </h3>
                    <ul className="space-y-2.5">
                      {(service.features || []).map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                          <span className="text-slate-600 text-xs sm:text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <Link 
                      to={`/service/${service.id}`} 
                      className="pertamina-btn-pill"
                    >
                      {t.common.viewDetail} <ArrowRight className="w-3.5 h-3.5 text-[#0284c7]" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
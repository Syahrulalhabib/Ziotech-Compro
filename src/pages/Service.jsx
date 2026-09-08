import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { Wrench, Building2, Activity, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Service() {
  const { data, loading } = useData();
  const { t } = useLanguage();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
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
    <div className="pt-20 md:pt-32 overflow-hidden">
      {/* Header */}
      <section className="bg-[var(--primary-dark)] text-white py-16 md:py-28 mt-[-5rem] md:mt-[-8rem] relative overflow-hidden">
        {header.image && (
          <>
            <div className="absolute inset-0 z-0">
              <img src={header.image} alt="Background" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-[var(--primary-dark)]/20 z-10"></div>
          </>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-16 sm:pt-20 flex justify-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left max-w-3xl"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 drop-shadow-md text-white">{header.title || t.servicePage.defaultHeaderTitle}</h1>
            <p className="text-base sm:text-xl text-white font-medium drop-shadow-sm">
              {header.subtitle || t.servicePage.defaultHeaderSubtitle}
            </p>
          </motion.div>
        </div>
      </section>
      {/* Services List */}
      <section className="py-12 sm:py-20 bg-[var(--bg-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const isEven = idx % 2 === 1;
            
            return (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 items-center`}
              >
                {/* Image Side */}
                <div className="w-full lg:w-1/2">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                    <div className="absolute inset-0 bg-[var(--primary-blue)]/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-[260px] sm:h-[350px] md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 z-20 bg-white p-2.5 sm:p-3 rounded-xl shadow-lg">
                      {Icon ? <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--accent-blue)]" /> : <Wrench className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--accent-blue)]" />}
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--primary-dark)] mb-3 sm:mb-4">{service.title}</h2>
                  <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="bg-white p-5 sm:p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="font-semibold text-[var(--primary-dark)] mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                      <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--accent-gold)]" /> {t.common.scopeOfWork}:
                    </h3>
                    <ul className="space-y-2.5 sm:space-y-3">
                      {(service.features || []).map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--accent-blue)] shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    <Link 
                      to={`/service/${service.id}`} 
                      className="inline-flex items-center gap-2 text-[var(--accent-blue)] font-bold hover:text-[var(--primary-blue)] transition-colors group/link"
                    >
                      {t.common.viewDetail} <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
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
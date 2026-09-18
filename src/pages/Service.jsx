import { useData, defaultData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { Wrench, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getServiceIcon } from '../data/serviceIcons';

export default function Service() {
  const { data } = useData();

  const services = data?.services || defaultData.services;
  const header = data?.pageHeaders?.service || {};

  return (
    <div className="overflow-hidden bg-[#f8fafc]">
      {/* 1. Header (Pertamina corporate style) */}
      <section className="relative bg-[#0b1329] text-white pt-28 pb-14 sm:pt-36 sm:pb-20 md:pt-44 md:pb-28 overflow-hidden">
        {header.image ? (
          <div className="absolute inset-0 z-0 bg-[#0b1329]">
            <img 
              src={header.image} 
              alt="Background" 
              className="w-full h-full object-cover object-center sm:object-right opacity-45 sm:opacity-55" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1329] via-[#0b1329]/85 to-[#0b1329]/60 sm:bg-gradient-to-r sm:from-[#0b1329] sm:via-[#0b1329]/85 sm:to-[#0b1329]/35 pointer-events-none" />
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
            <span className="text-[11px] sm:text-xs font-bold tracking-widest text-[#38bdf8] uppercase block mb-2 sm:mb-3">
              {header.badge || 'SPESIALISASI REKAYASA TEKNIK'}
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3 sm:mb-4 leading-tight">
              {header.title || 'Layanan Rekayasa & Solusi Industri'}
            </h1>
            <p className="text-xs sm:text-base md:text-lg text-slate-300 font-light leading-relaxed">
              {header.subtitle || 'Penyediaan jasa konstruksi, instalasi mechanical-electrical-plumbing, serta pengadaan peralatan teknis berstandar mutu tinggi.'}
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
                className={`bg-white rounded-none p-6 sm:p-10 lg:p-12 border border-slate-100 flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-14 items-center shadow-sm hover:shadow-md transition-shadow`}
              >
                {/* Image Side */}
                <div className="w-full lg:w-1/2">
                  <div className="relative rounded-none overflow-hidden aspect-[16/11] border border-slate-100 group bg-slate-200">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 z-20 bg-white/95  p-3 rounded-none shadow-sm border border-slate-100">
                      {Icon ? <Icon className="w-6 h-6 text-[#0284c7]" /> : <Wrench className="w-6 h-6 text-[#0284c7]" />}
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2">
                  <span className="text-[10px] font-bold tracking-widest text-[#0284c7] uppercase mb-2 block">
                    BIDANG LAYANAN 0{idx + 1}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] mb-3 leading-tight">
                    {service.title}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="bg-[#f8fafc] p-5 sm:p-6 rounded-none border border-slate-100 mb-8">
                    <h3 className="font-bold text-[#0f172a] mb-3 flex items-center gap-2 text-xs sm:text-sm tracking-wide uppercase">
                      Ruang Lingkup Pekerjaan
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
                      Detail Pekerjaan <ArrowRight className="w-3.5 h-3.5 text-[#0284c7]" />
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
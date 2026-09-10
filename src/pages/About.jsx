import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { Target, Lightbulb, Shield, Users, ArrowRight, Award, Compass, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const { data } = useData();
  const { t } = useLanguage();

  

  const aboutData = data?.about || {
    description: t.aboutPage.defaultDesc,
    vision: t.aboutPage.defaultVision,
    mission: t.aboutPage.defaultMission,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  };

  const header = data?.pageHeaders?.about || {};

  const values = [
    { icon: Shield, title: t.aboutPage.val1Title, desc: t.aboutPage.val1Desc },
    { icon: Lightbulb, title: t.aboutPage.val2Title, desc: t.aboutPage.val2Desc },
    { icon: Target, title: t.aboutPage.val3Title, desc: t.aboutPage.val3Desc },
    { icon: Users, title: t.aboutPage.val4Title, desc: t.aboutPage.val4Desc }
  ];

  return (
    <div className="overflow-hidden bg-[#f8fafc]">
      {/* 1. Page Header (Pertamina corporate style) */}
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
              {t.aboutPage.heroBadge}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              {header.title || t.aboutPage.defaultHeaderTitle}
            </h1>
            <p className="text-sm sm:text-lg text-slate-300 font-light leading-relaxed">
              {header.subtitle || t.aboutPage.defaultHeaderSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Main About Section */}
      <section className="py-14 sm:py-28 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Image side */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 relative mb-8 lg:mb-0"
            >
              <div className="relative rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-slate-200">
                <img 
                  src={aboutData.image || "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"} 
                  alt="Tentang Ziotech" 
                  className="w-full h-[360px] sm:h-[460px] object-cover"
                />
              </div>
              
              <div className="absolute -bottom-5 right-2 sm:-bottom-6 sm:-right-6 bg-white p-4 sm:p-6 rounded-2xl shadow-xl border border-slate-100 max-w-[200px] sm:max-w-[220px]">
                <div className="flex items-center gap-3 mb-1">
                  <Award className="w-6 h-6 text-[#0284c7]" />
                  <span className="text-3xl font-extrabold text-[#0f172a]">10+</span>
                </div>
                <div className="text-xs font-semibold text-slate-600 leading-snug">
                  {t.aboutPage.statsYears}
                </div>
              </div>
            </motion.div>

            {/* Content side */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <span className="text-[11px] font-bold tracking-widest text-[#0284c7] uppercase mb-2 block">
                SIAPA KAMI
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a] mb-6 leading-tight">
                {t.aboutPage.mainTitle}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-10 whitespace-pre-line">
                {aboutData.description}
              </p>

              {/* Visi & Misi Cards */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="bg-[#f8fafc] p-6 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#0284c7]/10 flex items-center justify-center text-[#0284c7] mb-4">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#0f172a] mb-2">
                    {t.aboutPage.visionTitle}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {aboutData.vision}
                  </p>
                </div>

                <div className="bg-[#f8fafc] p-6 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#0284c7]/10 flex items-center justify-center text-[#0284c7] mb-4">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#0f172a] mb-2">
                    {t.aboutPage.missionTitle}
                  </h3>
                  <div className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                    {aboutData.mission}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Core Values Section (Pertamina Corporate Value Style) */}
      <section className="py-20 sm:py-28 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
            <span className="text-[11px] font-bold tracking-widest text-[#0284c7] uppercase mb-2 block">
              {t.aboutPage.valuesBadge}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight mb-4">
              {t.aboutPage.valuesTitle}
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              {t.aboutPage.valuesSubtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="bg-white p-7 rounded-2xl border border-slate-100 hover:border-slate-300 hover:shadow-sm transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-slate-50 text-[#0284c7] flex items-center justify-center mb-5 group-hover:bg-[#0284c7] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0f172a] mb-2.5">
                      {val.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
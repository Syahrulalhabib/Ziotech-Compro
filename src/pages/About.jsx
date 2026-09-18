import { useData } from '../context/DataContext';
import { Target, Lightbulb, Shield, Users, Award, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const { data } = useData();

  const aboutData = data?.about || {
    description: 'Didirikan dengan komitmen profesionalisme, PT Ziotech Global Inovasi berfokus pada penyediaan solusi engineering, konstruksi terpadu, dan pengadaan komponen teknis yang mendukung efisiensi operasional serta profitabilitas bisnis para mitra.',
    vision: 'Menjadi mitra rekayasa teknik dan kontraktor pilihan utama di Indonesia yang diakui atas keunggulan mutu, kepatuhan keselamatan kerja, dan integritas kemitraan.',
    mission: '1. Menyediakan layanan engineering dan konstruksi berkualitas unggul sesuai standar teknis nasional dan internasional.\n2. Mengembangkan kompetensi SDM dan adopsi teknologi mutakhir secara berkesinambungan.\n3. Menjalin kemitraan jangka panjang yang transparan, profesional, dan saling menguntungkan.\n4. Menjunjung tinggi aspek Keselamatan, Kesehatan Kerja, dan Lingkungan Hidup (K3LH).',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  };

  const header = data?.pageHeaders?.about || {};

  const defaultIcons = [Shield, Lightbulb, Target, Users];
  const defaultValues = [
    { icon: Shield, title: 'Integritas & Akuntabilitas', desc: 'Menjaga transparansi, keterbukaan informasi, dan tanggung jawab penuh dalam setiap amanah proyek yang dipercayakan.' },
    { icon: Lightbulb, title: 'Kualitas Tanpa Kompromi', desc: 'Menerapkan kendali mutu (quality control) berlapis sejak tahap perencanaan, pengadaan material, hingga komisioning akhir.' },
    { icon: Target, title: 'Inovasi & Efisiensi', desc: 'Mengadopsi metode rekayasa modern dan efisiensi sumber daya guna menghasilkan output berbiaya optimal dengan performa prima.' },
    { icon: Users, title: 'Kolaborasi Profesional', desc: 'Membangun sinergi solid antara pemilik proyek, konsultan, pengawas, dan mitra rantai pasok demi kelancaran eksekusi.' }
  ];

  const values = (aboutData.values && Array.isArray(aboutData.values) && aboutData.values.length > 0)
    ? aboutData.values.map((val, idx) => ({
        icon: defaultIcons[idx % defaultIcons.length],
        title: val.title || defaultValues[idx]?.title || '',
        desc: val.desc || defaultValues[idx]?.desc || ''
      }))
    : defaultValues;

  return (
    <div className="overflow-hidden bg-[#f8fafc]">
      {/* 1. Page Header (Pertamina corporate style) */}
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
              {header.badge || 'PROFIL KORPORASI'}
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3 sm:mb-4 leading-tight">
              {header.title || 'Tentang Perusahaan'}
            </h1>
            <p className="text-xs sm:text-base md:text-lg text-slate-300 font-light leading-relaxed">
              {header.subtitle || 'Membangun kapabilitas teknik dan pengadaan industri dengan standar keandalan tinggi dan tata kelola berintegritas.'}
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
              <div className="relative rounded-none overflow-hidden border border-slate-100 shadow-sm bg-slate-200">
                <img 
                  src={aboutData.image || "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"} 
                  alt="Tentang Ziotech" 
                  className="w-full h-[360px] sm:h-[460px] object-cover"
                />
              </div>
              
              <div className="absolute -bottom-5 right-2 sm:-bottom-6 sm:-right-6 bg-white p-4 sm:p-6 rounded-none shadow-xl border border-slate-100 max-w-[200px] sm:max-w-[220px]">
                <div className="flex items-center gap-3 mb-1">
                  <Award className="w-6 h-6 text-[#0284c7]" />
                  <span className="text-3xl font-extrabold text-[#0f172a]">
                    {aboutData.experienceYears || '10+'}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-600 leading-snug">
                  {aboutData.experienceLabel || 'Tahun Pengalaman Kerja'}
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
                {aboutData.badge || 'SIAPA KAMI'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a] mb-6 leading-tight">
                {aboutData.mainTitle || 'Mitra Strategis Rekayasa Teknik & Pengadaan Terintegrasi'}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-10 whitespace-pre-line">
                {aboutData.description}
              </p>

              {/* Visi & Misi Cards */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="bg-[#f8fafc] p-6 rounded-none border border-slate-100 hover:border-slate-200 transition-colors">
                  <div className="w-10 h-10 rounded-none bg-[#0284c7]/10 flex items-center justify-center text-[#0284c7] mb-4">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#0f172a] mb-2">
                    {aboutData.visionTitle || 'Visi Kami'}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {aboutData.vision}
                  </p>
                </div>

                <div className="bg-[#f8fafc] p-6 rounded-none border border-slate-100 hover:border-slate-200 transition-colors">
                  <div className="w-10 h-10 rounded-none bg-[#0284c7]/10 flex items-center justify-center text-[#0284c7] mb-4">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#0f172a] mb-2">
                    {aboutData.missionTitle || 'Misi Kami'}
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
              {aboutData.valuesBadge || 'TATA NILAI PERUSAHAAN'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight mb-4">
              {aboutData.valuesTitle || 'Prinsip Dasar yang Menjiwai Setiap Langkah Kami'}
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              {aboutData.valuesSubtitle || 'Tata nilai luhur yang menjadi pedoman etika kerja, pengambilan keputusan, dan budaya operasional seluruh insan PT Ziotech Global Inovasi.'}
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
                  className="bg-white p-7 rounded-none border border-slate-100 hover:border-slate-300 hover:shadow-sm transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-none bg-slate-50 text-[#0284c7] flex items-center justify-center mb-5 group-hover:bg-[#0284c7] group-hover:text-white transition-colors duration-300">
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
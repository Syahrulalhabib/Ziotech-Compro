import { useData } from '../context/DataContext';
import { Target, Lightbulb, Shield, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const { data, loading } = useData();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
    </div>
  );

  const aboutData = data?.about || {
    description: 'Didirikan dengan semangat profesionalisme dan integritas, PT Ziotech Global Inovasi berfokus pada penyediaan layanan dan produk yang mampu meningkatkan produktivitas serta memberikan nilai tambah bagi setiap klien.',
    vision: 'Menjadi perusahaan terkemuka di bidang konstruksi, pertambangan, komersil, dan infrastruktur dengan solusi inovatif dan berkelanjutan.',
    mission: '1. Memberikan layanan dan produk berkualitas tinggi.\n2. Mengedepankan inovasi dan teknologi.\n3. Membangun kemitraan strategis jangka panjang.\n4. Berkontribusi pada pembangunan infrastruktur nasional.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  };

  const header = data?.pageHeaders?.about || {};

  const values = [
    { icon: Shield, title: 'Integritas', desc: 'Kami menjunjung tinggi kejujuran dan etika profesional dalam setiap aspek pekerjaan.' },
    { icon: Lightbulb, title: 'Inovasi', desc: 'Terus berinovasi memberikan solusi terbaik menggunakan teknologi terkini.' },
    { icon: Target, title: 'Kualitas', desc: 'Berkomitmen penuh pada standar kualitas tinggi untuk kepuasan klien.' },
    { icon: Users, title: 'Kolaborasi', desc: 'Membangun sinergi yang kuat dengan mitra dan seluruh pemangku kepentingan.' }
  ];

  return (
    <div className="pt-24 md:pt-32">
      {/* Page Header */}
      <section className="bg-[var(--primary-dark)] text-white py-28 relative overflow-hidden mt-[-6rem] md:mt-[-8rem]">
        {header.image && (
          <>
            <div className="absolute inset-0 z-0">
              <img src={header.image} alt="Background" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-[var(--primary-dark)]/20 z-10"></div>
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-dark)]/70 to-transparent z-10 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-20 flex justify-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md text-white">{header.title || 'Tentang Kami'}</h1>
            <p className="text-xl text-white max-w-2xl drop-shadow-sm font-medium">{header.subtitle || 'Mengenal lebih dekat PT Ziotech Global Inovasi, visi, misi, dan nilai-nilai perusahaan.'}</p>
          </motion.div>
        </div>
      </section>

      {/* Main About Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-[var(--accent-gold)]/20 rounded-2xl transform rotate-3"></div>
              <img 
                src={aboutData.image || "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"} 
                alt="Tentang Ziotech" 
                className="relative rounded-2xl shadow-xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-xl shadow-lg hidden md:block">
                <div className="text-4xl font-bold text-[var(--primary-blue)] mb-1">10+</div>
                <div className="text-sm font-semibold text-gray-600">Tahun<br/>Pengalaman</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-[var(--primary-dark)] mb-6">Mitra Terpercaya Untuk Solusi Industri</h2>
              <div className="prose prose-lg text-gray-600">
                <p className="leading-relaxed mb-6">{aboutData.description}</p>
                
                <div className="mt-10 space-y-8">
                  <div className="bg-[var(--bg-light)] p-6 rounded-xl border-l-4 border-[var(--primary-blue)]">
                    <h3 className="text-xl font-bold text-[var(--primary-dark)] mb-3 flex items-center gap-2">
                      <Target className="text-[var(--primary-blue)]" /> Visi Kami
                    </h3>
                    <p className="text-gray-700">{aboutData.vision}</p>
                  </div>
                  
                  <div className="bg-[var(--bg-light)] p-6 rounded-xl border-l-4 border-[var(--accent-gold)]">
                    <h3 className="text-xl font-bold text-[var(--primary-dark)] mb-3 flex items-center gap-2">
                      <ArrowRight className="text-[var(--accent-gold)]" /> Misi Kami
                    </h3>
                    <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                      {aboutData.mission}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-[var(--bg-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[var(--primary-dark)] mb-4">Nilai-Nilai Perusahaan</h2>
            <div className="w-24 h-1 bg-[var(--accent-blue)] mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center group"
                >
                  <div className="w-16 h-16 mx-auto bg-[var(--primary-blue)]/10 text-[var(--primary-blue)] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[var(--primary-blue)] group-hover:text-white transition-all duration-300">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--primary-dark)] mb-3">{val.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{val.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
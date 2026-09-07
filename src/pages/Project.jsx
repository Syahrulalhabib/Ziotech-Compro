import { useState } from 'react';
import { useData } from '../context/DataContext';
import { MapPin, Calendar, Building2, ChevronRight, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Project() {
  const { data, loading } = useData();
  const [activeCategory, setActiveCategory] = useState('Semua');

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
    </div>
  );

  const projects = Array.isArray(data?.projects) ? data.projects : [];

  const categories = ['Semua', ...new Set(projects.map(p => p.category))];

  const filteredProjects = activeCategory === 'Semua'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const header = data?.pageHeaders?.project || {};

  return (
    <div className="pt-24 md:pt-32">
      {/* Header */}
      <section className="bg-[var(--primary-dark)] text-white py-28 mt-[-6rem] md:mt-[-8rem] relative overflow-hidden">
        {header.image && (
          <>
            <div className="absolute inset-0 z-0">
              <img src={header.image} alt="Background" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-[var(--primary-dark)]/20 z-10"></div>
          </>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-20 flex justify-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-md text-white">{header.title || 'Portofolio Proyek'}</h1>
            <p className="text-xl text-white font-medium drop-shadow-sm">
              {header.subtitle || 'Bukti nyata komitmen kami dalam memberikan hasil karya terbaik di berbagai sektor industri.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-[var(--bg-light)] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filter Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            <div className="flex items-center gap-2 mr-4 text-gray-500 font-medium hidden md:flex">
              <Filter className="w-5 h-5" /> Filter:
            </div>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === category
                    ? 'bg-[var(--accent-blue)] text-white shadow-lg shadow-blue-500/30'
                    : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200 hover:border-blue-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Project Grid */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 group cursor-pointer"
                >
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <p className="text-white text-sm font-medium line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    <div className="absolute top-4 right-4 bg-[var(--accent-gold)] text-[var(--primary-dark)] text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                      {project.category}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[var(--primary-dark)] mb-4 line-clamp-2 group-hover:text-[var(--primary-blue)] transition-colors">
                      {project.title}
                    </h3>
                    
                    <div className="space-y-3 text-sm text-[var(--text-muted)] font-medium mb-6">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-4 h-4 text-[var(--primary-blue)]" />
                        <span className="font-medium">{project.client}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-[var(--primary-blue)]" />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-[var(--primary-blue)]" />
                        <span>Tahun {project.year}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center text-[var(--accent-blue)] font-medium text-sm group/link">
                      Lihat Detail
                      <ChevronRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">Belum ada proyek untuk kategori ini.</p>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
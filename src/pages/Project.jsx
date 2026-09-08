import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Building2, ChevronRight, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Project() {
  const { data, loading } = useData();
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('Semua');

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0284c7]"></div>
    </div>
  );

  const projects = Array.isArray(data?.projects) ? data.projects : [];

  const categories = ['Semua', ...new Set(projects.map(p => p.category))];

  const filteredProjects = activeCategory === 'Semua'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const header = data?.pageHeaders?.project || {};

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
              {t.projectPage.heroBadge}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              {header.title || t.projectPage.defaultHeaderTitle}
            </h1>
            <p className="text-sm sm:text-lg text-slate-300 font-light leading-relaxed">
              {header.subtitle || t.projectPage.defaultHeaderSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 sm:py-24 bg-[#f8fafc] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Pertamina-style Pill Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center items-center gap-2 mb-12 sm:mb-16"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`cursor-pointer px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-[#0f172a] text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {category === 'Semua' ? t.common.all : category}
              </button>
            ))}
          </motion.div>

          {/* Project Grid */}
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-slate-300 hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    {/* Project Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-sm text-[#0f172a] text-[11px] font-bold px-3 py-1 rounded-full border border-slate-100 shadow-sm">
                        {project.category}
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-[#0f172a] mb-2 line-clamp-2 group-hover:text-[#0284c7] transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 mb-5">
                        {project.description}
                      </p>

                      <div className="space-y-2 text-xs text-slate-500 font-medium">
                        <div className="flex items-center gap-2.5">
                          <Building2 className="w-3.5 h-3.5 text-[#0284c7] shrink-0" />
                          <span className="truncate">{project.client}</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <MapPin className="w-3.5 h-3.5 text-[#0284c7] shrink-0" />
                          <span className="truncate">{project.location}</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <Calendar className="w-3.5 h-3.5 text-[#0284c7] shrink-0" />
                          <span>{t.common.yearPrefix} {project.year}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <Link 
                      to={`/project/${project.id}`} 
                      className="pertamina-btn-pill w-full justify-center text-center"
                    >
                      {t.common.viewDetail}
                      <ChevronRight className="w-3.5 h-3.5 text-[#0284c7]" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 p-8 max-w-md mx-auto">
              <Building2 className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p className="text-sm font-semibold text-slate-600">{t.common.emptyProjects}</p>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}



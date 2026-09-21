import { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Search, BookOpen, Newspaper } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function News() {
  const { data } = useData();
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const allNews = Array.isArray(data?.news) ? data.news : [];
  const header = data?.pageHeaders?.news || {
    badge: 'BERITA & PUBLIKASI',
    title: 'Ruang Berita & Publikasi',
    subtitle: 'Siaran pers terkini, liputan kegiatan operasional, dan inisiatif keberlanjutan perusahaan.',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
  };

  const categories = useMemo(() => {
    const raw = allNews.map(item => item.category).filter(Boolean);
    return ['Semua', ...Array.from(new Set(raw))];
  }, [allNews]);

  const filteredArticles = useMemo(() => {
    return allNews.filter(item => {
      const matchCategory = activeCategory === 'Semua' || 
        (item.category || '').toLowerCase() === activeCategory.toLowerCase();
      const matchSearch = !searchQuery.trim() || 
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [allNews, activeCategory, searchQuery]);

  return (
    <div className="overflow-hidden bg-[#f8fafc]">
      <section className="relative bg-[#0b1329] text-white pt-28 pb-14 sm:pt-36 sm:pb-20 md:pt-44 md:pb-28 overflow-hidden">
        {header.image ? (
          <div className="absolute inset-0 z-0 bg-[#0b1329]">
            <img src={header.image} alt="Header" className="w-full h-full object-cover opacity-45" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1329] via-[#0b1329]/80 to-transparent pointer-events-none" />
          </div>
        ) : (
          <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:24px_24px]" />
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <span className="text-xs font-bold tracking-widest text-[#38bdf8] uppercase block mb-2">{header.badge || 'BERITA & PUBLIKASI'}</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3">{header.title || 'Ruang Berita & Publikasi'}</h1>
            <p className="text-sm sm:text-base text-slate-300 font-light">{header.subtitle}</p>
          </motion.div>
        </div>
      </section>
      <section className="py-12 sm:py-20 bg-[#f8fafc] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 mb-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      activeCategory.toLowerCase() === cat.toLowerCase()
                        ? 'bg-[#002d72] text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari rilis berita..."
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0284c7] shadow-sm"
                />
              </div>
            </div>
          </div>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredArticles.map((article) => (
                <motion.div
                  key={article.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 flex flex-col"
                >
                  <Link to={`/news/${article.id}`} className="block relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    <span className="absolute top-3.5 left-3.5 bg-white/95 text-[#0b1329] text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-sm">
                      {article.category || 'PRESS RELEASE'}
                    </span>
                  </Link>

                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-3">
                        <Calendar className="w-3.5 h-3.5 text-sky-600" />
                        <span>{article.date || 'Terkini'}</span>
                        {article.author && <><span>•</span><span className="truncate">{article.author}</span></>}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-2.5 line-clamp-2 group-hover:text-[#0284c7] transition-colors">
                        <Link to={`/news/${article.id}`}>{article.title}</Link>
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed">
                        {article.excerpt || article.content?.slice(0, 150)}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <Link to={`/news/${article.id}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1e3a8a] group-hover:text-[#0284c7] transition-colors">
                        Baca Selengkapnya <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                      {article.type && <span className="text-[10px] font-semibold text-slate-400 uppercase">{article.type}</span>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 p-8 max-w-md mx-auto shadow-sm">
              <Newspaper className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <h3 className="text-base font-bold text-slate-700 mb-1">Tidak ada artikel ditemukan</h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-5">Coba gunakan kata kunci atau kategori lain.</p>
              <button onClick={() => { setActiveCategory('Semua'); setSearchQuery(''); }} className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-full transition-colors cursor-pointer">
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

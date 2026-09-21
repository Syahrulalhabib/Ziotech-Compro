import { motion } from 'framer-motion';
import { Type, Plus, Star, Newspaper, Sparkles } from 'lucide-react';
import InputField from '../components/InputField';
import PageHeaderEditor from '../components/PageHeaderEditor';
import NewsItemCard from '../components/NewsItemCard';
const tabMotion = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.2 } };
const NewsTab = ({ formData, handleChange, handlePageHeaderChange, handleImageUpload, handleArrayChange, addArrayItem, removeArrayItem, toggleNewsFeatured, newsSearch, setNewsSearch }) => (
  <motion.div key="news" {...tabMotion} className="space-y-8">
{/* Page Header Editor */}
<PageHeaderEditor page="news" label="Berita & Publikasi" formData={formData} onChange={handlePageHeaderChange} onImageUpload={handleImageUpload} />

{/* Pengaturan Section Berita di Beranda (Home) */}
<div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-slate-200/80">
  <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
    <div className="p-3 bg-sky-50 text-sky-600 rounded-xl"><Sparkles className="w-6 h-6" /></div>
    <div>
      <h3 className="text-xl font-bold text-slate-800">Section Berita di Beranda (Home)</h3>
      <p className="text-sm text-slate-500 mt-0.5">Atur judul dan deskripsi ruang berita yang tampil di halaman utama.</p>
    </div>
  </div>
  <div className="space-y-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <InputField
        icon={Type}
        label="Badge Atas (Label Kecil)"
        value={formData.home?.newsBadge ?? 'RUANG BERITA & INFORMASI'}
        onChange={(e) => handleChange('home', 'newsBadge', e.target.value)}
        placeholder="cth: RUANG BERITA & INFORMASI"
      />
      <InputField
        icon={Type}
        label="Judul Section Berita"
        value={formData.home?.newsTitle ?? 'Berita & Informasi Terkini'}
        onChange={(e) => handleChange('home', 'newsTitle', e.target.value)}
        placeholder="cth: Berita & Informasi Terkini"
      />
    </div>
    <InputField
      icon={Type}
      label="Subjudul / Deskripsi Section"
      value={formData.home?.newsSubtitle ?? 'Dapatkan pembaruan siaran pers, liputan kegiatan operasional, dan inisiatif keberlanjutan perusahaan.'}
      onChange={(e) => handleChange('home', 'newsSubtitle', e.target.value)}
      placeholder="Deskripsi singkat seputar berita perusahaan..."
      isTextarea
    />
  </div>
</div>

{/* Header Daftar Berita & Filter */}
<div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200/80 space-y-4">
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <h3 className="text-xl font-bold text-slate-800">Daftar Berita & Artikel</h3>
      <p className="text-sm text-slate-500 mt-1">
        Kelola artikel berita, siaran pers (Press Release), dan majalah korporasi.
        {(formData.news || []).filter(n => n.featured).length > 0 && (
          <span className="inline-flex items-center gap-1 ml-2 text-amber-600 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            {(formData.news || []).filter(n => n.featured).length} berita tampil sebagai unggulan
          </span>
        )}
      </p>
    </div>
    <button 
      type="button"
      onClick={() => addArrayItem('news', {
        id: Date.now().toString(),
        title: 'Judul Berita Baru',
        type: 'News',
        category: 'Press Release',
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        author: 'Corporate Communication',
        excerpt: '',
        content: '',
        image: '',
        featured: false
      })}
      className="inline-flex items-center gap-2 bg-sky-50 text-sky-700 hover:bg-sky-100 hover:text-sky-800 border border-sky-200/80 px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer shrink-0"
    >
      <Plus className="w-5 h-5" /> Tambah Berita / Artikel
    </button>
  </div>

  {/* Search Bar */}
  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
    <div className="text-xs text-slate-500 font-medium">
      Total: <span className="font-bold text-slate-700">{(formData.news || []).length}</span> artikel berita
    </div>

    <div className="w-full sm:w-72">
      <input
        type="text"
        value={newsSearch}
        onChange={(e) => setNewsSearch(e.target.value)}
        placeholder="Cari berita berdasarkan judul atau kategori..."
        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-800"
      />
    </div>
  </div>
</div>

{/* List of News items */}
{(formData.news || [])
  .map((item, originalIndex) => ({ item, originalIndex }))
  .filter(({ item }) => {
    return !newsSearch.trim() || 
      (item.title || '').toLowerCase().includes(newsSearch.toLowerCase()) ||
      (item.category || '').toLowerCase().includes(newsSearch.toLowerCase());
  })
  .map(({ item, originalIndex }) => (
    <NewsItemCard
      key={item.id || originalIndex}
      article={item}
      originalIndex={originalIndex}
      isLast={originalIndex === (formData.news?.length || 0) - 1}
      onChange={(field, val) => handleArrayChange('news', originalIndex, field, val)}
      onImageUpload={handleImageUpload}
      onToggleFeatured={() => toggleNewsFeatured(originalIndex)}
      onRemove={() => removeArrayItem('news', originalIndex)}
    />
  ))}

{(!formData.news || formData.news.length === 0) && (
  <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-slate-200 text-slate-500">
    <Newspaper className="w-12 h-12 mx-auto mb-2 text-slate-300 stroke-1" />
    <p className="font-semibold text-slate-700">Belum Ada Berita atau Artikel</p>
    <p className="text-xs text-slate-400 mt-1">Klik tombol 'Tambah Berita / Artikel' untuk menambahkan rilis baru.</p>
  </div>
)}
  </motion.div>
);
export default NewsTab;

import { Newspaper, Star, Trash2, Type, CalendarClock } from 'lucide-react';
import InputField from './InputField';
import ImageUploadBox from './ImageUploadBox';

const NewsItemCard = ({ article, originalIndex, isLast, onChange, onImageUpload, onToggleFeatured, onRemove }) => (
  <div id={isLast ? 'news-new-item' : undefined} className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-slate-200/80 relative group">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-slate-100 gap-4">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="p-3 bg-sky-50 text-sky-600 rounded-xl shrink-0"><Newspaper className="w-6 h-6" /></div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">#{originalIndex + 1}</span>
            {article.category && <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">{article.category}</span>}
            {article.featured && <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800"><Star className="w-3 h-3 fill-amber-500 text-amber-500" /> Unggulan</span>}
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-800 truncate" title={article.title}>{article.title || `Berita #${originalIndex + 1}`}</h3>
        </div>
      </div>
      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
        <button type="button" onClick={onToggleFeatured} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${article.featured ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
          <Star className={`w-3.5 h-3.5 ${article.featured ? 'fill-amber-500 text-amber-500' : ''}`} />
          {article.featured ? 'Unggulan' : 'Biasa'}
        </button>
        <button type="button" onClick={onRemove} className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors border border-transparent hover:border-red-100 shrink-0 cursor-pointer" title="Hapus Berita">
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <InputField icon={Type} label="Judul Berita / Artikel" value={article.title} onChange={(e) => onChange('title', e.target.value)} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField icon={Type} label="Tipe (News / Magazine)" value={article.type} onChange={(e) => onChange('type', e.target.value)} placeholder="cth: News" />
          <InputField icon={Type} label="Kategori" value={article.category} onChange={(e) => onChange('category', e.target.value)} placeholder="cth: Press Release" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField icon={CalendarClock} label="Tanggal Publikasi" value={article.date} onChange={(e) => onChange('date', e.target.value)} placeholder="cth: 20 September 2026" />
        </div>
        <InputField icon={Type} label="Penulis / Redaksi" value={article.author} onChange={(e) => onChange('author', e.target.value)} placeholder="cth: Corporate Communication" />
        <InputField label="Ringkasan Singkat (Excerpt)" value={article.excerpt} onChange={(e) => onChange('excerpt', e.target.value)} placeholder="Cuplikan ringkas..." isTextarea />
        <div className="pt-1">
          <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none bg-slate-50 p-3 rounded-lg border border-slate-200/80 hover:bg-slate-100/70 transition-colors">
            <input type="checkbox" checked={Boolean(article.featured)} onChange={onToggleFeatured} className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-300" />
            <span>Tampilkan sebagai Berita Unggulan di Halaman Utama (Featured)</span>
          </label>
        </div>
      </div>
      <div className="space-y-4">
        <ImageUploadBox label="Gambar / Cover Berita" value={article.image} onChange={(val) => onChange('image', val)} onImageUpload={onImageUpload} />
        <InputField label="Isi Lengkap Berita / Artikel" value={article.content} onChange={(e) => onChange('content', e.target.value)} placeholder="Tuliskan isi berita lengkap di sini..." isTextarea helperText="Tips: Berikan jeda dua baris (Enter) di antara tiap paragraf." />
      </div>
    </div>
  </div>
);

export default NewsItemCard;

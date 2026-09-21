import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowLeft, Calendar, User, Share2, Check, ArrowRight } from 'lucide-react';

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useData();
  const [copied, setCopied] = useState(false);

  const allNews = Array.isArray(data?.news) ? data.news : [];
  const article = allNews.find(item => String(item.id) === String(id));

  const related = allNews
    .filter(item => String(item.id) !== String(id))
    .slice(0, 3);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4 bg-[#f8fafc]">
        <div className="text-center max-w-md bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Artikel Tidak Ditemukan</h2>
          <p className="text-slate-500 text-sm mb-6">Artikel yang Anda cari mungkin telah dipindahkan atau dihapus.</p>
          <button
            onClick={() => navigate('/news')}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1e3a8a] text-white rounded-full text-xs font-bold hover:bg-[#0f172a] transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Berita
          </button>
        </div>
      </div>
    );
  }

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(article.title || '');

  return (
    <div className="pt-28 sm:pt-36 pb-16 sm:pb-24 bg-[#f8fafc] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Breadcrumb */}
        <div className="mb-6 sm:mb-8 flex items-center justify-between">
          <button
            onClick={() => navigate('/news')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#1e3a8a] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Berita
          </button>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            <Link to="/" className="hover:text-slate-700">Beranda</Link> / <Link to="/news" className="hover:text-slate-700">Berita</Link> / <span className="text-slate-600 font-bold">{article.category}</span>
          </span>
        </div>

        {/* Article Container */}
        <article className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
          {/* Header */}
          <div className="p-6 sm:p-10 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="bg-[#1e3a8a] text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full">
                {article.category || 'PRESS RELEASE'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0f172a] leading-tight mb-6">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-4 h-4 text-[#0284c7]" />
                  {article.date}
                </span>
                {article.author && (
                  <span className="flex items-center gap-1.5 font-medium">
                    <User className="w-4 h-4 text-[#0284c7]" />
                    {article.author}
                  </span>
                )}
              </div>

              {/* Share action: 1 tombol Salin Link */}
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-[#0284c7] border border-slate-200/80 transition-all text-xs font-semibold cursor-pointer active:scale-95"
                title="Salin Link Artikel"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-bold">Tersalin ke Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Salin Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
          {/* Featured Image */}
          {article.image && (
            <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Body */}
          <div className="p-6 sm:p-10 text-slate-700 leading-relaxed text-base sm:text-lg space-y-6">
            {article.excerpt && (
              <p className="text-lg sm:text-xl font-medium text-slate-800 italic border-l-4 border-[#0284c7] pl-4 py-1">
                {article.excerpt}
              </p>
            )}

            <div className="space-y-4 pt-2">
              {(article.content || '')
                .split('\n\n')
                .filter(Boolean)
                .map((paragraph, idx) => (
                  <p key={idx} className="text-slate-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
            </div>
          </div>

          {/* Author info & back button */}
          <div className="px-6 py-6 sm:px-10 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Diterbitkan oleh <span className="font-bold text-slate-700">{article.author || 'Tim Media Ziotech'}</span>
            </div>
            <button
              onClick={() => navigate('/news')}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1e3a8a] text-white text-xs font-bold hover:bg-[#0f172a] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Berita Lainnya
            </button>
          </div>
        </article>

        {/* Related Articles Section */}
        {related.length > 0 && (
          <div className="mt-14 sm:mt-20">
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0f172a]">Berita Terkait</h3>
              <Link to="/news" className="text-xs font-bold text-[#1e3a8a] hover:text-[#0284c7] inline-flex items-center gap-1">
                Lihat Semua <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map(rel => (
                <Link
                  key={rel.id}
                  to={`/news/${rel.id}`}
                  className="group bg-white rounded-xl overflow-hidden border border-slate-200/80 hover:shadow-md hover:border-slate-300 transition-all flex flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <img src={rel.image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-2.5 left-2.5 bg-white/95 text-[#0b1329] text-[9px] font-bold uppercase px-2 py-0.5 rounded-full">
                      {rel.category}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 mb-2 group-hover:text-[#0284c7] transition-colors">
                      {rel.title}
                    </h4>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {rel.date}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0b1329] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* 404 Number */}
        <div className="relative mb-6 select-none">
          <span className="text-[160px] sm:text-[200px] font-extrabold text-white/5 leading-none block">
            404
          </span>
          <span className="absolute inset-0 flex items-center justify-center text-6xl sm:text-8xl font-extrabold text-white leading-none">
            404
          </span>
        </div>

        {/* Message */}
        <div className="mb-2">
          <span className="text-[11px] font-bold tracking-widest text-[#38bdf8] uppercase">
            Halaman Tidak Ditemukan
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-tight">
          Oops! Halaman ini tidak tersedia
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mb-8 leading-relaxed">
          Halaman yang Anda cari tidak ada atau telah dipindahkan.
          Pastikan URL yang Anda masukkan sudah benar.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0284c7] hover:bg-[#0369a1] text-white text-sm font-semibold rounded-full transition-colors duration-200"
          >
            <Home className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-full transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Halaman Sebelumnya
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Image as ImageIcon, Trash2, AlertCircle } from 'lucide-react';

const ImageUploadBox = ({ value, onChange, label, onImageUpload, aspect, isLogo = false }) => {
  const [previewError, setPreviewError] = useState(false);
  const [prevValue, setPrevValue] = useState(value);

  if (value !== prevValue) {
    setPrevValue(value);
    setPreviewError(false);
  }
  const resolvedSrc = (value && !value.startsWith('http://') && !value.startsWith('https://') && !value.startsWith('/') && !value.startsWith('data:'))
    ? `/${value}`
    : value;

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-700">
          <ImageIcon className="w-4 h-4 text-slate-400" />
          {label}
        </label>
      )}
      <div className="p-4 sm:p-5 border border-slate-200 rounded-xl bg-white shadow-sm hover:border-slate-300 transition-all group">
        <div className="space-y-3.5">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">
              URL / Path Gambar {isLogo && '(bisa file di /assets/partners/ atau URL)'}
            </label>
            <input
              type="text"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={isLogo ? "cth: /assets/partners/pertamina.png atau https://..." : "https://..."}
              className="w-full px-3.5 py-2 bg-slate-50/70 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:bg-white transition-all outline-none text-sm text-slate-800"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="h-px bg-slate-100 flex-1"></div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Atau Upload</span>
            <div className="h-px bg-slate-100 flex-1"></div>
          </div>

          <div>
            <label className="flex flex-col items-center justify-center w-full min-h-[110px] py-4 px-4 border-2 border-dashed border-slate-200 hover:border-sky-400 rounded-xl bg-slate-50/60 hover:bg-sky-50/40 transition-colors cursor-pointer relative overflow-hidden group/upload text-center">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="p-2.5 bg-white rounded-full shadow-sm mb-2 group-hover/upload:scale-110 transition-transform">
                  <ImageIcon className="w-5 h-5 text-sky-600" />
                </div>
                <p className="text-sm font-semibold text-slate-700 mb-0.5 text-center">Klik untuk upload berkas</p>
                <p className="text-xs text-slate-400 text-center">PNG, JPG, WebP (Maks. 5MB)</p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => onImageUpload(e, onChange, isLogo ? 'logo' : aspect)}
                className="hidden"
              />
            </label>
          </div>

          {value && (
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-slate-400" /> Preview
                </span>

                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="text-xs text-red-500 hover:text-red-700 font-medium hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" /> Hapus
                </button>
              </div>

              <div className="w-full h-40 sm:h-48 rounded-lg overflow-hidden border border-slate-200 relative flex items-center justify-center bg-slate-50/80 p-3">
                {!previewError ? (
                  <img
                    src={resolvedSrc}
                    alt="Preview"
                    className="w-full h-full object-contain select-none"
                    onError={() => setPreviewError(true)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-1.5 p-3 text-center">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <p className="text-xs text-red-500 font-medium">Gagal memuat gambar</p>
                    <p className="text-[11px] text-slate-400">Pastikan URL gambar valid atau upload ulang berkas.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploadBox;

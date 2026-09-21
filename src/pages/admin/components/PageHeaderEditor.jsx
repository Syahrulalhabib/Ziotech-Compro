import { Image as ImageIcon, Type } from 'lucide-react';
import InputField from './InputField';
import ImageUploadBox from './ImageUploadBox';

const PageHeaderEditor = ({ page, label, formData, onChange, onImageUpload }) => (
  <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-slate-200/80">
    <div className="flex items-center gap-4 mb-8 pb-5 border-b border-slate-100">
      <div className="p-3 bg-sky-50 text-sky-600 rounded-xl"><ImageIcon className="w-6 h-6" /></div>
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-800">Header Halaman {label}</h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Atur label badge, judul, subjudul, dan gambar background bagian atas halaman {label}.</p>
      </div>
    </div>
    <div className="grid lg:grid-cols-2 gap-6 items-start">
      <div className="space-y-6">
        <InputField icon={Type} label="Badge Atas (Label Kecil)" value={formData?.pageHeaders?.[page]?.badge || ''} onChange={(e) => onChange(page, 'badge', e.target.value)} placeholder="cth: PROFIL KORPORASI" />
        <InputField icon={Type} label="Judul Halaman" value={formData?.pageHeaders?.[page]?.title || ''} onChange={(e) => onChange(page, 'title', e.target.value)} />
        <InputField icon={Type} label="Subjudul" value={formData?.pageHeaders?.[page]?.subtitle || ''} onChange={(e) => onChange(page, 'subtitle', e.target.value)} isTextarea />
      </div>
      <ImageUploadBox label="Gambar Background Header" value={formData?.pageHeaders?.[page]?.image || ''} onChange={(val) => onChange(page, 'image', val)} onImageUpload={onImageUpload} />
    </div>
  </div>
);

export default PageHeaderEditor;

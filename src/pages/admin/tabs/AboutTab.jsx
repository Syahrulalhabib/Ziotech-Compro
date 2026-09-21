import { motion } from 'framer-motion';
import { Info, Type, Plus, Trash2, Sparkles } from 'lucide-react';
import InputField from '../components/InputField';
import ImageUploadBox from '../components/ImageUploadBox';
import PageHeaderEditor from '../components/PageHeaderEditor';
import { defaultData } from '../../../context/DataContext';
const tabMotion = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.2 } };
const AboutTab = ({ formData, handleChange, handlePageHeaderChange, handleImageUpload, handleAboutValueChange, addAboutValue, removeAboutValue }) => (
  <motion.div key="about" {...tabMotion} className="space-y-8">
<PageHeaderEditor page="about" label="Tentang Kami" formData={formData} onChange={handlePageHeaderChange} onImageUpload={handleImageUpload} />
<div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-slate-200/80">
  <div className="flex items-center gap-4 mb-8 pb-5 border-b border-slate-100">
    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-md"><Info className="w-6 h-6" /></div>
    <div>
      <h3 className="text-xl font-bold text-slate-800">Informasi Perusahaan</h3>
      <p className="text-sm text-slate-500 mt-1">Deskripsi lengkap, visi, dan misi perusahaan.</p>
    </div>
  </div>
  <div className="space-y-6">
    <div className="grid md:grid-cols-2 gap-6">
      <InputField icon={Type} label="Badge Bagian (Label Kecil)" value={formData.about?.badge || 'SIAPA KAMI'} onChange={(e) => handleChange('about', 'badge', e.target.value)} placeholder="cth: SIAPA KAMI" />
      <InputField icon={Type} label="Judul Utama Bagian" value={formData.about?.mainTitle || 'Dedikasi Menghadirkan Rekayasa Teknik Berstandar Tinggi'} onChange={(e) => handleChange('about', 'mainTitle', e.target.value)} placeholder="cth: Dedikasi Menghadirkan Rekayasa..." />
    </div>
    <InputField icon={Type} label="Deskripsi Lengkap" value={formData.about?.description} onChange={(e) => handleChange('about', 'description', e.target.value)} isTextarea />
    <div className="grid md:grid-cols-2 gap-6">
      <InputField 
        icon={Type} 
        label="Badge Pengalaman - Angka/Teks" 
        value={formData.about?.experienceYears || '10+'} 
        onChange={(e) => handleChange('about', 'experienceYears', e.target.value)} 
        placeholder="cth: 10+" 
      />
      <InputField 
        icon={Type} 
        label="Badge Pengalaman - Label Keterangan" 
        value={formData.about?.experienceLabel || 'Tahun Pengalaman Kerja'} 
        onChange={(e) => handleChange('about', 'experienceLabel', e.target.value)} 
        placeholder="cth: Tahun Pengalaman Kerja" 
      />
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <InputField icon={Type} label="Judul Visi" value={formData.about?.visionTitle || 'Visi Perusahaan'} onChange={(e) => handleChange('about', 'visionTitle', e.target.value)} />
        <InputField icon={Type} label="Isi Visi Perusahaan" value={formData.about?.vision} onChange={(e) => handleChange('about', 'vision', e.target.value)} isTextarea />
      </div>
      <div className="space-y-4">
        <InputField icon={Type} label="Judul Misi" value={formData.about?.missionTitle || 'Misi Perusahaan'} onChange={(e) => handleChange('about', 'missionTitle', e.target.value)} />
        <InputField icon={Type} label="Isi Misi Perusahaan" value={formData.about?.mission} onChange={(e) => handleChange('about', 'mission', e.target.value)} isTextarea />
      </div>
    </div>
    <ImageUploadBox label="Gambar Utama Halaman About" value={formData.about?.image} onChange={(val) => handleChange('about', 'image', val)} onImageUpload={handleImageUpload} />
  </div>
</div>

{/* Core Values Section Editor */}
<div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-slate-200/80">
  <div className="flex items-center gap-4 mb-8 pb-5 border-b border-slate-100">
    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-md"><Sparkles className="w-6 h-6" /></div>
    <div>
      <h3 className="text-xl font-bold text-slate-800">Bagian Nilai-Nilai Utama (Core Values)</h3>
      <p className="text-sm text-slate-500 mt-1">Atur teks pengantar dan 4 kartu nilai inti perusahaan di halaman Tentang Kami.</p>
    </div>
  </div>
  <div className="space-y-6">
    <InputField icon={Type} label="Badge Nilai-Nilai" value={formData.about?.valuesBadge || 'NILAI INTI KAMI'} onChange={(e) => handleChange('about', 'valuesBadge', e.target.value)} placeholder="cth: NILAI INTI KAMI" />
    <InputField icon={Type} label="Judul Nilai-Nilai" value={formData.about?.valuesTitle || 'Prinsip Kerja & Integritas Profesional'} onChange={(e) => handleChange('about', 'valuesTitle', e.target.value)} />
    <InputField icon={Type} label="Deskripsi / Subjudul Nilai-Nilai" value={formData.about?.valuesSubtitle || 'Landasan fundamental yang memandu setiap rekayasa teknis, pengambilan keputusan, dan komitmen kemitraan kami.'} onChange={(e) => handleChange('about', 'valuesSubtitle', e.target.value)} isTextarea />
    
    <div className="pt-6 border-t border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <label className="text-sm font-semibold text-slate-700 block">
            Kartu Nilai-Nilai Perusahaan
          </label>
          <p className="text-xs text-slate-400">Sesuaikan judul dan penjelasan masing-masing nilai korporasi.</p>
        </div>
        <button
          type="button"
          onClick={addAboutValue}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg border border-sky-200/60 transition-colors shrink-0"
        >
          <Plus className="w-3.5 h-3.5" /> Tambah Nilai
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {(formData.about?.values || defaultData?.about?.values || []).map((val, idx) => (
          <div key={val.id || idx} className="relative p-5 rounded-md bg-slate-50 border border-slate-200/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Nilai #{idx + 1}
              </span>
              {(formData.about?.values || []).length > 1 && (
                <button
                  type="button"
                  onClick={() => removeAboutValue(idx)}
                  className="text-slate-400 hover:text-red-500 p-1 rounded-md hover:bg-red-50 transition-colors"
                  title="Hapus nilai ini"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <InputField
              icon={Type}
              label="Judul Nilai"
              value={val.title || ''}
              onChange={(e) => handleAboutValueChange(idx, 'title', e.target.value)}
              placeholder="cth: Integritas & Akuntabilitas"
            />
            <InputField
              icon={Type}
              label="Deskripsi Nilai"
              value={val.desc || ''}
              onChange={(e) => handleAboutValueChange(idx, 'desc', e.target.value)}
              placeholder="cth: Menjaga transparansi..."
              isTextarea
            />
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
  </motion.div>
);
export default AboutTab;

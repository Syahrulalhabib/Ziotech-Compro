import { motion } from 'framer-motion';
import { Type, Phone, Plus, Trash2, Share2, Globe, MapPin, Sparkles } from 'lucide-react';
import InputField from '../components/InputField';

import PageHeaderEditor from '../components/PageHeaderEditor';
const tabMotion = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.2 } };
const ContactTab = ({ formData, handleChange, handlePageHeaderChange, handleImageUpload, handleCompanySocialChange, addCompanySocial, removeCompanySocial, handleFooterServiceChange, addFooterService, removeFooterService }) => (
  <motion.div key="contact" {...tabMotion} className="space-y-8">
<PageHeaderEditor page="contact" label="Kontak" formData={formData} onChange={handlePageHeaderChange} onImageUpload={handleImageUpload} />

{/* Teks Pengantar Halaman Kontak */}
<div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-slate-200/80">
  <div className="flex items-center gap-4 mb-8 pb-5 border-b border-slate-100">
    <div className="p-3 bg-sky-50 text-sky-600 rounded-xl"><Sparkles className="w-6 h-6" /></div>
    <div>
      <h3 className="text-xl font-bold text-slate-800">Teks Pengantar Halaman Kontak</h3>
      <p className="text-sm text-slate-500 mt-1">Atur label badge, judul, dan subjudul bagian informasi kontak dan formulir.</p>
    </div>
  </div>
  <div className="space-y-6">
    <InputField 
      icon={Type} 
      label="Label Badge Pengantar" 
      value={formData.contactSettings?.badge || 'HUBUNGI KAMI'} 
      onChange={(e) => handleChange('contactSettings', 'badge', e.target.value)} 
      placeholder="cth: HUBUNGI KAMI" 
    />
    <InputField 
      icon={Type} 
      label="Judul Utama Pengantar" 
      value={formData.contactSettings?.title || 'Diskusikan Kebutuhan Proyek Anda'} 
      onChange={(e) => handleChange('contactSettings', 'title', e.target.value)} 
      placeholder="cth: Diskusikan Kebutuhan Proyek Anda" 
    />
    <InputField 
      icon={Type} 
      label="Subjudul / Keterangan Singkat" 
      value={formData.contactSettings?.subtitle || ''} 
      onChange={(e) => handleChange('contactSettings', 'subtitle', e.target.value)} 
      placeholder="cth: Tim kami siap berdiskusi dan memberikan solusi rekayasa terbaik..." 
      isTextarea 
    />
  </div>
</div>

<div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-slate-200/80">
  <div className="flex items-center gap-4 mb-8 pb-5 border-b border-slate-100">
    <div className="p-3 bg-orange-50 text-orange-600 rounded-md"><Phone className="w-6 h-6" /></div>
    <div>
      <h3 className="text-xl font-bold text-slate-800">Informasi Kontak & Perusahaan</h3>
      <p className="text-sm text-slate-500 mt-1">Atur alamat, email, no HP dan info terkait di halaman kontak.</p>
    </div>
  </div>
  <div className="space-y-6">
    <InputField icon={Type} label="Nama Perusahaan" value={formData.company?.name} onChange={(e) => handleChange('company', 'name', e.target.value)} />
    <InputField icon={Type} label="Alamat Kantor" value={formData.company?.address} onChange={(e) => handleChange('company', 'address', e.target.value)} isTextarea />
    <div className="grid md:grid-cols-2 gap-6">
      <InputField icon={Phone} label="Nomor Telepon / WhatsApp" value={formData.company?.phone} onChange={(e) => handleChange('company', 'phone', e.target.value)} />
      <InputField icon={Type} label="Email Perusahaan" value={formData.company?.email} onChange={(e) => handleChange('company', 'email', e.target.value)} />
    </div>
    <InputField icon={Type} label="Jam Operasional" value={formData.company?.workingHours} onChange={(e) => handleChange('company', 'workingHours', e.target.value)} />
    <div className="space-y-1.5">
      <InputField 
        icon={MapPin} 
        label="Embed Link / URL Google Maps" 
        value={formData.company?.googleMapsEmbedUrl} 
        onChange={(e) => handleChange('company', 'googleMapsEmbedUrl', e.target.value)} 
        placeholder="Contoh: https://maps.google.com/maps?q=PT+Ziotech... atau kode <iframe src='...'>"
      />
      <div className="text-xs text-slate-500 space-y-1 bg-slate-50 p-3 rounded-md border border-slate-200">
        <p className="font-semibold text-slate-700">Cara menyematkan lokasi tepat:</p>
        <p>1. Buka titik lokasi di <b>Google Maps</b> di browser.</p>
        <p>2. Klik <b>Bagikan (Share)</b> &rarr; pilih tab <b>Sematkan peta (Embed a map)</b> &rarr; klik <b>Salin HTML (Copy HTML)</b>, lalu tempel di sini.</p>
        <p>3. Atau Anda juga bisa langsung menempelkan URL alamat / koordinat (<code className="bg-white px-1 rounded border border-slate-200">-6.2088, 106.8456</code>).</p>
      </div>
    </div>
  </div>
</div>

{/* Social Media Section */}
<div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-slate-200/80">
  <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-pink-50 text-pink-600 rounded-md"><Share2 className="w-6 h-6" /></div>
      <div>
        <h3 className="text-xl font-bold text-slate-800">Media Sosial Footer</h3>
        <p className="text-sm text-slate-500 mt-1">Kelola link sosial media yang ditampilkan di footer website.</p>
      </div>
    </div>
    <button
      onClick={addCompanySocial}
      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-sky-700 hover:text-sky-800 bg-sky-50 hover:bg-sky-100/80 px-3 py-1.5 rounded-lg border border-sky-200/60 transition-colors cursor-pointer"
    >
      <Plus className="w-4 h-4" /> Tambah Sosmed
    </button>
  </div>

  <div className="space-y-4">
    {(formData.company?.socials || []).map((item, idx) => (
      <div key={item.id || idx} className="p-4 border border-slate-200 rounded-md bg-slate-50 relative group flex flex-col md:flex-row gap-4 items-start md:items-center">
        <button
          onClick={() => removeCompanySocial(idx)}
          className="absolute top-2 right-2 md:static md:order-last p-2 bg-red-50 text-red-600 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100"
          title="Hapus Sosmed"
        >
          <Trash2 className="w-4 h-4" />
        </button>
        
        <div className="w-full md:w-48 shrink-0">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Platform</label>
          <select
            value={item.platform || 'instagram'}
            onChange={(e) => handleCompanySocialChange(idx, 'platform', e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium text-slate-700"
          >
            <option value="linkedin">LinkedIn</option>
            <option value="instagram">Instagram</option>
            <option value="facebook">Facebook</option>
            <option value="twitter">X / Twitter</option>
            <option value="youtube">YouTube</option>
            <option value="tiktok">TikTok</option>
            <option value="other">Lainnya (Web/Icon)</option>
          </select>
        </div>

        <div className="flex-1 w-full">
          <label className="block text-xs font-semibold text-slate-600 mb-1">URL / Tautan Lengkap</label>
          <input
            type="text"
            value={item.url || ''}
            placeholder="https://..."
            onChange={(e) => handleCompanySocialChange(idx, 'url', e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium text-slate-700"
          />
        </div>
      </div>
    ))}

    {(!formData.company?.socials || formData.company?.socials.length === 0) && (
      <div className="text-center p-8 border-2 border-dashed border-slate-200 rounded-md bg-slate-50 text-slate-500 text-sm">
        Belum ada sosial media. Klik 'Tambah Sosmed' untuk menambahkan tautan.
      </div>
    )}
  </div>
</div>

{/* Footer Services Links Section */}
<div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-slate-200/80">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-slate-100 mb-6 gap-4">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-sky-50 text-sky-600 rounded-xl"><Globe className="w-6 h-6" /></div>
      <div>
        <h3 className="text-xl font-bold text-slate-800">Tautan Layanan di Footer</h3>
        <p className="text-sm text-slate-500 mt-1">Atur nama layanan dan hyperlink yang muncul di kolom 'Layanan' pada footer website.</p>
      </div>
    </div>
    <button
      type="button"
      onClick={addFooterService}
      className="text-sm flex items-center justify-center gap-1.5 text-white font-semibold bg-sky-600 hover:bg-sky-500 px-4 py-2 rounded-lg shadow-sm transition-colors shrink-0"
    >
      <Plus className="w-4 h-4" /> Tambah Tautan Footer
    </button>
  </div>

  <div className="space-y-4">
    {(formData.company?.footerServices || []).map((item, idx) => (
      <div key={item.id || idx} className="p-4 sm:p-5 border border-slate-200 rounded-md bg-slate-50 relative group flex flex-col md:flex-row gap-4 items-start md:items-center transition-all hover:border-slate-300">
        <div className="flex-1 w-full">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Judul / Label Teks yang Tampil
          </label>
          <input
            type="text"
            value={item.title || ''}
            placeholder="cth: Mechanical, Electrical & Plumbing"
            onChange={(e) => handleFooterServiceChange(idx, 'title', e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium text-slate-800"
          />
        </div>

        <div className="flex-1 w-full">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Hyperlink / URL Tujuan (Internal <code className="text-blue-600 font-mono">/service/1</code> atau Eksternal <code className="text-blue-600 font-mono">https://...</code>)
          </label>
          <input
            type="text"
            value={item.url || ''}
            placeholder="cth: /service/1 atau https://..."
            onChange={(e) => handleFooterServiceChange(idx, 'url', e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono text-xs text-slate-800"
          />
        </div>

        <button
          type="button"
          onClick={() => removeFooterService(idx)}
          className="p-2.5 text-red-500 hover:bg-red-50 rounded-md transition-colors border border-transparent hover:border-red-200 self-end md:self-center shrink-0 mt-1 md:mt-5"
          title="Hapus tautan ini"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    ))}

    {(!formData.company?.footerServices || formData.company?.footerServices.length === 0) && (
      <div className="text-center p-8 border-2 border-dashed border-slate-200 rounded-md bg-slate-50 text-slate-500 text-sm">
        Belum ada tautan layanan khusus yang dikonfigurasi. Footer otomatis menampilkan 5 layanan teratas dari database. Klik <b>'Tambah Tautan Footer'</b> untuk mengatur secara khusus.
      </div>
    )}
  </div>
</div>
  </motion.div>
);
export default ContactTab;

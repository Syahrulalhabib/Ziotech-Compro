import { motion } from 'framer-motion';
import { LayoutDashboard, Type, Plus, Trash2, CalendarClock, TrendingUp, Layers, Wrench, Briefcase, Building2, Sparkles, Info } from 'lucide-react';
import InputField from '../components/InputField';
import ImageUploadBox from '../components/ImageUploadBox';
import { defaultData } from '../../../context/DataContext';
const tabMotion = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.2 } };
const HomeTab = ({ formData, handleChange, handleImageUpload, handleHeroTitleChange, addHeroTitle, removeHeroTitle, handleHomeStatChange, addHomeStat, removeHomeStat, handleHomePartnerChange, addHomePartner, removeHomePartner }) => (
  <motion.div key="home" {...tabMotion} className="space-y-8">
<div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-slate-200/80">
  <div className="flex items-center gap-4 mb-8 pb-5 border-b border-slate-100">
    <div className="p-3 bg-sky-50 text-sky-600 rounded-xl"><LayoutDashboard className="w-6 h-6" /></div>
    <div>
      <h3 className="text-xl font-bold text-slate-800">Hero Section</h3>
      <p className="text-sm text-slate-500 mt-1">Bagian paling atas yang pertama kali dilihat pengunjung.</p>
    </div>
  </div>
  <div className="space-y-6">
    <InputField icon={Type} label="Judul Utama (Headline)" value={formData.home?.heroTitle} onChange={(e) => handleChange('home', 'heroTitle', e.target.value)} />
    <InputField icon={Type} label="Sub-judul (Deskripsi Singkat)" value={formData.home?.heroSubtitle} onChange={(e) => handleChange('home', 'heroSubtitle', e.target.value)} isTextarea />
    <InputField 
      icon={CalendarClock} 
      label="Interval Gambar (milidetik, cth: 5000 = 5 detik)" 
      type="number"
      min="1000"
      step="500"
      placeholder="5000"
      helperText="Durasi tiap slide gambar berganti otomatis (minimal 1000 ms)."
      value={formData.home?.heroInterval ?? ''} 
      onChange={(e) => handleChange('home', 'heroInterval', e.target.value === '' ? '' : Number(e.target.value))} 
      onBlur={(e) => {
        const val = Number(e.target.value);
        if (!val || val < 1000) {
          handleChange('home', 'heroInterval', 5000);
        }
      }}
    />
    
    <div className="space-y-4 pt-2">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1">
          <label className="block text-sm font-semibold text-slate-700">Gambar Background Hero (Slider)</label>
          <p className="text-xs text-slate-500 mt-1 mb-0">Format lanskap (disarankan 16:9 atau 1920x1080 px) agar pas di layar.</p>
        </div>
        <button
          onClick={() => {
            const currentImages = formData.home?.heroImages || [];
            handleChange('home', 'heroImages', [...currentImages, '']);
          }}
          className="shrink-0 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-sky-700 hover:text-sky-800 bg-sky-50 hover:bg-sky-100/80 px-3 py-1.5 rounded-lg border border-sky-200/60 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Tambah Gambar
        </button>
      </div>
      
      {(formData.home?.heroImages || []).map((img, idx) => (
        <div key={idx} className="relative group p-4 border border-slate-200 rounded-md bg-slate-50">
          <button
            onClick={() => {
              const currentImages = [...(formData.home?.heroImages || [])];
              currentImages.splice(idx, 1);
              handleChange('home', 'heroImages', currentImages);
            }}
            className="absolute top-2 right-2 p-1.5 bg-red-100 text-red-600 rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-200"
            title="Hapus Gambar"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <ImageUploadBox
            aspect={16/9}
            label={`Gambar Slide ${idx + 1}`} 
            value={img} 
            onChange={(val) => {
              const currentImages = [...(formData.home?.heroImages || [])];
              currentImages[idx] = val;
              handleChange('home', 'heroImages', currentImages);
            }} 
            onImageUpload={handleImageUpload} 
          />
        </div>
      ))}
      {(!formData.home?.heroImages || formData.home?.heroImages.length === 0) && (
        <div className="text-center p-8 border-2 border-dashed border-slate-200 rounded-md bg-slate-50 text-slate-500 text-sm">
          Belum ada gambar slider. Klik Tambah Gambar untuk memulai.
        </div>
      )}
    </div>

    {/* Label Segmen Slider Bawah (Hero Bar Titles) */}
    <div className="space-y-4 pt-6 border-t border-slate-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <label className="block text-sm font-semibold text-slate-700">Label Teks Segmen Slider Bawah (Hero Bar)</label>
          <p className="text-xs text-slate-500 mt-0.5">Teks navigasi pada bilah segmen slider hero (cth: Rekayasa Sistem MEP, Konstruksi Sipil & Bangunan).</p>
        </div>
        <button
          type="button"
          onClick={addHeroTitle}
          className="shrink-0 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-sky-700 hover:text-sky-800 bg-sky-50 hover:bg-sky-100/80 px-3 py-1.5 rounded-lg border border-sky-200/60 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Tambah Label Segmen
        </button>
      </div>

      <div className="space-y-2.5">
        {(formData.home?.heroTitles || defaultData?.home?.heroTitles || []).map((title, idx) => (
          <div key={idx} className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-xs font-bold text-sky-700 bg-sky-100/70 px-2 py-1 rounded text-center shrink-0">
              #{idx + 1}
            </span>
            <input
              type="text"
              value={title}
              onChange={(e) => handleHeroTitleChange(idx, e.target.value)}
              placeholder="cth: Rekayasa Sistem MEP"
              className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
            <button
              type="button"
              onClick={() => removeHeroTitle(idx)}
              className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
              title="Hapus Segmen Ini"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

<div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-slate-200/80">
  <div className="flex items-center gap-4 mb-8 pb-5 border-b border-slate-100">
    <div className="p-3 bg-sky-50 text-[#0284c7] rounded-md"><Sparkles className="w-6 h-6" /></div>
    <div>
      <h3 className="text-xl font-bold text-slate-800">Visual & Teks Editorial Intro (Inovasi & Kualitas)</h3>
      <p className="text-sm text-slate-500 mt-1">Kelola gambar kotak dan teks editorial intro di bawah hero beranda.</p>
    </div>
  </div>
  <div className="space-y-6">
    <InputField 
      icon={Type} 
      label="Label Badge Kategori Intro" 
      value={formData.home?.introBadge ?? 'KOMPETENSI & TATA KELOLA'} 
      onChange={(e) => handleChange('home', 'introBadge', e.target.value)} 
      placeholder="cth: KOMPETENSI & TATA KELOLA"
    />
    <InputField 
      icon={Type} 
      label="Label Tag Foto (Overlay Bawah Foto)" 
      value={formData.home?.introTag ?? 'INNOVATION & INTEGRITY'} 
      onChange={(e) => handleChange('home', 'introTag', e.target.value)} 
      placeholder="INNOVATION & INTEGRITY"
    />
    <ImageUploadBox 
      aspect={1}
      label="Gambar Intro (Rasio 1:1 / Persegi)" 
      value={formData.home?.introImageUrl || ''} 
      onChange={(val) => handleChange('home', 'introImageUrl', val)} 
      onImageUpload={handleImageUpload} 
    />
    <p className="text-xs text-slate-400">
      *Jika gambar dikosongkan, beranda otomatis menampilkan grafis geometris Pertamina style.
    </p>
    <div className="pt-4 border-t border-slate-100 space-y-6">
      <InputField 
        icon={Type} 
        label="Judul Intro" 
        value={formData.home?.introTitle ?? 'Menghadirkan Solusi Teknik dan Konstruksi Terbaik untuk Negeri'} 
        onChange={(e) => handleChange('home', 'introTitle', e.target.value)} 
        placeholder="Menghadirkan Solusi Teknik dan Konstruksi Terbaik untuk Negeri"
      />
      <InputField 
        icon={Type} 
        label="Paragraf 1" 
        value={formData.home?.introDescription ?? 'PT. Ziotech Global Inovasi hadir sebagai mitra strategis dengan komitmen pada kualitas, efisiensi, dan inovasi berkelanjutan khususnya di spesialisasi Mechanical, Electrical & Plumbing (MEP).'} 
        onChange={(e) => handleChange('home', 'introDescription', e.target.value)} 
        isTextarea
      />
      <InputField 
        icon={Type} 
        label="Paragraf 2" 
        value={formData.home?.introDescription2 ?? 'Dengan tim profesional bersertifikasi, dedikasi tinggi, dan standar mutu ketat, kami siap memberikan solusi engineering terbaik yang efisien, tepat waktu, dan berorientasi jangka panjang.'} 
        onChange={(e) => handleChange('home', 'introDescription2', e.target.value)} 
        isTextarea
      />
    </div>
  </div>
</div>

<div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-slate-200/80">
  <div className="flex items-center gap-4 mb-8 pb-5 border-b border-slate-100">
    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-md"><Info className="w-6 h-6" /></div>
    <div>
      <h3 className="text-xl font-bold text-slate-800">Sekilas Perusahaan (Tentang Ziotech di Beranda)</h3>
      <p className="text-sm text-slate-500 mt-1">Atur teks narasi dan gambar banner bagian 'Tentang Ziotech' di halaman Beranda.</p>
    </div>
  </div>
  <div className="space-y-6">
    <InputField 
      icon={Type} 
      label="Label Badge Sekilas Perusahaan" 
      value={formData.home?.aboutSectionBadge || 'SEKILAS PERUSAHAAN'} 
      onChange={(e) => handleChange('home', 'aboutSectionBadge', e.target.value)} 
      placeholder="cth: SEKILAS PERUSAHAAN"
    />
    <InputField 
      icon={Type} 
      label="Judul Bagian" 
      value={formData.home?.aboutSectionTitle || 'Tentang Kami'} 
      onChange={(e) => handleChange('home', 'aboutSectionTitle', e.target.value)} 
      placeholder="cth: Tentang Kami"
    />
    <InputField 
      icon={Type} 
      label="Deskripsi / Paragraf Ringkasan" 
      value={formData.home?.aboutSectionDescription || ''} 
      onChange={(e) => handleChange('home', 'aboutSectionDescription', e.target.value)} 
      placeholder="Didirikan dengan semangat profesionalisme..." 
      isTextarea
    />
    <ImageUploadBox label="Gambar Preview / Background Sekilas About" value={formData.home?.aboutPreviewImageUrl} onChange={(val) => handleChange('home', 'aboutPreviewImageUrl', val)} onImageUpload={handleImageUpload} />
  </div>
</div>

{/* Statistik & Angka Kinerja (Quick Facts) */}
<div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-slate-200/80">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-slate-100 mb-6 gap-4">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-sky-50 text-sky-600 rounded-xl"><TrendingUp className="w-6 h-6" /></div>
      <div>
        <h3 className="text-xl font-bold text-slate-800">Statistik & Kinerja Perusahaan</h3>
        <p className="text-sm text-slate-500 mt-1">Kelola angka-angka statistik di Beranda. Efek animasi angka bergulir tetap otomatis bekerja.</p>
      </div>
    </div>
    <button
      onClick={addHomeStat}
      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-sky-700 hover:text-sky-800 bg-sky-50 hover:bg-sky-100/80 px-3 py-1.5 rounded-lg border border-sky-200/60 transition-colors cursor-pointer shrink-0 self-start sm:self-auto"
    >
      <Plus className="w-4 h-4" /> Tambah Statistik
    </button>
  </div>

  <div className="space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <InputField 
        icon={Type} 
        label="Badge Bagian Statistik" 
        value={formData.home?.quickFactsBadge ?? 'KREDIBILITAS & PERFORMA'} 
        onChange={(e) => handleChange('home', 'quickFactsBadge', e.target.value)} 
      />
      <InputField 
        icon={Type} 
        label="Judul Bagian Statistik" 
        value={formData.home?.quickFactsTitle ?? 'Kinerja Terpercaya untuk Kebutuhan Industri'} 
        onChange={(e) => handleChange('home', 'quickFactsTitle', e.target.value)} 
      />
    </div>
    <InputField 
      icon={Type} 
      label="Deskripsi Bagian Statistik" 
      value={formData.home?.quickFactsSubtitle ?? 'Kapasitas teknis yang teruji melalui ragam proyek strategis dan kemitraan berkelanjutan bersama para klien industri terkemuka.'} 
      onChange={(e) => handleChange('home', 'quickFactsSubtitle', e.target.value)} 
      isTextarea
    />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
      {(formData.home?.stats || defaultData?.home?.stats || []).map((stat, idx) => (
        <div key={stat.id || idx} className="p-5 border border-slate-200 rounded-md bg-slate-50/70 relative group space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
            <span className="text-xs font-bold text-sky-700 bg-sky-100/70 px-2.5 py-1 rounded-md uppercase tracking-wider">
              Kartu #{idx + 1}
            </span>
            <button
              onClick={() => removeHomeStat(idx)}
              className="p-1.5 bg-red-100 text-red-600 rounded-md opacity-80 hover:opacity-100 transition-opacity hover:bg-red-200"
              title="Hapus Kartu Statistik"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          <InputField 
            label="Kategori / Label Atas" 
            value={stat.category || ''} 
            onChange={(e) => handleHomeStatChange(idx, 'category', e.target.value)} 
            placeholder="cth: PENGALAMAN LAPANGAN"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputField 
              label="Nilai / Angka" 
              value={stat.value || ''} 
              onChange={(e) => handleHomeStatChange(idx, 'value', e.target.value)} 
              placeholder="cth: 10+, 50+, 99%"
              helperText="Animasi bergulir otomatis (cth: 10+, 99%)."
            />
            <InputField 
              label="Satuan / Teks Bawah Angka" 
              value={stat.unit || ''} 
              onChange={(e) => handleHomeStatChange(idx, 'unit', e.target.value)} 
              placeholder="cth: Tahun, Proyek Selesai"
            />
          </div>

          <InputField 
            label="Keterangan / Deskripsi" 
            value={stat.label || ''} 
            onChange={(e) => handleHomeStatChange(idx, 'label', e.target.value)} 
            placeholder="cth: Dedikasi melayani sektor infrastruktur..."
            isTextarea
          />
        </div>
      ))}
    </div>
  </div>
</div>


{/* Bagian Pilar Utama (Focus Pillars) */}
<div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-slate-200/80">
  <div className="flex items-center gap-4 mb-6 pb-5 border-b border-slate-100">
    <div className="p-3 bg-amber-50 text-amber-600 rounded-md"><Layers className="w-6 h-6" /></div>
    <div>
      <h3 className="text-xl font-bold text-slate-800">Bagian Pilar Utama (4 Editorial Focus)</h3>
      <p className="text-sm text-slate-500 mt-1">Atur label badge dan judul bagian 4 kartu pilar utama di Beranda.</p>
    </div>
  </div>
  <div className="space-y-6">
    <InputField 
      icon={Type} 
      label="Label Badge Pilar Utama" 
      value={formData.home?.ourFocusBadge || 'PILAR UTAMA'} 
      onChange={(e) => handleChange('home', 'ourFocusBadge', e.target.value)} 
      placeholder="cth: PILAR UTAMA"
    />
    <InputField 
      icon={Type} 
      label="Judul Bagian Pilar Utama" 
      value={formData.home?.ourFocusTitle || 'Spesialisasi dan Ruang Lingkup Kerja'} 
      onChange={(e) => handleChange('home', 'ourFocusTitle', e.target.value)} 
      placeholder="cth: Spesialisasi dan Ruang Lingkup Kerja"
    />
  </div>
</div>

{/* Bagian Layanan Unggulan (Services Showcase) */}
<div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-slate-200/80">
  <div className="flex items-center gap-4 mb-6 pb-5 border-b border-slate-100">
    <div className="p-3 bg-sky-50 text-sky-600 rounded-xl"><Wrench className="w-6 h-6" /></div>
    <div>
      <h3 className="text-xl font-bold text-slate-800">Bagian Layanan Unggulan (Services)</h3>
      <p className="text-sm text-slate-500 mt-1">Atur judul, badge, dan pengantar bagian Layanan Unggulan di Beranda.</p>
    </div>
  </div>
  <div className="space-y-6">
    <InputField 
      icon={Type} 
      label="Label Badge Layanan Unggulan" 
      value={formData.home?.serviceBadge || 'KOMPETENSI UTAMA'} 
      onChange={(e) => handleChange('home', 'serviceBadge', e.target.value)} 
      placeholder="cth: KOMPETENSI UTAMA"
    />
    <InputField 
      icon={Type} 
      label="Judul Bagian Layanan Unggulan" 
      value={formData.home?.serviceTitle || 'Solusi Rekayasa Terpadu untuk Kebutuhan Industri'} 
      onChange={(e) => handleChange('home', 'serviceTitle', e.target.value)} 
      placeholder="cth: Solusi Rekayasa Terpadu untuk Kebutuhan Industri"
    />
    <InputField 
      icon={Type} 
      label="Deskripsi / Subjudul Layanan Unggulan" 
      value={formData.home?.serviceSubtitle || ''} 
      onChange={(e) => handleChange('home', 'serviceSubtitle', e.target.value)} 
      placeholder="cth: Spektrum layanan komprehensif mulai dari rancang bangun, instalasi mekanikal-elektrikal..." 
      isTextarea
    />
  </div>
</div>

{/* Bagian Portofolio & Rekam Jejak (Projects Showcase) */}
<div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-slate-200/80">
  <div className="flex items-center gap-4 mb-6 pb-5 border-b border-slate-100">
    <div className="p-3 bg-violet-50 text-violet-600 rounded-md"><Briefcase className="w-6 h-6" /></div>
    <div>
      <h3 className="text-xl font-bold text-slate-800">Bagian Portofolio Proyek (Projects Showcase)</h3>
      <p className="text-sm text-slate-500 mt-1">Atur judul, badge, dan pengantar showcase proyek di Beranda.</p>
    </div>
  </div>
  <div className="space-y-6">
    <InputField 
      icon={Type} 
      label="Label Badge Portofolio Proyek" 
      value={formData.home?.portfolioBadge || 'PORTOFOLIO & REKAM JEJAK'} 
      onChange={(e) => handleChange('home', 'portfolioBadge', e.target.value)} 
      placeholder="cth: PORTOFOLIO & REKAM JEJAK"
    />
    <InputField 
      icon={Type} 
      label="Judul Bagian Portofolio Proyek" 
      value={formData.home?.portfolioTitle || 'Proyek Unggulan Terkini'} 
      onChange={(e) => handleChange('home', 'portfolioTitle', e.target.value)} 
      placeholder="cth: Proyek Unggulan Terkini"
    />
    <InputField 
      icon={Type} 
      label="Deskripsi / Subjudul Portofolio Proyek" 
      value={formData.home?.portfolioSubtitle || ''} 
      onChange={(e) => handleChange('home', 'portfolioSubtitle', e.target.value)} 
      placeholder="cth: Dokumentasi keberhasilan penyelesaian proyek konstruksi dan engineering..." 
      isTextarea
    />
  </div>
</div>

{/* Mitra / Client Logos Section */}
<div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-slate-200/80">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-slate-100 mb-6 gap-4">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-sky-50 text-sky-600 rounded-xl"><Building2 className="w-6 h-6" /></div>
      <div>
        <h3 className="text-xl font-bold text-slate-800">Mitra & Klien Terpercaya</h3>
        <p className="text-sm text-slate-500 mt-1">Kelola daftar perusahaan klien yang ditampilkan di Beranda.</p>
      </div>
    </div>
    <button
      onClick={addHomePartner}
      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-sky-700 hover:text-sky-800 bg-sky-50 hover:bg-sky-100/80 px-3 py-1.5 rounded-lg border border-sky-200/60 transition-colors cursor-pointer shrink-0 self-start sm:self-auto"
    >
      <Plus className="w-4 h-4" /> Tambah Mitra
    </button>
  </div>

  <div className="space-y-6">
    <InputField 
      icon={Type} 
      label="Label Badge Kemitraan" 
      value={formData.home?.clientPartnersBadge || "KEMITRAAN STRATEGIS"} 
      onChange={(e) => handleChange('home', 'clientPartnersBadge', e.target.value)} 
      placeholder="cth: KEMITRAAN STRATEGIS"
    />
    <InputField 
      icon={Type} 
      label="Judul Bagian Mitra" 
      value={formData.home?.clientPartnersTitle || "Dipercaya Oleh Berbagai Perusahaan Terkemuka"} 
      onChange={(e) => handleChange('home', 'clientPartnersTitle', e.target.value)} 
    />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {(formData.home?.clientPartners || []).map((partner, idx) => (
        <div key={partner.id || idx} className="p-4 border border-slate-200 rounded-md bg-slate-50 relative group flex flex-col justify-between">
          <button
            onClick={() => removeHomePartner(idx)}
            className="absolute top-2 right-2 p-1.5 bg-red-100 text-red-600 rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-200"
            title="Hapus Mitra"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <div className="space-y-3">
            <InputField 
              label={`Nama Perusahaan ${idx + 1}`} 
              value={partner.name || ''} 
              onChange={(e) => handleHomePartnerChange(idx, 'name', e.target.value)} 
            />
            <ImageUploadBox 
              label="Logo Perusahaan (Opsional, jika kosong teks nama ditampilkan)" 
              value={partner.logo || ''} 
              onChange={(val) => handleHomePartnerChange(idx, 'logo', val)} 
              onImageUpload={handleImageUpload} 
              isLogo={true}
            />
          </div>
        </div>
      ))}
    </div>

    {(!formData.home?.clientPartners || formData.home?.clientPartners.length === 0) && (
      <div className="text-center p-8 border-2 border-dashed border-slate-200 rounded-md bg-slate-50 text-slate-500 text-sm">
        Belum ada daftar mitra. Klik 'Tambah Mitra' untuk menambahkan.
      </div>
    )}
  </div>
</div>

{/* Call to Action (CTA) Section Editor */}
<div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-slate-200/80">
  <div className="flex items-center gap-4 mb-6 pb-5 border-b border-slate-100">
    <div className="p-3 bg-sky-50 text-sky-600 rounded-xl"><Sparkles className="w-6 h-6" /></div>
    <div>
      <h3 className="text-xl font-bold text-slate-800">Bagian Call To Action (Kolaborasi)</h3>
      <p className="text-sm text-slate-500 mt-1">Atur teks ajakan, tombol, dan gambar background di bagian paling bawah Beranda.</p>
    </div>
  </div>
  <div className="space-y-6">
    <div className="grid md:grid-cols-2 gap-6">
      <InputField 
        icon={Type} 
        label="Badge CTA" 
        value={formData.home?.ctaBadge || 'KONSULTASI PROYEK'} 
        onChange={(e) => handleChange('home', 'ctaBadge', e.target.value)} 
        placeholder="cth: KONSULTASI PROYEK"
      />
      <InputField 
        icon={Type} 
        label="Teks Tombol Aksi" 
        value={formData.home?.ctaButton || 'Hubungi Sekarang'} 
        onChange={(e) => handleChange('home', 'ctaButton', e.target.value)} 
        placeholder="cth: Hubungi Sekarang"
      />
    </div>
    <InputField 
      icon={Type} 
      label="Judul Ajakan CTA" 
      value={formData.home?.ctaTitle || 'Siap Berkolaborasi untuk Mewujudkan Efisiensi Fasilitas Industri Anda?'} 
      onChange={(e) => handleChange('home', 'ctaTitle', e.target.value)} 
      placeholder="cth: Siap Berkolaborasi untuk Mewujudkan Efisiensi Fasilitas Industri Anda?"
    />
    <InputField 
      icon={Type} 
      label="Deskripsi / Paragraf Singkat" 
      value={formData.home?.ctaSubtitle || ''} 
      onChange={(e) => handleChange('home', 'ctaSubtitle', e.target.value)} 
      placeholder="cth: Konsultasikan rancangan teknis, pengadaan suku cadang..." 
      isTextarea
    />
    <ImageUploadBox
      label="Gambar Background CTA (Landscape, 16:9)"
      value={formData.home?.ctaBgImageUrl || ''}
      onChange={(val) => handleChange('home', 'ctaBgImageUrl', val)}
      onImageUpload={handleImageUpload}
    />
  </div>
</div>
  </motion.div>
);
export default HomeTab;

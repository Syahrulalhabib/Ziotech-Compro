import { motion } from 'framer-motion';
import { Star, Plus, Trash2 } from 'lucide-react';
import InputField from '../components/InputField';
import ImageUploadBox from '../components/ImageUploadBox';
import PageHeaderEditor from '../components/PageHeaderEditor';
import { SERVICE_ICONS, getServiceIcon } from '../../../data/serviceIcons';
const tabMotion = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.2 } };
const ServicesTab = ({ formData, handlePageHeaderChange, handleImageUpload, handleArrayChange, addArrayItem, removeArrayItem, handleFeaturesChange }) => (
  <motion.div key="services" {...tabMotion} className="space-y-8">
<PageHeaderEditor page="service" label="Layanan" formData={formData} onChange={handlePageHeaderChange} onImageUpload={handleImageUpload} />
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200/80">
  <div>
    <h3 className="text-xl font-bold text-slate-800">Daftar Layanan</h3>
    <p className="text-sm text-slate-500 mt-1">
      Kelola layanan yang ditampilkan pada halaman Services.
      {(formData.services || []).filter(s => s.featured).length > 0 && (
        <span className="inline-flex items-center gap-1 ml-2 text-amber-600 font-semibold">
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          {(formData.services || []).filter(s => s.featured).length} layanan tampil di Beranda
        </span>
      )}
    </p>
  </div>
  <button 
    onClick={() => addArrayItem('services', { id: Date.now().toString(), title: 'Layanan Baru', description: '', icon: 'Wrench', features: [], image: '', featured: false })}
    className="inline-flex items-center gap-2 bg-sky-50 text-sky-700 hover:bg-sky-100 hover:text-sky-800 border border-sky-200/80 px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer shrink-0"
  >
    <Plus className="w-5 h-5" /> Tambah Layanan
  </button>
</div>

{formData.services?.map((service, index) => {
  const isLast = index === (formData.services?.length || 0) - 1;
  const ServiceItemIcon = getServiceIcon(service.icon, index);
  return (
    <div 
      key={service.id || index} 
      id={isLast ? 'services-new-item' : undefined}
      className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-slate-200/80 relative group"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-slate-100 gap-4">
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div className="p-3 bg-sky-50 text-sky-600 rounded-xl shrink-0"><ServiceItemIcon className="w-6 h-6" /></div>
          <h3 className="text-lg font-bold text-slate-800 truncate pr-2" title={`Layanan #${index + 1}: ${service.title}`}>
            Layanan #{index + 1}: {service.title}
          </h3>
        </div>
        <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => handleArrayChange('services', index, 'featured', !service.featured)}
            className={`flex items-center gap-2.5 pl-3 pr-4 py-2 rounded-md text-xs font-semibold border transition-all active:scale-95 whitespace-nowrap ${
              service.featured
                ? 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
                : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
            }`}
            title={service.featured ? 'Sembunyikan dari halaman Beranda' : 'Tampilkan di halaman Beranda (Layanan Unggulan)'}
          >
            <span className={`relative inline-block w-9 h-5 rounded-full transition-colors ${service.featured ? 'bg-amber-500' : 'bg-slate-300'}`}>
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${service.featured ? 'translate-x-4' : ''}`}></span>
            </span>
            <Star className={`w-4 h-4 ${service.featured ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
            <span>{service.featured ? 'Tampil di Beranda' : 'Tidak Tampil'}</span>
          </button>
          <button 
            onClick={() => removeArrayItem('services', index)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors border border-transparent hover:border-red-100 shrink-0"
            title="Hapus Layanan"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <InputField label="Nama Layanan" value={service.title} onChange={(e) => handleArrayChange('services', index, 'title', e.target.value)} />
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Pilih Icon Layanan</label>
            <div className="grid grid-cols-5 sm:grid-cols-5 gap-2 p-3 bg-slate-50 rounded-md border border-slate-200">
              {SERVICE_ICONS.map((item) => {
                const IconComponent = item.icon;
                const isSelected = (service.icon || 'Wrench') === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleArrayChange('services', index, 'icon', item.id)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-md border text-center transition-all ${
                      isSelected
                        ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-sky-50 hover:text-sky-600'
                    }`}
                    title={item.name}
                  >
                    <IconComponent className="w-5 h-5 mb-1" />
                    <span className="text-[10px] leading-tight font-medium truncate w-full">{item.id}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <InputField label="Deskripsi" value={service.description} onChange={(e) => handleArrayChange('services', index, 'description', e.target.value)} isTextarea />
          <InputField 
            label="Ruang Lingkup (Pisahkan dengan Enter)" 
            value={(service.features || []).join('\n')} 
            onChange={(e) => handleFeaturesChange(index, e.target.value)} 
            isTextarea 
            placeholder="Desain HVAC&#10;Pemasangan Pipa&#10;Perawatan Rutin"
          />
        </div>
        <div>
          <ImageUploadBox label="Gambar Layanan" value={service.image} onChange={(val) => handleArrayChange('services', index, 'image', val)} onImageUpload={handleImageUpload} />
        </div>
      </div>
    </div>
  );
})}
  </motion.div>
);
export default ServicesTab;

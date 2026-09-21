import { motion } from 'framer-motion';
import { Briefcase, Star, Plus, Trash2 } from 'lucide-react';
import InputField from '../components/InputField';
import ImageUploadBox from '../components/ImageUploadBox';
import PageHeaderEditor from '../components/PageHeaderEditor';
const tabMotion = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.2 } };
const ProjectsTab = ({ formData, handlePageHeaderChange, handleImageUpload, handleArrayChange, addArrayItem, removeArrayItem }) => (
  <motion.div key="projects" {...tabMotion} className="space-y-8">
<PageHeaderEditor page="project" label="Proyek" formData={formData} onChange={handlePageHeaderChange} onImageUpload={handleImageUpload} />
<div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200/80">
  <div>
    <h3 className="text-xl font-bold text-slate-800">Daftar Proyek</h3>
    <p className="text-sm text-slate-500 mt-1">
      Kelola portofolio proyek yang telah dikerjakan.
      {(formData.projects || []).filter(p => p.featured).length > 0 && (
        <span className="inline-flex items-center gap-1 ml-2 text-amber-600 font-semibold">
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          {(formData.projects || []).filter(p => p.featured).length} proyek tampil di Beranda
        </span>
      )}
    </p>
  </div>
  <button 
    onClick={() => addArrayItem('projects', { id: Date.now(), title: 'Proyek Baru', category: 'MEP', location: '', year: new Date().getFullYear().toString(), client: '', description: '', image: '', featured: false })}
    className="inline-flex items-center gap-2 bg-sky-50 text-sky-700 hover:bg-sky-100 hover:text-sky-800 border border-sky-200/80 px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
  >
    <Plus className="w-5 h-5" /> Tambah Proyek
  </button>
</div>

{formData.projects?.map((project, index) => {
  const isLast = index === (formData.projects?.length || 0) - 1;
  return (
    <div 
      key={project.id || index} 
      id={isLast ? 'projects-new-item' : undefined}
      className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-slate-200/80 relative group"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-slate-100 gap-4">
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-md shrink-0"><Briefcase className="w-6 h-6" /></div>
          <h3 className="text-lg font-bold text-slate-800 truncate pr-2" title={`Proyek #${index + 1}: ${project.title}`}>
            Proyek #{index + 1}: {project.title}
          </h3>
        </div>
        <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => handleArrayChange('projects', index, 'featured', !project.featured)}
            className={`flex items-center gap-2.5 pl-3 pr-4 py-2 rounded-md text-xs font-semibold border transition-all active:scale-95 whitespace-nowrap ${
              project.featured
                ? 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
                : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
            }`}
            title={project.featured ? 'Sembunyikan dari halaman Beranda' : 'Tampilkan di halaman Beranda (Proyek Unggulan)'}
          >
            {/* Toggle switch */}
            <span className={`relative inline-block w-9 h-5 rounded-full transition-colors ${project.featured ? 'bg-amber-500' : 'bg-slate-300'}`}>
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${project.featured ? 'translate-x-4' : ''}`}></span>
            </span>
            <Star className={`w-4 h-4 ${project.featured ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
            <span>{project.featured ? 'Tampil di Beranda' : 'Tidak Tampil'}</span>
          </button>

          <button
            type="button"
            onClick={() => removeArrayItem('projects', index)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors border border-transparent hover:border-red-100 shrink-0"
            title="Hapus Proyek"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <InputField label="Nama Proyek" value={project.title} onChange={(e) => handleArrayChange('projects', index, 'title', e.target.value)} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="Kategori (Misal: MEP, Konstruksi)" value={project.category} onChange={(e) => handleArrayChange('projects', index, 'category', e.target.value)} />
          <InputField label="Tahun" value={project.year} onChange={(e) => handleArrayChange('projects', index, 'year', e.target.value)} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="Klien" value={project.client} onChange={(e) => handleArrayChange('projects', index, 'client', e.target.value)} />
          <InputField label="Lokasi" value={project.location} onChange={(e) => handleArrayChange('projects', index, 'location', e.target.value)} />
        </div>
        <InputField label="Deskripsi Singkat" value={project.description} onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)} isTextarea />
      </div>
      <div>
        <ImageUploadBox label="Gambar Proyek" value={project.image} onChange={(val) => handleArrayChange('projects', index, 'image', val)} onImageUpload={handleImageUpload} />
      </div>
    </div>
  </div>
);
    })}
  </motion.div>
);
export default ProjectsTab;

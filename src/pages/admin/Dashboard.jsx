import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ref, set, onValue, remove, update } from 'firebase/database';
import { auth, db } from '../../firebase/config';
import { useData } from '../../context/DataContext';
import { LogOut, Save, Home, Info, LayoutDashboard, Image as ImageIcon, Type, Menu, X, CheckCircle2, AlertCircle, Briefcase, Wrench, Phone, Plus, Trash2, Star, CalendarClock, Building2, Share2, Globe, MapPin, Inbox, Mail, User, Clock, ExternalLink, Copy, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICE_ICONS, getServiceIcon } from '../../data/serviceIcons';

const defaultCompany = {
  name: 'PT Ziotech Global Inovasi',
  address: 'Jl. Contoh Alamat No. 123, Jakarta, Indonesia',
  phone: '+62 812 3456 7890',
  email: 'info@ziotech.co.id',
  workingHours: 'Senin - Jumat: 08:00 - 17:00',
  googleMapsEmbedUrl: ''
};

const defaultPageHeaders = {
  about: {
    title: 'Tentang Kami',
    subtitle: 'Mengenal lebih dekat PT Ziotech Global Inovasi, visi, misi, dan nilai-nilai perusahaan.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
  },
  service: {
    title: 'Layanan Kami',
    subtitle: 'Solusi komprehensif yang disesuaikan dengan kebutuhan spesifik industri dan bisnis Anda.',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
  },
  project: {
    title: 'Portofolio Proyek',
    subtitle: 'Bukti nyata komitmen kami dalam memberikan hasil karya terbaik di berbagai sektor industri.',
    image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
  },
  contact: {
    title: 'Hubungi Kami',
    subtitle: 'Tim profesional kami siap membantu dan mendiskusikan kebutuhan proyek Anda.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
  }
};

const defaultServices = [
  {
    id: 'mep',
    title: 'Mechanical, Electrical & Plumbing (MEP)',
    icon: 'Wrench',
    description: 'Solusi terpadu untuk kebutuhan mekanikal, elektrikal, dan pemipaan pada berbagai skala proyek.',
    features: [
      'Desain dan Instalasi Sistem HVAC',
      'Pemasangan Sistem Kelistrikan Industri & Gedung',
      'Instalasi Pipa Air Bersih dan Air Kotor'
    ],
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

const defaultProjects = [
  {
    id: 1,
    title: 'Instalasi MEP Gedung Perkantoran 20 Lantai',
    category: 'MEP',
    location: 'Jakarta Pusat',
    year: '2025',
    client: 'PT Maju Bersama',
    description: 'Pengerjaan sistem mekanikal, elektrikal, dan plumbing komprehensif untuk gedung perkantoran Grade A.',
    image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Konstruksi Pabrik Manufaktur',
    category: 'Konstruksi',
    location: 'Cikarang, Bekasi',
    year: '2024',
    client: 'PT Industri Global',
    description: 'Pembangunan struktur utama dan fasilitas penunjang pabrik seluas 2 hektar.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Suplai Infrastruktur Tambang Nikel',
    category: 'Pertambangan',
    location: 'Morowali, Sulawesi Tengah',
    year: '2025',
    client: 'PT Tambang Sejahtera',
    description: 'Penyediaan dan instalasi sistem perpipaan industri dan kelistrikan area tambang.',
    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'Implementasi Building Management System (BMS)',
    category: 'Digitalisasi',
    location: 'Surabaya',
    year: '2024',
    client: 'Hotel Bintang 5',
    description: 'Modernisasi sistem kontrol gedung untuk efisiensi energi dan kenyamanan tamu.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    title: 'Sistem Proteksi Kebakaran Gudang Logistik',
    category: 'MEP',
    location: 'Tangerang',
    year: '2026',
    client: 'Logistik Nusantara',
    description: 'Instalasi hydrant, sprinkler, dan fire alarm system terintegrasi.',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    title: 'Infrastruktur Jalan Tambang Batubara',
    category: 'Konstruksi',
    location: 'Kalimantan Timur',
    year: '2025',
    client: 'PT Energi Bumi',
    description: 'Pembangunan dan perkuatan jalan angkut (hauling road) sepanjang 15 KM.',
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

// --- COMPONENTS MOVED OUTSIDE to prevent focus loss on every keystroke ---
const InputField = ({ label, icon: Icon, type = "text", value, onChange, onBlur, placeholder, isTextarea, helperText, min, max, step }) => (
  <div className="space-y-1.5 w-full">
    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
      {Icon && <Icon className="w-4 h-4 text-slate-400" />}
      {label}
    </label>
    {isTextarea ? (
      <textarea
        value={value ?? ''}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        rows="3"
        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none resize-y text-slate-700"
      />
    ) : (
      <input
        type={type}
        value={value ?? ''}
        onChange={onChange}
        onBlur={onBlur}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-700"
      />
    )}
    {helperText && <p className="text-xs text-slate-500 mt-1">{helperText}</p>}
  </div>
);

const ImageUploadBox = ({ value, onChange, label, onImageUpload, aspect }) => {
  const [previewError, setPreviewError] = useState(false);

  // Reset status error setiap kali nilai gambar berubah
  useEffect(() => {
    setPreviewError(false);
  }, [value]);

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <ImageIcon className="w-4 h-4 text-slate-400" />
          {label}
        </label>
      )}
      <div className="p-5 border border-slate-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow group">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <div>
               <label className="block text-xs font-medium text-slate-500 mb-1.5">URL Gambar (Opsional)</label>
              <input
                type="text"
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none text-sm text-slate-700"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="h-px bg-slate-100 flex-1"></div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Atau Upload</span>
              <div className="h-px bg-slate-100 flex-1"></div>
            </div>
            
            <div>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 hover:bg-blue-50/50 hover:border-blue-300 transition-colors cursor-pointer relative overflow-hidden group/upload">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                   <div className="p-3 bg-white rounded-full shadow-sm mb-3 group-hover/upload:scale-110 transition-transform">
                      <ImageIcon className="w-5 h-5 text-blue-500" />
                   </div>
                  <p className="text-sm font-semibold text-slate-700 mb-1">Klik untuk upload</p>
                  <p className="text-xs text-slate-500">Maks. 5MB</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onImageUpload(e, onChange, aspect)}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="w-full md:w-48 shrink-0 flex flex-col justify-start">
             <label className="block text-xs font-medium text-slate-500 mb-1.5">Preview</label>
            <div className="w-full aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-50 relative flex items-center justify-center">
              {value && !previewError ? (
                <img src={value} alt="Preview" className="w-full h-full object-contain" onError={() => setPreviewError(true)} />
              ) : value && previewError ? (
                <div className="flex flex-col items-center justify-center gap-2 p-3 text-center">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <p className="text-[10px] text-red-500">Gagal dimuat</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-300">
                    <ImageIcon className="w-6 h-6 mb-1 opacity-50" />
                    <span className="text-[10px] font-medium">Belum ada gambar</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// --- END MOVED COMPONENTS ---

// Reusable editor untuk header (judul, subjudul, background) tiap halaman
const PageHeaderEditor = ({ page, label, formData, onChange, onImageUpload }) => (
  <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100">
    <div className="flex items-center gap-4 mb-8 pb-5 border-b border-slate-100">
      <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><ImageIcon className="w-6 h-6" /></div>
      <div>
        <h3 className="text-xl font-bold text-slate-800">Header Halaman {label}</h3>
        <p className="text-sm text-slate-500 mt-1">Atur judul, subjudul, dan gambar background bagian atas halaman {label}.</p>
      </div>
    </div>
    <div className="grid lg:grid-cols-2 gap-6 items-start">
      <div className="space-y-6">
        <InputField icon={Type} label="Judul Halaman" value={formData?.pageHeaders?.[page]?.title || ''} onChange={(e) => onChange(page, 'title', e.target.value)} />
        <InputField icon={Type} label="Subjudul" value={formData?.pageHeaders?.[page]?.subtitle || ''} onChange={(e) => onChange(page, 'subtitle', e.target.value)} isTextarea />
      </div>
      <ImageUploadBox label="Gambar Background Header" value={formData?.pageHeaders?.[page]?.image || ''} onChange={(val) => onChange(page, 'image', val)} onImageUpload={onImageUpload} />
    </div>
  </div>
);
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Hapus", isDestructive = true }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 10 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 relative"
        >
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-2xl shrink-0 ${isDestructive ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-slate-800 leading-snug">{title}</h3>
              <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{message}</p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-7 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 active:scale-95 transition-all"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md active:scale-95 transition-all ${
                isDestructive
                  ? 'bg-red-600 hover:bg-red-700 shadow-red-500/20'
                  : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};


export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const navigate = useNavigate();
  const { data, rawData, loading: dataLoading } = useData();
  const [formData, setFormData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, type: '', text: '' });
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Hapus',
    onConfirm: () => {}
  });

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  useEffect(() => {
    // Safety fallback: if Firebase auth hangs or responds slowly, don't leave screen blank forever
    const timer = setTimeout(() => {
      setLoadingAuth(false);
    }, 4000);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      clearTimeout(timer);
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/admin/login');
      }
      setLoadingAuth(false);
    });
    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, [navigate]);

  useEffect(() => {
    // Listen real-time pesan masuk di Firebase
    if (!user) return;
    const messagesRef = ref(db, 'messages');
    const unsubscribeMessages = onValue(
      messagesRef,
      (snapshot) => {
        const val = snapshot.val();
        if (!val) {
          setMessages([]);
          return;
        }
        const list = Object.entries(val).map(([id, msg]) => ({
          id,
          ...msg
        }));
        // Sort newest first
        list.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        setMessages(list);
      },
      (error) => {
        console.warn('Unable to read messages:', error?.message);
        setMessages([]);
      }
    );

    return () => unsubscribeMessages();
  }, [user]);

  useEffect(() => {
    const sourceData = rawData || data;
    if (sourceData && !formData) {
      const parsedData = JSON.parse(JSON.stringify(sourceData));
      
      const cleanArray = (arr, fallback) => {
        if (!arr) return fallback;
        const list = Array.isArray(arr) ? arr : Object.values(arr);
        return list.filter(Boolean);
      };

      const services = cleanArray(parsedData.services, defaultServices).map(s => ({
        ...s,
        icon: s.icon || 'Wrench',
        featured: Boolean(s.featured)
      }));
      const projects = cleanArray(parsedData.projects, defaultProjects).map(p => ({
        ...p,
        featured: Boolean(p.featured)
      }));

      setFormData({
        ...parsedData,
        company: { ...defaultCompany, ...(parsedData.company || {}) },
        services: services.length > 0 ? services : defaultServices,
        projects: projects.length > 0 ? projects : defaultProjects,
        pageHeaders: {
          about: { ...defaultPageHeaders.about, ...(parsedData.pageHeaders?.about || {}) },
          service: { ...defaultPageHeaders.service, ...(parsedData.pageHeaders?.service || {}) },
          project: { ...defaultPageHeaders.project, ...(parsedData.pageHeaders?.project || {}) },
          contact: { ...defaultPageHeaders.contact, ...(parsedData.pageHeaders?.contact || {}) }
        },
        home: {
          heroTitles: [],
          heroImages: [],
          clientPartners: [],
          ...parsedData.home,
          clientPartners: cleanArray(parsedData.home?.clientPartners, [])
        }
      });
    }
  }, [rawData, data, formData]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const showToast = useCallback((type, text) => {
    setToast({ show: true, type, text });
    setTimeout(() => setToast({ show: false, type: '', text: '' }), 3000);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await set(ref(db, 'content'), formData);
      showToast('success', 'Perubahan berhasil disimpan!');
    } catch (error) {
      console.error("Save error", error);
      showToast('error', 'Gagal menyimpan perubahan. Silakan coba lagi.');
    }
    setSaving(false);
  };

  const promptConfirm = ({ title, message, confirmText = 'Hapus', isDestructive = true, onConfirm }) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      confirmText,
      isDestructive,
      onConfirm
    });
  };

  const handleDeleteMessage = (id, senderName) => {
    promptConfirm({
      title: 'Hapus Pesan Masuk?',
      message: senderName 
        ? `Apakah Anda yakin ingin menghapus pesan dari "${senderName}"? Tindakan ini tidak dapat dibatalkan.`
        : 'Apakah Anda yakin ingin menghapus pesan ini dari database?',
      confirmText: 'Ya, Hapus',
      onConfirm: async () => {
        try {
          await remove(ref(db, `messages/${id}`));
          if (selectedMessage?.id === id) {
            setSelectedMessage(null);
          }
          showToast('success', 'Pesan berhasil dihapus.');
        } catch (err) {
          console.error('Delete message error:', err);
          showToast('error', 'Gagal menghapus pesan.');
        }
      }
    });
  };

  const handleMarkMessageStatus = async (id, status) => {
    try {
      await update(ref(db, `messages/${id}`), { status });
      if (selectedMessage?.id === id) {
        setSelectedMessage((prev) => (prev ? { ...prev, status } : null));
      }
    } catch (err) {
      console.error('Status update error:', err);
    }
  };

  const unreadCount = messages.filter((m) => m.status !== 'read').length;

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handlePageHeaderChange = (page, field, value) => {
    setFormData((prev) => ({
      ...prev,
      pageHeaders: {
        ...prev.pageHeaders,
        [page]: { ...prev.pageHeaders?.[page], [field]: value }
      }
    }));
  };

  const handleArrayChange = (section, index, field, value) => {
    setFormData((prev) => {
      const newArray = [...prev[section]];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [section]: newArray };
    });
  };

  const addArrayItem = (section, newItem) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), newItem]
    }));
    setTimeout(() => {
      const element = document.getElementById(`${section}-new-item`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const input = element.querySelector('input, textarea');
        if (input) input.focus();
      }
    }, 100);
  };

  const removeArrayItem = (section, index) => {
    const item = formData?.[section]?.[index];
    const itemName = item?.title || item?.name || `${section === 'services' ? 'Layanan' : 'Proyek'} #${index + 1}`;
    const sectionLabel = section === 'services' ? 'Layanan' : section === 'projects' ? 'Proyek' : 'Item';

    promptConfirm({
      title: `Hapus ${sectionLabel}?`,
      message: `Apakah Anda yakin ingin menghapus "${itemName}"? Item akan dihapus dari daftar CMS (jangan lupa klik "Simpan Perubahan" untuk mempublikasikan).`,
      confirmText: 'Ya, Hapus',
      onConfirm: () => {
        setFormData((prev) => {
          const newArray = [...prev[section]];
          newArray.splice(index, 1);
          return { ...prev, [section]: newArray };
        });
        showToast('info', `${sectionLabel} "${itemName}" telah dihapus.`);
      }
    });
  };

  const handleHomePartnerChange = (index, field, value) => {
    setFormData((prev) => {
      const partners = [...(prev.home?.clientPartners || [])];
      partners[index] = { ...partners[index], [field]: value };
      return {
        ...prev,
        home: {
          ...prev.home,
          clientPartners: partners
        }
      };
    });
  };

  const addHomePartner = () => {
    setFormData((prev) => ({
      ...prev,
      home: {
        ...prev.home,
        clientPartners: [
          ...(prev.home?.clientPartners || []),
          { id: Date.now(), name: 'Nama Mitra', logo: '' }
        ]
      }
    }));
  };

  const removeHomePartner = (index) => {
    setFormData((prev) => {
      const partners = [...(prev.home?.clientPartners || [])];
      partners.splice(index, 1);
      return {
        ...prev,
        home: {
          ...prev.home,
          clientPartners: partners
        }
      };
    });
  };

  const handleCompanySocialChange = (index, field, value) => {
    setFormData((prev) => {
      const socials = [...(prev.company?.socials || [])];
      socials[index] = { ...socials[index], [field]: value };
      return {
        ...prev,
        company: {
          ...prev.company,
          socials
        }
      };
    });
  };

  const addCompanySocial = () => {
    setFormData((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        socials: [
          ...(prev.company?.socials || []),
          { id: Date.now(), platform: 'instagram', url: 'https://' }
        ]
      }
    }));
  };

  const removeCompanySocial = (index) => {
    setFormData((prev) => {
      const socials = [...(prev.company?.socials || [])];
      socials.splice(index, 1);
      return {
        ...prev,
        company: {
          ...prev.company,
          socials
        }
      };
    });
  };

  const handleFeaturesChange = (serviceIndex, featuresString) => {
    const featuresArray = featuresString.split('\n').filter(f => f.trim() !== '');
    handleArrayChange('services', serviceIndex, 'features', featuresArray);
  };

  const handleImageUpload = useCallback((e, callback) => {
    const input = e.target;
    const file = input.files && input.files[0];
    if (!file) return;

    // Reset input agar file yang sama bisa dipilih ulang di lain waktu
    input.value = '';

    if (!file.type.startsWith('image/')) {
      showToast('error', 'File yang dipilih bukan gambar. Gunakan JPG, PNG, atau WebP.');
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => {
      showToast('error', 'Gagal membaca file. Coba lagi atau tempel URL gambar.');
    };
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => {
        showToast('error', 'Format gambar tidak dapat diproses browser (mis. HEIC dari iPhone). Konversi ke JPG/PNG atau gunakan URL.');
      };
      img.onload = () => {
        try {
          // Resize & kompres gambar via canvas agar base64 kecil dan aman disimpan ke Firebase
          const MAX_DIM = 1920;
          let width = img.naturalWidth || img.width;
          let height = img.naturalHeight || img.height;
          if (width > MAX_DIM || height > MAX_DIM) {
            const scale = Math.min(MAX_DIM / width, MAX_DIM / height);
            width = Math.round(width * scale);
            height = Math.round(height * scale);
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          canvas.getContext('2d').drawImage(img, 0, 0, width, height);
          // Default JPEG terkompresi; PNG hanya dipakai jika ukurannya wajar (logo/transparansi)
          let dataUrl = canvas.toDataURL('image/jpeg', 0.82);
          if (file.type === 'image/png') {
            const pngUrl = canvas.toDataURL('image/png');
            if (pngUrl.length < 1500000) dataUrl = pngUrl;
          }
          callback(dataUrl);
        } catch (err) {
          console.error('Image processing error:', err);
          showToast('error', 'Gagal memproses gambar. Coba file lain atau gunakan URL.');
        }
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }, [showToast]);

  if (loadingAuth || dataLoading || !formData) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-red-600 mb-4"></div>
        <p className="text-slate-500 font-medium animate-pulse">Memuat Dashboard CMS...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-100 font-sans overflow-hidden">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-none"
          >
            <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl shadow-xl border ${toast.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
              {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <AlertCircle className="w-5 h-5 text-red-600" />}
              <span className="font-semibold">{toast.text}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-slate-300 flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} flex`}>
        <div className="h-20 flex items-center justify-between px-6 bg-slate-950 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/50">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-xl font-bold tracking-tight">Ziotech CMS</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-8 px-4 space-y-2 dark-scroll">
          <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Manajemen Halaman</p>
          
          <button onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'home' ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' : 'hover:bg-slate-800 hover:text-white'}`}>
            <Home className="w-5 h-5" /> <span className="font-medium">Beranda (Home)</span>
          </button>
          
          <button onClick={() => { setActiveTab('about'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'about' ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' : 'hover:bg-slate-800 hover:text-white'}`}>
            <Info className="w-5 h-5" /> <span className="font-medium">Tentang Kami</span>
          </button>

          <button onClick={() => { setActiveTab('services'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'services' ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' : 'hover:bg-slate-800 hover:text-white'}`}>
            <Wrench className="w-5 h-5" /> <span className="font-medium">Layanan (Services)</span>
          </button>

          <button onClick={() => { setActiveTab('projects'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'projects' ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' : 'hover:bg-slate-800 hover:text-white'}`}>
            <Briefcase className="w-5 h-5" /> <span className="font-medium">Proyek (Projects)</span>
          </button>

          <button onClick={() => { setActiveTab('contact'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'contact' ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' : 'hover:bg-slate-800 hover:text-white'}`}>
            <Phone className="w-5 h-5" /> <span className="font-medium">Kontak & Perusahaan</span>
          </button>

          <div className="pt-4 mt-4 border-t border-slate-800/80">
            <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Interaksi</p>
            <button 
              onClick={() => { setActiveTab('inbox'); setIsMobileMenuOpen(false); }} 
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${activeTab === 'inbox' ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-5 h-5" />
                <span className="font-medium">Pesan Masuk</span>
              </div>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="p-4 border-t border-slate-800 shrink-0">
          <div className="bg-slate-800/50 rounded-xl p-4 mb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold shrink-0">AD</div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">Administrator</p>
              <p className="text-xs text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full px-4 py-3 text-red-400 hover:text-white hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-500/20 font-medium">
            <LogOut className="w-5 h-5" /> Keluar
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-100/50">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 z-30 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-base sm:text-xl lg:text-2xl font-bold text-slate-800 truncate max-w-[160px] sm:max-w-none">
              {activeTab === 'home' && 'Edit Beranda'}
              {activeTab === 'about' && 'Edit Tentang Kami'}
              {activeTab === 'services' && 'Edit Layanan'}
              {activeTab === 'projects' && 'Edit Proyek'}
              {activeTab === 'contact' && 'Edit Kontak & Info Perusahaan'}
              {activeTab === 'inbox' && 'Pesan Masuk (Inbox)'}
            </h2>
          </div>
          
          {activeTab !== 'inbox' ? (
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-blue-600 text-white px-5 lg:px-6 py-2.5 lg:py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20 active:scale-95 disabled:opacity-70 disabled:active:scale-100 disabled:cursor-not-allowed">
              {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" /> : <Save className="w-5 h-5 shrink-0" />}
              <span className="hidden sm:inline">{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
              <span className="sm:hidden">{saving ? '...' : 'Simpan'}</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Realtime Sync
            </div>
          )}
        </header>

        {/* Scrollable Content */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-8 scroll-smooth">
          <div className="max-w-4xl mx-auto pb-20">
            
            <AnimatePresence mode="wait">
              
              {/* HOME TAB */}
              {activeTab === 'home' && (
                <motion.div key="home" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="space-y-8">
                  <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100">
                    <div className="flex items-center gap-4 mb-8 pb-5 border-b border-slate-100">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><LayoutDashboard className="w-6 h-6" /></div>
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
                            <p className="text-xs text-slate-500 mt-1 mb-0">Format lanskap (disarankan 16:9 atau 1920×1080 px) agar pas di layar.</p>
                          </div>
                          <button
                            onClick={() => {
                              const currentImages = formData.home?.heroImages || [];
                              handleChange('home', 'heroImages', [...currentImages, '']);
                            }}
                            className="shrink-0 text-sm flex items-center gap-1 text-[var(--primary-blue)] hover:text-blue-700 font-medium bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            <Plus className="w-4 h-4" /> Tambah Gambar
                          </button>
                        </div>
                        
                        {(formData.home?.heroImages || []).map((img, idx) => (
                          <div key={idx} className="relative group p-4 border border-slate-200 rounded-xl bg-slate-50">
                            <button
                              onClick={() => {
                                const currentImages = [...(formData.home?.heroImages || [])];
                                currentImages.splice(idx, 1);
                                handleChange('home', 'heroImages', currentImages);
                              }}
                              className="absolute top-2 right-2 p-1.5 bg-red-100 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-200"
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
                          <div className="text-center p-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-slate-500 text-sm">
                            Belum ada gambar slider. Klik Tambah Gambar untuk memulai.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100">
                    <div className="flex items-center gap-4 mb-8 pb-5 border-b border-slate-100">
                      <div className="p-3 bg-sky-50 text-[#0284c7] rounded-xl"><Sparkles className="w-6 h-6" /></div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">Visual & Teks Editorial Intro (Inovasi & Kualitas)</h3>
                        <p className="text-sm text-slate-500 mt-1">Kelola gambar kotak dan teks editorial intro di bawah hero beranda.</p>
                      </div>
                    </div>
                    <div className="space-y-6">
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
                          label="Badge Intro (Kategori Atas Judul)" 
                          value={formData.home?.introBadge ?? 'INOVASI & KUALITAS'} 
                          onChange={(e) => handleChange('home', 'introBadge', e.target.value)} 
                          placeholder="INOVASI & KUALITAS"
                        />
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

                  <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100">
                    <div className="flex items-center gap-4 mb-8 pb-5 border-b border-slate-100">
                      <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><Info className="w-6 h-6" /></div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">Preview Tentang Kami</h3>
                        <p className="text-sm text-slate-500 mt-1">Gambar yang muncul di bagian 'Tentang Ziotech' di halaman Home.</p>
                      </div>
                    </div>
                    <ImageUploadBox label="Gambar Preview About" value={formData.home?.aboutPreviewImageUrl} onChange={(val) => handleChange('home', 'aboutPreviewImageUrl', val)} onImageUpload={handleImageUpload} />
                  </div>

                  {/* Mitra / Client Logos Section */}
                  <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100">
                    <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Building2 className="w-6 h-6" /></div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-800">Mitra & Klien Terpercaya</h3>
                          <p className="text-sm text-slate-500 mt-1">Kelola daftar perusahaan klien yang ditampilkan di Beranda.</p>
                        </div>
                      </div>
                      <button
                        onClick={addHomePartner}
                        className="text-sm flex items-center gap-1 text-[var(--primary-blue)] hover:text-blue-700 font-medium bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" /> Tambah Mitra
                      </button>
                    </div>

                    <div className="space-y-6">
                      <InputField 
                        icon={Type} 
                        label="Judul Bagian Mitra" 
                        value={formData.home?.clientPartnersTitle || "Dipercaya Oleh Berbagai Perusahaan Terkemuka"} 
                        onChange={(e) => handleChange('home', 'clientPartnersTitle', e.target.value)} 
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(formData.home?.clientPartners || []).map((partner, idx) => (
                          <div key={partner.id || idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 relative group flex flex-col justify-between">
                            <button
                              onClick={() => removeHomePartner(idx)}
                              className="absolute top-2 right-2 p-1.5 bg-red-100 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-200"
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
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      {(!formData.home?.clientPartners || formData.home?.clientPartners.length === 0) && (
                        <div className="text-center p-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-slate-500 text-sm">
                          Belum ada daftar mitra. Klik 'Tambah Mitra' untuk menambahkan.
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ABOUT TAB */}
              {activeTab === 'about' && (
                <motion.div key="about" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="space-y-8">
                  <PageHeaderEditor page="about" label="Tentang Kami" formData={formData} onChange={handlePageHeaderChange} onImageUpload={handleImageUpload} />
                  <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100">
                    <div className="flex items-center gap-4 mb-8 pb-5 border-b border-slate-100">
                      <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Info className="w-6 h-6" /></div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">Informasi Perusahaan</h3>
                        <p className="text-sm text-slate-500 mt-1">Deskripsi lengkap, visi, dan misi perusahaan.</p>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <InputField icon={Type} label="Deskripsi Lengkap" value={formData.about?.description} onChange={(e) => handleChange('about', 'description', e.target.value)} isTextarea />
                      <div className="grid md:grid-cols-2 gap-6">
                        <InputField icon={Type} label="Visi Perusahaan" value={formData.about?.vision} onChange={(e) => handleChange('about', 'vision', e.target.value)} isTextarea />
                        <InputField icon={Type} label="Misi Perusahaan" value={formData.about?.mission} onChange={(e) => handleChange('about', 'mission', e.target.value)} isTextarea />
                      </div>
                      <ImageUploadBox label="Gambar Utama Halaman About" value={formData.about?.image} onChange={(val) => handleChange('about', 'image', val)} onImageUpload={handleImageUpload} />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SERVICES TAB */}
              {activeTab === 'services' && (
                <motion.div key="services" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="space-y-8">
                  <PageHeaderEditor page="service" label="Layanan" formData={formData} onChange={handlePageHeaderChange} onImageUpload={handleImageUpload} />
                  <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100">
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
                      className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-semibold hover:bg-blue-200 transition-colors"
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
                        className="bg-white rounded-3xl p-6 lg:p-8 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 relative group"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-slate-100 gap-4">
                          <div className="flex items-center gap-4 min-w-0 flex-1">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0"><ServiceItemIcon className="w-6 h-6" /></div>
                            <h3 className="text-lg font-bold text-slate-800 truncate pr-2" title={`Layanan #${index + 1}: ${service.title}`}>
                              Layanan #{index + 1}: {service.title}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-auto">
                            <button
                              type="button"
                              onClick={() => handleArrayChange('services', index, 'featured', !service.featured)}
                              className={`flex items-center gap-2.5 pl-3 pr-4 py-2 rounded-full text-xs font-semibold border transition-all active:scale-95 whitespace-nowrap ${
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
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100 shrink-0"
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
                              <div className="grid grid-cols-5 sm:grid-cols-5 gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                                {SERVICE_ICONS.map((item) => {
                                  const IconComponent = item.icon;
                                  const isSelected = (service.icon || 'Wrench') === item.id;
                                  return (
                                    <button
                                      key={item.id}
                                      type="button"
                                      onClick={() => handleArrayChange('services', index, 'icon', item.id)}
                                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all ${
                                        isSelected
                                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                          : 'bg-white text-slate-600 border-slate-200 hover:bg-blue-50 hover:text-blue-600'
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
              )}

              {/* PROJECTS TAB */}
              {activeTab === 'projects' && (
                <motion.div key="projects" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="space-y-8">
                  <PageHeaderEditor page="project" label="Proyek" formData={formData} onChange={handlePageHeaderChange} onImageUpload={handleImageUpload} />
                  <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100">
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
                      className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-semibold hover:bg-blue-200 transition-colors"
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
                        className="bg-white rounded-3xl p-6 lg:p-8 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 relative group"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-slate-100 gap-4">
                          <div className="flex items-center gap-4 min-w-0 flex-1">
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl shrink-0"><Briefcase className="w-6 h-6" /></div>
                            <h3 className="text-lg font-bold text-slate-800 truncate pr-2" title={`Proyek #${index + 1}: ${project.title}`}>
                              Proyek #{index + 1}: {project.title}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-auto">
                            <button
                              type="button"
                              onClick={() => handleArrayChange('projects', index, 'featured', !project.featured)}
                              className={`flex items-center gap-2.5 pl-3 pr-4 py-2 rounded-full text-xs font-semibold border transition-all active:scale-95 whitespace-nowrap ${
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
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100 shrink-0"
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
              )}

              {/* CONTACT TAB */}
              {activeTab === 'contact' && (
                <motion.div key="contact" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="space-y-8">
                  <PageHeaderEditor page="contact" label="Kontak" formData={formData} onChange={handlePageHeaderChange} onImageUpload={handleImageUpload} />
                  <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100">
                    <div className="flex items-center gap-4 mb-8 pb-5 border-b border-slate-100">
                      <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><Phone className="w-6 h-6" /></div>
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
                        <div className="text-xs text-slate-500 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200">
                          <p className="font-semibold text-slate-700">Cara menyematkan lokasi tepat:</p>
                          <p>1. Buka titik lokasi di <b>Google Maps</b> di browser.</p>
                          <p>2. Klik <b>Bagikan (Share)</b> &rarr; pilih tab <b>Sematkan peta (Embed a map)</b> &rarr; klik <b>Salin HTML (Copy HTML)</b>, lalu tempel di sini.</p>
                          <p>3. Atau Anda juga bisa langsung menempelkan URL alamat / koordinat (<code className="bg-white px-1 rounded border border-slate-200">-6.2088, 106.8456</code>).</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social Media Section */}
                  <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100">
                    <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-pink-50 text-pink-600 rounded-xl"><Share2 className="w-6 h-6" /></div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-800">Media Sosial Footer</h3>
                          <p className="text-sm text-slate-500 mt-1">Kelola link sosial media yang ditampilkan di footer website.</p>
                        </div>
                      </div>
                      <button
                        onClick={addCompanySocial}
                        className="text-sm flex items-center gap-1 text-[var(--primary-blue)] hover:text-blue-700 font-medium bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" /> Tambah Sosmed
                      </button>
                    </div>

                    <div className="space-y-4">
                      {(formData.company?.socials || []).map((item, idx) => (
                        <div key={item.id || idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 relative group flex flex-col md:flex-row gap-4 items-start md:items-center">
                          <button
                            onClick={() => removeCompanySocial(idx)}
                            className="absolute top-2 right-2 md:static md:order-last p-2 bg-red-50 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100"
                            title="Hapus Sosmed"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          
                          <div className="w-full md:w-48 shrink-0">
                            <label className="block text-xs font-semibold text-slate-600 mb-1">Platform</label>
                            <select
                              value={item.platform || 'instagram'}
                              onChange={(e) => handleCompanySocialChange(idx, 'platform', e.target.value)}
                              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium text-slate-700"
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
                              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium text-slate-700"
                            />
                          </div>
                        </div>
                      ))}

                      {(!formData.company?.socials || formData.company?.socials.length === 0) && (
                        <div className="text-center p-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-slate-500 text-sm">
                          Belum ada sosial media. Klik 'Tambah Sosmed' untuk menambahkan tautan.
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
              {/* INBOX TAB */}
              {activeTab === 'inbox' && (
                <motion.div key="inbox" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="space-y-6">
                  <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Inbox className="w-6 h-6" /></div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-800">Daftar Pesan Masuk</h3>
                          <p className="text-sm text-slate-500 mt-1">Pesan formulir kontak dari pengunjung website.</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600">Total: {messages.length}</span>
                        {unreadCount > 0 && (
                          <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-50 text-red-600 border border-red-100">{unreadCount} baru</span>
                        )}
                      </div>
                    </div>

                    {messages.length === 0 ? (
                      <div className="text-center py-16 text-slate-400">
                        <Inbox className="w-12 h-12 mx-auto mb-3 stroke-1 text-slate-300" />
                        <p className="font-medium text-slate-600">Belum ada pesan masuk</p>
                        <p className="text-xs text-slate-400 mt-1">Setiap pesan baru akan masuk ke sini secara realtime.</p>
                      </div>
                    ) : (
                      <div className="mt-6 space-y-4">
                        {messages.map((msg) => {
                          const isUnread = msg.status !== 'read';
                          return (
                            <div key={msg.id} className={`p-5 rounded-2xl border transition-all ${isUnread ? 'bg-blue-50/40 border-blue-200 shadow-sm' : 'bg-white border-slate-200'}`}>
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                                <div className="flex items-center gap-2">
                                  {isUnread && <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />}
                                  <span className="font-bold text-slate-800">{msg.name || 'Tanpa Nama'}</span>
                                  <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600">{msg.subject || 'Pesan Baru'}</span>
                                </div>
                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5" />
                                  {msg.createdAt ? new Date(msg.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) : '-'}
                                </span>
                              </div>
                              <div className="grid sm:grid-cols-2 gap-2 text-xs text-slate-500 mb-3 bg-slate-50 p-2.5 rounded-xl">
                                <div className="flex items-center gap-2 truncate"><Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" /><span className="truncate">{msg.email || '-'}</span></div>
                                <div className="flex items-center gap-2 truncate"><Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" /><span className="truncate">{msg.phone || '-'}</span></div>
                              </div>
                              <div className="p-3.5 bg-white rounded-xl border border-slate-100 text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{msg.message}</div>
                              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-xs">
                                <div className="flex items-center gap-2">
                                  <button onClick={() => handleMarkMessageStatus(msg.id, isUnread ? 'read' : 'unread')} className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${isUnread ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                                    {isUnread ? 'Tandai Dibaca' : 'Tandai Belum Dibaca'}
                                  </button>
                                  {msg.email && (
                                    <a href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Pesan Website')}`} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 font-medium">
                                      <Mail className="w-3.5 h-3.5" /> Balas Email
                                    </a>
                                  )}
                                  {msg.email && (
                                    <a
                                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(msg.email)}&su=${encodeURIComponent(`Re: ${msg.subject || 'Pesan Website'}`)}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium"
                                      title="Buka langsung di Gmail Browser"
                                    >
                                      <ExternalLink className="w-3.5 h-3.5" /> Buka Gmail
                                    </a>
                                  )}
                                  {msg.phone && msg.phone !== '-' && (
                                    <a
                                      href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '').replace(/^0/, '62')}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium"
                                      title="Balas via WhatsApp"
                                    >
                                      <Phone className="w-3.5 h-3.5" /> WhatsApp
                                    </a>
                                  )}

                                </div>
                                <button onClick={() => handleDeleteMessage(msg.id, msg.name)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg" title="Hapus Pesan">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}


            </AnimatePresence>

          </div>
        </div>
      </main>
      {/* Confirm Action Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        isDestructive={confirmModal.isDestructive}
      />
    </div>
  );
}





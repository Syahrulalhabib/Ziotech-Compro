import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ref, set, onValue, remove, update } from 'firebase/database';
import { auth, db } from '../../firebase/config';
import { useData, defaultData } from '../../context/DataContext';
import { LogOut, Save, Home, Info, Briefcase, Wrench, Phone, Menu, X, CheckCircle2, AlertCircle, Globe, Inbox, ExternalLink, Sparkles, ChevronRight, Newspaper } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoZiotech from '../../assets/ziotech.png';
import LoadingScreen from '../../components/LoadingScreen';
import ConfirmModal from './components/ConfirmModal';
import HomeTab from './tabs/HomeTab';
import AboutTab from './tabs/AboutTab';
import ServicesTab from './tabs/ServicesTab';
import ProjectsTab from './tabs/ProjectsTab';
import NewsTab from './tabs/NewsTab';
import ContactTab from './tabs/ContactTab';
import InboxTab from './tabs/InboxTab';

const defaultCompany = defaultData?.company || {};
const defaultPageHeaders = defaultData?.pageHeaders || {};
const defaultServices = defaultData?.services || [];
const defaultProjects = defaultData?.projects || [];
const defaultNews = defaultData?.news || [];

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
  const [newsSearch, setNewsSearch] = useState('');

  const toggleNewsFeatured = (index) => {
    setFormData((prev) => {
      const news = [...(prev.news || [])];
      news[index] = { ...news[index], featured: !news[index].featured };
      return { ...prev, news };
    });
  };

  const handleHeroTitleChange = (index, value) => {
    setFormData((prev) => {
      const titles = [...(prev.home?.heroTitles || defaultData?.home?.heroTitles || [])];
      titles[index] = value;
      return {
        ...prev,
        home: {
          ...prev.home,
          heroTitles: titles
        }
      };
    });
  };

  const addHeroTitle = () => {
    setFormData((prev) => ({
      ...prev,
      home: {
        ...prev.home,
        heroTitles: [
          ...(prev.home?.heroTitles || defaultData?.home?.heroTitles || []),
          'Segmen Baru'
        ]
      }
    }));
  };

  const removeHeroTitle = (index) => {
    setFormData((prev) => {
      const titles = [...(prev.home?.heroTitles || defaultData?.home?.heroTitles || [])];
      titles.splice(index, 1);
      return {
        ...prev,
        home: {
          ...prev.home,
          heroTitles: titles
        }
      };
    });
  };

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

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      clearTimeout(timer);
      if (currentUser) {
        const lastActive = parseInt(localStorage.getItem('admin_last_activity') || '0', 10);
        const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000; // 30 menit
        if (lastActive && Date.now() - lastActive > INACTIVITY_TIMEOUT_MS) {
          try {
            await signOut(auth);
          } catch (err) {
            console.error('Sign out error:', err);
          }
          localStorage.removeItem('admin_last_activity');
          navigate('/admin/login', { state: { sessionExpired: true } });
          setLoadingAuth(false);
          return;
        }
        if (!lastActive) {
          localStorage.setItem('admin_last_activity', Date.now().toString());
        }
        setUser(currentUser);
      } else {
        localStorage.removeItem('admin_last_activity');
        navigate('/admin/login');
      }
      setLoadingAuth(false);
    });
    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, [navigate]);

  // Auto-logout setelah 30 menit tanpa aktivitas (standar CMS perusahaan)
  useEffect(() => {
    if (!user) return;

    const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000; // 30 menit
    let timeoutId;

    const triggerAutoLogout = async () => {
      try {
        localStorage.removeItem('admin_last_activity');
        await signOut(auth);
        navigate('/admin/login', { state: { sessionExpired: true } });
      } catch (err) {
        console.error('Auto logout error:', err);
      }
    };

    const resetTimer = () => {
      clearTimeout(timeoutId);
      const lastActive = parseInt(localStorage.getItem('admin_last_activity') || '0', 10);
      const elapsed = Date.now() - lastActive;
      if (elapsed >= INACTIVITY_TIMEOUT_MS) {
        triggerAutoLogout();
        return;
      }
      const remaining = Math.max(1000, INACTIVITY_TIMEOUT_MS - elapsed);
      timeoutId = setTimeout(triggerAutoLogout, remaining);
    };

    let lastThrottled = Date.now();
    const handleActivity = () => {
      const now = Date.now();
      if (now - lastThrottled > 2000) {
        lastThrottled = now;
        localStorage.setItem('admin_last_activity', now.toString());
        resetTimer();
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        const lastActive = parseInt(localStorage.getItem('admin_last_activity') || '0', 10);
        if (lastActive && Date.now() - lastActive >= INACTIVITY_TIMEOUT_MS) {
          triggerAutoLogout();
        } else {
          resetTimer();
        }
      }
    };

    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click'];
    events.forEach((evt) => window.addEventListener(evt, handleActivity, { passive: true }));
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('focus', handleVisibility);
    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      events.forEach((evt) => window.removeEventListener(evt, handleActivity));
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('focus', handleVisibility);
    };
  }, [user, navigate]);


  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

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
    // JANGAN inisialisasi formData saat data Firebase masih dalam proses loading!
    // Ini mencegah konten yang sudah diisi admin tertimpa oleh data default bawaan sistem.
    if (dataLoading) return;

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
      const news = cleanArray(parsedData.news, defaultNews).map(n => ({
        ...n,
        featured: Boolean(n.featured)
      }));

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        ...parsedData,
        company: { 
          ...defaultCompany, 
          ...(parsedData.company || {}),
          socials: cleanArray(parsedData.company?.socials, defaultCompany.socials || []),
          footerServices: cleanArray(parsedData.company?.footerServices, defaultCompany.footerServices || [])
        },
        about: { 
          ...defaultData.about, 
          ...(parsedData.about || {}),
          values: cleanArray(parsedData.about?.values, defaultData?.about?.values || [])
        },
        services: services.length > 0 ? services : defaultServices,
        projects: projects.length > 0 ? projects : defaultProjects,
        news: news.length > 0 ? news : defaultNews,
        pageHeaders: {
          about: { ...defaultPageHeaders.about, ...(parsedData.pageHeaders?.about || {}) },
          service: { ...defaultPageHeaders.service, ...(parsedData.pageHeaders?.service || {}) },
          project: { ...defaultPageHeaders.project, ...(parsedData.pageHeaders?.project || {}) },
          news: { ...defaultPageHeaders.news, ...(parsedData.pageHeaders?.news || {}) },
          contact: { ...defaultPageHeaders.contact, ...(parsedData.pageHeaders?.contact || {}) }
        },
        contactSettings: {
          ...defaultData.contactSettings,
          ...(parsedData.contactSettings || {})
        },
        home: {
          ...defaultData.home,
          ...parsedData.home,
          heroTitles: cleanArray(parsedData.home?.heroTitles, defaultData?.home?.heroTitles || []),
          heroImages: cleanArray(parsedData.home?.heroImages, defaultData?.home?.heroImages || []),
          clientPartners: cleanArray(parsedData.home?.clientPartners, []),
          stats: cleanArray(parsedData.home?.stats, defaultData?.home?.stats || [])
        }
      });
    }
  }, [dataLoading, rawData, data, formData]);

  const handleLogout = async () => {
    try {
      localStorage.removeItem('admin_last_activity');
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
    const itemName = item?.title || item?.name || `${section === 'services' ? 'Layanan' : section === 'projects' ? 'Proyek' : 'Berita'} #${index + 1}`;
    const sectionLabel = section === 'services' ? 'Layanan' : section === 'projects' ? 'Proyek' : section === 'news' ? 'Berita/Artikel' : 'Item';

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

  const handleHomeStatChange = (index, field, value) => {
    setFormData((prev) => {
      const stats = [...(prev.home?.stats || defaultData?.home?.stats || [])];
      stats[index] = { ...stats[index], [field]: value };
      return {
        ...prev,
        home: {
          ...prev.home,
          stats
        }
      };
    });
  };

  const addHomeStat = () => {
    setFormData((prev) => ({
      ...prev,
      home: {
        ...prev.home,
        stats: [
          ...(prev.home?.stats || defaultData?.home?.stats || []),
          { id: Date.now(), category: 'KATEGORI BARU', value: '10+', unit: 'Satuan', label: 'Deskripsi singkat pencapaian' }
        ]
      }
    }));
  };

  const removeHomeStat = (index) => {
    setFormData((prev) => {
      const stats = [...(prev.home?.stats || defaultData?.home?.stats || [])];
      stats.splice(index, 1);
      return {
        ...prev,
        home: {
          ...prev.home,
          stats
        }
      };
    });
  };

  const handleAboutValueChange = (index, field, value) => {
    setFormData((prev) => {
      const values = [...(prev.about?.values || defaultData?.about?.values || [])];
      values[index] = { ...values[index], [field]: value };
      return {
        ...prev,
        about: {
          ...prev.about,
          values
        }
      };
    });
  };

  const addAboutValue = () => {
    setFormData((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        values: [
          ...(prev.about?.values || defaultData?.about?.values || []),
          { id: Date.now(), title: '', desc: '' }
        ]
      }
    }));
  };

  const removeAboutValue = (index) => {
    setFormData((prev) => {
      const values = [...(prev.about?.values || defaultData?.about?.values || [])];
      values.splice(index, 1);
      return {
        ...prev,
        about: {
          ...prev.about,
          values
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

  const handleFooterServiceChange = (index, field, value) => {
    setFormData((prev) => {
      const footerServices = [...(prev.company?.footerServices || [])];
      footerServices[index] = { ...footerServices[index], [field]: value };
      return {
        ...prev,
        company: {
          ...prev.company,
          footerServices
        }
      };
    });
  };

  const addFooterService = () => {
    setFormData((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        footerServices: [
          ...(prev.company?.footerServices || []),
          { id: Date.now(), title: 'Nama Layanan Baru', url: '/service/1' }
        ]
      }
    }));
  };

  const removeFooterService = (index) => {
    setFormData((prev) => {
      const footerServices = [...(prev.company?.footerServices || [])];
      footerServices.splice(index, 1);
      return {
        ...prev,
        company: {
          ...prev.company,
          footerServices
        }
      };
    });
  };

  const handleFeaturesChange = (serviceIndex, featuresString) => {
    const featuresArray = featuresString.split('\n').filter(f => f.trim() !== '');
    handleArrayChange('services', serviceIndex, 'features', featuresArray);
  };

  const handleImageUpload = useCallback((e, callback, aspectOrType) => {
    const input = e.target;
    const file = input.files && input.files[0];
    if (!file) return;

    // Reset input agar file yang sama bisa dipilih ulang di lain waktu
    input.value = '';

    if (!file.type.startsWith('image/')) {
      showToast('error', 'File yang dipilih bukan gambar. Gunakan JPG, PNG, atau WebP.');
      return;
    }

    const isLogo = aspectOrType === 'logo';
    const isTransparentFormat = 
      isLogo ||
      file.type === 'image/png' || 
      file.type === 'image/webp' || 
      file.type === 'image/svg+xml' || 
      (file.name && file.name.toLowerCase().endsWith('.png'));

    const reader = new FileReader();
    reader.onerror = () => {
      showToast('error', 'Gagal membaca file. Coba lagi atau tempel URL gambar.');
    };
    reader.onload = () => {
      // Jika format PNG/WebP/SVG dan ukuran wajar (<= 2MB), gunakan raw file dataURL langsung tanpa canvas
      if (isTransparentFormat && file.size <= 2 * 1024 * 1024) {
        callback(reader.result);
        return;
      }

      const img = new Image();
      img.onerror = () => {
        showToast('error', 'Format gambar tidak dapat diproses browser (mis. HEIC dari iPhone). Konversi ke JPG/PNG atau gunakan URL.');
      };
      img.onload = () => {
        try {
          // Resize & kompres gambar via canvas agar base64 kecil dan aman disimpan ke Firebase
          const MAX_DIM = isTransparentFormat ? 1000 : 1920;
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
          const ctx = canvas.getContext('2d');
          // Selalu bersihkan canvas agar transparansi alpha 100% terjaga
          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);

          if (isTransparentFormat) {
            callback(canvas.toDataURL('image/png'));
          } else {
            callback(canvas.toDataURL('image/jpeg', 0.82));
          }
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
    return <LoadingScreen message="Memuat Dashboard CMS..." />;
  }

  return (
    <div className="flex h-screen bg-slate-100/70 font-sans overflow-hidden">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.94 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-none"
          >
            <div className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl border backdrop-blur-md ${
              toast.type === 'success' 
                ? 'bg-slate-900/95 border-emerald-500/40 text-emerald-200' 
                : toast.type === 'info'
                ? 'bg-slate-900/95 border-slate-700 text-slate-200'
                : 'bg-slate-900/95 border-red-500/40 text-red-200'
            }`}>
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : toast.type === 'info' ? (
                <Sparkles className="w-5 h-5 text-sky-400 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              )}
              <span className="text-sm font-semibold">{toast.text}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`hidden lg:flex inset-y-0 left-0 z-50 w-72 bg-slate-950 text-slate-300 flex-col border-r border-slate-800/80 transition-transform duration-300 ease-in-out`}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800/80 shrink-0">
          <div className="flex items-center gap-3">
            <img src={logoZiotech} alt="Ziotech CMS" className="h-9 w-auto no-placeholder object-contain" />
            <div>
              <span className="text-white text-lg font-bold tracking-tight block leading-tight">Ziotech CMS</span>
              <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Portal Admin</span>
            </div>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Shortcut to public website */}
        <div className="px-4 pt-4 shrink-0">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 hover:text-white rounded-lg border border-slate-800 transition-colors group"
          >
            <span className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span>Lihat Website Publik</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </a>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1.5 dark-scroll">
          <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Manajemen Halaman</p>
          
          <button 
            onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); }} 
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm transition-all cursor-pointer ${
              activeTab === 'home' 
                ? 'bg-sky-600 text-white font-semibold shadow-md shadow-sky-950/40' 
                : 'text-slate-300 hover:bg-slate-900 hover:text-white font-medium'
            }`}
          >
            <Home className="w-4 h-4" /> <span>Beranda (Home)</span>
          </button>
          
          <button 
            onClick={() => { setActiveTab('about'); setIsMobileMenuOpen(false); }} 
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm transition-all cursor-pointer ${
              activeTab === 'about' 
                ? 'bg-sky-600 text-white font-semibold shadow-md shadow-sky-950/40' 
                : 'text-slate-300 hover:bg-slate-900 hover:text-white font-medium'
            }`}
          >
            <Info className="w-4 h-4" /> <span>Tentang Kami</span>
          </button>

          <button 
            onClick={() => { setActiveTab('services'); setIsMobileMenuOpen(false); }} 
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm transition-all cursor-pointer ${
              activeTab === 'services' 
                ? 'bg-sky-600 text-white font-semibold shadow-md shadow-sky-950/40' 
                : 'text-slate-300 hover:bg-slate-900 hover:text-white font-medium'
            }`}
          >
            <Wrench className="w-4 h-4" /> <span>Layanan (Services)</span>
          </button>

          <button 
            onClick={() => { setActiveTab('projects'); setIsMobileMenuOpen(false); }} 
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm transition-all cursor-pointer ${
              activeTab === 'projects' 
                ? 'bg-sky-600 text-white font-semibold shadow-md shadow-sky-950/40' 
                : 'text-slate-300 hover:bg-slate-900 hover:text-white font-medium'
            }`}
          >
            <Briefcase className="w-4 h-4" /> <span>Proyek (Projects)</span>
          </button>

          <button 
            onClick={() => { setActiveTab('news'); setIsMobileMenuOpen(false); }} 
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm transition-all cursor-pointer ${
              activeTab === 'news' 
                ? 'bg-sky-600 text-white font-semibold shadow-md shadow-sky-950/40' 
                : 'text-slate-300 hover:bg-slate-900 hover:text-white font-medium'
            }`}
          >
            <Newspaper className="w-4 h-4" /> <span>Berita & Artikel</span>
          </button>

          <button 
            onClick={() => { setActiveTab('contact'); setIsMobileMenuOpen(false); }} 
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm transition-all cursor-pointer ${
              activeTab === 'contact' 
                ? 'bg-sky-600 text-white font-semibold shadow-md shadow-sky-950/40' 
                : 'text-slate-300 hover:bg-slate-900 hover:text-white font-medium'
            }`}
          >
            <Phone className="w-4 h-4" /> <span>Kontak & Perusahaan</span>
          </button>

          <div className="pt-4 mt-4 border-t border-slate-800/80">
            <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Interaksi</p>
            <button 
              onClick={() => { setActiveTab('inbox'); setIsMobileMenuOpen(false); }} 
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm transition-all cursor-pointer ${
                activeTab === 'inbox' 
                  ? 'bg-sky-600 text-white font-semibold shadow-md shadow-sky-950/40' 
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white font-medium'
              }`}
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-4 h-4" />
                <span>Pesan Masuk</span>
              </div>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-bold bg-sky-500 text-white rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="p-4 border-t border-slate-800/80 shrink-0">
          <div className="bg-slate-900 rounded-xl p-3 mb-3 flex items-center gap-3 border border-slate-800/60">
            <div className="w-9 h-9 rounded-lg bg-sky-600/20 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold text-xs shrink-0">
              AD
            </div>
            <div className="overflow-hidden min-w-0">
              <p className="text-xs font-semibold text-white truncate">Administrator</p>
              <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout} 
            className="flex items-center justify-center gap-2 w-full px-3 py-2 text-xs font-semibold text-red-400 hover:text-white hover:bg-red-500/10 rounded-lg transition-all border border-transparent hover:border-red-500/20 cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Keluar dari Sistem
          </button>
        </div>
      </aside>

      {/* Mobile Overlay (Full Screen Menu) */}
      {createPortal(
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-[9998] lg:hidden flex flex-col bg-black/75 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {/* Header bar overlay */}
              <div className="flex items-center justify-between px-5 py-4 shrink-0 border-b border-white/10 bg-transparent">
                <div className="flex items-center gap-3">
                  <img src={logoZiotech} alt="Ziotech CMS" className="h-9 w-auto no-placeholder" />
                  <span className="text-white text-xl font-bold tracking-tight">Ziotech CMS</span>
                </div>
                <button
                  className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Tutup menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Nav items */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, delay: 0.05 }}
                className="flex flex-col w-full h-full pt-4 overflow-y-auto pb-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-6 pb-4 mb-2 border-b border-white/10">
                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/15 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-sky-400" />
                      <span>Buka Website Publik</span>
                    </span>
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                  </a>
                </div>

                {[
                  { id: 'home', label: 'Beranda (Home)', icon: Home },
                  { id: 'about', label: 'Tentang Kami', icon: Info },
                  { id: 'services', label: 'Layanan (Services)', icon: Wrench },
                  { id: 'projects', label: 'Proyek (Projects)', icon: Briefcase },
                  { id: 'news', label: 'Berita & Artikel', icon: Newspaper },
                  { id: 'contact', label: 'Kontak & Perusahaan', icon: Phone },
                  { id: 'inbox', label: 'Pesan Masuk', icon: Inbox }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + idx * 0.05 }}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-6 py-4 text-left text-base transition-colors border-b border-white/5 ${
                        isActive
                          ? 'text-white font-bold bg-white/10'
                          : 'text-slate-400 hover:text-white font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={20} className={isActive ? 'text-sky-400' : 'text-slate-500'} />
                        {item.label}
                      </div>
                      <div className="flex items-center gap-3">
                        {item.id === 'inbox' && unreadCount > 0 && (
                          <span className="px-2 py-0.5 text-xs font-bold bg-sky-500 text-white rounded-full">
                            {unreadCount}
                          </span>
                        )}
                        <ChevronRight size={18} className={isActive ? "text-sky-400" : "text-slate-600"} />
                      </div>
                    </motion.button>
                  );
                })}

                {/* User Info & Logout Button */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + 6 * 0.05 }}
                  className="mt-6 px-6"
                >
                  <div className="bg-slate-900 rounded-xl p-3.5 mb-3 flex items-center gap-3 border border-white/10">
                    <div className="w-9 h-9 rounded-lg bg-sky-600/20 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold text-xs shrink-0">AD</div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-semibold text-white truncate">Administrator</p>
                      <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-400 hover:text-white hover:bg-red-500/20 rounded-xl transition-all border border-red-500/20 text-xs font-semibold"
                  >
                    <LogOut className="w-4 h-4" /> Keluar dari Sistem
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50/70">
        {/* Header */}
        <header className="h-16 lg:h-20 bg-white/95 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-between px-4 lg:px-8 z-30 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Buka navigasi admin"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                <span>Admin CMS</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-slate-700">
                  {activeTab === 'home' && 'Beranda'}
                  {activeTab === 'about' && 'Tentang Kami'}
                  {activeTab === 'services' && 'Layanan'}
                  {activeTab === 'projects' && 'Proyek'}
                  {activeTab === 'news' && 'Berita & Artikel'}
                  {activeTab === 'contact' && 'Kontak & Perusahaan'}
                  {activeTab === 'inbox' && 'Pesan Masuk'}
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-bold text-slate-900 truncate max-w-[200px] sm:max-w-none">
                {activeTab === 'home' && 'Edit Beranda'}
                {activeTab === 'about' && 'Edit Tentang Kami'}
                {activeTab === 'services' && 'Edit Layanan (Services)'}
                {activeTab === 'projects' && 'Edit Portofolio Proyek'}
                {activeTab === 'news' && 'Edit Berita & Artikel'}
                {activeTab === 'contact' && 'Edit Kontak & Profil Perusahaan'}
                {activeTab === 'inbox' && 'Pesan Masuk (Inbox)'}
              </h2>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {activeTab !== 'inbox' ? (
              <button 
                onClick={handleSave} 
                disabled={saving} 
                className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 active:scale-[0.98] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-sm shadow-sky-900/20 disabled:opacity-60 disabled:active:scale-100 disabled:cursor-not-allowed cursor-pointer"
              >
                {saving ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
                ) : (
                  <Save className="w-4 h-4 shrink-0" />
                )}
                <span className="hidden sm:inline">{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
                <span className="sm:hidden">{saving ? '...' : 'Simpan'}</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100/90 border border-slate-200 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Realtime Sync</span>
              </div>
            )}
          </div>
        </header>

        {/* Scrollable Content */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-8 scroll-smooth">
          <div className="max-w-4xl mx-auto pb-20">
            
            <AnimatePresence mode="wait">
              
              {activeTab === 'home' && <HomeTab formData={formData} handleChange={handleChange} handleImageUpload={handleImageUpload} handleHeroTitleChange={handleHeroTitleChange} addHeroTitle={addHeroTitle} removeHeroTitle={removeHeroTitle} handleHomeStatChange={handleHomeStatChange} addHomeStat={addHomeStat} removeHomeStat={removeHomeStat} handleHomePartnerChange={handleHomePartnerChange} addHomePartner={addHomePartner} removeHomePartner={removeHomePartner} />}
              {activeTab === 'about' && <AboutTab formData={formData} handleChange={handleChange} handlePageHeaderChange={handlePageHeaderChange} handleImageUpload={handleImageUpload} handleAboutValueChange={handleAboutValueChange} addAboutValue={addAboutValue} removeAboutValue={removeAboutValue} />}
              {activeTab === 'services' && <ServicesTab formData={formData} handlePageHeaderChange={handlePageHeaderChange} handleImageUpload={handleImageUpload} handleArrayChange={handleArrayChange} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} handleFeaturesChange={handleFeaturesChange} />}
              {activeTab === 'projects' && <ProjectsTab formData={formData} handlePageHeaderChange={handlePageHeaderChange} handleImageUpload={handleImageUpload} handleArrayChange={handleArrayChange} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} />}
              {activeTab === 'news' && <NewsTab formData={formData} handleChange={handleChange} handlePageHeaderChange={handlePageHeaderChange} handleImageUpload={handleImageUpload} handleArrayChange={handleArrayChange} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} toggleNewsFeatured={toggleNewsFeatured} newsSearch={newsSearch} setNewsSearch={setNewsSearch} />}
              {activeTab === 'contact' && <ContactTab formData={formData} handleChange={handleChange} handlePageHeaderChange={handlePageHeaderChange} handleImageUpload={handleImageUpload} handleCompanySocialChange={handleCompanySocialChange} addCompanySocial={addCompanySocial} removeCompanySocial={removeCompanySocial} handleFooterServiceChange={handleFooterServiceChange} addFooterService={addFooterService} removeFooterService={removeFooterService} />}
              {activeTab === 'inbox' && <InboxTab messages={messages} unreadCount={unreadCount} handleMarkMessageStatus={handleMarkMessageStatus} handleDeleteMessage={handleDeleteMessage} />}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        isDestructive={confirmModal.isDestructive}
      />
    </div>
  );
}

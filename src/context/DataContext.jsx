import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase/config';
import { useLanguage } from './LanguageContext';
import { translateContent } from '../services/translator';

const DataContext = createContext();

const defaultData = {

  home: {
    heroTitle: "Keunggulan Rekayasa & Keandalan Infrastruktur Industri",
    heroSubtitle: "PT. Ziotech Global Inovasi hadir sebagai mitra strategis dengan komitmen pada presisi teknik, efisiensi operasional, dan kepatuhan standar K3LH tinggi.",
    heroImages: [
      "https://images.unsplash.com/photo-1541888081695-88562d94821a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    ],
    heroTitles: [
      'Rekayasa Sistem MEP',
      'Konstruksi Sipil & Bangunan',
      'Rantai Pasok Industri & Tambang',
      'Digitalisasi & Otomasi Gedung',
      'Keandalan Operasional'
    ],
    heroInterval: 5000,
    introImageUrl: "",
    introTag: "ENGINEERING EXCELLENCE",
    introBadge: "KOMPETENSI & TATA KELOLA",
    introTitle: "Mewujudkan Keandalan Fasilitas Melalui Presisi dan Tata Kelola Unggul",
    introDescription: "PT. Ziotech Global Inovasi adalah penyedia solusi terpadu di bidang Mechanical, Electrical, & Plumbing (MEP), Konstruksi Bangunan Industri, serta Pengadaan Peralatan Teknis Terpercaya.",
    introDescription2: "Didukung tim insinyur berlisensi, manajemen proyek modern, dan pengawasan mutu berlapis, kami memberikan hasil kerja terstandarisasi yang tepat waktu dan efisien.",
    aboutPreviewImageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    clientPartnersTitle: "Dipercaya Oleh Berbagai Perusahaan Terkemuka",
    clientPartners: [
      { id: 1, name: "PERTAMINA", logo: "" },
      { id: 2, name: "PLN", logo: "" },
      { id: 3, name: "WIKA", logo: "" },
      { id: 4, name: "ANTAM", logo: "" },
      { id: 5, name: "Adhi", logo: "" }
    ],
  },
  about: {
    title: "Tentang PT Ziotech Global Inovasi",
    description: "Didirikan dengan komitmen profesionalisme dan integritas, PT Ziotech Global Inovasi berfokus pada penyediaan solusi engineering, konstruksi terpadu, dan pengadaan komponen industri yang mendukung efisiensi operasional para mitra kerja.",
    vision: "Menjadi mitra rekayasa teknik dan kontraktor pilihan utama di Indonesia yang diakui atas keunggulan mutu, kepatuhan keselamatan kerja, dan integritas kemitraan.",
    mission: "Memberikan layanan engineering berkualitas tinggi sesuai standar teknis, mengedepankan inovasi berkesinambungan, dan menjunjung tinggi aspek K3LH serta tata kelola profesional.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80"
  },
  pageHeaders: {
    about: {
      title: "Tentang Kami",
      subtitle: "Membangun kapabilitas teknik dan pengadaan industri dengan standar keandalan tinggi dan tata kelola berintegritas.",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
    },
    service: {
      title: "Layanan Kami",
      subtitle: "Solusi rekayasa komprehensif yang disesuaikan dengan kebutuhan fasilitas, efisiensi operasional, dan keandalan sistem Anda.",
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
    },
    project: {
      title: "Portofolio Proyek",
      subtitle: "Arsip rekam jejak pekerjaan strategis yang mencerminkan ketepatan eksekusi teknis dan keselamatan kerja.",
      image: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
    },
    contact: {
      title: "Hubungi Kami",
      subtitle: "Tim representatif dan insinyur kami siap mendiskusikan kebutuhan teknis maupun skema kerja sama proyek Anda.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
    }
  },
  services: [
    {
      id: 1,
      title: "Mechanical, Electrical & Plumbing (MEP)",
      description: "Spesialisasi rekayasa dan instalasi sistem mekanikal, distribusi daya elektrikal, tata udara (HVAC), sistem proteksi kebakaran, dan perpipaan terintegrasi.",
      icon: "FiSettings",
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        'Desain dan Instalasi Sistem Tata Udara & HVAC',
        'Pemasangan Distribusi Kelistrikan Gedung & Pabrik',
        'Instalasi Perpipaan Air Bersih, Air Limbah & Utilitas',
        'Sistem Proteksi Kebakaran (Hydrant & Sprinkler)',
        'Audit Energi & Pemeliharaan Preventif Berkala'
      ]
    },
    {
      id: 2,
      title: "Konstruksi Sipil & Bangunan Industri",
      description: "Pembangunan infrastruktur fisik, fasilitas manufaktur, dan sarana komersial dengan perhitungan struktur presisi serta kepatuhan keselamatan kerja tinggi.",
      icon: "FiTruck",
      image: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        'Pembangunan Gedung Komersial & Perkantoran',
        'Konstruksi Hanggar & Fasilitas Pabrik Industri',
        'Pekerjaan Struktur Beton Bertulang & Rangka Baja',
        'Renovasi, Perkuatan Struktur & Fit-Out Gedung',
        'Manajemen Konstruksi & Pengawasan Mutu Proyek'
      ]
    },
    {
      id: 3,
      title: "Suplai & Penunjang Pertambangan",
      description: "Penyediaan komponen teknis, peralatan industri berat, dan material penunjang operasional tambang dengan jaminan keaslian serta rantai pasok andal.",
      icon: "FiTarget",
      image: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        'Pengadaan Suku Cadang Alat Berat & Unit Tambang',
        'Penyediaan Material Consumable Operasional',
        'Pembangunan Fasilitas Penunjang Area Pertambangan',
        'Sistem Distribusi Daya Lapangan Tambang',
        'Instalasi Pemipaan Slurry & Utilitas Industri'
      ]
    },
    {
      id: 4,
      title: "Digitalisasi & Otomasi Gedung",
      description: "Penerapan teknologi otomasi terintegrasi dan sistem monitoring cerdas guna mengoptimalkan konsumsi energi dan keandalan fasilitas modern.",
      icon: "FiCpu",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        'Sistem Otomasi Bangunan (Building Automation System)',
        'Pemantauan Konsumsi Energi Cerdas (Smart Metering)',
        'Digitalisasi Pemeliharaan & Manajemen Aset',
        'Integrasi Akses Kontrol & Keamanan Fasilitas',
        'Implementasi Solusi IoT Industri Terpadu'
      ]
    },
  ],
  projects: [
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
  ],
  company: {
    name: "PT. Ziotech Global Inovasi",
    address: "Jl. Contoh Alamat No. 123, Jakarta, Indonesia",
    phone: "(021) 12345678",
    email: "info@ziotech.co.id",
    workingHours: "Senin - Jumat: 08:00 - 17:00",
    googleMapsEmbedUrl: "",
    logoPath: "",
    socials: [
      { id: 1, platform: 'linkedin', url: 'https://linkedin.com' },
      { id: 2, platform: 'instagram', url: 'https://instagram.com' },
      { id: 3, platform: 'facebook', url: 'https://facebook.com' }
    ],
    footerServices: [
      { id: 1, title: "Mechanical, Electrical & Plumbing (MEP)", url: "/service/1" },
      { id: 2, title: "Konstruksi Sipil & Bangunan Komersial", url: "/service/2" },
      { id: 3, title: "Suplai & Penunjang Pertambangan", url: "/service/3" },
      { id: 4, title: "Digitalisasi & Otomasi Gedung", url: "/service/4" }
    ]
  }
};

export function DataProvider({ children }) {
  const [rawData, setRawData] = useState(defaultData);
  const [translatedData, setTranslatedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { lang } = useLanguage();

  useEffect(() => {
    // Pastikan app id firebase valid sebelum fetching (mencegah error jika .env kosong)
    if (!import.meta.env.VITE_FIREBASE_API_KEY) {
      console.warn("Firebase config not found, using default data.");
      setLoading(false);
      return;
    }

    // Safety timeout: jangan biarkan loading screen menggantung selamanya jika koneksi lambat
    const safetyTimer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    try {
      const dataRef = ref(db, 'content');
      const unsubscribe = onValue(dataRef, (snapshot) => {
        clearTimeout(safetyTimer);
        if (snapshot.exists()) {
          // Merge data from DB with defaultData so we always have structure
          const dbData = snapshot.val();
          
          // Firebase arrays can sometimes become objects if they are sparse.
          // Firebase also stores empty arrays as null.
          // We need to ensure services and projects are always arrays before setting.
          const safeArray = (arr, fallback) => {
            if (arr === null) return [];  // Firebase null = empty array was saved
            if (arr === undefined) return fallback;  // Key doesn't exist, use fallback
            if (Array.isArray(arr)) return arr;
            return Object.values(arr);
          };

          const services = safeArray(dbData.services, defaultData.services).map(svc => {
            // Fallback: jika layanan dari DB tidak punya features/image,
            // isi dari data default berdasarkan id atau title
            const fallback =
              defaultData.services.find(d => String(d.id) === String(svc.id)) ||
              defaultData.services.find(d => d.title === svc.title);
            return {
              ...fallback,
              ...svc,
              featured: Boolean(svc.featured),
              features: (() => {
                const f = svc.features;
                if (!f) return fallback?.features || [];
                if (Array.isArray(f) && f.length > 0) return f;
                if (!Array.isArray(f) && typeof f === 'object') {
                  const arr = Object.values(f).filter(Boolean);
                  return arr.length > 0 ? arr : (fallback?.features || []);
                }
                return fallback?.features || [];
              })(),
              image: svc.image || fallback?.image || ''
            };
          });

          const projects = safeArray(dbData.projects, defaultData.projects).map(proj => {
            const fallback =
              defaultData.projects.find(d => String(d.id) === String(proj.id)) ||
              defaultData.projects.find(d => d.title === proj.title);
            return {
              ...fallback,
              ...proj,
              featured: Boolean(proj.featured),
              image: proj.image || fallback?.image || ''
            };
          });

          // Merge pageHeaders: pastikan setiap halaman punya title/subtitle/image
          const pageHeaders = { ...defaultData.pageHeaders };
          if (dbData.pageHeaders) {
            Object.keys(dbData.pageHeaders).forEach((key) => {
              pageHeaders[key] = { ...(pageHeaders[key] || {}), ...dbData.pageHeaders[key] };
            });
          }

          // Merge home: pastikan field lama tetap dapat nilai default
          const home = { 
            ...defaultData.home, 
            ...(dbData.home || {}),
            clientPartners: safeArray(dbData.home?.clientPartners, defaultData.home.clientPartners)
          };

          // Merge company: pastikan socials dan footerServices selalu berbentuk array aman
          const company = {
            ...defaultData.company,
            ...(dbData.company || {}),
            socials: safeArray(dbData.company?.socials, defaultData.company.socials),
            footerServices: safeArray(dbData.company?.footerServices, defaultData.company.footerServices)
          };

          // Merge about: pastikan nilai default tidak hilang
          const about = {
            ...defaultData.about,
            ...(dbData.about || {})
          };

          setRawData(prev => ({
            ...prev,
            ...dbData,
            home,
            about,
            pageHeaders,
            services,
            projects,
            company
          }));
        } else {
          // Firebase connected tapi node 'content' kosong — pakai defaultData, stop loading
          setRawData(defaultData);
        }
        setLoading(false);
      }, (error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });

      return () => { clearTimeout(safetyTimer); unsubscribe(); };
    } catch (error) {
      console.error("Firebase init error: ", error);
      setLoading(false);
    }
  }, []);

  // When language switches to 'en', dynamically translate Indonesian RTDB content
  const [translating, setTranslating] = useState(false);

  // TRANSLATE_DISABLED: comment out translate trigger until feature is re-enabled
  /* TRANSLATE_DISABLED
  useEffect(() => {
    let cancelled = false;

    if (lang === 'en' && rawData) {
      setTranslating(true);
      translateContent(rawData, 'en')
        .then((translated) => {
          if (!cancelled) {
            setTranslatedData(translated);
            setTranslating(false);
          }
        })
        .catch((err) => {
          console.warn('Translation error:', err);
          if (!cancelled) setTranslating(false);
        });
    } else {
      setTranslatedData(null);
      setTranslating(false);
    }

    return () => {
      cancelled = true;
    };
  }, [lang, rawData]);
  */

  // TRANSLATE_DISABLED: always use rawData until translate feature is re-enabled
  const activeData = rawData;

  return (
    <DataContext.Provider value={{ data: activeData, rawData, loading, translating }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}

export { defaultData };
import { createContext, useContext, useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase/config';

const DataContext = createContext();

const defaultData = {
  home: {
    heroTitle: "Solusi Cerdas untuk Infrastruktur & Industri Anda",
    heroSubtitle: "PT. Ziotech Global Inovasi hadir sebagai mitra strategis dengan komitmen pada kualitas, efisiensi, dan inovasi berkelanjutan khususnya di spesialisasi Mechanical, Eletrical & Plumbing (MEP).",
    heroImages: [
      "https://images.unsplash.com/photo-1541888081695-88562d94821a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    ],
    heroTitles: [
      'Spesialisasi MEP',
      'Konstruksi & Infrastruktur',
      'Sektor Pertambangan',
      'Solusi Digitalisasi',
      'Inovasi Berkelanjutan'
    ],
    heroInterval: 5000,
    aboutPreviewImageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  about: {
    title: "Tentang PT Ziotech Global Inovasi",
    description: "Didirikan dengan semangat profesionalisme dan integritas, PT Ziotech Global Inovasi berfokus pada penyediaan layanan dan produk yang mampu meningkatkan produktivitas serta memberikan nilai tambah bagi setiap klien.",
    vision: "Menjadi perusahaan terdepan dan mitra pilihan utama di bidang konstruksi, infrastruktur, dan teknologi di Indonesia.",
    mission: "Memberikan layanan berkualitas tinggi, berinovasi secara berkelanjutan, dan menjunjung tinggi profesionalisme serta integritas dalam setiap proyek.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80"
  },
  pageHeaders: {
    about: {
      title: "Tentang Kami",
      subtitle: "Mengenal lebih dekat PT Ziotech Global Inovasi, visi, misi, dan nilai-nilai perusahaan.",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
    },
    service: {
      title: "Layanan Kami",
      subtitle: "Solusi komprehensif yang disesuaikan dengan kebutuhan spesifik industri dan bisnis Anda.",
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
    },
    project: {
      title: "Portofolio Proyek",
      subtitle: "Bukti nyata komitmen kami dalam memberikan hasil karya terbaik di berbagai sektor industri.",
      image: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
    },
    contact: {
      title: "Hubungi Kami",
      subtitle: "Tim profesional kami siap membantu dan mendiskusikan kebutuhan proyek Anda.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
    }
  },
  services: [
    {
      id: 1,
      title: "Mechanical, Electrical & Plumbing (MEP)",
      description: "Layanan spesialis instalasi dan pemeliharaan sistem mekanikal, elektrikal, dan pemipaan untuk bangunan.",
      icon: "FiSettings",
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        'Desain dan Instalasi Sistem HVAC',
        'Pemasangan Sistem Kelistrikan Industri & Gedung',
        'Instalasi Pipa Air Bersih dan Air Kotor',
        'Sistem Proteksi Kebakaran (Fire Fighting)',
        'Pemeliharaan dan Perawatan Rutin'
      ]
    },
    {
      id: 2,
      title: "Konstruksi & Infrastruktur",
      description: "Pembangunan infrastruktur fisik yang handal dan berkualitas tinggi.",
      icon: "FiTruck",
      image: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        'Pembangunan Gedung Komersial',
        'Konstruksi Fasilitas Industri',
        'Pengembangan Infrastruktur Jalan',
        'Renovasi dan Perbaikan Struktur',
        'Manajemen Proyek Konstruksi'
      ]
    },
    {
      id: 3,
      title: "Pertambangan",
      description: "Solusi pendukung operasional dan infrastruktur sektor pertambangan.",
      icon: "FiTarget",
      image: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        'Suplai Sparepart Alat Berat',
        'Penyediaan Consumable Barang Tambang',
        'Pembangunan Fasilitas Penunjang Tambang',
        'Sistem Kelistrikan Area Tambang',
        'Instalasi Pemipaan Industri Tambang'
      ]
    },
    {
      id: 4,
      title: "Digitalisasi & Teknologi",
      description: "Solusi teknologi untuk meningkatkan efisiensi dan operasional bisnis.",
      icon: "FiCpu",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        'Sistem Otomasi Gedung (BMS)',
        'Pemantauan Energi Cerdas',
        'Digitalisasi Manajemen Aset',
        'Sistem Keamanan Terintegrasi',
        'IoT untuk Industri'
      ]
    },
  ],
  company: {
    name: "PT. Ziotech Global Inovasi",
    address: "Jl. Contoh Alamat No. 123, Jakarta, Indonesia",
    phone: "(021) 12345678",
    email: "info@ziotech.co.id",
    logoPath: ""
  },
  projects: [
    { id: 1, title: 'Instalasi MEP Gedung Perkantoran 20 Lantai', category: 'MEP', location: 'Jakarta Pusat', year: '2025', client: 'PT Maju Bersama', description: 'Pengerjaan sistem mekanikal, elektrikal, dan plumbing komprehensif untuk gedung perkantoran Grade A.', image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 2, title: 'Konstruksi Pabrik Manufaktur', category: 'Konstruksi', location: 'Cikarang, Bekasi', year: '2024', client: 'PT Industri Global', description: 'Pembangunan struktur utama dan fasilitas penunjang pabrik seluas 2 hektar.', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 3, title: 'Suplai Infrastruktur Tambang Nikel', category: 'Pertambangan', location: 'Morowali, Sulawesi Tengah', year: '2025', client: 'PT Tambang Sejahtera', description: 'Penyediaan dan instalasi sistem perpipaan industri dan kelistrikan area tambang.', image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 4, title: 'Implementasi Building Management System (BMS)', category: 'Digitalisasi', location: 'Surabaya', year: '2024', client: 'Hotel Bintang 5', description: 'Modernisasi sistem kontrol gedung untuk efisiensi energi dan kenyamanan tamu.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 5, title: 'Sistem Proteksi Kebakaran Gudang Logistik', category: 'MEP', location: 'Tangerang', year: '2026', client: 'Logistik Nusantara', description: 'Instalasi hydrant, sprinkler, dan fire alarm system terintegrasi.', image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 6, title: 'Infrastruktur Jalan Tambang Batubara', category: 'Konstruksi', location: 'Kalimantan Timur', year: '2025', client: 'PT Energi Bumi', description: 'Pembangunan dan perkuatan jalan angkut (hauling road) sepanjang 15 KM.', image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
  ]
};

export function DataProvider({ children }) {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pastikan app id firebase valid sebelum fetching (mencegah error jika .env kosong)
    if (!import.meta.env.VITE_FIREBASE_API_KEY) {
      console.warn("Firebase config not found, using default data.");
      setLoading(false);
      return;
    }

    try {
      const dataRef = ref(db, 'content');
      const unsubscribe = onValue(dataRef, (snapshot) => {
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
              features: (svc.features && svc.features.length > 0)
                ? svc.features
                : (fallback?.features || []),
              image: svc.image || fallback?.image || ''
            };
          });

          const projects = safeArray(dbData.projects, defaultData.projects).map(proj => {
            const fallback =
              defaultData.projects.find(d => String(d.id) === String(proj.id)) ||
              defaultData.projects.find(d => d.title === proj.title);
            return { ...fallback, ...proj, image: proj.image || fallback?.image || '' };
          });

          // Merge pageHeaders: pastikan setiap halaman punya title/subtitle/image
          const pageHeaders = { ...defaultData.pageHeaders };
          if (dbData.pageHeaders) {
            Object.keys(dbData.pageHeaders).forEach((key) => {
              pageHeaders[key] = { ...(pageHeaders[key] || {}), ...dbData.pageHeaders[key] };
            });
          }

          // Merge home: pastikan field lama tetap dapat nilai default
          const home = { ...defaultData.home, ...(dbData.home || {}) };

          setData(prev => ({
            ...prev,
            ...dbData,
            home,
            pageHeaders,
            services,
            projects
          }));
        }
        setLoading(false);
      }, (error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Firebase init error: ", error);
      setLoading(false);
    }
  }, []);

  return (
    <DataContext.Provider value={{ data, loading }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
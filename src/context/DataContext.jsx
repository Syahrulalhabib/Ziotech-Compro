import { createContext, useContext, useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase/config';

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
    aboutSectionBadge: "TENTANG PERUSAHAAN",
    aboutSectionTitle: "Mitra Rekayasa Teknik & Solusi Industri Terpercaya",
    aboutSectionDescription: "PT. Ziotech Global Inovasi adalah penyedia solusi terpadu di bidang Mechanical, Electrical, & Plumbing (MEP), Konstruksi Bangunan Industri, serta Pengadaan Peralatan Teknis Terpercaya.",
    aboutSectionDescription2: "Didukung tim insinyur berlisensi, manajemen proyek modern, dan pengawasan mutu berlapis, kami memberikan hasil kerja terstandarisasi yang tepat waktu dan efisien.",
    quickFactsBadge: "KREDIBILITAS & PERFORMA",
    quickFactsTitle: "Kinerja Terpercaya untuk Kebutuhan Industri",
    quickFactsSubtitle: "Kapasitas teknis yang teruji melalui ragam proyek strategis dan kemitraan berkelanjutan bersama para klien industri terkemuka.",
    stats: [
      {
        id: 1,
        category: "PENGALAMAN LAPANGAN",
        value: "10+",
        unit: "Tahun",
        label: "Dedikasi melayani sektor infrastruktur dan industri nasional secara konsisten"
      },
      {
        id: 2,
        category: "PORTOFOLIO PEKERJAAN",
        value: "50+",
        unit: "Proyek Selesai",
        label: "Penyelesaian tepat waktu dengan pemenuhan standar mutu dan keselamatan kerja"
      },
      {
        id: 3,
        category: "RETENSI KLIEN",
        value: "99%",
        unit: "Kepuasan Klien",
        label: "Kemitraan berulang yang didasari pada kejelasan komunikasi dan keandalan hasil kerja"
      },
      {
        id: 4,
        category: "KOMPETENSI TEKNIS",
        value: "30+",
        unit: "Tenaga Profesional",
        label: "Tim rekayasa dan teknisi berlisensi keahlian resmi di bidangnya"
      }
    ],
    ourFocusBadge: "PILAR UTAMA",
    ourFocusTitle: "Spesialisasi dan Ruang Lingkup Kerja",
    serviceBadge: "KOMPETENSI UTAMA",
    serviceTitle: "Solusi Rekayasa Terpadu untuk Kebutuhan Industri",
    serviceSubtitle: "Spektrum layanan komprehensif mulai dari rancang bangun, instalasi mekanikal-elektrikal, hingga suplai suku cadang industri berstandar internasional.",
    portfolioBadge: "REKAM JEJAK",
    portfolioTitle: "Portofolio Proyek Unggulan",
    portfolioSubtitle: "Dokumentasi hasil pengerjaan proyek strategis di berbagai fasilitas komersial, pabrik industri, dan infrastruktur penunjang.",
    newsBadge: "RUANG BERITA & INFORMASI",
    newsTitle: "Berita & Informasi Terkini",
    newsSubtitle: "Dapatkan pembaruan siaran pers, liputan kegiatan operasional, dan inisiatif keberlanjutan perusahaan.",
    clientPartnersBadge: "KEMITRAAN STRATEGIS",
    clientPartnersTitle: "Dipercaya Oleh Berbagai Perusahaan Terkemuka",
    clientPartners: [
      { id: 1, name: "PERTAMINA", logo: "" },
      { id: 2, name: "PLN", logo: "" },
      { id: 3, name: "WIKA", logo: "" },
      { id: 4, name: "ANTAM", logo: "" },
      { id: 5, name: "Adhi", logo: "" }
    ],
    ctaBadge: "KONSULTASI PROYEK",
    ctaTitle: "Siap Berkolaborasi untuk Mewujudkan Efisiensi Fasilitas Industri Anda?",
    ctaSubtitle: "Konsultasikan rancangan teknis, pengadaan suku cadang, maupun eksekusi konstruksi bersama tim spesialis kami.",
    ctaButton: "Hubungi Sekarang",
    ctaBgImageUrl: "",
  },
  about: {
    heroBadge: "PROFIL KORPORASI",
    badge: "SIAPA KAMI",
    mainTitle: "Dedikasi Menghadirkan Rekayasa Teknik Berstandar Tinggi",
    title: "Tentang PT Ziotech Global Inovasi",
    description: "Didirikan dengan komitmen profesionalisme dan integritas, PT Ziotech Global Inovasi berfokus pada penyediaan solusi engineering, konstruksi terpadu, dan pengadaan komponen industri yang mendukung efisiensi operasional para mitra kerja.",
    experienceYears: "10+",
    experienceLabel: "Tahun Pengalaman Kerja",
    visionTitle: "Visi Perusahaan",
    vision: "Menjadi mitra rekayasa teknik dan kontraktor pilihan utama di Indonesia yang diakui atas keunggulan mutu, kepatuhan keselamatan kerja, dan integritas kemitraan.",
    missionTitle: "Misi Perusahaan",
    mission: "Memberikan layanan engineering berkualitas tinggi sesuai standar teknis, mengedepankan inovasi berkesinambungan, dan menjunjung tinggi aspek K3LH serta tata kelola profesional.",
    valuesBadge: "NILAI INTI KAMI",
    valuesTitle: "Prinsip Kerja & Integritas Profesional",
    valuesSubtitle: "Landasan fundamental yang memandu setiap rekayasa teknis, pengambilan keputusan, dan komitmen kemitraan kami.",
    values: [
      {
        id: 1,
        title: "Integritas & Akuntabilitas",
        desc: "Menjaga transparansi, keterbukaan informasi, dan tanggung jawab penuh dalam setiap amanah proyek yang dipercayakan."
      },
      {
        id: 2,
        title: "Kualitas Tanpa Kompromi",
        desc: "Menerapkan kendali mutu (quality control) berlapis sejak tahap perencanaan, pengadaan material, hingga komisioning akhir."
      },
      {
        id: 3,
        title: "Inovasi & Efisiensi",
        desc: "Mengadopsi metode rekayasa modern dan efisiensi rantai pasok guna menghasilkan solusi terbaik dan berdaya saing tinggi."
      },
      {
        id: 4,
        title: "Kemitraan Berkelanjutan",
        desc: "Membangun relasi jangka panjang berbasis saling percaya, sinergi konstruktif, dan pencapaian tujuan bersama."
      }
    ],
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80"
  },
  pageHeaders: {
    about: {
      badge: "PROFIL KORPORASI",
      title: "Tentang Kami",
      subtitle: "Membangun kapabilitas teknik dan pengadaan industri dengan standar keandalan tinggi dan tata kelola berintegritas.",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
    },
    service: {
      badge: "KOMPETENSI & LAYANAN",
      title: "Layanan Kami",
      subtitle: "Solusi rekayasa komprehensif yang disesuaikan dengan kebutuhan fasilitas, efisiensi operasional, dan keandalan sistem Anda.",
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
    },
    project: {
      badge: "REKAM JEJAK & EKSEKUSI",
      title: "Portofolio Proyek",
      subtitle: "Arsip rekam jejak pekerjaan strategis yang mencerminkan ketepatan eksekusi teknis dan keselamatan kerja.",
      image: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
    },
    contact: {
      badge: "KOMUNIKASI KORPORASI",
      title: "Hubungi Kami",
      subtitle: "Tim representatif dan insinyur kami siap mendiskusikan kebutuhan teknis maupun skema kerja sama proyek Anda.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
    },
    news: {
      badge: "BERITA & PUBLIKASI",
      title: "Ruang Berita & Publikasi",
      subtitle: "Siaran pers terkini, publikasi majalah, serta liputan kegiatan operasional perusahaan.",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
    }
  },
  contactSettings: {
    badge: "HUBUNGI KAMI",
    title: "Diskusikan Kebutuhan Proyek Anda",
    subtitle: "Tim kami siap berdiskusi dan memberikan solusi rekayasa terbaik untuk kelancaran operasional fasilitas Anda.",
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
  news: [
    {
      id: 1,
      type: "News",
      category: "Press Release",
      title: "Kolaborasi Pertamina dan ITDC rangkul komunitas serta penggemar motorsport dalam rangkaian Road to Pertamina Grand Prix of Indonesia 2026",
      date: "20 September 2026",
      author: "Corporate Communication",
      excerpt: "PT Ziotech bersama ITDC dan Pertamina memperkuat sinergi dengan merangkul komunitas motorsport nasional jelang perhelatan akbar internasional di Mandalika.",
      content: "Menyambut perhelatan balap motor internasional kasta tertinggi Pertamina Grand Prix of Indonesia 2026 di Pertamina Mandalika International Circuit, kolaborasi lintas sektor terus diperkuat bersama komunitas motorsport dan pemangku kepentingan industri nasional.\n\nMelalui sinergi terintegrasi antara Pertamina, ITDC, dan mitra rekayasa fasilitas PT Ziotech Global Inovasi, berbagai persiapan fasilitas paddock, keandalan sistem kelistrikan berdaya tinggi (MEP), serta penataan infrastruktur utilitas berstandar K3LH tinggi telah dipersiapkan secara maksimal.\n\nInisiatif ini dirancang bukan semata sebagai ajang adu kecepatan balap dunia, melainkan ekosistem terpadu yang memicu pertumbuhan ekonomi masyarakat lokal, optimalisasi pariwisata terpadu Nusa Tenggara Barat, dan unjuk kebolehan talenta rekayasa engineering anak bangsa di hadapan komunitas internasional.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      featured: true
    },
    {
      id: 2,
      type: "News",
      category: "Press Release",
      title: "Pertamina Mandalika Racing Series, Wadah Ekosistem Motorsport Nasional Menuju Panggung Dunia",
      date: "20 September 2026",
      author: "Media Relations",
      excerpt: "Ajang Mandalika Racing Series menjadi platform strategis pembinaan talenta pembalap muda dan pengujian performa teknologi sirkuit berkelas internasional.",
      content: "Kejuaraan Pertamina Mandalika Racing Series kembali digelar dengan partisipasi ratusan pembalap muda dari berbagai penjuru tanah air. Seri kejuaraan ini menjadi tonggak penting dalam pembinaan berjenjang atlet balap motor Indonesia menuju panggung kompetisi global.\n\nDidukung oleh infrastruktur sirkuit berstandar FIM Grade A, keandalan sistem timing dan kelistrikan tanpa henti menjadi faktor kunci suksesnya penyelenggaraan.",
      image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: 3,
      type: "News",
      category: "Press Release",
      title: "Road to Pertamina Eco RunFest 2026: Mengajak Masyarakat Wujudkan Aksi Nyata Jaga Lingkungan",
      date: "20 September 2026",
      author: "CSR & Sustainability",
      excerpt: "Gerakan kepedulian lingkungan bertajuk Eco RunFest 2026 melibatkan ribuan partisipan dalam aksi bersih sampah dan kampanye pengurangan jejak karbon.",
      content: "Menjelang puncak festival tahunan pelestarian lingkungan, Road to Pertamina Eco RunFest 2026 mengajak seluruh lapisan masyarakat untuk berperan aktif dalam program pemilahan sampah, daur ulang material plastik sirkular, dan penghijauan ruang terbuka publik.\n\nDengan mengusung konsep Zero Waste to Landfill, seluruh sampah botol kemasan dan material plastik yang terkumpul dikonversi menjadi energi alternatif dan produk bernilai guna bagi masyarakat sekitar.",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: 4,
      type: "News",
      category: "Press Release",
      title: "Raih Posisi Puncak Fortune Indonesia 100 Gala 2026, Bukti Kinerja Pertamina di antara Perusahaan Tanah Air",
      date: "19 September 2026",
      author: "Corporate Secretary",
      excerpt: "Penghargaan bergengsi Fortune Indonesia 100 diraih atas pertumbuhan laba solid, efisiensi operasional, dan kepemimpinan transisi energi nasional.",
      content: "Komitmen konsisten dalam mempertahankan efisiensi operasional dan keandalan tata kelola mengantarkan perseroan meraih predikat teratas pada malam penganugerahan bergengsi Fortune Indonesia 100 Gala 2026.\n\nDewan juri menggarisbawahi keunggulan manajemen risiko, implementasi tata kelola berkelanjutan (ESG), dan ketahanan finansial di tengah dinamika pasar energi industri sebagai penentu pencapaian ini.",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: 5,
      type: "News",
      category: "Press Release",
      title: "Bawa Misi Kemanusiaan Saat Bencana lewat Media Sosial, Komunikasi Digital Pertamina Raih Penghargaan IABC 2026",
      date: "19 September 2026",
      author: "Public Relations",
      excerpt: "Inisiatif pemanfaatan kanal komunikasi digital dalam tanggap darurat bencana meraih apresiasi bergengsi tingkat internasional dari IABC.",
      content: "Keberhasilan kampanye penyaluran bantuan kemanusiaan serta transparansi pelaporan penanggulangan darurat bencana melalui ekosistem digital media sosial dinobatkan sebagai kampanye komunikasi publik terbaik oleh International Association of Business Communicators (IABC) 2026.\n\nKecepatan informasi real-time dan akurasi titik distribusi bantuan energi serta logistik medis menjadi penopang utama efektivitas aksi tanggap darurat bagi masyarakat terdampak.",
      image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: 6,
      type: "News",
      category: "CSR News",
      title: "Pemberdayaan UMKM Binaan dan Elektrifikasi Panel Surya Mandiri di Kawasan Pesisir",
      date: "15 September 2026",
      author: "CSR Ziotech",
      excerpt: "Pemasangan instalasi sistem solar cell mandiri untuk sentra nelayan lokal mendorong peningkatan produktivitas cold storage dan penurunan biaya energi.",
      content: "Sebagai bagian dari program Tanggung Jawab Sosial dan Lingkungan (TJSL), program elektrifikasi energi terbarukan berbasis panel surya mandiri telah berhasil diserahterimakan kepada koperasi nelayan pesisir.\n\nInstalasi yang dikerjakan oleh tim rekayasa teknik ini mampu menyuplai daya listrik berkelanjutan untuk fasilitas pendingin ikan, menjaga kesegaran hasil tangkapan tanpa ketergantungan diesel fosil.",
      image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false
    },
    {
      id: 7,
      type: "News",
      category: "Energia News",
      title: "Inovasi Efisiensi Distribusi Daya Listrik pada Fasilitas Kilang Petrokimia",
      date: "10 September 2026",
      author: "Divisi Rekayasa Teknik",
      excerpt: "Penerapan sistem otomasi transformator pintar dan audit termal berkala memangkas konsumsi rugi-rugi transmisi industri hingga 18%.",
      content: "Efisiensi energi pada industri padat modal membutuhkan pengawasan presisi tinggi pada jaringan utilitas. Penerapan teknologi pemantauan termal inframerah dan otomasi gardu distribusi listrik terbukti mampu mencegah downtime tak terencana sekaligus menekan emisi gas buang secara signifikan.",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false
    },
    {
      id: 8,
      type: "Magazine",
      category: "Energia Magazine",
      title: "Majalah Energia Edisi Q3 2026: Transformasi Digital & Keberlanjutan Infrastruktur Nasional",
      date: "01 September 2026",
      author: "Redaksi Majalah",
      excerpt: "Simak ulasan mendalam mengenai masa depan integrasi IoT di industri MEP, tata kelola K3LH, dan wawancara eksklusif bersama para pakar rekayasa.",
      content: "Edisi terkini Majalah Energia membedah peta jalan transformasi dekarbonisasi industri konstruksi dan MEP di Asia Tenggara. Dilengkapi studi kasus implementasi sensor prediktif getaran turbin, panduan standar efisiensi energi gedung hijau (Green Building), serta infografis mendalam. Unduh edisi digital lengkap untuk wawasan komprehensif.",
      image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false
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
  const [rawData, setRawData] = useState(null);
  const [loading, setLoading] = useState(() => Boolean(import.meta.env.VITE_FIREBASE_API_KEY));

  useEffect(() => {
    // Pastikan app id firebase valid sebelum fetching (mencegah error jika .env kosong)
    if (!import.meta.env.VITE_FIREBASE_API_KEY) {
      console.warn("Firebase config not found, using default data.");
      setRawData(defaultData);
      setLoading(false);
      return;
    }

    // Safety timeout: jangan biarkan loading screen menggantung selamanya jika koneksi lambat
    const safetyTimer = setTimeout(() => {
      setRawData((current) => current || defaultData);
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
              image: (svc.image !== undefined && svc.image !== null) ? svc.image : (fallback?.image || '')
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
              image: (proj.image !== undefined && proj.image !== null) ? proj.image : (fallback?.image || '')
            };
          });

          const news = safeArray(dbData.news, defaultData.news).map(item => {
            const fallback =
              defaultData.news.find(d => String(d.id) === String(item.id)) ||
              defaultData.news.find(d => d.title === item.title);
            return {
              ...fallback,
              ...item,
              featured: Boolean(item.featured),
              image: (item.image !== undefined && item.image !== null) ? item.image : (fallback?.image || '')
            };
          });

          // Merge pageHeaders: pastikan setiap halaman punya title/subtitle/image
          const pageHeaders = { ...defaultData.pageHeaders };
          if (dbData.pageHeaders) {
            Object.keys(dbData.pageHeaders).forEach((key) => {
              pageHeaders[key] = { ...(pageHeaders[key] || {}), ...dbData.pageHeaders[key] };
            });
          }

          // Merge home: jika admin pernah menyimpan home, jangan paksakan default mitra lama
          const hasSavedHome = Boolean(dbData.home);
          const home = { 
            ...defaultData.home, 
            ...(dbData.home || {}),
            heroTitles: safeArray(dbData.home?.heroTitles, defaultData.home.heroTitles),
            heroImages: safeArray(dbData.home?.heroImages, defaultData.home.heroImages),
            clientPartners: safeArray(dbData.home?.clientPartners, hasSavedHome ? [] : defaultData.home.clientPartners),
            stats: safeArray(dbData.home?.stats, defaultData.home.stats)
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
            ...(dbData.about || {}),
            values: safeArray(dbData.about?.values, defaultData.about.values)
          };

          const contactSettings = {
            ...defaultData.contactSettings,
            ...(dbData.contactSettings || {})
          };

          setRawData({
            ...defaultData,
            ...dbData,
            home,
            about,
            pageHeaders,
            services,
            projects,
            news,
            company,
            contactSettings
          });
        } else {
          // Firebase connected tapi node 'content' kosong — pakai defaultData, stop loading
          setRawData(defaultData);
        }
        setLoading(false);
      }, (error) => {
        console.error("Error fetching data: ", error);
        setRawData((current) => current || defaultData);
        setLoading(false);
      });

      return () => { clearTimeout(safetyTimer); unsubscribe(); };
    } catch (error) {
      console.error("Firebase init error: ", error);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRawData(defaultData);
      setLoading(false);
    }
  }, []);

  return (
    <DataContext.Provider value={{ data: rawData || defaultData, rawData, loading }}>
      {children}
    </DataContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useData() {
  return useContext(DataContext);
}

// eslint-disable-next-line react-refresh/only-export-components
export { defaultData };
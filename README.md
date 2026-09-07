# PT Ziotech Global Inovasi — Company Profile

Website company profile untuk PT Ziotech Global Inovasi — perusahaan yang bergerak di bidang konstruksi, pertambangan, komersil, infrastruktur, penjualan consumable industri, dan solusi teknologi digitalisasi dengan spesialisasi Mechanical, Electrical & Plumbing (MEP).

## Fitur

- Halaman publik: Home, About Us, Services, Projects, Contact
- Halaman admin (CMS) untuk mengelola seluruh konten website (teks, gambar, layanan, proyek, kontak)
- Firebase Realtime Database sebagai penyimpanan konten dengan sinkronisasi real-time
- Animasi profesional menggunakan Framer Motion
- Desain responsif untuk desktop, tablet, dan mobile

## Tech Stack

| Teknologi | Deskripsi |
|---|---|
| [React 19](https://react.dev) | UI Library |
| [Vite 8](https://vitejs.dev) | Build tool & dev server |
| [React Router v7](https://reactrouter.com) | Routing |
| [Firebase RTDB](https://firebase.google.com/docs/database) | Realtime Database |
| [Tailwind CSS v4](https://tailwindcss.com) | Styling |
| [Framer Motion](https://motion.dev) | Animasi |
| [Lucide React](https://lucide.dev) | Icons |

## Instalasi

```bash
# 1. Clone repository
git clone <repo-url>
cd Compro

# 2. Install dependencies
npm install

# 3. Setup environment
copy .env.example .env
# Lalu isi .env dengan kredensial Firebase Anda

# 4. Jalankan development server
npm run dev
```

Buka http://localhost:5173

## Struktur Project

```
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/            # Logo & gambar statis
│   ├── components/
│   │   └── Layout.jsx     # Navbar & Footer
│   ├── context/
│   │   └── DataContext.jsx # Firebase data provider (real-time sync)
│   ├── firebase/
│   │   └── config.js      # Inisialisasi Firebase
│   ├── pages/
│   │   ├── Home.jsx       # Beranda
│   │   ├── About.jsx      # Tentang kami
│   │   ├── Service.jsx    # Layanan
│   │   ├── Project.jsx    # Portofolio proyek
│   │   ├── Contact.jsx    # Kontak
│   │   └── admin/
│   │       ├── Login.jsx      # Login admin
│   │       └── Dashboard.jsx  # CMS dashboard
│   ├── App.jsx            # Router setup
│   ├── index.css          # Tailwind & tema
│   └── main.jsx
├── database.rules.json    # Firebase security rules
├── .env.example           # Template environment variables
└── vite.config.js
```

## Halaman Admin

Akses halaman admin di `/admin/login`:

- Login menggunakan Firebase Authentication (Email/Password)
- Setelah login, kelola konten di `/admin/dashboard`:
  - **Home**: Hero, stats, highlight section
  - **About**: Visi, misi, sejarah perusahaan
  - **Services**: Tambah/hapus/edit layanan beserta ruang lingkup dan gambarnya
  - **Projects**: Tambah/hapus/edit portofolio proyek
  - **Contact**: Informasi kontak, alamat, jam operasional

## Setup Firebase

1. Buat project di [Firebase Console](https://console.firebase.google.com)
2. Aktifkan Realtime Database dan Authentication (Email/Password)
3. Salin konfigurasi web Firebase ke file `.env` (lihat `.env.example`)
4. Deploy security rules dari `database.rules.json`
5. Buat user admin di Firebase Authentication

## Scripts

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Build production ke `dist/` |
| `npm run preview` | Preview hasil build |

## License

Copyright 2026 PT Ziotech Global Inovasi. All rights reserved.
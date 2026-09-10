import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import logo from '../assets/ziotech.png';

const renderSocialIcon = (platform) => {
  const p = (platform || '').toLowerCase();
  if (p === 'linkedin') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
      </svg>
    );
  }
  if (p === 'instagram') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    );
  }
  if (p === 'facebook') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    );
  }
  if (p === 'twitter' || p === 'x') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
      </svg>
    );
  }
  if (p === 'youtube') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><polygon points="10 15 15 12 10 9 10 15"/>
      </svg>
    );
  }
  if (p === 'tiktok') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
      </svg>
    );
  }
  return <Globe className="w-5 h-5" />;
};

export default function Footer() {
  const { data } = useData();
  const { t } = useLanguage();

  const company = {
    name: data?.company?.name || 'PT Ziotech Global Inovasi',
    address: data?.company?.address || 'Jl. Contoh Alamat No. 123, Jakarta, Indonesia',
    phone: data?.company?.phone || '+62 812 3456 7890',
    email: data?.company?.email || 'info@ziotech.co.id',
    socials: data?.company?.socials || [
      { id: 1, platform: 'linkedin', url: 'https://linkedin.com' },
      { id: 2, platform: 'instagram', url: 'https://instagram.com' },
      { id: 3, platform: 'youtube', url: 'https://youtube.com' },
    ]
  };
  const socials = company.socials || [];
  const navLinks = [
    { name: t?.nav?.home || 'Beranda', path: '/' },
    { name: t?.nav?.about || 'Tentang Kami', path: '/about' },
    { name: t?.nav?.service || 'Layanan', path: '/service' },
    { name: t?.nav?.project || 'Proyek', path: '/project' },
    { name: t?.nav?.contact || 'Kontak', path: '/contact' },
  ];
  // Ambil dari CMS (company.footerServices) yang bisa diatur admin.
  // Fallback ke data.services (5 teratas) jika belum dikonfigurasi admin.
  const rawFooterServices = Array.isArray(data?.company?.footerServices) && data.company.footerServices.length > 0
    ? data.company.footerServices
    : (Array.isArray(data?.services) ? data.services : []).slice(0, 5).map(s => ({
        id: s.id,
        title: s.title,
        url: `/service/${s.id}`
      }));

  const serviceLinks = rawFooterServices.map(item => ({
    name: item.title,
    path: item.url || `/service/${item.id || 1}`,
    isExternal: (item.url || '').startsWith('http://') || (item.url || '').startsWith('https://')
  }));
  return (
    <footer className="bg-[#0f172a] text-slate-400 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 py-14 sm:py-16 border-b border-slate-800/60">
          <div className="sm:col-span-2 lg:col-span-4 flex flex-col gap-5">
            <Link to="/" className="inline-block">
              <img src={logo} alt={company.name} className="h-9 sm:h-10 w-auto" />
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              {t?.common?.footerAbout || 'Mitra strategis untuk sektor industri dan infrastruktur dengan komitmen pada kualitas, efisiensi, dan inovasi berkelanjutan.'}
            </p>
            {socials.length > 0 && (
              <div className="flex items-center gap-2.5">
                {socials.map((item, idx) => (
                  <a key={item.id || idx} href={item.url || '#'} target="_blank" rel="noopener noreferrer" aria-label={item.platform}
                    className="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0284c7] hover:border-[#0284c7] transition-all duration-200">
                    {renderSocialIcon(item.platform)}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-bold tracking-widest text-[#38bdf8] uppercase mb-5">
              {t?.common?.quickLinks || 'Navigasi'}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-[#38bdf8] transition-colors shrink-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-bold tracking-widest text-[#38bdf8] uppercase mb-5">
              {t?.common?.ourServices || 'Layanan'}
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link, idx) => (
                <li key={idx}>
                  {link.isExternal ? (
                    <a 
                      href={link.path} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-[#38bdf8] transition-colors shrink-0" />
                      <span>{link.name}</span>
                    </a>
                  ) : (
                    <Link 
                      to={link.path} 
                      className="text-sm text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-[#38bdf8] transition-colors shrink-0" />
                      <span>{link.name}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-bold tracking-widest text-[#38bdf8] uppercase mb-5">
              {t?.common?.contactInfo || 'Kontak'}
            </h3>
            <ul className="space-y-3.5">
              <li>
                <a href={`tel:${company.phone}`} className="flex items-start gap-2.5 text-sm text-slate-400 hover:text-white transition-colors group">
                  <Phone size={15} className="text-slate-500 group-hover:text-[#38bdf8] shrink-0 mt-0.5 transition-colors" />
                  <span>{company.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="flex items-start gap-2.5 text-sm text-slate-400 hover:text-white transition-colors group">
                  <Mail size={15} className="text-slate-500 group-hover:text-[#38bdf8] shrink-0 mt-0.5 transition-colors" />
                  <span className="break-all">{company.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-slate-400">
                <MapPin size={15} className="text-slate-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{company.address}</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-600">
          <p>&copy; {new Date().getFullYear()} {company.name}. {t?.common?.rightsReserved || 'Hak Cipta Dilindungi.'}</p>
        </div>

      </div>
    </footer>
  );
}

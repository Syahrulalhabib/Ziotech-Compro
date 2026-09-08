import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from './LanguageToggle';
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
  const company = data?.company || {
    name: 'PT Ziotech Global Inovasi',
    address: 'Jl. Contoh Alamat No. 123, Jakarta',
    phone: '+62 812 3456 7890',
    email: 'info@ziotech.co.id',
    socials: [
      { id: 1, platform: 'linkedin', url: 'https://linkedin.com' },
      { id: 2, platform: 'instagram', url: 'https://instagram.com' },
      { id: 3, platform: 'facebook', url: 'https://facebook.com' }
    ]
  };

  const socials = company.socials || [];

  return (
    <footer className="bg-[var(--primary-dark)] text-gray-300 pt-12 sm:pt-16 pb-8 border-t border-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-10 sm:mb-12">
          
          {/* Company Info */}
          <div className="space-y-4 sm:space-y-6">
            <Link to="/" className="inline-block bg-white/10 p-2 rounded-xl backdrop-blur-sm">
              <img src={logo} alt="Ziotech" className="h-9 sm:h-10 w-auto" />
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              {t.common.footerAbout}
            </p>
            {socials.length > 0 && (
              <div className="flex flex-wrap gap-2.5 sm:gap-3 pt-1">
                {socials.map((item, idx) => (
                  <a 
                    key={item.id || idx} 
                    href={item.url || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    title={item.platform}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[var(--accent-blue)] hover:text-white transition-colors"
                  >
                    {renderSocialIcon(item.platform)}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base sm:text-lg mb-4 sm:mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--accent-gold)] rounded-full"></span>
              {t.common.quickLinks}
            </h3>
            <ul className="space-y-2.5 sm:space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-[var(--accent-gold)] transition-colors inline-flex items-center gap-2 text-sm group"><span className="w-1.5 h-1.5 bg-gray-600 group-hover:bg-[var(--accent-gold)] rounded-full transition-colors"></span> {t.nav.about}</Link></li>
              <li><Link to="/service" className="text-gray-400 hover:text-[var(--accent-gold)] transition-colors inline-flex items-center gap-2 text-sm group"><span className="w-1.5 h-1.5 bg-gray-600 group-hover:bg-[var(--accent-gold)] rounded-full transition-colors"></span> {t.nav.service}</Link></li>
              <li><Link to="/project" className="text-gray-400 hover:text-[var(--accent-gold)] transition-colors inline-flex items-center gap-2 text-sm group"><span className="w-1.5 h-1.5 bg-gray-600 group-hover:bg-[var(--accent-gold)] rounded-full transition-colors"></span> {t.nav.project}</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-[var(--accent-gold)] transition-colors inline-flex items-center gap-2 text-sm group"><span className="w-1.5 h-1.5 bg-gray-600 group-hover:bg-[var(--accent-gold)] rounded-full transition-colors"></span> {t.nav.contact}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-base sm:text-lg mb-4 sm:mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--accent-gold)] rounded-full"></span>
              {t.common.ourServices}
            </h3>
            <ul className="space-y-2.5 sm:space-y-3 text-sm">
              <li>
                <Link to="/service/1" className="text-gray-400 hover:text-[var(--accent-gold)] transition-colors inline-flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-gray-600 group-hover:bg-[var(--accent-gold)] rounded-full transition-colors shrink-0"></span>
                  Mechanical, Electrical & Plumbing
                </Link>
              </li>
              <li>
                <Link to="/service/2" className="text-gray-400 hover:text-[var(--accent-gold)] transition-colors inline-flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-gray-600 group-hover:bg-[var(--accent-gold)] rounded-full transition-colors shrink-0"></span>
                  {t.nav.service === 'Services' ? 'Construction & Infrastructure' : 'Konstruksi & Infrastruktur'}
                </Link>
              </li>
              <li>
                <Link to="/service/3" className="text-gray-400 hover:text-[var(--accent-gold)] transition-colors inline-flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-gray-600 group-hover:bg-[var(--accent-gold)] rounded-full transition-colors shrink-0"></span>
                  {t.nav.service === 'Services' ? 'Mining Supply & Support' : 'Suplai Pertambangan'}
                </Link>
              </li>
              <li>
                <Link to="/service/4" className="text-gray-400 hover:text-[var(--accent-gold)] transition-colors inline-flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-gray-600 group-hover:bg-[var(--accent-gold)] rounded-full transition-colors shrink-0"></span>
                  {t.nav.service === 'Services' ? 'Digitalization Solutions' : 'Solusi Digitalisasi'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-base sm:text-lg mb-4 sm:mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--accent-gold)] rounded-full"></span>
              {t.common.contactInfo}
            </h3>
            <ul className="space-y-3 sm:space-y-4 text-sm">
              <li className="flex items-start gap-3 sm:gap-4 group">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[var(--accent-blue)] transition-colors mt-0.5">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--accent-gold)] group-hover:text-white transition-colors" />
                </div>
                <span className="leading-relaxed text-gray-400 break-words flex-1">{company.address}</span>
              </li>
              <li className="flex items-center gap-3 sm:gap-4 group">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[var(--accent-blue)] transition-colors">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--accent-gold)] group-hover:text-white transition-colors" />
                </div>
                <span className="text-gray-400 break-all flex-1">{company.phone}</span>
              </li>
              <li className="flex items-center gap-3 sm:gap-4 group">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[var(--accent-blue)] transition-colors">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--accent-gold)] group-hover:text-white transition-colors" />
                </div>
                <span className="text-gray-400 break-all flex-1">{company.email}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-gray-500 text-center sm:text-left">
          <p>&copy; {new Date().getFullYear()} {company.name}. {t.common.rightsReserved}</p>
          <div className="flex items-center gap-5">
            {/* <LanguageToggle className="!bg-white/5 !border-white/10" /> DISABLED */}
          </div>
        </div>
      </div>
    </footer>
  );
}
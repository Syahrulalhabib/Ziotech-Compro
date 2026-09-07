import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { MapPin, Phone, Mail } from 'lucide-react';
import logo from '../assets/ziotech.png';

export default function Footer() {
  const { data } = useData();
  const company = data?.company || {
    name: 'PT Ziotech Global Inovasi',
    address: 'Jl. Contoh Alamat No. 123, Jakarta',
    phone: '+62 812 3456 7890',
    email: 'info@ziotech.co.id'
  };

  return (
    <footer className="bg-[var(--primary-dark)] text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-6">
            <Link to="/" className="inline-block bg-white/10 p-2 rounded-xl backdrop-blur-sm">
              <img src={logo} alt="Ziotech" className="h-10" />
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Mitra strategis untuk sektor industri dan infrastruktur dengan komitmen pada kualitas, efisiensi, dan inovasi berkelanjutan.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[var(--accent-blue)] hover:text-white transition-colors">
                {/* LinkedIn Icon SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[var(--accent-blue)] hover:text-white transition-colors">
                {/* Instagram Icon SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[var(--accent-blue)] hover:text-white transition-colors">
                {/* Facebook Icon SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--accent-gold)] rounded-full"></span>
              Tautan Cepat
            </h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-[var(--accent-gold)] transition-colors inline-flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-gray-600 group-hover:bg-[var(--accent-gold)] rounded-full transition-colors"></span> Tentang Kami</Link></li>
              <li><Link to="/service" className="text-gray-400 hover:text-[var(--accent-gold)] transition-colors inline-flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-gray-600 group-hover:bg-[var(--accent-gold)] rounded-full transition-colors"></span> Layanan</Link></li>
              <li><Link to="/project" className="text-gray-400 hover:text-[var(--accent-gold)] transition-colors inline-flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-gray-600 group-hover:bg-[var(--accent-gold)] rounded-full transition-colors"></span> Proyek</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-[var(--accent-gold)] transition-colors inline-flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-gray-600 group-hover:bg-[var(--accent-gold)] rounded-full transition-colors"></span> Kontak</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--accent-gold)] rounded-full"></span>
              Layanan Kami
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="text-gray-400 hover:text-[var(--accent-gold)] transition-colors cursor-pointer flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-gray-600 group-hover:bg-[var(--accent-gold)] rounded-full transition-colors"></span> Mechanical, Electrical & Plumbing</li>
              <li className="text-gray-400 hover:text-[var(--accent-gold)] transition-colors cursor-pointer flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-gray-600 group-hover:bg-[var(--accent-gold)] rounded-full transition-colors"></span> Konstruksi & Infrastruktur</li>
              <li className="text-gray-400 hover:text-[var(--accent-gold)] transition-colors cursor-pointer flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-gray-600 group-hover:bg-[var(--accent-gold)] rounded-full transition-colors"></span> Suplai Pertambangan</li>
              <li className="text-gray-400 hover:text-[var(--accent-gold)] transition-colors cursor-pointer flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-gray-600 group-hover:bg-[var(--accent-gold)] rounded-full transition-colors"></span> Solusi Digitalisasi</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--accent-gold)] rounded-full"></span>
              Hubungi Kami
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--accent-blue)] transition-colors">
                  <MapPin className="w-5 h-5 text-[var(--accent-gold)] group-hover:text-white transition-colors" />
                </div>
                <span className="leading-relaxed text-gray-400 pt-2">{company.address}</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--accent-blue)] transition-colors">
                  <Phone className="w-5 h-5 text-[var(--accent-gold)] group-hover:text-white transition-colors" />
                </div>
                <span className="text-gray-400">{company.phone}</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--accent-blue)] transition-colors">
                  <Mail className="w-5 h-5 text-[var(--accent-gold)] group-hover:text-white transition-colors" />
                </div>
                <span className="text-gray-400">{company.email}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {company.name}. Hak Cipta Dilindungi.</p>
          <div className="flex gap-6">
            <Link to="/admin/login" className="hover:text-white transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowLeft, CheckCircle2, ArrowRight } from 'lucide-react';
import { getServiceIcon } from '../data/serviceIcons';
import { createElement } from 'react';

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useData();
  const service = data?.services?.find(s => String(s.id) === String(id)) ?? null;
  const icon = service ? getServiceIcon(service.icon || service.id) : null;

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Layanan tidak ditemukan</h2>
        <button onClick={() => navigate('/service')} className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Layanan
        </button>
      </div>
    );
  }

  return (
    <div className="pt-20 md:pt-32 pb-12 sm:pb-20 bg-gray-50 min-h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 sm:mb-8 inline-flex items-center text-sm sm:text-base text-gray-600 hover:text-[var(--primary-blue)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> Kembali
        </button>

        <div className="bg-white rounded-none shadow-xl overflow-hidden border border-gray-100">
          <div className="relative h-60 sm:h-72 md:h-[400px] w-full">
            <img 
              src={service.image || "https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"} 
              alt={service.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-dark)]/95 via-[var(--primary-dark)]/50 to-transparent flex items-end">
              <div className="p-5 sm:p-8 md:p-12 w-full flex items-center gap-4 sm:gap-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-none sm:rounded-none bg-[var(--accent-gold)] text-[var(--primary-dark)] flex items-center justify-center shrink-0 shadow-lg">
                  {icon && createElement(icon, { className: "w-6 h-6 sm:w-8 sm:h-8" })}
                </div>
                <div>
                  <span className="text-white/80 uppercase tracking-widest text-[10px] sm:text-xs font-bold">Keahlian Khusus</span>
                  <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mt-1 drop-shadow-md break-words">{service.title}</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-[var(--primary-dark)] mb-4">Uraian Layanan</h2>
                  <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                    {service.description}
                  </p>
                </div>

                {service.features && service.features.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-[var(--primary-dark)] mb-6">Ruang Lingkup Pekerjaan</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start p-4 rounded-none bg-gray-50 border border-gray-100">
                          <CheckCircle2 className="w-5 h-5 text-[var(--accent-blue)] mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 font-medium text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-none border border-gray-100">
                  <h3 className="text-xl font-bold text-[var(--primary-dark)] mb-3">Rencanakan Kebutuhan Proyek Anda Bersama Kami</h3>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    Diskusikan kebutuhan proyek MEP, konstruksi, atau pengadaan fasilitas industri Anda bersama tim rekayasa teknik kami.
                  </p>
                  <Link to="/contact" className="w-full btn-primary flex items-center justify-center gap-2 py-3">
                    Hubungi Kami <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="bg-blue-50/60 p-6 rounded-none border border-blue-100">
                  <h4 className="font-bold text-[var(--primary-blue)] text-sm uppercase tracking-wider mb-2">Jaminan Standar Mutu</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>✓ Kepatuhan standar mutu & regulasi keselamatan industri</li>
                    <li>✓ Dikerjakan oleh teknisi dan insinyur berlisensi</li>
                    <li>✓ Estimasi waktu akurat dengan kendali biaya efisien</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

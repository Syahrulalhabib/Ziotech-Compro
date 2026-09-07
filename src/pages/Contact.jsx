import { useState } from 'react';
import { useData } from '../context/DataContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
  const { data, loading } = useData();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
    </div>
  );

  const company = data?.company || {
    name: 'PT Ziotech Global Inovasi',
    address: 'Jl. Contoh Alamat No. 123, Jakarta, Indonesia',
    phone: '+62 812 3456 7890',
    email: 'info@ziotech.co.id',
    workingHours: 'Senin - Jumat: 08:00 - 17:00'
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: '', email: '', phone: '', subject: '', message: '' });

      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    { icon: MapPin, title: 'Alamat Kantor', detail: company.address, color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: Phone, title: 'Telepon', detail: company.phone, color: 'text-green-500', bg: 'bg-green-50' },
    { icon: Mail, title: 'Email', detail: company.email, color: 'text-red-500', bg: 'bg-red-50' },
    { icon: Clock, title: 'Jam Operasional', detail: company.workingHours, color: 'text-orange-500', bg: 'bg-orange-50' }
  ];

  const header = data?.pageHeaders?.contact || {};

  return (
    <div className="pt-24 md:pt-32">
      {/* Header */}
      <section className="bg-[var(--primary-dark)] text-white py-28 mt-[-6rem] md:mt-[-8rem] relative overflow-hidden">
        {header.image && (
          <>
            <div className="absolute inset-0 z-0">
              <img src={header.image} alt="Contact Background" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-[var(--primary-dark)]/20 z-10" />
          </>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-20 flex justify-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-md text-white">{header.title || 'Hubungi Kami'}</h1>
            <p className="text-xl text-white font-medium drop-shadow-sm">
              {header.subtitle || 'Tim profesional kami siap membantu dan mendiskusikan kebutuhan proyek Anda.'}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[var(--bg-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-[var(--primary-dark)] mb-6">Informasi Kontak</h2>
                <p className="text-[var(--text-muted)] font-medium mb-8">
                  Jangan ragu untuk menghubungi kami melalui informasi di bawah ini atau kunjungi kantor kami langsung.
                </p>

                <div className="space-y-6">
                  {contactInfo.map((info, idx) => {
                    const Icon = info.icon;
                    return (
                      <div key={idx} className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[var(--primary-blue)]/10`}>
                          <Icon className={`w-6 h-6 text-[var(--primary-blue)]`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[var(--primary-dark)]">{info.title}</h3>
                          <p className="text-[var(--text-muted)] font-medium mt-1">{info.detail}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
              >
                <h2 className="text-2xl font-bold text-[var(--primary-dark)] mb-6">Kirim Pesan</h2>

                <AnimatePresence>
                  {isSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-3 border border-green-100"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Pesan Anda telah berhasil terkirim! Tim kami akan segera menghubungi Anda.
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--accent-blue)] focus:border-[var(--accent-blue)] outline-none transition-shadow"
                        placeholder="Masukkan nama lengkap Anda"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--accent-blue)] focus:border-[var(--accent-blue)] outline-none transition-shadow"
                        placeholder="contoh@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--accent-blue)] focus:border-[var(--accent-blue)] outline-none transition-shadow"
                        placeholder="Contoh: 081234567890"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subjek *</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--accent-blue)] focus:border-[var(--accent-blue)] outline-none transition-shadow"
                      >
                        <option value="">Pilih Subjek</option>
                        <option value="Tanya Layanan MEP">Pertanyaan Layanan MEP</option>
                        <option value="Tanya Konstruksi">Pertanyaan Konstruksi & Infrastruktur</option>
                        <option value="Kerja Sama">Proposal Kerja Sama</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Pesan *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--accent-blue)] focus:border-[var(--accent-blue)] outline-none transition-shadow resize-none"
                      placeholder="Tuliskan pesan atau detail kebutuhan Anda di sini..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Kirim Pesan Sekarang
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] w-full bg-gray-200 relative">
        {/* Placeholder for Google Maps iframe */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 flex-col">
          <MapPin className="w-12 h-12 mb-4 text-gray-400" />
          <p>Integrasi Google Maps Peta Lokasi Kantor</p>
        </div>
      </section>
    </div>
  );
}
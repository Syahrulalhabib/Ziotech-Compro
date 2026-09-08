import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../firebase/config';
import { ref, push } from 'firebase/database';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
  const { data, loading } = useData();
  const { t } = useLanguage();
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
    workingHours: 'Senin - Jumat: 08:00 - 17:00',
    googleMapsEmbedUrl: ''
  };

  // Helper to extract clean embed URL if user inputs full iframe or raw link
  const getMapEmbedSrc = (input) => {
    if (!input || typeof input !== 'string') return '';
    const trimmed = input.trim();
    if (!trimmed) return '';

    // 1. If user pasted full <iframe ... src="..." ...>
    const iframeSrcMatch = trimmed.match(/src=["']([^"']+)["']/i);
    if (iframeSrcMatch && iframeSrcMatch[1]) {
      return iframeSrcMatch[1];
    }

    // 2. If already google maps embed url
    if (trimmed.includes('/maps/embed')) {
      return trimmed;
    }

    // 3. Google My Maps (viewer/edit/embed)
    const myMapsMatch = trimmed.match(/google\.[a-z.]+\/maps\/d\/(?:viewer|edit|embed|u\/\d+\/(?:viewer|edit|embed))\?[^"'\s]*mid=([a-zA-Z0-9_-]+)/i);
    if (myMapsMatch && myMapsMatch[1]) {
      return `https://www.google.com/maps/d/embed?mid=${myMapsMatch[1]}`;
    }

    // 4. Coordinates in standard Google Maps URL (@lat,lng)
    const coordsInUrl = trimmed.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (coordsInUrl) {
      return `https://maps.google.com/maps?q=${coordsInUrl[1]},${coordsInUrl[2]}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
    }

    // 5. Query parameter (?q=lat,lng or ?q=place+name)
    const queryParamMatch = trimmed.match(/[?&](?:q|query)=([^&]+)/);
    if (queryParamMatch && queryParamMatch[1]) {
      return `https://maps.google.com/maps?q=${queryParamMatch[1]}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
    }

    // 6. Google Maps place URL (/maps/place/Nama+Tempat)
    const placeMatch = trimmed.match(/\/maps\/place\/([^/@?]+)/);
    if (placeMatch && placeMatch[1]) {
      const place = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
      return `https://maps.google.com/maps?q=${encodeURIComponent(place)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
    }

    // 7. Raw coordinates string (lat, lng)
    const rawCoordsMatch = trimmed.match(/^(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)$/);
    if (rawCoordsMatch) {
      return `https://maps.google.com/maps?q=${rawCoordsMatch[1]},${rawCoordsMatch[2]}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
    }

    // 8. Fallback: if it's plain text address
    return `https://maps.google.com/maps?q=${encodeURIComponent(trimmed)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  };

  const mapSrc = getMapEmbedSrc(company.googleMapsEmbedUrl || company.address);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name: formState.name.trim(),
      email: formState.email.trim(),
      phone: formState.phone?.trim() || '-',
      subject: formState.subject || 'Pesan Baru',
      message: formState.message.trim(),
      createdAt: new Date().toISOString(),
      timestamp: Date.now(),
      status: 'unread'
    };

    // 1. Simpan ke Firebase Database path 'messages'
    try {
      await push(ref(db, 'messages'), payload);
    } catch (err) {
      console.warn('Gagal menyimpan pesan ke Firebase database:', err);
    }

    // 2. Trigger mailto client sebagai fallback/notifikasi instan ke company.email
    const targetEmail = company.email || 'info@ziotech.co.id';
    const mailSubject = encodeURIComponent(`[Website] ${payload.subject} - ${payload.name}`);
    const mailBody = encodeURIComponent(
      `Nama: ${payload.name}\n` +
      `Email Pengirim: ${payload.email}\n` +
      `No. Telepon: ${payload.phone}\n` +
      `Subjek: ${payload.subject}\n\n` +
      `Pesan:\n${payload.message}\n`
    );

    // Buka aplikasi email otomatis
    window.location.href = `mailto:${targetEmail}?subject=${mailSubject}&body=${mailBody}`;

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormState({ name: '', email: '', phone: '', subject: '', message: '' });

    setTimeout(() => setIsSuccess(false), 5000);
  };

  const contactInfo = [
    { icon: MapPin, title: t.contactPage.addressTitle, detail: company.address, color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: Phone, title: t.contactPage.phoneTitle, detail: company.phone, color: 'text-green-500', bg: 'bg-green-50' },
    { icon: Mail, title: t.contactPage.emailTitle, detail: company.email, color: 'text-red-500', bg: 'bg-red-50' },
    { icon: Clock, title: t.contactPage.hoursTitle, detail: company.workingHours, color: 'text-orange-500', bg: 'bg-orange-50' }
  ];

  const header = data?.pageHeaders?.contact || {};

  return (
    <div className="pt-20 md:pt-32 overflow-hidden">
      {/* Header */}
      <section className="bg-[var(--primary-dark)] text-white py-16 md:py-28 mt-[-5rem] md:mt-[-8rem] relative overflow-hidden">
        {header.image && (
          <>
            <div className="absolute inset-0 z-0">
              <img src={header.image} alt="Contact Background" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-[var(--primary-dark)]/20 z-10" />
          </>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-16 sm:pt-20 flex justify-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left max-w-3xl"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 drop-shadow-md text-white">{header.title || t.contactPage.defaultHeaderTitle}</h1>
            <p className="text-base sm:text-xl text-white font-medium drop-shadow-sm">
              {header.subtitle || t.contactPage.defaultHeaderSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-20 bg-[var(--bg-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">

            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--primary-dark)] mb-4 sm:mb-6">{t.contactPage.title}</h2>
                <p className="text-[var(--text-muted)] font-medium mb-6 sm:mb-8 text-sm sm:text-base">
                  {t.contactPage.subtitle}
                </p>

                <div className="space-y-4 sm:space-y-6">
                  {contactInfo.map((info, idx) => {
                    const Icon = info.icon;
                    return (
                      <div key={idx} className="flex items-start gap-4">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 bg-[var(--primary-blue)]/10`}>
                          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 text-[var(--primary-blue)]`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-sm sm:text-base text-[var(--primary-dark)]">{info.title}</h3>
                          <p className="text-[var(--text-muted)] font-medium mt-0.5 sm:mt-1 text-sm break-words">{info.detail}</p>
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
                className="bg-white rounded-2xl shadow-xl p-5 sm:p-8 border border-gray-100"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--primary-dark)] mb-6">{t.contactPage.formTitle}</h2>

                <AnimatePresence>
                  {isSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-3 border border-green-100"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      {t.contactPage.successDesc}
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">{t.contactPage.nameLabel} *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--accent-blue)] focus:border-[var(--accent-blue)] outline-none transition-shadow"
                        placeholder={t.contactPage.namePlaceholder}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">{t.contactPage.emailLabel} *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--accent-blue)] focus:border-[var(--accent-blue)] outline-none transition-shadow"
                        placeholder={t.contactPage.emailPlaceholder}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">{t.contactPage.phoneLabel}</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--accent-blue)] focus:border-[var(--accent-blue)] outline-none transition-shadow"
                        placeholder={t.contactPage.phonePlaceholder}
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">{t.contactPage.subjectLabel} *</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--accent-blue)] focus:border-[var(--accent-blue)] outline-none transition-shadow"
                      >
                        <option value="">{t.contactPage.subjectPlaceholder}</option>
                        <option value="Pertanyaan Layanan MEP">{t.contactPage.optMep}</option>
                        <option value="Konstruksi & Infrastruktur">{t.contactPage.optConstruction}</option>
                        <option value="Kerja Sama">{t.contactPage.optPartnership}</option>
                        <option value="Lainnya">{t.contactPage.optOther}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">{t.contactPage.messageLabel} *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--accent-blue)] focus:border-[var(--accent-blue)] outline-none transition-shadow resize-none"
                      placeholder={t.contactPage.messagePlaceholder}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-[var(--primary-blue)] to-[var(--accent-blue)] hover:from-blue-900 hover:to-sky-700 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2.5 text-base sm:text-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span>{t.contactPage.sendButton}</span>
                        <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
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
      <section className="py-12 bg-[var(--bg-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-3 md:p-4 rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="relative w-full h-[320px] md:h-[400px] rounded-xl overflow-hidden bg-slate-100">
              {mapSrc ? (
                <iframe
                  title="Google Maps Lokasi Kantor PT Ziotech Global Inovasi"
                  src={mapSrc}
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 flex-col p-4 text-center">
                  <MapPin className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="font-medium text-slate-700">{t.common.mapsFallbackTitle}</p>
                  <p className="text-sm text-slate-400 mt-1">{t.common.mapsFallbackDesc}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
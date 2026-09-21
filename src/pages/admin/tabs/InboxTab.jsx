import { motion } from 'framer-motion';
import { Inbox, Phone, Mail, Clock, Trash2, ExternalLink } from 'lucide-react';
const tabMotion = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.2 } };
const InboxTab = ({ messages, unreadCount, handleMarkMessageStatus, handleDeleteMessage }) => (
  <motion.div key="inbox" {...tabMotion} className="space-y-8">
<div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-sm border border-slate-200/80">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-100">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-sky-50 text-sky-600 rounded-xl"><Inbox className="w-6 h-6" /></div>
      <div>
        <h3 className="text-xl font-bold text-slate-800">Daftar Pesan Masuk</h3>
        <p className="text-sm text-slate-500 mt-1">Pesan formulir kontak dari pengunjung website.</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold px-3 py-1.5 rounded-md bg-slate-100 text-slate-600">Total: {messages.length}</span>
      {unreadCount > 0 && (
        <span className="text-xs font-semibold px-3 py-1.5 rounded-md bg-red-50 text-red-600 border border-red-100">{unreadCount} baru</span>
      )}
    </div>
  </div>

  {messages.length === 0 ? (
    <div className="text-center py-16 text-slate-400">
      <Inbox className="w-12 h-12 mx-auto mb-3 stroke-1 text-slate-300" />
      <p className="font-medium text-slate-600">Belum ada pesan masuk</p>
      <p className="text-xs text-slate-400 mt-1">Setiap pesan baru akan masuk ke sini secara realtime.</p>
    </div>
  ) : (
    <div className="mt-6 space-y-4">
      {messages.map((msg) => {
        const isUnread = msg.status !== 'read';
        return (
          <div key={msg.id} className={`p-4 sm:p-5 rounded-xl border transition-all ${isUnread ? 'bg-sky-50/40 border-sky-200/80 shadow-sm' : 'bg-white border-slate-200'}`}>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                {isUnread && <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shrink-0" />}
                <span className="font-bold text-slate-800 text-sm sm:text-base">{msg.name || 'Tanpa Nama'}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">{msg.subject || 'Pesan Baru'}</span>
              </div>
              <span className="text-xs text-slate-400 flex items-center gap-1 shrink-0">
                <Clock className="w-3.5 h-3.5" />
                {msg.createdAt ? new Date(msg.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) : '-'}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500 mb-3 bg-slate-50 p-2.5 rounded-lg">
              <div className="flex items-center gap-2 truncate"><Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" /><span className="truncate">{msg.email || '-'}</span></div>
              <div className="flex items-center gap-2 truncate"><Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" /><span className="truncate">{msg.phone || '-'}</span></div>
            </div>
            <div className="p-3.5 bg-white rounded-lg border border-slate-100 text-sm text-slate-700 whitespace-pre-wrap leading-relaxed break-words">{msg.message}</div>
            <div className="flex flex-wrap items-center justify-between gap-2.5 mt-4 pt-3 border-t border-slate-100 text-xs">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <button onClick={() => handleMarkMessageStatus(msg.id, isUnread ? 'read' : 'unread')} className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${isUnread ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                  {isUnread ? 'Tandai Dibaca' : 'Tandai Belum Dibaca'}
                </button>
                {msg.email && (
                  <a href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Pesan Website')}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 font-medium transition-colors">
                    <Mail className="w-3.5 h-3.5" /> Balas Email
                  </a>
                )}
                {msg.email && (
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(msg.email)}&su=${encodeURIComponent(`Re: ${msg.subject || 'Pesan Website'}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200/60 font-medium transition-colors"
                    title="Buka langsung di Gmail Browser"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Buka Gmail
                  </a>
                )}
                {msg.phone && msg.phone !== '-' && (
                  <a
                    href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '').replace(/^0/, '62')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 font-medium transition-colors"
                    title="Balas via WhatsApp"
                  >
                    <Phone className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                )}
              </div>
              <button onClick={() => handleDeleteMessage(msg.id, msg.name)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg ml-auto transition-colors" title="Hapus Pesan" aria-label="Hapus Pesan">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  )}
</div>
  </motion.div>
);
export default InboxTab;

import { createPortal } from 'react-dom';
import { AlertCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Hapus", isDestructive = true }) => {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="bg-white w-full max-w-md rounded-2xl p-6 sm:p-7 shadow-2xl border border-slate-200 relative"
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl shrink-0 ${isDestructive ? 'bg-red-50 text-red-600' : 'bg-sky-50 text-sky-600'}`}>
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-slate-800 leading-snug">{title}</h3>
                <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{message}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-7 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold text-white shadow-sm active:scale-95 transition-all cursor-pointer ${
                  isDestructive
                    ? 'bg-red-600 hover:bg-red-700 shadow-red-500/20'
                    : 'bg-sky-600 hover:bg-sky-500 shadow-sky-500/20'
                }`}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ConfirmModal;

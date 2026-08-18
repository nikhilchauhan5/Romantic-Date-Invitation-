import { useState } from 'react';
import { motion } from 'motion/react';
import { Settings, X, Save, RotateCcw, Heart, Calendar, Phone, User } from 'lucide-react';
import { DateAppConfig, saveAppConfig, resetAppConfig } from '../config/dateConfig';
import { format } from 'date-fns';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  config: DateAppConfig;
  onConfigChange: (updated: DateAppConfig) => void;
  onOpenDateModal: () => void;
}

export default function SettingsModal({
  isOpen,
  onClose,
  config,
  onConfigChange,
  onOpenDateModal
}: Props) {
  const [formData, setFormData] = useState<DateAppConfig>(config);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = saveAppConfig(formData);
    onConfigChange(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleReset = () => {
    if (confirm("Reset all settings back to default template values?")) {
      const reset = resetAppConfig();
      setFormData(reset);
      onConfigChange(reset);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        className="w-full max-w-lg bg-neutral-900/95 border border-white/20 rounded-[32px] p-6 sm:p-8 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5 text-[var(--color-romantic-300)]">
            <Settings size={24} />
            <h2 className="text-xl font-bold font-sans">Template Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-sm text-white/70 mb-6 leading-relaxed">
          Customize this romantic experience for your special someone. Changes are applied instantly!
        </p>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Girlfriend's Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-white/60 flex items-center gap-1.5">
              <Heart size={14} className="text-[var(--color-romantic-400)]" /> Her Name / Special Someone
            </label>
            <input
              type="text"
              required
              value={formData.recipientName}
              onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
              placeholder="e.g. Sofia, Emma, My Love"
              className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white text-base font-medium outline-none focus:border-[var(--color-romantic-400)] transition-colors"
            />
          </div>

          {/* Sender Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-white/60 flex items-center gap-1.5">
              <User size={14} className="text-[var(--color-romantic-400)]" /> Your Name
            </label>
            <input
              type="text"
              required
              value={formData.senderName}
              onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
              placeholder="e.g. Nikhil, Alex, Me"
              className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white text-base font-medium outline-none focus:border-[var(--color-romantic-400)] transition-colors"
            />
          </div>

          {/* WhatsApp Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-white/60 flex items-center gap-1.5">
              <Phone size={14} className="text-[var(--color-romantic-400)]" /> WhatsApp Number (with Country Code)
            </label>
            <input
              type="text"
              required
              value={formData.whatsAppNumber}
              onChange={(e) => setFormData({ ...formData, whatsAppNumber: e.target.value })}
              placeholder="+919876543210 or +15551234567"
              className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white text-base font-mono outline-none focus:border-[var(--color-romantic-400)] transition-colors"
            />
            <span className="text-[11px] text-white/50 block">
              Default is fake number <code className="text-white/80">+91 98765 43210</code>. Replace with your actual WhatsApp phone number.
            </span>
          </div>

          {/* Special Date selection shortcut */}
          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-bold uppercase tracking-wider text-white/60 flex items-center gap-1.5">
              <Calendar size={14} className="text-[var(--color-romantic-400)]" /> Special Date
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenDateModal();
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-black/40 border border-white/20 text-left text-sm font-semibold hover:border-[var(--color-romantic-400)] transition-colors flex items-center justify-between"
              >
                <span>
                  {formData.specialDate 
                    ? format(new Date(formData.specialDate), 'EEEE, MMMM do, yyyy') 
                    : "No specific date chosen yet"}
                </span>
                <span className="text-xs text-[var(--color-romantic-300)] underline">Change</span>
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3 border-t border-white/10">
            <button
              type="button"
              onClick={handleReset}
              className="py-3.5 px-4 rounded-full border border-white/15 hover:bg-white/5 font-semibold text-xs transition-colors text-white/70 flex items-center justify-center gap-1.5"
            >
              <RotateCcw size={14} /> Reset Defaults
            </button>
            <button
              type="submit"
              className="flex-1 py-3.5 px-6 rounded-full bg-[var(--color-romantic-400)] hover:bg-[var(--color-romantic-500)] font-bold text-sm text-white shadow-lg shadow-[var(--color-romantic-500)]/30 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Save size={16} /> {savedSuccess ? "Saved Successfully! ❤️" : "Save Changes"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

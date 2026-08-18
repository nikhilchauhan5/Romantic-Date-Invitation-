import { useState } from 'react';
import { motion } from 'motion/react';
import { CalendarHeart, X, Sparkles, Check } from 'lucide-react';
import { format, addDays, nextSaturday } from 'date-fns';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentDate: string | null;
  onSelectDate: (dateIso: string) => void;
  title?: string;
}

export default function DateModal({
  isOpen,
  onClose,
  currentDate,
  onSelectDate,
  title = "Choose Your Special Date ❤️"
}: Props) {
  const [selectedDateStr, setSelectedDateStr] = useState<string>(
    currentDate ? format(new Date(currentDate), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')
  );

  if (!isOpen) return null;

  const handleSave = () => {
    if (selectedDateStr) {
      const parsed = new Date(selectedDateStr + 'T12:00:00');
      onSelectDate(parsed.toISOString());
      onClose();
    }
  };

  const setPreset = (daysFromNow: number | 'weekend') => {
    let targetDate = new Date();
    if (daysFromNow === 'weekend') {
      targetDate = nextSaturday(new Date());
    } else {
      targetDate = addDays(new Date(), daysFromNow);
    }
    const formatted = format(targetDate, 'yyyy-MM-dd');
    setSelectedDateStr(formatted);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-md bg-neutral-900/90 border border-white/20 rounded-[28px] p-6 text-white shadow-2xl relative overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--color-romantic-500)]/20 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-2 text-[var(--color-romantic-300)]">
            <CalendarHeart size={24} />
            <h2 className="text-xl font-bold font-sans">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-sm text-white/70 mb-6 font-medium">
          Select when you want to plan your romantic date. You can edit this anytime from settings or the calendar.
        </p>

        {/* Date Input Box */}
        <div className="space-y-3 mb-6">
          <label className="text-xs font-bold uppercase tracking-wider text-white/50 block">
            Special Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={selectedDateStr}
              min={format(new Date(), 'yyyy-MM-dd')}
              onChange={(e) => setSelectedDateStr(e.target.value)}
              className="w-full bg-black/40 border border-white/20 rounded-2xl px-4 py-3.5 text-white font-semibold text-lg outline-none focus:border-[var(--color-romantic-400)] transition-colors cursor-pointer [color-scheme:dark]"
            />
          </div>
        </div>

        {/* Quick Presets */}
        <div className="space-y-2 mb-8">
          <label className="text-xs font-bold uppercase tracking-wider text-white/50 block">
            Quick Suggestions
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setPreset(0)}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-medium transition-colors"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => setPreset(1)}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-medium transition-colors"
            >
              Tomorrow
            </button>
            <button
              type="button"
              onClick={() => setPreset('weekend')}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-medium transition-colors flex items-center justify-center gap-1"
            >
              <Sparkles size={12} className="text-[var(--color-romantic-300)]" /> Weekend
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3.5 rounded-full border border-white/15 hover:bg-white/5 font-semibold text-sm transition-colors text-white/80"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 py-3.5 rounded-full bg-[var(--color-romantic-400)] hover:bg-[var(--color-romantic-500)] font-bold text-sm text-white shadow-lg shadow-[var(--color-romantic-500)]/30 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Check size={18} /> Confirm Date
          </button>
        </div>
      </motion.div>
    </div>
  );
}

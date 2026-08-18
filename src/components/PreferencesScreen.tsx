import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DatePlan } from '../types';
import { DateAppConfig } from '../config/dateConfig';

interface Props {
  key?: string;
  plan: DatePlan;
  config: DateAppConfig;
  updatePlan: (updates: Partial<DatePlan>) => void;
  onNext: () => void;
  onBack: () => void;
}

const PREFERENCES = [
  { id: 'movie_food', label: '🍿 Movie + Food' },
  { id: 'walk', label: '🌳 Long Walk' },
  { id: 'dinner', label: '🍕 Dinner Date' },
  { id: 'shopping', label: '🛍️ Shopping' },
  { id: 'cafe', label: '☕ Café + Talking' },
  { id: 'games', label: '🎮 Games + Fun' },
  { id: 'photos', label: '📸 Photos Together' },
  { id: 'evening', label: '🌆 Evening Out' },
  { id: 'spend_time', label: '🥰 Just Spend Time Together' },
  { id: 'random', label: '✨ Something Completely Random' },
];

export default function PreferencesScreen({ plan, config, updatePlan, onNext, onBack }: Props) {
  const togglePreference = (label: string) => {
    let newPrefs = [...plan.preferences];
    if (newPrefs.includes(label)) {
      newPrefs = newPrefs.filter(p => p !== label);
    } else {
      newPrefs.push(label);
    }
    updatePlan({ preferences: newPrefs });
  };

  const hasSelection = plan.preferences.length > 0 || plan.customPreference.trim().length > 0;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col w-full min-h-full pb-24"
    >
      <button onClick={onBack} className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-6 flex items-center gap-1 self-start p-2 -ml-2 rounded-lg hover:bg-white/10 transition-colors">
        <ChevronLeft size={16} /> <span className="mt-0.5">BACK</span>
      </button>

      <div className="text-center space-y-2 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
          What do you like, {config.recipientName}? ❤️
        </h1>
        <p className="font-handwriting text-xl text-[var(--color-romantic-300)]">tell me honestly 😌</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {PREFERENCES.map((pref) => {
          const isSelected = plan.preferences.includes(pref.label);
          return (
            <button
              key={pref.id}
              onClick={() => togglePreference(pref.label)}
              className={`
                px-5 py-3 rounded-full text-sm font-bold transition-all active:scale-95
                ${isSelected 
                  ? 'bg-[var(--color-romantic-400)] text-white shadow-md shadow-[var(--color-romantic-500)]/30' 
                  : 'bg-black/40 backdrop-blur-md text-white/90 border border-white/10 shadow-sm hover:bg-white/10'
                }
              `}
            >
              {pref.label}
            </button>
          );
        })}
      </div>

      <div className="bg-black/40 backdrop-blur-md p-1 rounded-[24px] border border-white/10 shadow-sm mb-8 focus-within:ring-2 focus-within:ring-[var(--color-romantic-200)] transition-all">
        <textarea
          value={plan.customPreference}
          onChange={(e) => updatePlan({ customPreference: e.target.value })}
          placeholder="Something else..."
          className="w-full bg-transparent p-5 outline-none resize-none min-h-[120px] text-white placeholder:text-white/60 font-medium"
        />
      </div>

      <AnimatePresence>
        {hasSelection && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-0 right-0 px-4 sm:px-6 w-full max-w-md mx-auto"
          >
            <button
              onClick={onNext}
              className="w-full bg-white/20 text-white font-bold py-4 rounded-full shadow-xl hover:bg-white/30 active:scale-95 transition-all text-lg flex items-center justify-center gap-2"
            >
              Next <ChevronRight size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

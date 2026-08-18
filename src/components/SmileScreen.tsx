import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GIFS } from '../constants';
import { DateAppConfig } from '../config/dateConfig';

interface Props {
  key?: string;
  config: DateAppConfig;
  onNext: () => void;
  onBack: () => void;
}

export default function SmileScreen({ config, onNext, onBack }: Props) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="flex flex-col items-center justify-center min-h-[80dvh] w-full text-center px-4"
    >
      <button onClick={onBack} className="absolute top-8 left-4 sm:left-6 text-[10px] uppercase tracking-widest font-bold opacity-50 flex items-center gap-1 p-2 rounded-lg hover:bg-white/10 transition-colors">
        <ChevronLeft size={16} /> <span className="mt-0.5">BACK</span>
      </button>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <p className="font-handwriting text-xl text-[var(--color-romantic-300)] mb-4">
          {config.messages.quoteSubtitle}
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold leading-tight whitespace-pre-line">
          {config.messages.quoteTitle}
        </h2>
      </motion.div>

      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', delay: 0.6, bounce: 0.5 }}
        className="w-[180px] aspect-square mb-10 mx-auto"
      >
        <img 
          src={GIFS.love} 
          alt="Cute couple" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain"
        />
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="space-y-6 text-base font-medium max-w-sm mx-auto leading-relaxed"
      >
        <p>
          Honestly, I don't care much about where we go.
        </p>
        <p>
          I just want to spend some time with you. ❤️
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
        onClick={onNext}
        className="mt-12 w-full max-w-xs bg-white/20 text-white font-bold py-4 rounded-full shadow-xl hover:bg-white/30 active:scale-95 transition-all text-lg flex items-center justify-center gap-2 mx-auto"
      >
        View Our Plan ❤️ <ChevronRight size={20} />
      </motion.button>
    </motion.div>
  );
}

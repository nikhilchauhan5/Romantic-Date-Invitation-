import { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { GIFS } from '../constants';
import { DateAppConfig } from '../config/dateConfig';

interface Props {
  key?: string;
  config: DateAppConfig;
  onNext: () => void;
}

export default function YesCelebrationScreen({ config, onNext }: Props) {
  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f472b6', '#fb7185', '#fda4af']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f472b6', '#fb7185', '#fda4af']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-1 flex flex-col items-center justify-center text-center w-full"
    >
      <div className="w-full max-w-[240px] aspect-square mb-8 rounded-full overflow-hidden shadow-[0_20px_50px_-10px_rgba(251,111,146,0.2)] ring-8 ring-white/50">
        <img 
          src={GIFS.yes} 
          alt="Happy cat" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>

      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-4xl font-bold font-handwriting text-[var(--color-romantic-300)] mb-4"
      >
        {config.messages.celebrationTitle}
      </motion.h1>

      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="font-handwriting text-xl text-white/80 opacity-80 mb-12"
      >
        {config.messages.celebrationSubtitle}
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={onNext}
        className="bg-[var(--color-romantic-400)] text-white font-bold py-4 px-8 rounded-full shadow-xl shadow-[var(--color-romantic-500)]/40 active:scale-95 flex items-center justify-center gap-2"
      >
        Okay, now let's plan our day <span>→</span>
      </motion.button>
    </motion.div>
  );
}

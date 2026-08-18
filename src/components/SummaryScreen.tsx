import { motion } from 'motion/react';
import { ChevronLeft, CalendarHeart, MapPin, Heart } from 'lucide-react';
import { format } from 'date-fns';
import { DatePlan } from '../types';
import { DateAppConfig } from '../config/dateConfig';

interface Props {
  key?: string;
  plan: DatePlan;
  config: DateAppConfig;
  onConfirm: () => void;
  onBack: () => void;
  onReset: () => void;
}

export default function SummaryScreen({ plan, config, onConfirm, onBack, onReset }: Props) {
  const formattedDate = plan.date ? format(new Date(plan.date), 'EEEE, MMMM do, yyyy') : 'TBD';
  
  const activitiesStr = plan.activities.length 
    ? plan.activities.map(a => a.charAt(0).toUpperCase() + a.slice(1)).join(' & ') 
    : 'Something fun';

  const formatMessage = () => {
    const text = `Chalo date pr chalein!!!!! ❤️\n\n📅 Date: ${formattedDate}\n📍 Plan: ${activitiesStr}\n🥰 I like: ${plan.preferences.join(', ')}${plan.customPreference ? `\n✨ And also: ${plan.customPreference}` : ''}`;
    return encodeURIComponent(text);
  };

  const handleConfirm = () => {
    onConfirm();
    // Use cleaned phone number
    const cleanPhone = config.whatsAppNumber.replace(/[^0-9]/g, '');
    setTimeout(() => {
      window.open(`https://wa.me/${cleanPhone}?text=${formatMessage()}`, '_blank');
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col w-full min-h-full pb-24"
    >
      <button onClick={onBack} className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-6 flex items-center gap-1 self-start p-2 -ml-2 rounded-lg hover:bg-white/10 transition-colors">
        <ChevronLeft size={16} /> <span className="mt-0.5">BACK</span>
      </button>

      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold leading-tight">
          Our Plan ❤️
        </h1>
        <p className="font-handwriting text-xl text-[var(--color-romantic-300)]">
          {config.recipientName} + {config.senderName}
        </p>
      </div>

      <div className="bg-black/50 backdrop-blur-md rounded-[32px] p-8 shadow-sm border border-white/10 space-y-6 mb-8 relative overflow-hidden">
        <div className="relative z-10 flex items-start gap-4">
          <div className="bg-white/10 text-[var(--color-romantic-300)] p-3 rounded-[16px]">
            <CalendarHeart size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-white/60 mb-1">Date</p>
            <p className="font-bold text-base">{formattedDate}</p>
          </div>
        </div>

        <div className="h-px w-full bg-white/10"></div>

        <div className="relative z-10 flex items-start gap-4">
          <div className="bg-white/10 text-[var(--color-romantic-300)] p-3 rounded-[16px]">
            <MapPin size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-white/60 mb-1">Plan</p>
            <p className="font-bold text-base">{activitiesStr}</p>
          </div>
        </div>

        <div className="h-px w-full bg-white/10"></div>

        <div className="relative z-10 flex items-start gap-4">
          <div className="bg-white/10 text-[var(--color-romantic-300)] p-3 rounded-[16px]">
            <Heart size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-white/60 mb-2">{config.recipientName} Likes</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {plan.preferences.map(p => (
                <span key={p} className="text-xs bg-white/10 border border-white/10 px-3 py-1.5 rounded-full font-bold">
                  {p.replace(/[^a-zA-Z\s]/g, '').trim()}
                </span>
              ))}
              {plan.customPreference && (
                <span className="text-xs bg-white/10 border border-white/10 px-3 py-1.5 rounded-full font-bold line-clamp-2">
                  "{plan.customPreference}"
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center space-y-2 mb-12">
        <h2 className="text-2xl font-bold">Looks like we have a plan. 🥹</h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-6 left-0 right-0 px-4 sm:px-6 w-full max-w-md mx-auto flex flex-col gap-3 z-50"
      >
        <button
          onClick={handleConfirm}
          className="w-full bg-[var(--color-romantic-400)] text-white font-bold py-4 rounded-full shadow-xl shadow-[var(--color-romantic-500)]/30 active:scale-95 transition-all text-lg"
        >
          It's a Date ❤️
        </button>
        <button 
          onClick={onReset}
          className="text-xs font-bold text-white/60 hover:text-white/80 transition-colors py-2"
        >
          Wait, I want to change something
        </button>
      </motion.div>
    </motion.div>
  );
}

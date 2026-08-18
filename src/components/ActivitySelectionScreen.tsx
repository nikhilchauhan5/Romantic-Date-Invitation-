import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Film, TreePine, Utensils, ShoppingBag, Gift } from 'lucide-react';
import { DatePlan } from '../types';

interface Props {
  key?: string;
  plan: DatePlan;
  updatePlan: (updates: Partial<DatePlan>) => void;
  onNext: () => void;
  onBack: () => void;
}

const ACTIVITIES = [
  { id: 'movie', label: 'Movie', icon: Film },
  { id: 'park', label: 'Park', icon: TreePine },
  { id: 'restaurant', label: 'Restaurant', icon: Utensils },
  { id: 'shopping', label: 'Shopping', icon: ShoppingBag },
  { id: 'surprise', label: 'Surprise Me', icon: Gift },
];

export default function ActivitySelectionScreen({ plan, updatePlan, onNext, onBack }: Props) {
  const toggleActivity = (label: string) => {
    if (label === 'Surprise Me') {
      updatePlan({ activities: ['Surprise Me'] });
      return;
    }
    
    let newActivities = [...plan.activities];
    if (newActivities.includes('Surprise Me')) {
      newActivities = [];
    }

    if (newActivities.includes(label)) {
      newActivities = newActivities.filter(a => a !== label);
    } else {
      newActivities.push(label);
    }
    updatePlan({ activities: newActivities });
  };

  const hasSelection = plan.activities.length > 0;

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
          What would you like to do?
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {ACTIVITIES.map((activity) => {
          const isSelected = plan.activities.includes(activity.label);
          const Icon = activity.icon;
          
          return (
            <motion.button
              key={activity.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleActivity(activity.label)}
              className={`
                relative flex flex-col items-center justify-center p-6 rounded-[24px] transition-all duration-300
                ${activity.id === 'surprise' ? 'col-span-2' : 'col-span-1'}
                ${isSelected 
                  ? 'bg-[var(--color-romantic-400)] text-white shadow-md shadow-[var(--color-romantic-500)]/30 scale-100' 
                  : 'bg-black/40 backdrop-blur-md shadow-sm border border-white/10 hover:bg-white/10 scale-100 opacity-90'
                }
              `}
            >
              <div className={`p-4 rounded-[20px] mb-3 ${isSelected ? 'bg-white/20' : 'bg-white/10'}`}>
                <Icon size={24} className={isSelected ? 'text-white' : 'text-white/70'} />
              </div>
              <span className={`text-[12px] font-bold ${isSelected ? 'text-white' : 'text-white/80'}`}>
                {activity.label}
              </span>
              
              {isSelected && (
                <motion.div 
                  layoutId={`sparkle-${activity.id}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -top-2 -right-2 text-2xl"
                >
                  ❤️
                </motion.div>
              )}
            </motion.button>
          );
        })}
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

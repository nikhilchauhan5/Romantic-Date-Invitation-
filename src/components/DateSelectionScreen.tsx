import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameDay, 
  isPast, 
  isToday,
  startOfWeek,
  endOfWeek
} from 'date-fns';
import { DatePlan } from '../types';

interface Props {
  key?: string;
  plan: DatePlan;
  updatePlan: (updates: Partial<DatePlan>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function DateSelectionScreen({ plan, updatePlan, onNext, onBack }: Props) {
  const [currentMonth, setCurrentMonth] = useState(
    plan.date ? new Date(plan.date) : new Date()
  );
  
  const selectedDate = plan.date ? new Date(plan.date) : null;

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => {
    if (!isPast(subMonths(currentMonth, 1)) || isToday(subMonths(currentMonth, 1))) {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const handleDateClick = (day: Date) => {
    if (isPast(day) && !isToday(day)) return;
    updatePlan({ date: day.toISOString() });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col w-full min-h-full pb-20"
    >
      <button onClick={onBack} className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-6 flex items-center gap-1 self-start p-2 -ml-2 rounded-lg hover:bg-white/10 transition-colors">
        <ChevronLeft size={16} /> <span className="mt-0.5">BACK</span>
      </button>

      <div className="text-center space-y-2 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
          So… when should we meet?
        </h1>
        <p className="font-handwriting text-xl text-[var(--color-romantic-300)]">pick a day for us 📅</p>
      </div>

      <div className="bg-black/40 backdrop-blur-md rounded-[32px] p-6 shadow-sm border border-white/10 mb-8 w-full max-w-sm mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-white/10 text-white/60 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            disabled={isPast(startOfMonth(subMonths(currentMonth, 1)))}
          >
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-[14px] uppercase tracking-widest font-bold opacity-80">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <button 
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} className="text-[10px] uppercase tracking-widest font-bold opacity-50">
              {day}
            </div>
          ))}
          
          {days.map((day, idx) => {
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isDisabled = isPast(day) && !isToday(day);
            const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
            
            return (
              <button
                key={idx}
                disabled={isDisabled}
                onClick={() => handleDateClick(day)}
                className={`
                  relative w-10 h-10 mx-auto flex items-center justify-center rounded-full text-sm font-bold transition-all
                  ${!isCurrentMonth ? 'opacity-20' : ''}
                  ${isDisabled ? 'opacity-20 cursor-not-allowed' : 'hover:bg-white/10'}
                  ${isSelected ? 'bg-[var(--color-romantic-400)] text-white shadow-md shadow-[var(--color-romantic-500)]/30 hover:bg-[var(--color-romantic-400)]' : ''}
                  ${isToday(day) && !isSelected ? 'ring-2 ring-[var(--color-romantic-200)]' : ''}
                `}
              >
                {format(day, 'd')}
                {isSelected && (
                  <motion.div
                    layoutId="selectedDate"
                    className="absolute inset-0 bg-[var(--color-romantic-400)] rounded-full -z-10 shadow-md shadow-[var(--color-romantic-500)]/30"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
                {isSelected && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, y: -20 }}
                    className="absolute top-0 text-[var(--color-romantic-300)]"
                  >
                    <Heart size={14} fill="currentColor" />
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedDate && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-auto flex flex-col items-center gap-4"
          >
            <p className="text-center text-lg font-bold">
              Perfect ❤️<br/>
              <span className="font-handwriting text-2xl text-[var(--color-romantic-300)] font-normal">
                {format(selectedDate, 'EEEE, MMMM do')}
              </span>
            </p>
            <button
              onClick={onNext}
              className="w-full bg-white/20 text-white font-bold py-4 rounded-full shadow-xl hover:bg-white/30 active:scale-95 transition-all text-lg"
            >
              Continue
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

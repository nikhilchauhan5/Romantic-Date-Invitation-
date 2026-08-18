import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Settings, Download, CalendarHeart } from 'lucide-react';
import { AppStep, DatePlan, INITIAL_PLAN } from './types';
import { GIFS } from './constants';
import { getAppConfig, DateAppConfig } from './config/dateConfig';
import AskingScreen from './components/AskingScreen';
import YesCelebrationScreen from './components/YesCelebrationScreen';
import DateSelectionScreen from './components/DateSelectionScreen';
import ActivitySelectionScreen from './components/ActivitySelectionScreen';
import PreferencesScreen from './components/PreferencesScreen';
import SmileScreen from './components/SmileScreen';
import SummaryScreen from './components/SummaryScreen';
import AudioPlayer from './components/AudioPlayer';
import Watermark from './components/Watermark';
import DateModal from './components/DateModal';
import SettingsModal from './components/SettingsModal';
import ExportModal from './components/ExportModal';

function ImagePreloader() {
  useEffect(() => {
    Object.values(GIFS).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);
  return null;
}

export default function App() {
  const [config, setConfig] = useState<DateAppConfig>(getAppConfig);
  const [step, setStep] = useState<AppStep>('asking');
  const [plan, setPlan] = useState<DatePlan>(() => ({
    ...INITIAL_PLAN,
    date: config.specialDate || null
  }));
  const [isLoaded, setIsLoaded] = useState(false);

  // Modals state
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  useEffect(() => {
    const savedStep = localStorage.getItem('love_project_step') as AppStep;
    const savedPlan = localStorage.getItem('love_project_plan');
    const initialConfig = getAppConfig();
    setConfig(initialConfig);
    
    if (savedStep && savedPlan) {
      if (savedStep === 'yesCelebration' || savedStep === 'confirmed') {
        setStep('asking'); 
      } else {
        setStep(savedStep);
      }
      setPlan(JSON.parse(savedPlan));
    } else if (initialConfig.specialDate) {
      setPlan(prev => ({ ...prev, date: initialConfig.specialDate }));
    }
    
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('love_project_step', step);
      localStorage.setItem('love_project_plan', JSON.stringify(plan));
    }
  }, [step, plan, isLoaded]);

  const nextStep = (next: AppStep) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(next);
  };

  const updatePlan = (updates: Partial<DatePlan>) => {
    setPlan(prev => ({ ...prev, ...updates }));
  };

  const handleSelectDateFromModal = (dateIso: string) => {
    updatePlan({ date: dateIso });
  };

  const handleConfigChange = (newConfig: DateAppConfig) => {
    setConfig(newConfig);
    if (newConfig.specialDate && !plan.date) {
      updatePlan({ date: newConfig.specialDate });
    }
  };

  const reset = () => {
    setStep('asking');
    setPlan({
      ...INITIAL_PLAN,
      date: config.specialDate || null
    });
    localStorage.removeItem('love_project_step');
    localStorage.removeItem('love_project_plan');
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-[100dvh] w-full text-white font-sans overflow-x-hidden selection:bg-romantic-300/30 relative">
      <ImagePreloader />
      
      {/* Animated Glowing Orbs Background */}
      <div className="circle1"></div>
      <div className="circle2"></div>
      <div className="circle3"></div>
      <div className="circle4"></div>
      <div className="circle5"></div>
      <div className="circle6"></div>
      <div className="circle7"></div>
      <div className="circle8"></div>
      
      {/* Top Left Floating Utility Bar */}
      <div className="fixed top-4 left-4 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsSettingsOpen(true)}
          title="Customize Names, WhatsApp & Settings"
          className="h-10 px-3.5 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center hover:scale-105 transition-all shadow-lg border border-white/10 text-white/80 hover:text-white text-xs font-semibold gap-1.5"
        >
          <Settings size={15} className="text-[var(--color-romantic-300)]" />
          <span className="hidden sm:inline">Customize</span>
        </button>

        <button
          onClick={() => setIsDateModalOpen(true)}
          title="Choose or Change Special Date"
          className="h-10 px-3.5 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center hover:scale-105 transition-all shadow-lg border border-white/10 text-white/80 hover:text-white text-xs font-semibold gap-1.5"
        >
          <CalendarHeart size={15} className="text-[var(--color-romantic-300)]" />
          <span className="hidden sm:inline">
            {plan.date ? 'Edit Date' : 'Set Date'}
          </span>
        </button>

        <button
          onClick={() => setIsExportOpen(true)}
          title="Export Standalone Project"
          className="h-10 px-3.5 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center hover:scale-105 transition-all shadow-lg border border-white/10 text-white/80 hover:text-white text-xs font-semibold gap-1.5"
        >
          <Download size={15} className="text-[var(--color-romantic-300)]" />
          <span className="hidden sm:inline">Export</span>
        </button>
      </div>

      {/* Audio Player (Top Right) */}
      <AudioPlayer audioUrl={config.audioUrl} />

      {/* Persistent subtle watermark */}
      <Watermark />

      {/* Modals */}
      <DateModal
        isOpen={isDateModalOpen}
        onClose={() => setIsDateModalOpen(false)}
        currentDate={plan.date}
        onSelectDate={handleSelectDateFromModal}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={config}
        onConfigChange={handleConfigChange}
        onOpenDateModal={() => setIsDateModalOpen(true)}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        config={config}
      />

      {/* Main Glassmorphism Experience Card */}
      <main className="max-w-md mx-auto min-h-[100dvh] flex flex-col relative px-4 py-16 sm:px-6 z-20 justify-center">
        <div className="glass-wrapper w-full relative min-h-[80vh]">
          <AnimatePresence mode="wait">
            {step === 'asking' && (
              <AskingScreen 
                key="asking" 
                config={config} 
                onYes={() => nextStep('yesCelebration')} 
              />
            )}
            {step === 'yesCelebration' && (
              <YesCelebrationScreen 
                key="yesCelebration" 
                config={config} 
                onNext={() => nextStep('dateSelection')} 
              />
            )}
            {step === 'dateSelection' && (
              <DateSelectionScreen 
                key="dateSelection" 
                plan={plan} 
                updatePlan={updatePlan} 
                onNext={() => nextStep('activitySelection')}
                onBack={() => setStep('asking')}
              />
            )}
            {step === 'activitySelection' && (
              <ActivitySelectionScreen 
                key="activitySelection" 
                plan={plan} 
                updatePlan={updatePlan} 
                onNext={() => nextStep('preferences')}
                onBack={() => setStep('dateSelection')}
              />
            )}
            {step === 'preferences' && (
              <PreferencesScreen 
                key="preferences" 
                plan={plan} 
                config={config} 
                updatePlan={updatePlan} 
                onNext={() => nextStep('smileScreen')}
                onBack={() => setStep('activitySelection')}
              />
            )}
            {step === 'smileScreen' && (
              <SmileScreen 
                key="smileScreen" 
                config={config} 
                onNext={() => nextStep('summary')}
                onBack={() => setStep('preferences')}
              />
            )}
            {step === 'summary' && (
              <SummaryScreen 
                key="summary" 
                plan={plan} 
                config={config} 
                onConfirm={() => nextStep('confirmed')}
                onReset={reset}
                onBack={() => setStep('smileScreen')}
              />
            )}
            {step === 'confirmed' && (
              <motion.div 
                key="confirmed"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
              >
                <h1 className="text-4xl font-bold font-handwriting text-[var(--color-romantic-400)]">
                  It's a date, {config.recipientName}. ❤️
                </h1>
                <p className="text-[14px] font-bold uppercase tracking-[0.1em] opacity-60 mt-4">
                  {config.messages.confirmedSubtitle}
                </p>
                <button 
                  onClick={reset}
                  className="mt-12 text-[10px] uppercase tracking-widest font-bold opacity-40 hover:opacity-100 transition-opacity"
                >
                  Start Over
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

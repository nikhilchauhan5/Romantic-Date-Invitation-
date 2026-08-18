import { useState, useRef } from 'react';
import React from 'react';
import { motion, useAnimation } from 'motion/react';
import { GIFS } from '../constants';
import { DateAppConfig } from '../config/dateConfig';

interface Props {
  key?: string;
  config: DateAppConfig;
  onYes: () => void;
}

export default function AskingScreen({ config, onYes }: Props) {
  const [noCount, setNoCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const NO_MESSAGES = [
    "Are you sure? 🥺",
    `${config.recipientName}… seriously? 😭`,
    "Please reconsider 😭❤️",
    "My heart just dropped…",
    "That button seems shy 😂",
    "NO is currently unavailable 😌",
    "Try again… if you dare 😭"
  ];

  const handleNoInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setNoCount(prev => prev + 1);

    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const btnWidth = 100;
      const btnHeight = 50;
      
      const maxX = containerRect.width - btnWidth;
      const maxY = containerRect.height - btnHeight - 100;
      
      const randomX = (Math.random() - 0.5) * (containerRect.width - btnWidth) * 0.8;
      const randomY = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * (containerRect.height * 0.3) + 30); 
      
      controls.start({
        x: randomX,
        y: randomY,
        transition: { type: "spring", stiffness: 300, damping: 15 }
      });
    }
  };

  const currentGif = noCount === 0 ? GIFS.waiting : (noCount % 2 === 0 ? GIFS.sad2 : GIFS.sad1);
  const currentMessage = noCount === 0 ? "Think carefully… 😌" : NO_MESSAGES[(noCount - 1) % NO_MESSAGES.length];

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex-1 flex flex-col items-center justify-center relative w-full h-full"
    >
      <div className="w-full max-w-[240px] aspect-square mb-6 mx-auto relative flex items-center justify-center">
        <img 
          src={currentGif} 
          alt="Cute cat reaction" 
          className="w-full h-full object-contain pointer-events-none select-none"
        />
      </div>

      <p className="font-handwriting text-xl text-[var(--color-romantic-300)] mb-2">
        {config.messages.questionSubtitle}
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 leading-tight">
        My Dear {config.recipientName},<br/>{config.messages.questionTitle}
      </h2>
      
      <p className="font-handwriting text-lg text-center opacity-80 px-8 h-6 text-white/80 mb-8">
        {currentMessage}
      </p>

      <div className="relative w-full max-w-[400px] flex justify-center gap-6 z-10 min-h-[80px]">
        <button
          onClick={onYes}
          className="repo-btn yes-btn flex-1 max-w-[120px] font-bold"
        >
          YES ❤️
        </button>
        
        <motion.button
          animate={controls}
          onMouseEnter={handleNoInteraction}
          onClick={handleNoInteraction}
          onTouchStart={handleNoInteraction}
          className="repo-btn no-btn absolute right-0 sm:right-10 flex-1 max-w-[120px] font-bold bg-white/10 text-white/80 border-white/10"
          style={noCount === 0 ? { position: 'relative', right: 'auto' } : { position: 'absolute', zIndex: 50 }}
        >
          NO 🥺
        </motion.button>
      </div>
      
      {noCount > 10 && (
        <p className="font-handwriting text-lg text-white/70 mt-12 text-center">
          Okay okay… you can say no 😭 (just kidding, you can't)
        </p>
      )}
    </motion.div>
  );
}

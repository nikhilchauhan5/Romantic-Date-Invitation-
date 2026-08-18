import React from 'react';

/**
 * Watermark Component
 * Persistent, subtle copyright attribution: "Created by Nikhil Chauhan"
 * Designed to be visually subtle, professional, non-intrusive, and responsive.
 */
export default function Watermark() {
  return (
    <aside 
      aria-label="Creator Attribution"
      className="fixed bottom-2 left-1/2 -translate-x-1/2 sm:left-auto sm:right-4 sm:translate-x-0 z-40 pointer-events-auto select-none"
    >
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-sm text-[11px] font-medium text-white/50 hover:text-white/80 transition-colors">
        <span>✨</span>
        <span>Created by <strong className="font-semibold text-white/70">Nikhil Chauhan</strong></span>
      </div>
    </aside>
  );
}

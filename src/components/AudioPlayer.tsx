import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface Props {
  audioUrl?: string;
}

export default function AudioPlayer({ 
  audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Attempt auto-play if permitted by browser policies
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
      <div 
        onClick={togglePlay}
        title={isPlaying ? "Pause Romantic Music" : "Play Romantic Music"}
        className="h-10 px-3 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-lg border border-white/10 text-white/80 hover:text-white text-xs font-semibold gap-1.5 select-none"
      >
        {isPlaying ? (
          <>
            <Pause className="w-4 h-4 fill-current text-[var(--color-romantic-300)]" />
            <span className="hidden sm:inline text-[11px]">Music Playing</span>
          </>
        ) : (
          <>
            <Play className="w-4 h-4 fill-current ml-0.5" />
            <span className="hidden sm:inline text-[11px]">Play Music</span>
          </>
        )}
        
        {isPlaying && (
          <button 
            type="button"
            onClick={toggleMute}
            className="ml-1 p-1 hover:text-white text-white/60 transition-colors"
          >
            {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
          </button>
        )}
      </div>

      <audio 
        ref={audioRef} 
        src={audioUrl} 
        loop 
        id="romantic-audio-player" 
      />
    </div>
  );
}

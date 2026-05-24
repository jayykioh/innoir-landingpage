'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import CinematicIntro from './CinematicIntro';
import EnvelopeOpening from './EnvelopeOpening';
import InteractiveTicket from './InteractiveTicket';
import AtmosphereScene from './AtmosphereScene';

type Scene = 'intro' | 'envelope' | 'ticket';

export default function InvitationClient({ guestName, isVIP = false }: { guestName: string, isVIP?: boolean }) {
  const [currentScene, setCurrentScene] = useState<Scene>('intro');
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fallback sound for cinematic/envelope sequences
  useEffect(() => {
    audioRef.current = new Audio('/audio/bgm.mp3'); 
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const playAudio = () => {
    if (audioRef.current && isAudioMuted) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(e => console.log('Autoplay prevented by browser:', e));
      setIsAudioMuted(false);
    }
  };

  const handleIntroComplete = () => {
    setCurrentScene('envelope');
  };

  const handleEnvelopeOpened = () => {
    setCurrentScene('ticket');
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black" onClick={playAudio}>
      {currentScene !== 'intro' && (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <AtmosphereScene />
        </div>
      )}
      {currentScene === 'intro' && (
        <CinematicIntro onComplete={handleIntroComplete} />
      )}
      
      {currentScene === 'envelope' && (
        <EnvelopeOpening onOpened={handleEnvelopeOpened} />
      )}
      
      {currentScene === 'ticket' && (
        <InteractiveTicket guestName={guestName} isVIP={isVIP} />
      )}
      
      {/* Audio Toggle Indicator */}
      <div className="absolute bottom-4 right-4 z-50 opacity-30 hover:opacity-100 transition-opacity">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            if (audioRef.current) {
              if (isAudioMuted) {
                audioRef.current.play().catch(() => {});
              } else {
                audioRef.current.pause();
              }
              setIsAudioMuted(!isAudioMuted);
            }
          }}
          className="text-white text-xs border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm"
        >
          {isAudioMuted ? 'UNMUTE SOUND' : 'MUTE SOUND'}
        </button>
      </div>

      {/* Powered By Footer */}
      <div className="absolute bottom-4 left-4 z-50">
        <motion.a
            href="https://www.facebook.com/jeckyoh/"
            target="_blank"
            className="text-white/60 hover:text-white transition-colors flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase"
            whileHover={{ scale: 1.05 }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
            ⚡ Powered by Luc Doan
        </motion.a>
      </div>
    </div>
  );
}

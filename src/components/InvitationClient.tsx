'use client';

import { useState, useRef, useEffect, createContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CinematicIntro from './CinematicIntro';
import EnvelopeOpening from './EnvelopeOpening';
import InteractiveTicket from './InteractiveTicket';
import AtmosphereScene from './AtmosphereScene';

export type Scene = 'intro' | 'envelope' | 'ticket';
export type AudioCue = 'envelope_land' | 'flap_open' | 'ticket_pull' | 'stamp';

export const AudioContext = createContext<{
  triggerAudioCue: (cue: AudioCue) => void;
} | null>(null);

export default function InvitationClient({ guestName, isVIP = false }: { guestName: string, isVIP?: boolean }) {
  const [currentScene, setCurrentScene] = useState<Scene>('intro');
  const [transitionScene, setTransitionScene] = useState<Scene | null>(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load RSVP and check reduced motion on mount
  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setPrefersReducedMotion(isReduced);

    if (isReduced) {
      setCurrentScene('ticket');
      return;
    }

    const saved = localStorage.getItem(`rsvp_${guestName}`);
    if (saved === 'confirmed') {
      setCurrentScene('ticket');
    }
  }, [guestName]);

  // Fallback sound for music loop
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

  const playSynthSound = (cue: AudioCue) => {
    if (isAudioMuted) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (cue === 'envelope_land') {
        // Soft low frequency thud
        osc.type = 'sine';
        osc.frequency.setValueAtTime(80, now);
        osc.frequency.exponentialRampToValueAtTime(20, now + 0.1);
        
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (cue === 'stamp') {
        // Rubber stamp impact thud & percussive click
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);

        gain.gain.setValueAtTime(0.8, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

        osc.start(now);
        osc.stop(now + 0.15);

        // Click high frequency transient
        const clickOsc = ctx.createOscillator();
        const clickGain = ctx.createGain();
        clickOsc.connect(clickGain);
        clickGain.connect(ctx.destination);

        clickOsc.type = 'sine';
        clickOsc.frequency.setValueAtTime(1000, now);
        clickOsc.frequency.exponentialRampToValueAtTime(300, now + 0.03);

        clickGain.gain.setValueAtTime(0.2, now);
        clickGain.gain.exponentialRampToValueAtTime(0.01, now + 0.03);

        clickOsc.start(now);
        clickOsc.stop(now + 0.03);
      } else if (cue === 'flap_open') {
        // Paper folding sound
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.3);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

        osc.start(now);
        osc.stop(now + 0.3);
      } else if (cue === 'ticket_pull') {
        // Sliding ticket swoosh
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.4);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

        osc.start(now);
        osc.stop(now + 0.4);
      }
    } catch (error) {
      console.error('Audio synth error:', error);
    }
  };

  const triggerAudioCue = (cue: AudioCue) => {
    playSynthSound(cue);
  };

  // Expose globally so components that are not context-aware can signal cues
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).triggerAudioCue = triggerAudioCue;
    }
    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).triggerAudioCue;
      }
    };
  }, [isAudioMuted]);

  const changeScene = (nextScene: Scene) => {
    if (prefersReducedMotion) {
      setCurrentScene(nextScene);
      return;
    }
    setTransitionScene(nextScene);
    setIsOverlayVisible(true);
  };

  const handleIntroComplete = () => {
    changeScene('envelope');
  };

  const handleEnvelopeOpened = () => {
    changeScene('ticket');
  };

  return (
    <AudioContext.Provider value={{ triggerAudioCue }}>
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden" onClick={playAudio}>
        
        {/* Atmosphere Scene — Staggered Fade-in */}
        {currentScene !== 'intro' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.0, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
          >
            <AtmosphereScene isVIP={isVIP} />
          </motion.div>
        )}

        {/* Scene Transitions with AnimatePresence */}
        <AnimatePresence mode="wait">
          {currentScene === 'intro' && (
            <motion.div
              key="intro"
              exit={{ opacity: prefersReducedMotion ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-10 w-full h-full"
            >
              <CinematicIntro onComplete={handleIntroComplete} />
            </motion.div>
          )}
          
          {currentScene === 'envelope' && (
            <motion.div
              key="envelope"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: prefersReducedMotion ? 0 : 1 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 z-10 w-full h-full"
            >
              <EnvelopeOpening onOpened={handleEnvelopeOpened} />
            </motion.div>
          )}
          
          {currentScene === 'ticket' && (
            <motion.div
              key="ticket"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0.5 } : { duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 z-10 w-full h-full"
            >
              <InteractiveTicket guestName={guestName} isVIP={isVIP} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full-bleed Transition Black Overlay */}
        <AnimatePresence>
          {isOverlayVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: isOverlayVisible ? 0.3 : 0.4,
                ease: "easeInOut"
              }}
              onAnimationComplete={() => {
                if (isOverlayVisible && transitionScene) {
                  setCurrentScene(transitionScene);
                  setTransitionScene(null);
                  setIsOverlayVisible(false);
                }
              }}
              className="absolute inset-0 bg-black z-50 pointer-events-none"
            />
          )}
        </AnimatePresence>
        
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
              className="text-white/60 hover:text-white transition-colors flex items-center gap-1 font-mono text-[8px] sm:text-[9px] tracking-widest uppercase"
              whileHover={{ scale: 1.05 }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
              ⚡ Powered by Luc Doan
          </motion.a>
        </div>
      </div>
    </AudioContext.Provider>
  );
}

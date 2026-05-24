'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ArrowUp } from 'lucide-react';

export default function EnvelopeOpening({ onOpened }: { onOpened: () => void }) {
  const [flapOpened, setFlapOpened] = useState(false);
  const [hasDraggedUp, setHasDraggedUp] = useState(false);
  
  const envelopeRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  
  // Motion value to track the drag offset of the ticket
  const dragY = useMotionValue(0);
  
  // As the user drags the ticket up, we fade out the envelope background elements
  const envelopeOpacity = useTransform(dragY, [0, -220], [1, 0]);
  const hintOpacity = useTransform(dragY, [0, -60], [1, 0]);

  useEffect(() => {
    // 1. Drop the envelope down with GSAP bounce
    gsap.fromTo(envelopeRef.current, 
      { y: '-100vh', rotation: -6, scale: 0.85 },
      { 
        y: '0vh', 
        rotation: 0, 
        scale: 1, 
        duration: 1.1, 
        ease: 'power3.out',
        onComplete: () => {
          // 2. Automatically open the flap after it settles
          gsap.to(flapRef.current, {
            rotateX: 180,
            duration: 0.7,
            ease: 'power2.inOut',
            delay: 0.2,
            onComplete: () => {
              setFlapOpened(true);
            }
          });
        }
      }
    );
  }, []);

  // Monitor drag value to trigger the opened callback when pulled up far enough
  useEffect(() => {
    const unsubscribe = dragY.on('change', (latest) => {
      if (latest <= -200 && !hasDraggedUp) {
        setHasDraggedUp(true);
        // Satisfying scale and fade out transition before launching ticket scene
        gsap.to(envelopeRef.current, {
          scale: 1.15,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: onOpened
        });
      }
    });
    return () => unsubscribe();
  }, [dragY, hasDraggedUp, onOpened]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center perspective-[1200px] z-30 overflow-hidden bg-black/40 backdrop-blur-sm">
      
      {/* ── DRAG HINT ── */}
      <AnimatePresence>
        {flapOpened && !hasDraggedUp && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ opacity: hintOpacity }}
            className="absolute top-[12%] md:top-[15%] flex flex-col items-center gap-2.5 z-40 pointer-events-none"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/90 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
            >
              <ArrowUp size={16} />
            </motion.div>
            <p className="font-mono text-[10px] tracking-[0.35em] text-white/60 uppercase text-center">
              Drag Ticket Up to Open
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Envelope Container */}
      <motion.div 
        ref={envelopeRef} 
        style={{ 
          transformStyle: 'preserve-3d',
          opacity: envelopeOpacity
        }}
        className="relative w-[320px] h-[200px] sm:w-[400px] sm:h-[250px]"
      >
        {/* Envelope Back Panel */}
        <div className="absolute inset-0 bg-neutral-900 border border-white/5 shadow-2xl rounded-md z-10" />
        
        {/* The Ticket (Draggable inside the envelope pocket) */}
        {flapOpened && (
          <motion.div 
            drag="y"
            dragConstraints={{ top: -280, bottom: 0 }}
            dragElastic={0.12}
            style={{ y: dragY }}
            whileDrag={{ scale: 1.02, cursor: 'grabbing' }}
            className="absolute left-1/2 -translate-x-1/2 bottom-[10px] w-[270px] h-[360px] sm:w-[340px] sm:h-[450px] bg-neutral-950 rounded-lg border border-white/10 z-20 shadow-[0_15px_50px_rgba(0,0,0,0.8)] overflow-hidden cursor-grab flex flex-col items-center justify-between p-6"
          >
            {/* Top ticket branding */}
            <div className="w-full flex justify-between items-center opacity-40 font-mono text-[8px] uppercase tracking-widest text-white/80">
              <span>Grand Opening</span>
              <span>No. 0603-2026</span>
            </div>

            {/* Centered card info mimic */}
            <div className="flex flex-col items-center text-center gap-1.5 py-8 my-auto">
              <h2 className="font-display font-black text-3xl tracking-tight text-white uppercase">
                INNOIR
              </h2>
              <div className="h-[1px] w-20 bg-white/20 my-2" />
              <p className="font-mono text-[10px] tracking-widest text-white/60 uppercase">
                Access Pass
              </p>
            </div>

            {/* Bottom drag invitation tip */}
            <div className="w-full text-center border-t border-white/5 pt-4">
              <motion.p 
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="font-mono text-[9px] tracking-[0.25em] text-white/50 uppercase"
              >
                ▲ Pull Up Fully ▲
              </motion.p>
            </div>
          </motion.div>
        )}
        
        {/* Envelope Front Pocket (Lower triangle) */}
        <div 
          className="absolute inset-0 bg-neutral-850 rounded-b-md border-t border-white/5 z-30 pointer-events-none" 
          style={{ 
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 50% 55%, 0% 0%)' 
          }} 
        />
        
        {/* Envelope Flap (Top fold) */}
        <div 
          ref={flapRef}
          className="absolute top-0 left-0 w-full h-[60%] bg-neutral-800 rounded-t-md border-b border-white/5 z-40 pointer-events-none"
          style={{ 
            clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
            transformOrigin: 'top center',
            backfaceVisibility: 'hidden'
          }}
        />
      </motion.div>
      
    </div>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import gsap from 'gsap';

export default function EnvelopeOpening({ onOpened }: { onOpened: () => void }) {
  const [isDragEnabled, setIsDragEnabled] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  
  const envelopeRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  
  // Motion value to track the drag offset of the ticket
  const dragY = useMotionValue(0);
  
  // As dragY goes 0 → -300: envelope opacity fades 1→0, scale 1→0.95.
  const envelopeOpacity = useTransform(dragY, [0, -300], [1, 0]);
  const envelopeScale = useTransform(dragY, [0, -300], [1, 0.95]);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // 1. Envelope drops from top of screen: y: -120vh → 0, rotation: -4→0, ease: power3.out, duration 1.0s.
    tl.fromTo(envelopeRef.current, 
      { y: '-120vh', rotation: -4 },
      { 
        y: 0, 
        rotation: 0, 
        duration: 1.0, 
        ease: 'power3.out',
        onComplete: () => {
          if (typeof window !== 'undefined') {
            (window as any).triggerAudioCue?.('envelope_land');
          }
        }
      }
    );

    // 2. After landing: a subtle bounce (manual overshoot: y -12px then back, 0.3s)
    tl.to(envelopeRef.current, {
      y: -12,
      duration: 0.15,
      ease: 'power2.out'
    });
    tl.to(envelopeRef.current, {
      y: 0,
      duration: 0.15,
      ease: 'power2.in'
    });

    // 3. Envelope flap opens with rotateX: 0 → -175deg on the top triangle, transformOrigin "top center", backfaceVisibility hidden. Duration 0.6s, ease power2.inOut. Trigger 0.4s after landing.
    tl.to(flapRef.current, {
      rotateX: -175,
      duration: 0.6,
      ease: 'power2.inOut',
      onStart: () => {
        if (typeof window !== 'undefined') {
          (window as any).triggerAudioCue?.('flap_open');
        }
      },
      onComplete: () => {
        // 4. After flap opens: ticket auto-rises slightly (y: 0 → -40px) using GSAP, ease power2.out, duration 0.6s.
        const ticketRiseProgress = { val: 0 };
        gsap.to(ticketRiseProgress, {
          val: -40,
          duration: 0.6,
          ease: 'power2.out',
          onStart: () => {
            if (typeof window !== 'undefined') {
              (window as any).triggerAudioCue?.('ticket_pull');
            }
          },
          onUpdate: () => {
            dragY.set(ticketRiseProgress.val);
          },
          onComplete: () => {
            // 5. Only AFTER the peek animation completes does drag become enabled
            setIsDragEnabled(true);
          }
        });
      }
    }, '+=0.4');
  }, [dragY]);

  // Monitor dragY to trigger the transition
  useEffect(() => {
    const unsubscribe = dragY.on('change', (latest) => {
      if (latest <= -220 && !hasTriggered) {
        setHasTriggered(true);
        setIsDragEnabled(false);
        setIsExiting(true);
      }
    });
    return () => unsubscribe();
  }, [dragY, hasTriggered]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center perspective-[1200px] z-30 overflow-hidden bg-black/40 backdrop-blur-sm">
      <style>{`
        @keyframes ticketGlow {
          0% {
            box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.4);
          }
          100% {
            box-shadow: 0 0 0 8px rgba(255, 255, 255, 0);
          }
        }
      `}</style>

      {/* Envelope Container */}
      <motion.div 
        ref={envelopeRef} 
        style={{ 
          transformStyle: 'preserve-3d',
          opacity: envelopeOpacity,
          scale: envelopeScale
        }}
        className="relative w-[320px] h-[200px] sm:w-[400px] sm:h-[250px]"
      >
        {/* Envelope Back Panel */}
        <div className="absolute inset-0 bg-neutral-900 border border-white/10 shadow-2xl rounded-md z-10" />
        
        {/* The Ticket (Draggable inside the envelope pocket) */}
        <motion.div 
          ref={ticketRef}
          drag={isDragEnabled ? "y" : false}
          dragConstraints={{ top: -300, bottom: 40 }}
          dragElastic={0.08}
          style={{ y: dragY }}
          onDragStart={() => {
            setIsDragging(true);
            if (typeof window !== 'undefined') {
              (window as any).triggerAudioCue?.('ticket_pull');
            }
          }}
          onDragEnd={() => setIsDragging(false)}
          animate={
            isExiting 
              ? { scale: 1.06, opacity: 0 } 
              : isDragEnabled && !isDragging 
                ? { scale: [1, 1.012, 1] } 
                : { scale: 1, opacity: 1 }
          }
          transition={
            isExiting 
              ? { duration: 0.4, ease: "easeOut" } 
              : isDragEnabled && !isDragging 
                ? { repeat: Infinity, duration: 2, ease: "easeInOut" } 
                : { duration: 0.2 }
          }
          onAnimationComplete={() => {
            if (isExiting) {
              onOpened();
            }
          }}
          whileDrag={{ cursor: 'grabbing' }}
          className="absolute left-1/2 -translate-x-1/2 bottom-[10px] w-[270px] h-[360px] sm:w-[340px] sm:h-[450px] bg-neutral-950 rounded-lg border border-white/10 z-20 shadow-[0_15px_50px_rgba(0,0,0,0.8)] overflow-hidden cursor-grab flex flex-col items-center justify-between p-6"
        >
          {/* Pulsing glow ring around the ticket top edge */}
          {isDragEnabled && !isDragging && !isExiting && (
            <div 
              className="absolute -top-1 left-1/2 -translate-x-1/2 w-[90%] h-3 rounded-full pointer-events-none"
              style={{
                animation: 'ticketGlow 1.5s infinite ease-out'
              }}
            />
          )}

          {/* Grab Bar handle */}
          {isDragEnabled && (
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/20 rounded-full" />
          )}

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

          {/* Bottom spacer */}
          <div className="w-full text-center border-t border-white/5 pt-4 opacity-20 font-mono text-[8px] tracking-widest text-white">
            <span>VIP INVITATION</span>
          </div>
        </motion.div>
        
        {/* Envelope Front Pocket (Lower triangle) */}
        <div 
          className="absolute inset-0 bg-[#1e1e1e] rounded-b-md border-t border-white/5 z-30 pointer-events-none" 
          style={{ 
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 30%, 50% 60%, 0% 30%)' 
          }} 
        />

        {/* Envelope Front Pocket Subtle Inner Shadow */}
        <div 
          className="absolute inset-0 rounded-b-md pointer-events-none z-30 shadow-[inset_0_-12px_24px_rgba(0,0,0,0.8)]"
          style={{ 
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 30%, 50% 60%, 0% 30%)' 
          }} 
        />
        
        {/* Envelope Flap (Top fold) */}
        <div 
          ref={flapRef}
          className="absolute top-0 left-0 w-full h-[60%] z-40 pointer-events-none"
          style={{ 
            transformOrigin: 'top center',
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Clipped Flap Background */}
          <div 
            className="absolute inset-0 bg-neutral-800"
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)'
            }}
          />

          {/* Wax seal SVG centered on flap: circle with "IN" initials, stroke white/20 */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-12 rounded-full bg-neutral-950 border border-white/20 shadow-xl flex items-center justify-center backdrop-blur-md">
            <svg className="w-8 h-8 text-white/30" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
              <text 
                x="50" 
                y="58" 
                textAnchor="middle" 
                className="font-bold text-[22px] fill-white/60 tracking-wider select-none font-sans"
              >
                IN
              </text>
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

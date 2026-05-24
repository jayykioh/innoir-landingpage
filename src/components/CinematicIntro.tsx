'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subtitle1Ref = useRef<HTMLDivElement>(null);
  const subtitle2Ref = useRef<HTMLDivElement>(null);
  
  // Video backdrop ref
  const videoRef = useRef<HTMLVideoElement>(null);
  const recordingDotRef = useRef<HTMLDivElement>(null);
  
  // Morph refs
  const envelopeSilhouetteRef = useRef<HTMLDivElement>(null);

  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.oncanplaythrough = () => setVideoLoaded(true);
      setTimeout(() => setVideoLoaded(true), 1500);
    }
  }, []);

  useEffect(() => {
    if (!videoLoaded) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: onComplete,
    });

    // --- INITIAL STATES ---
    gsap.set('.title-char', { opacity: 0, scale: 1.3, y: 35, rotateX: 30, filter: 'blur(8px)' });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'center' });
    gsap.set('.sub1-char', { opacity: 0, y: 15, filter: 'blur(4px)' });
    gsap.set('.sub2-char', { opacity: 0, y: 15, filter: 'blur(4px)' });
    
    // Video starts completely dark and blurred
    gsap.set(videoRef.current, { opacity: 0, filter: 'blur(20px) brightness(0)' });
    gsap.set(recordingDotRef.current, { opacity: 0 });
    gsap.set(envelopeSilhouetteRef.current, { opacity: 0, scale: 0.8, y: 0, rotation: 0 });

    // --- TIMELINE ---

    // 1. HIGH-END TEXT REVEAL
    tl.addLabel("text_reveal", 0)
      .to('.title-char', { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        rotateX: 0, 
        filter: 'blur(0px)', 
        stagger: 0.08, 
        ease: 'power4.out', 
        duration: 1.2 
      }, "text_reveal")
      .to(lineRef.current, { scaleX: 1, ease: 'power3.out', duration: 0.8 }, "text_reveal+=0.8")
      .to('.sub1-char', { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.03, ease: 'power3.out', duration: 0.8 }, "text_reveal+=1.0")
      .to('.sub2-char', { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.03, ease: 'power3.out', duration: 0.8 }, "text_reveal+=1.2");

    // 2. AMBIENT SHIMMERING BACKGROUND FADE-IN (BLURRED VIDEO Backing)
    tl.addLabel("ambient_bg", 2.2)
      .to(videoRef.current, { 
        opacity: 0.35, 
        filter: 'blur(12px) brightness(0.25)', 
        duration: 1.5, 
        ease: 'power2.out',
        onStart: () => {
          if (videoRef.current) {
            videoRef.current.play().catch(e => console.log('Autoplay blocked:', e));
          }
        }
      }, "ambient_bg")
      .to(recordingDotRef.current, { opacity: 0.4, duration: 0.5 }, "ambient_bg+=0.5")
      // Slow elegant text expand/letter-spacing shift
      .to('.title-char', { 
        letterSpacing: '0.12em', 
        duration: 2.5, 
        ease: 'power1.out' 
      }, "ambient_bg");

    // 3. SUBTITLES DISSOLVE
    tl.addLabel("subtitles_exit", 3.0)
      .to([lineRef.current, subtitle1Ref.current, subtitle2Ref.current], { 
        opacity: 0, 
        y: -10, 
        filter: 'blur(6px)', 
        stagger: 0.05, 
        duration: 0.8, 
        ease: 'power3.inOut' 
      }, "subtitles_exit");

    // 4. TEXT CONVERGENCE & ENVELOPE SILHOUETTE MORPH
    tl.addLabel("envelope_morph", 4.8)
      .to('.title-char', {
        x: (i, target, targets) => {
          const center = (targets.length - 1) / 2;
          return (center - i) * 32; // converge to center
        },
        scale: 0.3,
        opacity: 0,
        filter: 'blur(12px)',
        duration: 0.8,
        ease: 'power3.inOut',
      }, "envelope_morph")
      // Explicitly hide all text container layers immediately after convergence completes
      .set([titleContainerRef.current, lineRef.current, subtitle1Ref.current, subtitle2Ref.current], { display: 'none' }, "envelope_morph+=0.8")
      // Bring in glassmorphic envelope outline
      .fromTo(envelopeSilhouetteRef.current, 
        { opacity: 0, scale: 0.7, rotateX: 30 },
        { opacity: 1, scale: 1, rotateX: 0, duration: 0.8, ease: 'power3.out' },
        "envelope_morph+=0.4"
      )
      // High-end envelope drop into opening scene
      .to(envelopeSilhouetteRef.current, { 
        y: '70vh', 
        rotation: -6, 
        scale: 0.95,
        duration: 1.0, 
        ease: 'power3.in' 
      }, "envelope_morph+=1.2")
      // Clean fade out of video backdrop to match envelope landing
      .to(videoRef.current, { opacity: 0, duration: 0.8 }, "envelope_morph+=1.6")
      .to(recordingDotRef.current, { opacity: 0, duration: 0.4 }, "envelope_morph+=1.2")
      .to({}, { duration: 0.4 }); // Hold frame for exact settle

    return () => {
      tl.kill();
    };
  }, [videoLoaded, onComplete]);

  // Utility to split text into spans
  const splitText = (text: string, className: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className={`inline-block ${className} ${char === ' ' ? 'w-[0.3em]' : ''}`}>
        {char}
      </span>
    ));
  };

  return (
    <div ref={containerRef} className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden z-40 text-white">
      {!videoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
          <div className="text-white/50 text-sm font-mono tracking-widest animate-pulse">LOADING</div>
        </div>
      )}

      {/* --- Ambient Video Backdrop (Blurred & Darkened) --- */}
      <video
        ref={videoRef}
        src="/videos/grandopening.mp4"
        className="absolute inset-0 w-full h-full object-cover z-10"
        playsInline
        muted
        preload="auto"
        loop
      />
      
      {/* Subtle vignettes */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black z-15 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)] z-15 pointer-events-none" />

      {/* Recording dot indicator (Minimal & aesthetic) */}
      <div ref={recordingDotRef} className="absolute bottom-8 right-8 z-20 flex items-center gap-2 font-mono text-[9px] text-white/50 tracking-wider">
        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        REC &middot; ACTIVE
      </div>

      {/* --- Intro Content Overlay --- */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none px-4">
        
        {/* Subtitles (Reveal/Exit) */}
        <div className="flex flex-col items-center text-center">
          <div ref={titleContainerRef} className="font-display font-black text-5xl sm:text-7xl md:text-8xl leading-none tracking-tighter uppercase mb-4">
            <span className="flex gap-[0.02em] md:gap-[0.05em] justify-center">
              {splitText("INNOIR", "title-char")}
            </span>
          </div>
          
          <div ref={lineRef} className="w-[100px] md:w-[150px] h-[1px] bg-white/20 my-4" />
          
          <div ref={subtitle1Ref} className="font-mono text-[8px] md:text-[10px] tracking-[0.35em] text-white/60 uppercase mb-1.5">
            {splitText("GRAND OPENING", "sub1-char")}
          </div>
          <div ref={subtitle2Ref} className="font-mono text-[8px] md:text-[10px] tracking-[0.35em] text-white/40 uppercase">
            {splitText("03.06.2026 — DA NANG", "sub2-char")}
          </div>
        </div>

        {/* --- High-end Envelope Silhouette Morph (Fades in over centered text) --- */}
        <div 
          ref={envelopeSilhouetteRef} 
          className="absolute w-24 h-16 sm:w-32 sm:h-20 bg-white/5 border border-white/10 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex items-center justify-center overflow-hidden backdrop-blur-md pointer-events-none"
        >
          {/* Glassmorphic flap divider */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white/5 border-b border-white/10" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }} />
          {/* Wax seal mimic */}
          <div className="w-5 h-5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shadow-lg">
            <span className="font-sans font-bold text-[8px] text-white/40 tracking-tighter">IN</span>
          </div>
        </div>
      </div>
    </div>
  );
}

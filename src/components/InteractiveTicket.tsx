'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(CustomEase);
  CustomEase.create('heavyDrop', 'M0,0 C0.3,0 0.7,0.1 1,1');
}
import confetti from 'canvas-confetti';
import { MapPin, Calendar, Copy } from 'lucide-react';

export default function InteractiveTicket({ 
  guestName, 
  isVIP = false,
  previewMode = false
}: { 
  guestName: string, 
  isVIP?: boolean,
  previewMode?: boolean
}) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const ticketWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load RSVP state
  useEffect(() => {
    if (previewMode) return;

    document.body.style.overflowY = 'auto';
    (document.body.style as any).webkitOverflowScrolling = 'touch';

    const saved = localStorage.getItem(`rsvp_${guestName}`);
    if (saved === 'confirmed') {
      Promise.resolve().then(() => setIsConfirmed(true));
    }

    return () => { document.body.style.overflowY = ''; }
  }, [guestName, previewMode]);

  // Framer Motion 3D Tilt Setup
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-12, 12]);

  // Proper holographic shader simulation gradient calculations
  const shineOpacity = useTransform(
    [mouseXSpring, mouseYSpring],
    ([xVal, yVal]) => {
      const dist = Math.sqrt((xVal as number) ** 2 + (yVal as number) ** 2);
      // Non-linear increase: more visible at extreme tilt
      const opacity = 0.02 + 0.7 * (dist ** 2);
      return Math.min(opacity, 0.35);
    }
  );
  const shineX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const shineY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);
  
  // Rainbow iridescent shift (hue-rotate based on mouseX)
  const hueRotate = useTransform(mouseXSpring, [-0.5, 0.5], [-180, 180]);
  const hueRotateFilter = useTransform(hueRotate, (val) => `hue-rotate(${val}deg)`);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!ticketWrapperRef.current) return;
    const rect = ticketWrapperRef.current.getBoundingClientRect();
    
    // Calculate relative coordinates (-0.5 to 0.5)
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    
    x.set(relX);
    y.set(relY);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  // GSAP Animations
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const tl = gsap.timeline();

    // Phase 1: Enter from z-depth
    tl.fromTo(ticketWrapperRef.current, 
      {
        scale: 0.7,
        rotateX: 20,
        opacity: 0,
        y: 60
      },
      { 
        scale: 1, 
        rotateX: 0, 
        opacity: 1, 
        y: 0, 
        duration: 1.4, 
        ease: "power4.out",
        clearProps: "scale,rotateX,y,transform"
      }
    );

    // Phase 2: Stagger reveal of .ticket-section elements
    tl.from('.ticket-section', {
      opacity: 0,
      y: 20,
      stagger: 0.12,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.8");

    // Micro-interaction: Draw perforated line
    tl.fromTo('.perforated-line', 
      { strokeDashoffset: 800 },
      { strokeDashoffset: 0, duration: 1.2, ease: "power2.out" },
      "-=1.0"
    );

    // Fade up rotated text
    tl.from('.rotated-no', {
      opacity: 0,
      y: 10,
      duration: 1,
      ease: "power2.out"
    }, "-=0.6");

    // If initially confirmed, show stamp immediately without anim
    if (isConfirmed) {
      gsap.set('.stamp-overlay', { scale: 1, rotation: -15, opacity: 1 });
      gsap.set('.stamp-clip-circle', { attr: { r: 200 } });
    } else {
      gsap.set('.stamp-overlay', { scale: 0, rotation: -25, opacity: 0 });
      gsap.set('.stamp-clip-circle', { attr: { r: 0 } });
    }

  }, { scope: containerRef, dependencies: [] });

  const handleRSVP = () => {
    if (isConfirmed) return;
    
    // Phase 4: Stamp Animation & Confetti with rubber stamp physics
    const stampTl = gsap.timeline();
    
    // 1. Stamp scales from 2.5→0.8 (fast drop, 0.15s, ease power3.in) — simulates stamp hitting paper.
    stampTl.fromTo('.stamp-overlay',
      { scale: 2.5, rotation: -25, opacity: 0 },
      { 
        scale: 0.8, 
        rotation: -15, 
        opacity: 1, 
        duration: 0.15, 
        ease: "heavyDrop",
        onComplete: () => {
          if (typeof window !== 'undefined') {
            (window as any).triggerAudioCue?.('stamp');
          }
        }
      }
    );
    
    // 2. Then bounces to 1.0 (0.2s, ease elastic.out(2, 0.4)).
    stampTl.to('.stamp-overlay', {
      scale: 1.0,
      duration: 0.2,
      ease: "elastic.out(2, 0.4)"
    });
    
    // 3. An ink spread effect: a circle clip-path expands from stamp center outward (clipPath scale 0→1.2, 0.3s)
    stampTl.fromTo('.stamp-clip-circle',
      { attr: { r: 0 } },
      { attr: { r: 120 }, duration: 0.3, ease: "power2.out" },
      "<" // Start at the same time as the bounce to 1.0 (contact moment)
    );

    // 4. Confetti fires 80ms after stamp hits (the "splat" moment)
    // The hit occurs at 0.15s, so 0.15s + 80ms = 230ms delay
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 60,
        colors: isVIP ? ['#FFD700', '#ffffff', '#22c55e'] : ['#22c55e', '#ffffff', '#10b981']
      });
    }, 230);

    setIsConfirmed(true);
    localStorage.setItem(`rsvp_${guestName}`, 'confirmed');
  };

  // Theming based on VIP
  const accentColor = isVIP ? '#FFD700' : '#C0C0C0';
  const vnFont = { fontFamily: 'var(--font-be-vietnam), "Be Vietnam Pro", sans-serif' };

  return (
    <div 
      ref={containerRef} 
      className={`relative z-20 w-full flex flex-col items-center justify-start px-4 perspective-[1000px] ${
        previewMode 
          ? 'h-auto py-4 justify-center overflow-visible' 
          : 'min-h-[100dvh] pt-8 pb-[15vh] sm:justify-center sm:py-20 sm:pb-0 overflow-y-auto'
      }`}
      style={{ WebkitOverflowScrolling: 'touch' } as any}
    >
      
      {/* ── BACKGROUND VIDEO OVERLAY ── */}
      {!previewMode && (
        <>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-[0.15] z-0 pointer-events-none"
            style={{ willChange: 'opacity' }}
          >
            <source src="/videos/grandopening.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />
        </>
      )}

      {/* ── 3D TILT WRAPPER ── */}
      <motion.div
        ref={ticketWrapperRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform"
        }}
        className="relative w-full max-w-[800px] cursor-crosshair group touch-pan-y"
      >
        {/* Holographic Shine Overlay */}
        <motion.div 
          className="absolute inset-0 z-50 pointer-events-none"
          style={{
            opacity: shineOpacity,
            filter: hueRotateFilter,
            mixBlendMode: 'overlay',
            background: `
              radial-gradient(circle at calc(${shineX}% ) calc(${shineY}% ), rgba(255,255,255,0.12) 0%, transparent 60%),
              linear-gradient(135deg, 
                rgba(255, 0, 128, 0.25) 0%, 
                rgba(255, 153, 0, 0.25) 20%, 
                rgba(102, 255, 0, 0.25) 40%, 
                rgba(0, 255, 255, 0.25) 60%, 
                rgba(0, 51, 255, 0.25) 80%, 
                rgba(153, 0, 255, 0.25) 100%
              )
            `
          }}
        />

        {/* ── THE TICKET (Swiss Grid Boarding Pass) ── */}
        <div className="bg-[#0A0A0A]/95 backdrop-blur-md border border-white/15 w-full flex flex-col md:flex-row relative shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9)] overflow-hidden">
          
          {/* VIP Badge */}
          {isVIP && (
            <div className="absolute top-0 right-0 bg-[#FFD700] text-black font-mono text-[9px] font-bold px-3 py-1 tracking-widest uppercase z-10">
              VIP ACCESS
            </div>
          )}

          {/* LEFT COLUMN (42%) */}
          <div className="w-full md:w-[42%] min-w-0 flex-shrink-0 relative p-4 sm:p-6 md:p-6 lg:p-8 flex flex-col ticket-section">
            {/* Far left ruled line */}
            <div className="absolute left-6 lg:left-8 top-0 bottom-0 w-[1px] bg-white/10 hidden md:block" />
            
            {/* Rotated NO. */}
            <div className="rotated-no absolute left-3 lg:left-4 bottom-12 -rotate-90 origin-left text-[9px] text-[#C0C0C0] tracking-[0.4em] font-mono hidden md:block">
              NO. 0003-2026
            </div>

            <div className="md:pl-6 lg:pl-8 flex flex-col h-full justify-between min-w-0">
              <div className="min-w-0">
                <h1 className="font-display font-black text-4xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl text-[#E8E8E8] tracking-tighter leading-none -ml-0.5 break-normal">
                  INNOIR
                </h1>
                <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-[#C0C0C0] uppercase mt-2">
                  GRAND OPENING
                </p>

                {/* Decorative Rule */}
                <div className="w-full h-[1px] bg-white/15 my-3 sm:my-6 lg:my-8 relative flex items-center justify-between">
                  <div className={`w-1.5 h-1.5 rotate-45`} style={{ backgroundColor: accentColor }} />
                  <div className={`w-1.5 h-1.5 rotate-45`} style={{ backgroundColor: accentColor }} />
                </div>
              </div>

              <div className="mt-4 sm:mt-12 md:mt-auto min-w-0">
                <p className="font-mono text-[8px] sm:text-[9px] text-[#C0C0C0] tracking-[0.3em] uppercase mb-2">HONORED GUEST</p>
                <p className="font-display italic text-2xl sm:text-3xl md:text-2xl lg:text-3xl xl:text-4xl text-[#E8E8E8] tracking-tight truncate" style={vnFont} title={guestName}>
                  {guestName}
                </p>
              </div>
            </div>
          </div>

          {/* PERFORATED DIVIDER */}
          <div className="hidden md:block w-[1px] relative border-l border-dashed border-white/20">
            <svg className="absolute inset-0 w-[2px] h-full -ml-[1px]" preserveAspectRatio="none">
              <line 
                x1="1" 
                y1="0" 
                x2="1" 
                y2="100%" 
                className="perforated-line" 
                stroke="rgba(255,255,255,0.4)" 
                strokeWidth="2" 
                strokeDasharray="8 6" 
                strokeDashoffset="800" 
              />
            </svg>
            <div className="absolute top-0 -left-2 w-4 h-4 rounded-full bg-black border-b border-white/20 -translate-y-1/2" />
            <div className="absolute bottom-0 -left-2 w-4 h-4 rounded-full bg-black border-t border-white/20 translate-y-1/2" />
          </div>

          <div className="md:hidden h-[1px] w-full border-t border-dashed border-white/20 relative">
             <div className="absolute left-0 -top-2 w-4 h-4 rounded-full bg-black border-r border-white/20 -translate-x-1/2" />
             <div className="absolute right-0 -top-2 w-4 h-4 rounded-full bg-black border-l border-white/20 translate-x-1/2" />
          </div>

          {/* RIGHT COLUMN (58%) */}
          <div className="w-full md:w-[58%] min-w-0 flex-grow relative p-4 sm:p-6 md:p-6 lg:p-8 flex flex-col justify-between ticket-section">
            
            {/* Top: Date Block */}
            <div className="flex flex-col items-start md:items-end md:text-right min-w-0">
              <div className="flex flex-wrap items-baseline gap-1 sm:gap-2">
                <span className="font-display font-black text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl leading-none text-[#E8E8E8]">03</span>
                <span className="font-display font-light text-2xl sm:text-3xl md:text-2xl lg:text-3xl text-white/30">/</span>
                <span className="font-display font-black text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl leading-none text-[#E8E8E8]">JUN</span>
              </div>
              <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#C0C0C0] uppercase mt-1 whitespace-nowrap">
                TUESDAY &middot; 19:00 &middot; 2026
              </p>
            </div>

            <div className="w-full h-[1px] bg-white/10 my-3 sm:my-6 lg:my-8" />

            {/* Mid: Location */}
            <div className="flex flex-row justify-between items-center md:items-end gap-4 min-w-0">
              <div className="min-w-0">
                <p className="font-sans font-bold text-base sm:text-lg md:text-base lg:text-lg xl:text-xl text-[#E8E8E8] tracking-tight whitespace-nowrap">D13 AN THUONG 34</p>
                <p className="font-mono text-[8px] sm:text-[9px] md:text-[8px] lg:text-[9px] tracking-widest text-[#C0C0C0] uppercase mt-1 whitespace-nowrap">NGU HANH SON &middot; DA NANG</p>
              </div>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-[#C0C0C0] hover:text-white hover:scale-110 active:scale-95 transition-all duration-200 flex-shrink-0 p-1 flex items-center justify-center rounded-full hover:bg-white/5"
                aria-label="View location on Google Maps"
              >
                <MapPin size={22} strokeWidth={1.5} />
              </a>
            </div>

            {/* Bottom: Quote */}
            <div className="mt-4 sm:mt-8 md:mt-12 md:text-right min-w-0">
              <p className="font-sans font-light italic text-[11px] sm:text-[12px] md:text-[11px] lg:text-[12px] xl:text-[13px] text-white/50 leading-relaxed max-w-xs lg:max-w-sm md:ml-auto">
                &ldquo;INNOIR is the brainchild of Phu, Luc, and Tai. Your presence is our absolute honor. We hope to see you there.&rdquo;
              </p>
            </div>

            <div className="mt-4 sm:mt-8 md:mt-12 pt-3 sm:pt-4 lg:pt-5 border-t border-white/10 flex justify-between items-center font-mono text-[8px] tracking-[0.2em] text-[#C0C0C0] uppercase">
              <span>EST. 2025 // VN</span>
              <span>INVITATION ONLY</span>
            </div>

          </div>

          {/* GREEN CONFIRMED STAMP WITH INK BLEED */}
          <div 
            className="stamp-overlay absolute top-4 right-4 md:top-10 md:right-10 pointer-events-none z-20 mix-blend-screen opacity-0 w-[120px] h-[120px] md:w-[180px] md:h-[180px]"
            style={{ willChange: 'transform, opacity' }}
          >
             <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <defs>
                  <clipPath id="stamp-clip">
                    <circle cx="100" cy="100" r="200" className="stamp-clip-circle" />
                  </clipPath>
                </defs>
                <g clipPath="url(#stamp-clip)">
                  <circle cx="100" cy="100" r="90" fill="none" stroke="#22c55e" strokeWidth="4" strokeDasharray="4 2" />
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#22c55e" strokeWidth="2" />
                  <text x="50%" y="53%" dominantBaseline="middle" textAnchor="middle" fill="#22c55e" fontSize="24" fontFamily="sans-serif" fontWeight="900" letterSpacing="2">
                    CONFIRMED
                  </text>
                  <path id="curve" fill="transparent" d="M 30,100 A 70,70 0 1,1 170,100 A 70,70 0 1,1 30,100" />
                  <text fill="#22c55e" fontSize="12" fontWeight="bold" letterSpacing="4">
                    <textPath href="#curve" startOffset="50%" textAnchor="middle">
                      INNOIR &middot; 03.06.2026 &middot; INNOIR &middot; 03.06.2026 &middot;
                    </textPath>
                  </text>
                </g>
             </svg>
          </div>

        </div>
      </motion.div>

      {/* ── ACTION BUTTONS (Below Card) ── */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-12 ticket-section w-full max-w-[800px] justify-center px-4">
        <button 
          onClick={handleRSVP}
          disabled={isConfirmed}
          className="rsvp-btn w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-[#E8E8E8] font-mono text-[10px] tracking-[0.2em] uppercase relative overflow-hidden group transition-colors duration-300 disabled:pointer-events-none disabled:border-green-500/40 disabled:text-green-500"
        >
          {/* Underline progress on hover */}
          <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white scale-x-0 origin-left transition-transform duration-200 group-hover:scale-x-100" />
          
          {/* Cross-fade text */}
          <div className="relative h-4 w-40 flex items-center justify-center pointer-events-none">
            <span className={`absolute transition-all duration-300 flex items-center gap-2 ${isConfirmed ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
              <span className="w-2 h-2 rounded-full border border-current" />
              CONFIRM PRESENCE
            </span>
            <span className={`absolute transition-all duration-300 flex items-center gap-2 text-green-500 ${isConfirmed ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              CONFIRMED ✓
            </span>
          </div>
        </button>
        
        <div className="flex flex-row gap-4 w-full sm:w-auto">
          <a
            href="https://calendar.google.com"
            target="_blank"
            rel="noreferrer"
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-4 border border-white/20 text-[#C0C0C0] font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-200 hover:border-white hover:text-white"
          >
            <Calendar size={12} />
            ADD TO CAL
          </a>
          <button 
            onClick={() => {
              navigator.clipboard.writeText("INNOIR Grand Opening - D13 An Thuong 34, Da Nang - June 3rd, 2026");
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-4 border border-white/20 text-[#C0C0C0] font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-200 hover:border-white hover:text-white"
          >
            <Copy size={12} />
            {copied ? 'COPIED' : 'DETAILS'}
          </button>
        </div>
      </div>

    </div>
  );
}

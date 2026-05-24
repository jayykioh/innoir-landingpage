'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import confetti from 'canvas-confetti';
import { MapPin, Calendar, Copy } from 'lucide-react';

export default function InteractiveTicket({ guestName, isVIP = false }: { guestName: string, isVIP?: boolean }) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const ticketWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load RSVP state
  useEffect(() => {
    const saved = localStorage.getItem(`rsvp_${guestName}`);
    if (saved === 'confirmed') {
      Promise.resolve().then(() => setIsConfirmed(true));
    }
  }, [guestName]);

  // Framer Motion 3D Tilt Setup
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-12, 12]);

  // Chrome shine gradient calculation
  const shineOpacity = useTransform(mouseXSpring, [-0.5, 0.5], [0, 0.15]);
  const shineX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const shineY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);

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

    // Phase 1: Enter
    tl.from(ticketWrapperRef.current, {
      opacity: 0,
      y: 40,
      rotateX: 8,
      duration: 1.2,
      ease: "power4.out"
    });

    // Phase 2: Stagger reveal
    tl.from('.ticket-section', {
      opacity: 0,
      y: 20,
      stagger: 0.12,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6");

    // Micro-interaction: Draw perforated line
    tl.fromTo('.perforated-line', 
      { strokeDashoffset: 1000 },
      { strokeDashoffset: 0, duration: 1.5, ease: "power2.out" },
      "-=0.8"
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
    } else {
      gsap.set('.stamp-overlay', { scale: 0, rotation: -25, opacity: 0 });
    }

  }, { scope: containerRef, dependencies: [] });

  const handleRSVP = () => {
    if (isConfirmed) return;
    
    // Phase 4: Stamp Animation & Confetti
    gsap.to('.rsvp-btn', { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
    
    gsap.fromTo('.stamp-overlay',
      { scale: 0, rotation: -25, opacity: 0 },
      { scale: 1, rotation: -15, opacity: 1, ease: "elastic.out(1, 0.5)", duration: 0.8 }
    );

    confetti({
      particleCount: 80,
      spread: 60,
      colors: isVIP ? ['#FFD700', '#ffffff', '#22c55e'] : ['#22c55e', '#ffffff', '#10b981']
    });

    setIsConfirmed(true);
    localStorage.setItem(`rsvp_${guestName}`, 'confirmed');
  };

  // Theming based on VIP
  const accentColor = isVIP ? '#FFD700' : '#C0C0C0';
  const vnFont = { fontFamily: 'var(--font-be-vietnam), "Be Vietnam Pro", sans-serif' };

  return (
    <div ref={containerRef} className="relative z-20 w-full min-h-screen flex flex-col items-center justify-center px-4 py-20 perspective-[1000px]">
      
      {/* ── BACKGROUND VIDEO OVERLAY ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-[0.15] z-0 pointer-events-none mix-blend-screen"
      >
        <source src="/videos/grandopening.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />

      {/* ── 3D TILT WRAPPER ── */}
      <motion.div
        ref={ticketWrapperRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="relative w-full max-w-[800px] cursor-crosshair group"
      >
        {/* Chrome Shine Overlay */}
        <motion.div 
          className="absolute inset-0 z-50 pointer-events-none blend-overlay"
          style={{
            opacity: shineOpacity,
            background: `radial-gradient(circle at calc(${shineX}% ) calc(${shineY}% ), rgba(255,255,255,0.4) 0%, transparent 60%)`
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
          <div className="w-full md:w-[42%] min-w-0 flex-shrink-0 relative p-6 sm:p-8 md:p-6 lg:p-8 flex flex-col ticket-section">
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
                <div className="w-full h-[1px] bg-white/15 my-6 lg:my-8 relative flex items-center justify-between">
                  <div className={`w-1.5 h-1.5 rotate-45`} style={{ backgroundColor: accentColor }} />
                  <div className={`w-1.5 h-1.5 rotate-45`} style={{ backgroundColor: accentColor }} />
                </div>
              </div>

              <div className="mt-12 md:mt-auto min-w-0">
                <p className="font-mono text-[8px] sm:text-[9px] text-[#C0C0C0] tracking-[0.3em] uppercase mb-2">HONORED GUEST</p>
                <p className="font-display italic text-2xl sm:text-3xl md:text-2xl lg:text-3xl xl:text-4xl text-[#E8E8E8] tracking-tight truncate" style={vnFont} title={guestName}>
                  {guestName}
                </p>
              </div>
            </div>
          </div>

          {/* PERFORATED DIVIDER */}
          <div className="hidden md:block w-[1px] relative border-l border-dashed border-white/20">
            {/* SVG line for animation fallback if needed, but CSS dashed border is cleaner. Let's use SVG for drawSVG animation as requested */}
            <svg className="absolute inset-0 w-[2px] h-full -ml-[1px]" preserveAspectRatio="none">
              <line x1="1" y1="0" x2="1" y2="100%" className="perforated-line" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="6 6" />
            </svg>
            <div className="absolute top-0 -left-2 w-4 h-4 rounded-full bg-black border-b border-white/20 -translate-y-1/2" />
            <div className="absolute bottom-0 -left-2 w-4 h-4 rounded-full bg-black border-t border-white/20 translate-y-1/2" />
          </div>

          <div className="md:hidden h-[1px] w-full border-t border-dashed border-white/20 relative">
             <div className="absolute left-0 -top-2 w-4 h-4 rounded-full bg-black border-r border-white/20 -translate-x-1/2" />
             <div className="absolute right-0 -top-2 w-4 h-4 rounded-full bg-black border-l border-white/20 translate-x-1/2" />
          </div>

          {/* RIGHT COLUMN (58%) */}
          <div className="w-full md:w-[58%] min-w-0 flex-grow relative p-6 sm:p-8 md:p-6 lg:p-8 flex flex-col justify-between ticket-section">
            
            {/* Top: Date Block */}
            <div className="flex flex-col items-start md:items-end md:text-right min-w-0">
              <div className="flex flex-wrap items-baseline gap-1 sm:gap-2">
                <span className="font-display font-black text-5xl sm:text-6xl md:text-5xl lg:text-5xl xl:text-6xl leading-none text-[#E8E8E8]">03</span>
                <span className="font-display font-light text-2xl sm:text-3xl md:text-2xl lg:text-3xl text-white/30">/</span>
                <span className="font-display font-black text-5xl sm:text-6xl md:text-5xl lg:text-5xl xl:text-6xl leading-none text-[#E8E8E8]">JUN</span>
              </div>
              <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#C0C0C0] uppercase mt-1 whitespace-nowrap">
                TUESDAY &middot; 19:00 &middot; 2026
              </p>
            </div>

            <div className="w-full h-[1px] bg-white/10 my-6 lg:my-8" />

            {/* Mid: Location */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 min-w-0">
              <div className="min-w-0">
                <p className="font-sans font-bold text-base sm:text-lg md:text-base lg:text-lg xl:text-xl text-[#E8E8E8] tracking-tight whitespace-nowrap">D13 AN THUONG 34</p>
                <p className="font-mono text-[8px] sm:text-[9px] md:text-[8px] lg:text-[9px] tracking-widest text-[#C0C0C0] uppercase mt-1 whitespace-nowrap">NGU HANH SON &middot; DA NANG</p>
              </div>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="text-[#C0C0C0] hover:text-white transition-colors flex-shrink-0">
                <MapPin size={22} strokeWidth={1.5} />
              </a>
            </div>

            {/* Bottom: Quote */}
            <div className="mt-8 md:mt-12 md:text-right min-w-0">
              <p className="font-sans font-light italic text-[11px] sm:text-[12px] md:text-[11px] lg:text-[12px] xl:text-[13px] text-white/50 leading-relaxed max-w-xs lg:max-w-sm md:ml-auto">
                &ldquo;INNOIR is the brainchild of Phu, Luc, and Tai. Your presence is our absolute honor. We hope to see you there.&rdquo;
              </p>
            </div>

            <div className="mt-8 md:mt-12 pt-4 lg:pt-5 border-t border-white/10 flex justify-between items-center font-mono text-[8px] tracking-[0.2em] text-[#C0C0C0] uppercase">
              <span>EST. 2025 // VN</span>
              <span>INVITATION ONLY</span>
            </div>

          </div>

          {/* GREEN CONFIRMED STAMP */}
          <div className="stamp-overlay absolute top-4 right-4 md:top-10 md:right-10 pointer-events-none z-20 mix-blend-screen opacity-0 w-[120px] h-[120px] md:w-[180px] md:h-[180px]">
             <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
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
             </svg>
          </div>

        </div>
      </motion.div>

      {/* ── ACTION BUTTONS (Below Card) ── */}
      <div className="flex flex-col sm:flex-row gap-4 mt-12 ticket-section w-full max-w-[800px] justify-center px-4">
        {!isConfirmed && (
          <button 
            onClick={handleRSVP}
            className="rsvp-btn w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-[#E8E8E8] font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-200 hover:border-white hover:bg-white hover:text-black group"
          >
            <div className="w-2 h-2 rounded-full border border-current group-hover:bg-black transition-colors" />
            CONFIRM PRESENCE
          </button>
        )}
        
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

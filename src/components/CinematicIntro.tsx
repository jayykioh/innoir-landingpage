'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Preload video
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.oncanplaythrough = () => setVideoLoaded(true);
      // Fallback in case oncanplaythrough doesn't fire fast enough
      setTimeout(() => setVideoLoaded(true), 2000);
    }
  }, []);

  useEffect(() => {
    if (!videoLoaded) return;

    const tl = gsap.timeline({
      onComplete: onComplete,
    });

    // Scene 0: Blackout & Text INNOIR (Home page styled animation)
    gsap.set(textRef.current, { scale: 0.8, filter: 'blur(10px)', opacity: 0 });
    
    tl.to(textRef.current, {
      scale: 1,
      filter: 'blur(0px)',
      opacity: 1,
      duration: 1.5,
      ease: 'power3.out',
    })
    .to(textRef.current, {
      scale: 1.1,
      filter: 'blur(10px)',
      opacity: 0,
      duration: 0.8,
      delay: 0.8,
      ease: 'power3.in',
    });

    // Scene 1: Exterior Image Zoom
    tl.fromTo(imageRef.current, 
      { opacity: 0, scale: 1.0, filter: 'brightness(0.4)' },
      { opacity: 1, scale: 1.15, filter: 'brightness(1.0)', duration: 1.5, ease: 'power1.inOut' }
    )
    .to(imageRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.inOut',
    }, '+=0.2');

    // Scene 2: Video Walking Sequence
    tl.call(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(e => console.log('Video autoplay blocked:', e));
      }
    })
    .fromTo(videoRef.current,
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1.0, duration: 0.5, ease: 'power2.out' }
    )
    // Hold video for 3 seconds
    .to({}, { duration: 3.0 })
    
    // Scene 3: Interior Pan & Blur (Simulated by blurring video)
    .to(videoRef.current, {
      scale: 1.2,
      filter: 'blur(10px) brightness(0.2)',
      duration: 1.5,
      ease: 'power2.inOut'
    })
    .to(videoRef.current, {
      opacity: 0,
      duration: 0.5,
    });

    return () => {
      tl.kill();
    };
  }, [videoLoaded, onComplete]);

  return (
    <div ref={containerRef} className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden z-40">
      {/* Loading State fallback */}
      {!videoLoaded && (
        <div className="text-white/50 text-sm font-syne animate-pulse tracking-widest">
          LOADING...
        </div>
      )}

      <div 
        ref={textRef} 
        className="absolute text-white font-display font-black text-6xl md:text-8xl tracking-tighter uppercase opacity-0 z-30"
      >
        INNOIR
      </div>

      {/* Scene 1: Image */}
      <img 
        ref={imageRef}
        src="/photo/grandopening.jpg" 
        alt="INNOIR Exterior"
        className="absolute inset-0 w-full h-full object-cover opacity-0 z-20"
      />

      {/* Scene 2 & 3: Video */}
      <video
        ref={videoRef}
        src="/videos/grandopening.mp4"
        className="absolute inset-0 w-full h-full object-cover opacity-0 z-10"
        playsInline
        muted
        loop={false}
      />
    </div>
  );
}

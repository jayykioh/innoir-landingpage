'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function FloatingParticles({ isVIP = false }: { isVIP?: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate static initial particles to avoid hydration mismatch,
    // or just render them entirely on client.
    const newParticles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // vw
      y: Math.random() * 100 + 100, // start below viewport or distributed
      size: Math.random() * 8 + 4, // 4px to 12px
      duration: Math.random() * 10 + 10, // 10s to 20s
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.1,
    }));
    setParticles(newParticles);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}vw`,
            width: p.size,
            height: p.size,
            backgroundColor: isVIP ? '#FFD700' : '#ffffff',
            boxShadow: `0 0 ${p.size * 2}px ${isVIP ? 'rgba(255, 215, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'}`,
            willChange: 'transform, opacity',
          }}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, p.opacity, p.opacity, 0],
            x: p.x % 2 === 0 ? ['0vw', '2vw', '-1vw', '0vw'] : ['0vw', '-2vw', '1vw', '0vw']
          }}
          transition={{
            y: {
              duration: p.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: p.delay,
            },
            opacity: {
              duration: p.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: p.delay,
            },
            x: {
              duration: p.duration * 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.delay,
            }
          }}
        />
      ))}
    </div>
  );
}

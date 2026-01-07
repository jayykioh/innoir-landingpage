"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const SERVICES = [
    { id: 1, title: "TEES", src: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80", count: "01", season: "SS25" },
    { id: 2, title: "HOODIES", src: "https://images.unsplash.com/photo-1556906781-9a412961d289?w=800&q=80", count: "02", season: "FW24" },
    { id: 3, title: "ACCESSORIES", src: "https://images.unsplash.com/photo-1589256833024-9b33e8886b95?w=800&q=80", count: "03", season: "CORE" },
    { id: 4, title: "CUSTOMS (1-OF-1)", src: "/photo/z7407913834487_49735fe8bf1022a640133153d95902f2.jpg", count: "04", season: "EXCL" },
];

export default function Services() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Motion Values for Mouse Position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth Spring Physics
    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    // Velocity-based Rotation
    // We need to track velocity manually or use useVelocity (but useVelocity needs a motion value changing over time)
    // Simpler approach: Map x position to slight rotation based on screen center or movement
    // For true velocity tilt, we can just use a transform of x
    const rotate = useTransform(x, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-5, 5]);

    const handleMouseMove = (e: React.MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    return (
        <section
            className="relative w-full py-20 border-grid-b bg-background overflow-hidden"
            id="works"
            onMouseMove={handleMouseMove}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-12 flex items-end justify-between">
                    <h2 className="text-4xl md:text-6xl font-display font-bold uppercase mix-blend-difference text-white">Collections</h2>
                    <span className="font-mono text-sm text-gray-400">(2025)</span>
                </div>

                <div className="flex flex-col border-grid-t">
                    {SERVICES.map((item, index) => (
                        <div
                            key={item.id}
                            className="group relative flex items-center justify-between border-b border-white/20 py-8 transition-colors hover:bg-white/5 cursor-pointer"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {/* Left: Count & Title */}
                            <div className="flex items-center gap-6 md:gap-16 w-full relative z-10">
                                <span className="font-mono text-xs md:text-sm text-gray-500 w-8">{item.count}</span>

                                {/* Title with Outline Effect */}
                                <h3 className="text-5xl md:text-8xl font-display font-black uppercase transition-all duration-300
                  text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.8)] 
                  md:group-hover:text-white md:group-hover:[-webkit-text-stroke:0px] md:group-hover:translate-x-4
                  text-white md:[text-shadow:none] 
                  max-md:text-white max-md:[-webkit-text-stroke:0px]
                ">
                                    {item.title}
                                </h3>
                            </div>

                            {/* Right: Metadata & Icon */}
                            <div className="flex items-center gap-6 md:gap-12 relative z-10">
                                <span className="font-mono text-xs text-gray-500 hidden md:block">{item.season}</span>
                                <div className="relative overflow-hidden">
                                    <ArrowUpRight className="h-8 w-8 md:h-12 md:w-12 text-white transition-transform duration-300 md:group-hover:-translate-y-full md:group-hover:translate-x-full" />
                                    <ArrowUpRight className="absolute top-0 left-0 h-8 w-8 md:h-12 md:w-12 text-white -translate-x-full translate-y-full transition-transform duration-300 md:group-hover:translate-x-0 md:group-hover:translate-y-0" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Image Portal */}
            <motion.div
                style={{ x, y, rotate }}
                className="pointer-events-none fixed top-0 left-0 z-50 h-[300px] w-[250px] md:h-[400px] md:w-[320px] overflow-hidden rounded-lg hidden md:block mix-blend-difference"
            >
                {hoveredIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="relative w-full h-full"
                    >
                        <Image
                            src={SERVICES[hoveredIndex].src}
                            alt={SERVICES[hoveredIndex].title}
                            fill
                            className="object-cover grayscale contrast-125"
                        />

                        {/* Optional "Wow" Marquee inside image */}
                        <div className="absolute inset-x-0 bottom-4 overflow-hidden">
                            <div className="animate-marquee whitespace-nowrap text-[10px] font-mono font-bold uppercase text-white/80">
                                View Collection — View Collection — View Collection — View Collection —
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
}

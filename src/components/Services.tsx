"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";

const SERVICES = [
    { id: 1, title: "Apocalypse", src: "/photo/collections/apocalypse/apocalypse.jpg", count: "01", season: "FW25" },
    { id: 2, title: "Baggy Shorts", src: "/photo/collections/baggyshorts/baggyshorts.jpg", count: "02", season: "SS25" },
    { id: 3, title: "Raw Denim Pants", src: "/photo/collections/denimpants/denimpants.jpg", count: "03", season: "CORE" },
    { id: 4, title: "T-Shirts", src: "/photo/collections/tshirts/tshirt.png", count: "04", season: "ESSENTIAL" },
    { id: 5, title: "Outerwear", src: "/photo/owner.jpg", count: "05", season: "FW25" },
    { id: 6, title: "Accessories", src: "/photo/collections/accesories/accesories.jpg", count: "06", season: "ALL" },
];

export default function Services() {
    const [activeImage, setActiveImage] = useState<number | null>(0);
    const [isMobile, setIsMobile] = useState(false);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            
            // Set initial GSAP layout correctly based on viewport
            gsap.set(itemRefs.current, {
                flexGrow: (i) => i === 0 ? 1 : 0,
                flexBasis: (i) => i === 0 ? "0%" : (mobile ? "4.5rem" : "5rem"),
                width: mobile ? "100%" : "auto",
                height: mobile ? "auto" : "100%",
            });
        };
        checkMobile();
        
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleInteraction = (index: number) => {
        if (activeImage === index) return;
        setActiveImage(index);

        // Buttery smooth GSAP flex animation
        gsap.to(itemRefs.current, {
            flexGrow: (i) => i === index ? 1 : 0,
            flexBasis: (i) => i === index ? "0%" : (isMobile ? "4.5rem" : "5rem"),
            duration: 0.85,
            ease: "expo.out", // Extra smooth exponential easing
            overwrite: "auto"
        });
    };

    return (
        <section
            className="relative w-full py-20 border-grid-b bg-background overflow-hidden"
            id="works"
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-12 flex items-end justify-between">
                    <h2 className="text-4xl md:text-6xl font-display font-bold uppercase text-white">Collections</h2>
                    <span className="font-mono text-sm text-gray-400">(2025)</span>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="w-full flex justify-center"
                >
                    <div className="flex flex-col md:flex-row w-full items-stretch justify-center gap-2 h-[600px] lg:h-[700px]">
                        {SERVICES.map((item, index) => {
                            const isActive = activeImage === index;
                            
                            return (
                                <div
                                    key={item.id}
                                    ref={(el) => { itemRefs.current[index] = el; }}
                                    className="relative cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 group bg-black/20 shrink-0"
                                    onClick={() => handleInteraction(index)}
                                    onMouseEnter={() => !isMobile && handleInteraction(index)}
                                >
                                    <Image
                                        src={item.src}
                                        alt={item.title}
                                        fill
                                        className={`object-cover transition-all duration-1000 ease-out ${isActive ? 'grayscale-0 contrast-100 scale-100' : 'grayscale contrast-125 scale-110 group-hover:scale-105'}`}
                                    />
                                    
                                    {/* Dark Gradient Overlay for text readability (only when active) */}
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.4 }}
                                                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none"
                                            />
                                        )}
                                    </AnimatePresence>

                                    {/* Text Overlay for Active Item */}
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 15 }}
                                                transition={{ duration: 0.4, delay: 0.15 }}
                                                className="absolute bottom-0 left-0 w-full p-6 md:p-10 flex flex-col justify-end pointer-events-none min-w-[200px]"
                                            >
                                                <div className="flex items-center gap-4 mb-2">
                                                    <span className="font-mono text-sm md:text-base text-white/80">{item.count}</span>
                                                    <span className="font-mono text-xs md:text-sm text-white/50">{item.season}</span>
                                                </div>
                                                <h3 className="text-4xl md:text-6xl lg:text-7xl font-display font-black uppercase text-white leading-[0.9] tracking-tighter shadow-black drop-shadow-2xl">
                                                    {item.title}
                                                </h3>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Collapsed State Title (Vertical Text on Desktop) */}
                                    <AnimatePresence>
                                        {!isActive && !isMobile && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="absolute inset-0 flex flex-col items-center justify-between py-8 bg-black/50 hover:bg-black/30 transition-colors"
                                            >
                                                <span className="font-mono text-xs text-white/50">{item.count}</span>
                                                <span className="font-display font-bold text-white/80 uppercase tracking-widest [writing-mode:vertical-lr] rotate-180 whitespace-nowrap text-xl">
                                                    {item.title}
                                                </span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    
                                    {/* Collapsed State Title (Horizontal Text on Mobile) */}
                                    <AnimatePresence>
                                        {!isActive && isMobile && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="absolute inset-0 flex items-center justify-between px-6 bg-black/60"
                                            >
                                                <span className="font-display font-bold text-white/80 uppercase tracking-widest whitespace-nowrap text-lg">
                                                    {item.title}
                                                </span>
                                                <span className="font-mono text-xs text-white/50">{item.count}</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

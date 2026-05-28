"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export default function Location() {
    const mapRef = useRef<HTMLDivElement | null>(null);

    const location = {
        title: 'INNOIR STORE',
        lines: ['D13 An Thuong 34', 'Son Tra, Da Nang'],
        coords: { lat: 16.04956116858136, lng: 108.24435253779995 }
    };

    return (
        <section className="relative w-full bg-background text-white border-grid-b" id="location">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 py-24 md:py-32">
                    {/* Left: Sticky Details */}
                    <div className="md:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="sticky top-32 flex flex-col justify-between h-full"
                        >
                            <div>
                                <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/50 mb-8">
                                    Visit Us
                                </p>
                                <h2 className="text-5xl md:text-6xl font-display font-bold uppercase tracking-tighter mb-8 leading-[0.9]">
                                    INNOIR<br />STORE
                                </h2>

                                <div className="font-sans text-sm text-gray-400 w-full mt-8">
                                    {/* Address and Hours in 2 columns */}
                                    <div className="grid grid-cols-2 gap-4 md:gap-8 w-full">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-white uppercase tracking-wider text-[10px] md:text-xs mb-1 font-bold">Address</span>
                                            <div className="text-gray-200">
                                                {location.lines.map((l, i) => (
                                                    <p key={i}>{l}</p>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <span className="text-white uppercase tracking-wider text-[10px] md:text-xs mb-1 font-bold">Hours</span>
                                            <p>Mon - Sun</p>
                                            <p>9:00 AM - 9:00 PM</p>
                                        </div>
                                    </div>

                                    {/* Buttons on the same row */}
                                    <div className="mt-8 flex flex-row items-center gap-2 flex-wrap">
                                        <LiveStatus />
                                        <button
                                            onClick={() => {
                                                if (mapRef.current) {
                                                    mapRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                }
                                            }}
                                            className="inline-flex items-center justify-center gap-3 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] md:text-xs font-bold uppercase tracking-wider transition-colors"
                                        >
                                            View on map
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Map */}
                    <div ref={mapRef} className="md:col-span-2 relative h-125 md:h-150 w-full rounded-2xl overflow-hidden grayscale invert hover:grayscale-0 hover:invert-0 transition-all duration-700 ease-in-out border border-white/10">
                        <iframe
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(location.lines.join(", "))}&t=&z=17&ie=UTF8&iwloc=&output=embed`}
                            className="absolute inset-0 w-full h-full border-0"
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                        {/* Map Overlay to reduce contrast until hover */}
                        <div className="absolute inset-0 bg-black/20 pointer-events-none group-hover:bg-transparent transition-colors" />
                    </div>
                </div>
            </div>
        </section>
    );
}

function LiveStatus() {
    // Forced Open Status as requested
    const isOpen = true;

    return (
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
            </span>
            <span className="font-sans text-xs uppercase tracking-widest text-white/80 font-bold">
                {isOpen ? 'Open Now' : 'Closed Now'}
            </span>
        </div>
    );
}

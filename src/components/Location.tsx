"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Location() {
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

                                <div className="space-y-6 font-sans text-sm text-gray-400">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-white uppercase tracking-wider text-xs mb-1 font-bold">Address</span>
                                        <p>Chợ đêm, An Thượng</p>
                                        <p>Sơn Trà, Đà Nẵng</p>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <span className="text-white uppercase tracking-wider text-xs mb-1 font-bold">Hours</span>
                                        <p>Mon - Sun</p>
                                        <p>18:00 - 23:00</p>
                                    </div>
                                </div>
                            </div>

                            {/* Live Status Indicator */}
                            <div className="mt-12 md:mt-24">
                                <LiveStatus />
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Map */}
                    <div className="md:col-span-2 relative h-[500px] md:h-[600px] w-full rounded-2xl overflow-hidden grayscale invert hover:grayscale-0 hover:invert-0 transition-all duration-700 ease-in-out border border-white/10">
                        <iframe
                            src="https://maps.google.com/maps?q=INNOIR%20STREETWEAR%20Da%20Nang&t=&z=17&ie=UTF8&iwloc=&output=embed"
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

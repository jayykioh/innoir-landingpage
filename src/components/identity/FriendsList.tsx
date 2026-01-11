"use client";

import { motion } from "framer-motion";

const FRIENDS = [
    "NGUYEN XUAN VU",
    "DOAN LUC",
    "NHU QUYNH NGUYEN",
    "HUNG PHI",
    "PHUOC HAI",
    "HUYNH VAN THANH"
];

export default function FriendsList() {
    return (
        <section className="py-24 border-t border-white/10 bg-background overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="container mx-auto px-6 mb-12 text-center">
                <span className="font-mono text-xs text-white/40 uppercase tracking-[0.3em]">
                    THE SQUAD / DAY ONES
                </span>
            </div>

            <div className="flex relative w-full overflow-hidden">
                <motion.div
                    className="flex text-[4rem] md:text-[8rem] font-display font-black uppercase tracking-tight text-white md:text-transparent whitespace-nowrap"
                    style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.3)" }}
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 120 }}
                >
                    {FRIENDS.map((friend, i) => (
                        <span key={i} className="mx-8 md:mx-16 select-none md:opacity-50 md:hover:opacity-100 md:hover:text-white transition-all duration-300 cursor-default">
                            {friend}
                        </span>
                    ))}
                    {/* Duplicate for infinite loop */}
                    {FRIENDS.map((friend, i) => (
                        <span key={`dup-${i}`} className="mx-8 md:mx-16 select-none md:opacity-50 md:hover:opacity-100 md:hover:text-white transition-all duration-300 cursor-default">
                            {friend}
                        </span>
                    ))}
                </motion.div>
            </div>

            <div className="container mx-auto px-6 mt-12 text-center opacity-40">
                <p className="font-mono text-xs uppercase tracking-widest">
                    REAL RECOGNIZE REAL
                </p>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";

export default function Marquee({ text = "INNOIR © — STREETWEAR — CHỢ ĐÊM AN THƯỢNG — PHU NGUYEN — " }: { text?: string }) {
    return (
        <div className="relative w-full overflow-hidden bg-white text-black py-4 border-y border-black">
            <div className="flex whitespace-nowrap">
                <motion.div
                    className="flex whitespace-nowrap font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight"
                    animate={{ x: "-50%" }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20,
                    }}
                >
                    <span className="mx-8">{text}</span>
                    <span className="mx-8">{text}</span>
                    <span className="mx-8">{text}</span>
                    <span className="mx-8">{text}</span>
                </motion.div>
            </div>
        </div>
    );
}

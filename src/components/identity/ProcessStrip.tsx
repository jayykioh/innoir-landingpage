"use client";

import { motion } from "framer-motion";

const STEPS = ["SKETCH", "CUT", "STITCH", "WEAR"];

export default function ProcessStrip() {
    return (
        <section className="w-full border-b border-white/10 bg-background overflow-hidden py-12">
            <div className="flex justify-between items-center max-w-6xl mx-auto px-6">
                {STEPS.map((step, index) => (
                    <div key={index} className="flex items-center w-full last:w-auto">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="font-mono text-xs md:text-sm font-bold text-gray-400 uppercase tracking-[0.2em]"
                        >
                            {step}
                        </motion.span>

                        {index !== STEPS.length - 1 && (
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                                className="h-[1px] flex-1 bg-white/10 mx-4 md:mx-8 origin-left"
                            />
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

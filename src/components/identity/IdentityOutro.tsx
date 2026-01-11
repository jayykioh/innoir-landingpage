"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function IdentityOutro() {
    return (
        <section className="py-40 px-6 bg-background text-white text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-12">
                    Built slow. <span className="text-white/40">Worn daily.</span>
                </h2>

                <div className="flex flex-wrap justify-center gap-8">
                    <Link href="/#works" className="group flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all">
                        <span className="font-mono text-xs tracking-widest uppercase">View Collection</span>
                        <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>

                    <Link href="/#community" className="group flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all">
                        <span className="font-mono text-xs tracking-widest uppercase">Community</span>
                        <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                </div>
            </motion.div>
        </section>
    );
}

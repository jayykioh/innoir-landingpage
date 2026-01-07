"use client";

import { Facebook, MessageCircle, AtSign } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
    const text = "INNOIR".split("");

    return (
        <footer className="relative w-full bg-background pt-20 pb-10 px-6 border-grid-t" id="contact">
            <div className="flex flex-col items-center justify-center text-center">
                <h1 className="text-[12vw] leading-none font-display font-black tracking-tighter uppercase text-white mb-8 flex justify-center cursor-default overflow-hidden">
                    {text.map((char, index) => (
                        <motion.span
                            key={index}
                            initial={{ y: 0 }}
                            animate={{ y: [0, -30, 0] }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: index * 0.2,
                            }}
                            className="inline-block hover:text-gray-300 transition-colors"
                            whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? 5 : -5, transition: { duration: 0.3 } }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </h1>

                <div className="flex flex-col md:flex-row gap-8 md:gap-16 mt-8">
                    <a
                        href="https://www.instagram.com/innoir.streetwear/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xl font-display uppercase hover:text-gray-400 transition-colors"
                    >
                        Instagram ↗
                    </a>

                    <a
                        href="https://www.threads.com/@nmightph"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xl font-display uppercase hover:text-gray-400 transition-colors"
                    >
                        <AtSign size={24} /> Threads
                    </a>

                    <a
                        href="https://www.facebook.com/phu.nguyen.486685"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xl font-display uppercase hover:text-gray-400 transition-colors"
                    >
                        <Facebook size={24} /> Facebook
                    </a>

                    <a
                        href="https://wa.me/84328244990"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xl font-display uppercase hover:text-gray-400 transition-colors"
                    >
                        <MessageCircle size={24} /> WhatsApp
                    </a>
                </div>

            </div>

            <div className="mt-20 pt-10 border-grid-t flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs uppercase text-gray-400">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <p>© 2025 INNOIR Streetwear. All rights reserved.</p>
                    <motion.a
                        href="https://www.facebook.com/jeckyoh/"
                        target="_blank"
                        className="text-white/60 hover:text-white transition-colors flex items-center gap-1"
                        whileHover={{ scale: 1.05 }}
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        ⚡ Powered by Luc Doan
                    </motion.a>
                </div>
                <div className="flex gap-6">
                    <span>Da Nang</span>
                    <span>Vietnam</span>
                    <span>Est. 2025</span>
                </div>
            </div>
        </footer>
    );
}

"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react"; // Added X icon
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [isMenuOpen]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const LINKS = [
        { href: "#works", label: "WORKS" },
        { href: "#community", label: "COMMUNITY" },
        { href: "#location", label: "LOCATION" },
        { href: "#contact", label: "CONTACT" },
    ];

    return (
        <>
            <header className="fixed top-0 left-0 z-50 w-full px-6 py-6 mix-blend-difference text-white">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold tracking-tighter uppercase font-display relative z-50">
                        INNOIR
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
                        {LINKS.map(link => (
                            <Link key={link.href} href={link.href} className="hover:opacity-70 transition-opacity">
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden relative z-50" onClick={toggleMenu}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-black text-white flex flex-col items-center justify-center pointer-events-auto md:hidden"
                    >
                        <nav className="flex flex-col items-center gap-8">
                            {LINKS.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="text-4xl font-display font-bold uppercase tracking-tighter"
                                        onClick={toggleMenu}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="absolute bottom-10 text-xs font-mono text-gray-400 uppercase tracking-widest"
                        >
                            Da Nang • Est. 2025
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

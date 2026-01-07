"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 z-50 w-full px-6 py-6 mix-blend-difference text-white">
            <div className="flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold tracking-tighter uppercase font-display">
                    INNOIR
                </Link>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
                    <Link href="#works" className="hover:opacity-70 transition-opacity">WORKS</Link>
                    <Link href="#community" className="hover:opacity-70 transition-opacity">COMMUNITY</Link>
                    <Link href="#location" className="hover:opacity-70 transition-opacity">LOCATION</Link>
                    <Link href="#contact" className="hover:opacity-70 transition-opacity">CONTACT</Link>
                </nav>

                <button className="md:hidden">
                    <Menu size={24} />
                </button>
            </div>
        </header>
    );
}

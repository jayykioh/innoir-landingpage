"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IdentityIntro from "@/components/identity/IdentityIntro";
import ManifestoBlocks from "@/components/identity/ManifestoBlocks";
import IdentityBio from "@/components/identity/IdentityBio";
import FriendsList from "@/components/identity/FriendsList";
import ProcessStrip from "@/components/identity/ProcessStrip";
import IdentityOutro from "@/components/identity/IdentityOutro";

export default function IdentityPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            {/* Nav */}
            <Header />

            {/* Noise Overlay */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-overlay">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>

            {/* Content Layers */}
            <div className="relative z-10">
                <IdentityIntro />
                {/* Manifesto Redesigned */}
                <ManifestoBlocks />
                {/* Origins */}
                <IdentityBio />
                {/* Squad */}
                <FriendsList />
                {/* Process */}
                <ProcessStrip />
                <IdentityOutro />
            </div>

            <Footer />
        </main>
    );
}

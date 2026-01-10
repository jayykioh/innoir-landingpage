"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LOOKBOOK = [
    { id: 1, src: "/photo/z7407913812380_f9cbee645b9e7d3737f22d2b6ed4844c.jpg", user: "INNOIR®", quote: "Authentic vibes only." },
    { id: 2, src: "/photo/z7407913817344_4d0210e0e7154c305f910ae5da233596.jpg", user: "INNOIR®", quote: "Night market energy." },
    { id: 3, src: "/photo/z7407913827839_b50e0d2f2b634172de706c2b052aa6d7.jpg", user: "INNOIR®", quote: "Street level luxe." },
    { id: 4, src: "/photo/z7407913828663_44e4143792ecff672fbd504533baef08.jpg", user: "INNOIR®", quote: "New season available." },
    { id: 5, src: "/photo/z7407913834487_49735fe8bf1022a640133153d95902f2.jpg", user: "INNOIR®", quote: "Limited drop." },
    { id: 6, src: "/photo/z7407913836208_764cb75256d2ef550f0f1b0e6d6b9c63.jpg", user: "INNOIR®", quote: "Da Nang originals." },
    { id: 7, src: "/photo/z7407913842119_f1b16d9e27088ce13bf317ba034a5555.jpg", user: "INNOIR®", quote: "Always authentic." },
    { id: 8, src: "/photo/z7407913850436_d33438aac20f028eb979fcdd4223bd73.jpg", user: "INNOIR®", quote: "Join the movement." },
    { id: 9, src: "/photo/z7407913851998_eee7d9c5aa0b25c3e89d05a6a2b05b37.jpg", user: "INNOIR®", quote: "Essential fits." },
];

export default function Community() {
    const containerRef = useRef(null);
    const col1Ref = useRef(null);
    const col2Ref = useRef(null);
    const col3Ref = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const mm = gsap.matchMedia();

        mm.add("(min-width: 769px)", () => {
            // Desktop Parallax
            gsap.to(col1Ref.current, { y: -100, ease: "none", scrollTrigger: { trigger: containerRef.current, scrub: 1 } });
            gsap.to(col2Ref.current, { y: 100, ease: "none", scrollTrigger: { trigger: containerRef.current, scrub: 1 } });
            gsap.to(col3Ref.current, { y: -50, ease: "none", scrollTrigger: { trigger: containerRef.current, scrub: 1 } });
        });

        return () => mm.revert();
    }, []);

    return (
        <section className="relative w-full py-20 px-4 md:px-0 border-grid-b overflow-hidden" id="community">
            <div className="mb-24 px-6 text-center">
                <h2 className="text-4xl md:text-8xl font-display font-bold uppercase tracking-tighter mix-blend-difference">The Community</h2>
                <p className="mt-4 font-mono text-sm text-gray-400 tracking-widest uppercase">
                    Captured in Da Nang • Est. 2025
                </p>
            </div>

            <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1800px] mx-auto">
                <div ref={col1Ref} className="space-y-8">
                    {LOOKBOOK.slice(0, 3).map((item) => (
                        <LookbookItem key={item.id} item={item} />
                    ))}
                </div>
                <div ref={col2Ref} className="space-y-8 md:pt-32">
                    {LOOKBOOK.slice(3, 6).map((item) => (
                        <LookbookItem key={item.id} item={item} />
                    ))}
                </div>
                <div ref={col3Ref} className="space-y-8">
                    {LOOKBOOK.slice(6, 9).map((item) => (
                        <LookbookItem key={item.id} item={item} />
                    ))}
                </div>
            </div>
            <div className="mt-32 md:mt-48 flex justify-center relative z-10">
                <Link href="/community" className="group relative px-8 py-4 overflow-hidden rounded-full border border-white/20 bg-transparent transition-colors hover:border-white">
                    <span className="relative z-10 font-mono text-sm uppercase tracking-widest text-white group-hover:text-black transition-colors duration-300">
                        View Full Community
                    </span>
                    <div className="absolute inset-0 -translate-y-full bg-white transition-transform duration-300 group-hover:translate-y-0"></div>
                </Link>
            </div>
        </section >
    );
}

function LookbookItem({ item }: { item: any }) {
    return (
        <div className="group relative w-full aspect-[3/4] overflow-hidden bg-gray-900 border border-white/10 cursor-none">
            <Image
                src={item.src}
                alt={`INNOIR Streetwear Community - ${item.quote}`}
                fill
                className="object-cover transition-all duration-700 grayscale-0 md:grayscale md:group-hover:grayscale-0 group-hover:scale-105"
            />

            {/* Minimal Overlay - Always visible on mobile, hover on desktop */}
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 to-transparent flex flex-col items-start justify-end duration-500 ease-out
                opacity-100 translate-y-0
                md:opacity-0 md:translate-y-4 
                md:group-hover:opacity-100 md:group-hover:translate-y-0
            ">
                <p className="font-display text-2xl uppercase italic text-white leading-none">"{item.quote}"</p>
                <div className="mt-4 flex items-center gap-2">
                    <span className="h-[1px] w-8 bg-white/50"></span>
                    <p className="font-mono text-xs text-gray-400 uppercase tracking-wider">{item.user}</p>
                </div>
            </div>

            {/* Hover Cursor Effect (Optional, simulated with CSS) - Desktop only */}
            <div className="hidden md:block absolute top-4 right-4 h-2 w-2 rounded-full bg-white opacity-0 group-hover:opacity-100 animate-pulse"></div>
        </div>
    )
}

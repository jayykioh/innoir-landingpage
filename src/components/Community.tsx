"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { forwardRef } from "react";

const LOOKBOOK = [
    { id: 1, src: "/photo/z7407913812380_f9cbee645b9e7d3737f22d2b6ed4844c.jpg", user: "INNOIR®", quote: "Authentic vibes only." },
    { id: 2, src: "/photo/z7407913817344_4d0210e0e7154c305f910ae5da233596.jpg", user: "INNOIR®", quote: "D13 An Thuong 34 energy." },
    { id: 3, src: "/photo/z7407913827839_b50e0d2f2b634172de706c2b052aa6d7.jpg", user: "INNOIR®", quote: "Street level luxe." },
    { id: 4, src: "/photo/z7407913828663_44e4143792ecff672fbd504533baef08.jpg", user: "INNOIR®", quote: "New season available." },
    { id: 5, src: "/photo/z7407913834487_49735fe8bf1022a640133153d95902f2.jpg", user: "INNOIR®", quote: "Limited drop." },
    { id: 6, src: "/photo/z7407913836208_764cb75256d2ef550f0f1b0e6d6b9c63.jpg", user: "INNOIR®", quote: "Da Nang originals." },
    { id: 7, src: "/photo/z7407913842119_f1b16d9e27088ce13bf317ba034a5555.jpg", user: "INNOIR®", quote: "Always authentic." },
    { id: 8, src: "/photo/z7407913850436_d33438aac20f028eb979fcdd4223bd73.jpg", user: "INNOIR®", quote: "Join the movement." },
    { id: 9, src: "/photo/z7407913851998_eee7d9c5aa0b25c3e89d05a6a2b05b37.jpg", user: "INNOIR®", quote: "Essential fits." },
];

export default function Community() {
    const gallery = useRef<HTMLDivElement>(null);
    const col1Ref = useRef<HTMLDivElement>(null);
    const col2Ref = useRef<HTMLDivElement>(null);
    const col3Ref = useRef<HTMLDivElement>(null);
    const col4Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // GSAP Context ensures animations are cleaned up properly when component unmounts
        const ctx = gsap.context(() => {
            const createParallax = (ref: React.RefObject<HTMLDivElement | null>, multiplier: number) => {
                if (!ref.current) return;
                
                gsap.to(ref.current, {
                    // Use function-based value so it recalculates accurately on screen resize
                    y: () => window.innerHeight * multiplier,
                    ease: "none",
                    scrollTrigger: {
                        trigger: gallery.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.2, // scrub > true adds buttery smooth interpolation/easing to the scroll!
                        invalidateOnRefresh: true,
                    }
                });
            };

            // Multipliers match the varying speeds of your reference layout
            createParallax(col1Ref, 2);
            createParallax(col2Ref, 3.3);
            createParallax(col3Ref, 1.25);
            createParallax(col4Ref, 3);
        }, gallery);

        return () => ctx.revert();
    }, []);

    const col1 = [
        { ...LOOKBOOK[0] },
        { ...LOOKBOOK[1] },
        { ...LOOKBOOK[2] },
        { ...LOOKBOOK[6], mobileOnly: true },
        { ...LOOKBOOK[8], mobileOnly: true },
    ];

    const col2 = [
        { ...LOOKBOOK[3] },
        { ...LOOKBOOK[4] },
        { ...LOOKBOOK[5] },
        { ...LOOKBOOK[7], mobileOnly: true },
        { ...LOOKBOOK[0], mobileOnly: true },
    ];

    const col3 = [
        { ...LOOKBOOK[6] },
        { ...LOOKBOOK[7] },
        { ...LOOKBOOK[8] },
    ];

    const col4 = [
        { ...LOOKBOOK[0] },
        { ...LOOKBOOK[4] },
        { ...LOOKBOOK[8] },
    ];

    return (
        <section className="relative w-full border-grid-b bg-background overflow-hidden" id="community">
            {/* Header Section */}
            <div className="pt-32 pb-16 px-6 text-center">
                <h2 className="text-4xl md:text-8xl font-display font-bold uppercase tracking-tighter mix-blend-difference text-white">The Community</h2>
                <p className="mt-4 font-mono text-xs sm:text-sm text-gray-400 tracking-widest uppercase">
                    Captured in Da Nang • Est. 2025
                </p>
            </div>

            {/* Parallax Gallery Container */}
            <div
                ref={gallery}
                className="relative box-border flex h-[150vh] md:h-[175vh] gap-4 md:gap-[2vw] overflow-hidden bg-background p-4 md:p-[2vw]"
            >
                <Column ref={col1Ref} items={col1} topClass="-top-[20%] md:-top-[45%]" />
                <Column ref={col2Ref} items={col2} topClass="-top-[50%] md:-top-[95%]" />
                <Column ref={col3Ref} items={col3} topClass="-top-[45%]" containerClass="hidden md:flex" />
                <Column ref={col4Ref} items={col4} topClass="-top-[75%]" containerClass="hidden lg:flex" />
            </div>

            {/* Footer Section */}
            <div className="pb-32 pt-16 flex justify-center relative z-10 bg-background">
                <Link href="/community" className="group relative px-8 py-4 overflow-hidden rounded-full border border-white/20 bg-transparent transition-colors hover:border-white">
                    <span className="relative z-10 font-mono text-sm uppercase tracking-widest text-white group-hover:text-black transition-colors duration-300">
                        View Full Community
                    </span>
                    <div className="absolute inset-0 -translate-y-full bg-white transition-transform duration-300 group-hover:translate-y-0"></div>
                </Link>
            </div>
        </section>
    );
}

type ItemProps = typeof LOOKBOOK[0] & { mobileOnly?: boolean };

type ColumnProps = {
    items: ItemProps[];
    topClass: string;
    containerClass?: string;
};

const Column = forwardRef<HTMLDivElement, ColumnProps>(({ items, topClass, containerClass = "" }, ref) => {
    return (
        <div
            ref={ref}
            className={`relative flex h-full w-1/2 md:w-1/4 lg:w-1/4 min-w-[150px] md:min-w-[250px] flex-col gap-4 md:gap-[2vw] ${topClass} ${containerClass}`}
        >
            {items.map((item, i) => (
                <div 
                    key={`${item.id}-${i}`} 
                    className={`group relative h-full w-full aspect-[3/4] overflow-hidden bg-gray-900 border border-white/10 rounded-xl md:rounded-2xl ${item.mobileOnly ? 'md:hidden' : ''}`}
                >
                    <Image
                        src={item.src}
                        alt={`INNOIR Streetwear Community - ${item.quote}`}
                        fill
                        className="object-cover transition-all duration-700 grayscale-0 md:grayscale md:group-hover:grayscale-0 group-hover:scale-105"
                    />

                    {/* Hover Metadata Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col items-start justify-end duration-500 ease-out
                        opacity-100 translate-y-0
                        md:opacity-0 md:translate-y-4 
                        md:group-hover:opacity-100 md:group-hover:translate-y-0
                    ">
                        <p className="font-display text-xl md:text-2xl uppercase italic text-white leading-none">"{item.quote}"</p>
                        <div className="mt-2 md:mt-4 flex items-center gap-2">
                            <span className="h-[1px] w-6 md:w-8 bg-white/50"></span>
                            <p className="font-mono text-[10px] md:text-xs text-gray-400 uppercase tracking-wider">{item.user}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
});
Column.displayName = "Column";

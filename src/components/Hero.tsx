"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlurText from "./BlurText";

export default function Hero() {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            }
        });

        tl.to(textRef.current, { y: 100 }, 0);
        tl.to(imageRef.current, { y: -50 }, 0);

        // Intro Animation
        const introTl = gsap.timeline();

        // Initial States
        gsap.set(textRef.current, { scale: 0.8, filter: "blur(10px)", opacity: 0 });
        gsap.set(imageRef.current, { opacity: 0, scale: 1.1 });
        gsap.set(".hero-floating-text", { opacity: 0, y: 20 });

        // Animation Sequence
        introTl.to(textRef.current, {
            scale: 1,
            filter: "blur(0px)",
            opacity: 1,
            duration: 1.5,
            ease: "power3.out"
        })
            .to(imageRef.current, {
                opacity: 1,
                scale: 1,
                duration: 1.5,
                ease: "power2.out"
            }, "-=0.5")
            .to(".hero-floating-text", {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2
            }, "-=1");

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
            introTl.kill();
        };
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden bg-background pt-20"
        >
            {/* Layer 1: Massive Text (Mobile: Top z-20, Desktop: Behind z-0) */}
            <div
                ref={textRef}
                className="absolute z-20 md:z-0 w-full text-center pointer-events-none"
            >
                <h1 className="text-[18vw] md:text-[15vw] leading-[0.9] font-display font-black tracking-tighter text-white mix-blend-difference">
                    INNOIR
                </h1>
            </div>

            {/* Layer 2: Image (Mobile: Opacity 50%, Desktop: Full) */}
            <div
                ref={imageRef}
                className="relative z-0 md:z-10 w-[90vw] md:w-[35vw] aspect-[3/4] grayscale contrast-125 opacity-50 md:opacity-100"
            >
                <Image
                    src="/photo/owner.jpg"
                    alt="Innoir Founder"
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>

            {/* Layer 3: Floating Text */}
            <div className="hero-floating-text absolute bottom-10 right-10 z-20 md:bottom-20 md:right-20">
                <BlurText
                    text="Da Nang • Est. 2025"
                    delay={150}
                    animateBy="letters"
                    direction="bottom"
                    className="font-mono text-xs md:text-sm text-white tracking-widest uppercase"
                />
            </div>

            <div className="hero-floating-text absolute top-1/2 left-10 z-20 -translate-y-1/2 hidden md:block">
                <p className="font-mono text-xs text-white tracking-widest uppercase [writing-mode:vertical-rl] rotate-180">
                    Authentic Streetwear
                </p>
            </div>
        </section>
    );
}

"use client";

import {
    motion,
    useMotionTemplate,
    useScroll,
    useTransform,
} from "framer-motion";
import React, { useRef } from "react";

const FAQS = [
    {
        q: "Where are you based?",
        a: "Da Nang, Vietnam. Built local, moving global."
    },
    {
        q: "How do I order right now?",
        a: "We’re mostly offline for now. Orders and questions are handled through the Contact section on this site."
    },
    {
        q: "How’s the fit / sizing?",
        a: "Relaxed silhouettes. If you’re unsure, share your height and weight and we’ll guide the fit."
    },
    {
        q: "Do you ship?",
        a: "Local first in Da Nang. Nationwide shipping depends on the drop."
    },
    {
        q: "When are new drops?",
        a: "Limited batches. Updates roll out through our channels."
    },
    {
        q: "When is the online store launching?",
        a: "Soon. No rush."
    }
];

export default function OrderingFAQ() {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        // Start animating when the top of the section hits the top of the viewport
        // Stop animating when the bottom of the section hits the bottom of the viewport
        offset: ["start start", "end end"]
    });

    // Maps scroll progress to vertical translation (Y axis).
    // Starting low (+800px) and scrolling very high (-1400px) creates the sweeping effect.
    const yMotionValue = useTransform(scrollYProgress, [0, 1], [800, -1400]);

    // Combining the rotateX for perspective tilt and the interpolated Y translation
    const transform = useMotionTemplate`rotateX(35deg) translateY(${yMotionValue}px) translateZ(10px)`;

    return (
        <section
            ref={targetRef}
            className="relative z-0 h-[350vh] w-full bg-background text-white border-grid-b"
            id="faq"
        >
            {/* Scroll Indication Header */}
            <div className="absolute left-1/2 top-[5%] grid -translate-x-1/2 content-start justify-items-center gap-4 text-center z-10 pointer-events-none">
                <span className="relative max-w-[15ch] text-[10px] sm:text-xs uppercase tracking-[0.3em] leading-tight text-white/50 after:absolute after:left-1/2 after:top-full after:mt-4 after:h-16 after:w-px after:bg-gradient-to-b after:from-white/50 after:to-transparent after:content-['']">
                    Scroll down to explore FAQ
                </span>
            </div>

            {/* Sticky 3D Scene */}
            <div
                className="sticky top-0 mx-auto flex h-screen items-center justify-center bg-transparent overflow-hidden px-4 md:px-8"
                style={{
                    transformStyle: "preserve-3d",
                    perspective: "600px", // Provides the depth illusion
                }}
            >
                <motion.div
                    style={{
                        transformStyle: "preserve-3d",
                        transform,
                    }}
                    className="w-full max-w-4xl text-center flex flex-col gap-16 sm:gap-24 pt-[40vh] pb-[40vh]"
                >
                    {FAQS.map((faq, index) => (
                        <div key={index} className="flex flex-col gap-4 sm:gap-6">
                            <h3 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-white uppercase leading-[0.9] drop-shadow-2xl">
                                {faq.q}
                            </h3>
                            <p className="font-sans text-xs sm:text-sm md:text-base lg:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
                                {faq.a}
                            </p>
                        </div>
                    ))}
                </motion.div>

                {/* Vertical Fade Gradients to obscure text smoothly as it enters/exits */}
                <div className="absolute bottom-0 left-0 h-[30vh] w-full bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-10" />
                <div className="absolute top-0 left-0 h-[25vh] w-full bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none z-10" />
            </div>
        </section>
    );
}

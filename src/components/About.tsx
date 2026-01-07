"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "./ScrollReveal";
import TextType from "./TextType";

export default function About() {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Animation can be added here

    }, []);

    return (
        <section className="relative w-full border-grid-b border-grid-t" id="about">
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-[60vh]">
                <div className="p-8 md:p-16 flex items-center border-grid-r border-b md:border-b-0">
                    <ScrollReveal
                        baseOpacity={0.1}
                        enableBlur={true}
                        textClassName="text-4xl md:text-6xl font-display font-bold leading-tight uppercase text-white"
                    >
                        We Redefine Da Nang Streetwear.
                    </ScrollReveal>
                </div>
                <div className="p-8 md:p-16 flex flex-col justify-center space-y-6">
                    <div className="text-lg md:text-xl text-gray-300 leading-relaxed font-sans min-h-[150px]">
                        <TextType
                            text={[
                                "Born in the heart of An Thượng Night Market, INNOIR represents the raw, authentic energy of Da Nang's underground culture. Beyond our curated collections, we feature exclusive 1-of-1 custom pieces—shirts and pants hand-designed by our founder, Phu Nguyen. We blend luxury with the gritty reality of the streets."
                            ]}
                            typingSpeed={30}
                            cursorCharacter="_"
                            loop={false}
                            startOnVisible={true}
                            hideCursorWhileTyping={false}
                            cursorBlinkDuration={0.8}
                        />
                    </div>
                    <div className="flex gap-4 pt-4">
                        <span className="px-4 py-2 border border-white/20 rounded-full text-sm uppercase tracking-wider">Est. 2025</span>
                        <span className="px-4 py-2 border border-white/20 rounded-full text-sm uppercase tracking-wider">Night Market</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

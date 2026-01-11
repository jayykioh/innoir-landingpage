"use client";

import ScrollReveal from "@/components/ScrollReveal";
import TextType from "@/components/TextType";
import { motion } from "framer-motion";

export default function IdentityBio() {
    return (
        <section className="py-32 md:py-48 px-6 bg-background text-white relative overflow-hidden">
            <div className="container mx-auto max-w-3xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-12"
                >
                    <div className="flex items-center gap-4 text-white/30 font-mono text-xs uppercase tracking-widest">
                        <span>HUE</span>
                        <div className="w-12 h-[1px] bg-white/20" />
                        <span>DA NANG</span>
                    </div>

                    <ScrollReveal
                        baseOpacity={0.1}
                        enableBlur={true}
                        textClassName="font-display text-2xl md:text-4xl font-bold leading-tight uppercase text-white will-change-transform"
                    >
                        Started with a kid who was low key obsessed with clothes.
                    </ScrollReveal>

                    <div className="font-serif text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl min-h-[300px]">
                        <TextType
                            text={[
                                "Growing up in Hue, fashion was never a big plan. It was just vibes. Sketching random ideas, messing with fabrics, remixing fits for fun.",
                                "Moving to Da Nang as a student changed the game. New city, new energy, new moves. With nothing but curiosity and a lot of guts, he decided to open a small shop and figure things out as he went.",
                                "That same energy still runs through INNOIR today. Young, independent, building things our own way. No rush. No noise. Just real pieces for real days."
                            ]}
                            typingSpeed={20}
                            cursorCharacter="_"
                            loop={false}
                            startOnVisible={true}
                            pauseDuration={1000}
                        />
                    </div>

                    <div className="pt-12 border-t border-white/10 flex justify-between items-end">
                        <span className="font-mono text-xs text-white/30">EST. 2025</span>
                        <div className="h-16 w-[1px] bg-white/30" />
                    </div>
                </motion.div>
            </div>

            {/* Decorative BG Line */}
            <div className="absolute top-0 right-[10%] w-[1px] h-full bg-white/5" />
        </section>
    );
}

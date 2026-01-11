"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import TextType from "@/components/TextType";

const MANIFESTO = [
    { title: "DA NANG.", subtitle: "Local roots. Global taste." },
    { title: "INNOIR.", subtitle: "Minimal streetwear, with intention." },
];

export default function ManifestoBlocks() {
    return (
        <section className="py-32 px-6 bg-background text-white overflow-hidden perspective-1000">
            <div className="container mx-auto max-w-6xl">
                {MANIFESTO.map((item, index) => (
                    <ManifestoItem key={index} item={item} index={index} />
                ))}
            </div>
        </section>
    );
}

function ManifestoItem({ item, index }: { item: typeof MANIFESTO[0], index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const isEven = index % 2 === 0;

    // Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 60, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 60, damping: 20 });
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();

        // Tilt Calc
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div className={`flex w-full mb-32 last:mb-0 ${isEven ? 'justify-end text-right' : 'justify-start text-left'}`}>
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="group cursor-default will-change-transform relative max-w-4xl"
            >
                <div className="translate-z-20 relative z-10">
                    <ScrollReveal
                        baseOpacity={0.1}
                        enableBlur={true}
                        textClassName="text-6xl md:text-8xl lg:text-[9rem] leading-[0.85] font-display font-black uppercase tracking-tighter text-white/90 group-hover:text-white transition-colors"
                    >
                        {item.title}
                    </ScrollReveal>
                </div>

                <div className={`mt-6 md:mt-8 h-[1px] w-24 bg-white/20 group-hover:w-full transition-all duration-700 translate-z-10 relative z-10 ${isEven ? 'ml-auto' : 'mr-auto'}`} />

                <div className="mt-4 translate-z-10 relative z-10">
                    <TextType
                        text={item.subtitle}
                        className="font-mono text-sm md:text-lg text-gray-400 uppercase tracking-widest"
                        cursorCharacter=""
                        typingSpeed={40}
                        startOnVisible={true}
                        loop={false}
                    />
                </div>
            </motion.div>
        </div>
    );
}

"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

export default function IdentityIntro() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    return (
        <section
            onMouseMove={handleMouseMove}
            className="h-screen flex flex-col items-center justify-center relative border-grid-b bg-background text-white px-6 perspective-1000 overflow-hidden"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0 opacity-40 select-none pointer-events-none">
                <Image
                    src="/photo/identity.jpg"
                    alt="Identity"
                    fill
                    className="object-cover grayscale"
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="text-center will-change-transform"
            >
                <span className="font-mono text-xs uppercase tracking-[0.5em] text-white/50 block mb-12 translate-z-10">
                    IDENTITY FILE
                </span>

                <h1 className="text-[15vw] leading-[0.8] font-display font-black uppercase tracking-tighter mix-blend-difference mb-8 translate-z-20">
                    INNOIR©
                </h1>

                <p className="font-mono text-sm md:text-base text-gray-400 tracking-widest uppercase max-w-md mx-auto translate-z-10">
                    Designed in Da Nang.<br />
                    Built with intention.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-12 w-full flex justify-center"
            >
                <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
            </motion.div>
        </section>
    );
}

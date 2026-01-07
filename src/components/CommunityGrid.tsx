"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const COMMUNITY_PICS = [
    { id: 1, src: "/photo/z7407913812380_f9cbee645b9e7d3737f22d2b6ed4844c.jpg", user: "@street.vibes", item: "Graphic Tee Vol.1" },
    { id: 2, src: "/photo/z7407913817344_4d0210e0e7154c305f910ae5da233596.jpg", user: "@night.market", item: "Oversized Hoodie" },
    { id: 3, src: "/photo/z7407913827839_b50e0d2f2b634172de706c2b052aa6d7.jpg", user: "@danang.style", item: "Cargo Pants" },
    { id: 4, src: "/photo/z7407913828663_44e4143792ecff672fbd504533baef08.jpg", user: "@innoir.og", item: "Signature Cap" },
    { id: 5, src: "/photo/z7407913834487_49735fe8bf1022a640133153d95902f2.jpg", user: "@fashion.killa", item: "Layered Fit" },
    { id: 6, src: "/photo/z7407913836208_764cb75256d2ef550f0f1b0e6d6b9c63.jpg", user: "@urban.soul", item: "Vintage Wash" },
    { id: 7, src: "/photo/z7407913842119_f1b16d9e27088ce13bf317ba034a5555.jpg", user: "@neon.lights", item: "Custom 1-of-1" },
    { id: 8, src: "/photo/z7407913850436_d33438aac20f028eb979fcdd4223bd73.jpg", user: "@concrete.jungle", item: "Fall Collection" },
    { id: 9, src: "/photo/z7407913851998_eee7d9c5aa0b25c3e89d05a6a2b05b37.jpg", user: "@underground", item: "Essential Tee" },
    { id: 10, src: "/photo/z7407913854920_e1c75afd1d209ab8350686f02ab2d885.jpg", user: "@rebel.youth", item: "Oversized Tee" },
    { id: 11, src: "/photo/z7407913859336_3b24c8ade5313af5e00a246ae36659ee.jpg", user: "@city.lights", item: "Graphic Hoodie" },
    { id: 12, src: "/photo/z7407913870251_0868c55efbb8bf4eac049e2e12bf7f36.jpg", user: "@night.crawler", item: "Cargo Shorts" },
    { id: 13, src: "/photo/z7407913872727_f9bfb58d56cf9ad4fee8b63ab8782181.jpg", user: "@street.poet", item: "Beanie" },
    { id: 14, src: "/photo/z7407913875001_c6677f8077b8a45723d48d9deca40f57.jpg", user: "@urban.legend", item: "Coach Jacket" },
    { id: 15, src: "/photo/z7407913881371_72d0eee954bd1de0a03592f2afb7707b.jpg", user: "@concrete.rose", item: "Crop Top" },
    { id: 16, src: "/photo/z7407913886762_d961ceedf55609d10fa44833b0975e13.jpg", user: "@skate.life", item: "Baggy Jeans" },
    { id: 17, src: "/photo/z7407913887043_363cb2ebf1767411b5815dfb6915e0c1.jpg", user: "@vinyl.junkie", item: "Band Tee" },
    { id: 18, src: "/photo/z7407913896474_ff512fd879999580a9282216df9f0e05.jpg", user: "@retro.future", item: "Windbreaker" },
    { id: 19, src: "/photo/z7407913901457_3ec8fb19e6ed032a9a2a6505f77bb9c6.jpg", user: "@neon.demon", item: "Cyber Tee" },
    { id: 20, src: "/photo/z7407913907023_07bfb489a5cc05d268777350e3464a69.jpg", user: "@glitch.art", item: "Distressed Hoodie" },
    { id: 21, src: "/photo/z7407913909558_25da14b71ca1d618e3256f4f7695264c.jpg", user: "@vapor.wave", item: "Pastel Tee" },
    { id: 22, src: "/photo/z7407913911179_301bcf883dbee0685be690e999d01eb5.jpg", user: "@lofi.beats", item: "Chill Hoodie" },
    { id: 23, src: "/photo/z7407913921170_0306bd1a09442186f812b70fa487a719.jpg", user: "@analog.dreams", item: "Film Tee" },
    { id: 24, src: "/photo/z7407913923852_22dc64eecd6ac6d377055d016fd62094.jpg", user: "@pixel.punk", item: "Glitch Hoodie" },
    { id: 25, src: "/photo/z7407913924741_edb63ef0a2b95a90299dcb34da77df5e.jpg", user: "@cyber.goth", item: "Chain Pants" },
    { id: 26, src: "/photo/z7407913931482_270a383689c749f681ab2bf9a4f67e3d.jpg", user: "@tech.wear", item: "Utility Vest" },
    { id: 27, src: "/photo/z7407913939764_03b5b9facd7d7838bce4aed56bb1107d.jpg", user: "@dark.mode", item: "Blackout Tee" },
    { id: 28, src: "/photo/z7407913940066_3077b8917499e47d8edc7447d44090fa.jpg", user: "@light.mode", item: "Whiteout Hoodie" },
    { id: 29, src: "/photo/z7407913948855_8a337d454a7c6400941f2e20500927ff.jpg", user: "@mono.chrome", item: "Grey Scale" },
    { id: 30, src: "/photo/z7407913953106_cbe8f064884ad0b7e6baef2c1532ef04.jpg", user: "@contrast.high", item: "Split Tee" },
    { id: 31, src: "/photo/z7407913956302_10f48af5098ef6dcb6d4af2c78a1ee22.jpg", user: "@shadow.play", item: "Silhouette Hoodie" },
    { id: 32, src: "/photo/z7407913958466_14f7211ea1d5e8c56429159092d4186a.jpg", user: "@urban.explore", item: "Cargo Vest" },
    { id: 33, src: "/photo/z7407913967387_73b6a235669c04205d22f2c0f6056c8f.jpg", user: "@rooftop.views", item: "Skyline Tee" },
    { id: 34, src: "/photo/z7407913970641_d0a38e76c8334260c7f589dab452248c.jpg", user: "@night.lights", item: "Neon Hoodie" },
    { id: 35, src: "/photo/z7407913973333_dd42fe3ab61370ad4978a5854f71a711.jpg", user: "@midnight.drive", item: "Racer Jacket" },
    { id: 36, src: "/photo/z7407913980515_58bc7cf2038ae33108f12d65970d8fa1.jpg", user: "@early.bird", item: "Coffee Run" },
    { id: 37, src: "/photo/z7407913985314_97d046cedffabfb3f023af77ee90ee38.jpg", user: "@late.night", item: "Midnight Snack" },
];

export default function CommunityGrid() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax Transforms for 4 columns
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const y4 = useTransform(scrollYProgress, [0, 1], [0, 50]);

    // Distribute images into 4 columns roughly equally
    const col1 = COMMUNITY_PICS.filter((_, i) => i % 4 === 0);
    const col2 = COMMUNITY_PICS.filter((_, i) => i % 4 === 1);
    const col3 = COMMUNITY_PICS.filter((_, i) => i % 4 === 2);
    const col4 = COMMUNITY_PICS.filter((_, i) => i % 4 === 3);

    return (
        <div ref={containerRef} className="max-w-[1800px] mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                <Column images={col1} y={y1} />
                <Column images={col2} y={y2} className="md:mt-24" />
                <Column images={col3} y={y3} />
                <Column images={col4} y={y4} className="md:mt-32" />
            </div>
        </div>
    );
}

function Column({ images, y, className = "" }: { images: typeof COMMUNITY_PICS, y?: any, className?: string }) {
    // Only apply parallax on desktop
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
        checkDesktop();
        window.addEventListener("resize", checkDesktop);
        return () => window.removeEventListener("resize", checkDesktop);
    }, []);

    return (
        <motion.div style={{ y: isDesktop ? y : 0 }} className={`flex flex-col gap-4 md:gap-8 ${className}`}>
            {images.map((img) => (
                <div key={img.id} className="group relative aspect-[3/4] w-full overflow-hidden bg-gray-900 border border-white/10">
                    <Image
                        src={img.src}
                        alt={img.user}
                        fill
                        loading="lazy"
                        className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                    />

                    {/* Metadata Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-black/50 backdrop-blur-sm translate-y-full transition-transform duration-300 group-hover:translate-y-0 flex items-center justify-between border-t border-white/10">
                        <div className="overflow-hidden">
                            <p className="font-display font-bold uppercase text-white truncate">{img.user}</p>
                            <p className="font-mono text-[10px] text-gray-300 uppercase tracking-wider truncate">{img.item}</p>
                        </div>
                        <div className="bg-white text-black p-2 rounded-full shrink-0 ml-2">
                            <ArrowUpRight size={16} />
                        </div>
                    </div>
                </div>
            ))}
        </motion.div>
    );
}

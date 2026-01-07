"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Marquee from "@/components/Marquee";
import DomeGallery from "@/components/DomeGallery";

const COMMUNITY_PICS = [
    { src: "/photo/z7407913812380_f9cbee645b9e7d3737f22d2b6ed4844c.jpg", alt: "@street.vibes" },
    { src: "/photo/z7407913817344_4d0210e0e7154c305f910ae5da233596.jpg", alt: "@night.market" },
    { src: "/photo/z7407913827839_b50e0d2f2b634172de706c2b052aa6d7.jpg", alt: "@danang.style" },
    { src: "/photo/z7407913828663_44e4143792ecff672fbd504533baef08.jpg", alt: "@innoir.og" },
    { src: "/photo/z7407913834487_49735fe8bf1022a640133153d95902f2.jpg", alt: "@fashion.killa" },
    { src: "/photo/z7407913836208_764cb75256d2ef550f0f1b0e6d6b9c63.jpg", alt: "@urban.soul" },
    { src: "/photo/z7407913842119_f1b16d9e27088ce13bf317ba034a5555.jpg", alt: "@neon.lights" },
    { src: "/photo/z7407913850436_d33438aac20f028eb979fcdd4223bd73.jpg", alt: "@concrete.jungle" },
    { src: "/photo/z7407913851998_eee7d9c5aa0b25c3e89d05a6a2b05b37.jpg", alt: "@underground" },
    { src: "/photo/z7407913854920_e1c75afd1d209ab8350686f02ab2d885.jpg", alt: "@rebel.youth" },
    { src: "/photo/z7407913859336_3b24c8ade5313af5e00a246ae36659ee.jpg", alt: "@city.lights" },
    { src: "/photo/z7407913870251_0868c55efbb8bf4eac049e2e12bf7f36.jpg", alt: "@night.crawler" },
    { src: "/photo/z7407913872727_f9bfb58d56cf9ad4fee8b63ab8782181.jpg", alt: "@street.poet" },
    { src: "/photo/z7407913875001_c6677f8077b8a45723d48d9deca40f57.jpg", alt: "@urban.legend" },
    { src: "/photo/z7407913881371_72d0eee954bd1de0a03592f2afb7707b.jpg", alt: "@concrete.rose" },
    { src: "/photo/z7407913886762_d961ceedf55609d10fa44833b0975e13.jpg", alt: "@skate.life" },
    { src: "/photo/z7407913887043_363cb2ebf1767411b5815dfb6915e0c1.jpg", alt: "@vinyl.junkie" },
    { src: "/photo/z7407913896474_ff512fd879999580a9282216df9f0e05.jpg", alt: "@retro.future" },
    { src: "/photo/z7407913901457_3ec8fb19e6ed032a9a2a6505f77bb9c6.jpg", alt: "@neon.demon" },
    { src: "/photo/z7407913907023_07bfb489a5cc05d268777350e3464a69.jpg", alt: "@glitch.art" },
    { src: "/photo/z7407913909558_25da14b71ca1d618e3256f4f7695264c.jpg", alt: "@vapor.wave" },
    { src: "/photo/z7407913911179_301bcf883dbee0685be690e999d01eb5.jpg", alt: "@lofi.beats" },
    { src: "/photo/z7407913921170_0306bd1a09442186f812b70fa487a719.jpg", alt: "@analog.dreams" },
    { src: "/photo/z7407913923852_22dc64eecd6ac6d377055d016fd62094.jpg", alt: "@pixel.punk" },
    { src: "/photo/z7407913924741_edb63ef0a2b95a90299dcb34da77df5e.jpg", alt: "@cyber.goth" },
    { src: "/photo/z7407913931482_270a383689c749f681ab2bf9a4f67e3d.jpg", alt: "@tech.wear" },
    { src: "/photo/z7407913939764_03b5b9facd7d7838bce4aed56bb1107d.jpg", alt: "@dark.mode" },
    { src: "/photo/z7407913940066_3077b8917499e47d8edc7447d44090fa.jpg", alt: "@light.mode" },
    { src: "/photo/z7407913948855_8a337d454a7c6400941f2e20500927ff.jpg", alt: "@mono.chrome" },
    { src: "/photo/z7407913953106_cbe8f064884ad0b7e6baef2c1532ef04.jpg", alt: "@contrast.high" },
    { src: "/photo/z7407913956302_10f48af5098ef6dcb6d4af2c78a1ee22.jpg", alt: "@shadow.play" },
    { src: "/photo/z7407913958466_14f7211ea1d5e8c56429159092d4186a.jpg", alt: "@urban.explore" },
    { src: "/photo/z7407913967387_73b6a235669c04205d22f2c0f6056c8f.jpg", alt: "@rooftop.views" },
    { src: "/photo/z7407913970641_d0a38e76c8334260c7f589dab452248c.jpg", alt: "@night.lights" },
    { src: "/photo/z7407913973333_dd42fe3ab61370ad4978a5854f71a711.jpg", alt: "@midnight.drive" },
    { src: "/photo/z7407913980515_58bc7cf2038ae33108f12d65970d8fa1.jpg", alt: "@early.bird" },
    { src: "/photo/z7407913985314_97d046cedffabfb3f023af77ee90ee38.jpg", alt: "@late.night" },
];

export default function CommunityPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            {/* Hero Section */}
            <section className="pt-32 pb-4 md:pt-48 md:pb-12 px-6 border-b border-white/20">
                <div className="container mx-auto">
                    {/* Back Link */}
                    <Link href="/" className="inline-flex items-center gap-2 mb-12 font-mono text-sm uppercase text-gray-500 hover:text-white transition-colors">
                        ← Back to Headline
                    </Link>

                    <div className="flex flex-col md:flex-row justify-between items-end mb-8">
                        <h1 className="text-6xl md:text-8xl lg:text-[10vw] leading-[0.9] font-display font-bold tracking-tighter uppercase text-white mix-blend-difference">
                            THE FACES<br />OF INNOIR
                        </h1>
                        <div className="font-mono text-sm md:text-right text-gray-400 uppercase tracking-wider mb-2 md:mb-4">
                            <p>Archive Vol.1</p>
                            <p>Da Nang • Est. 2025</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Marquee */}
            <Marquee text="THANK YOU FOR YOUR SUPPORT — BE THE NEXT ONE — JOIN THE MOVEMENT — " />

            {/* 3D Dome Gallery Section */}
            <section className="relative w-full h-[120vh] bg-black overflow-hidden border-b border-white/20">
                <div className="absolute inset-0 w-full h-full">
                    <DomeGallery images={COMMUNITY_PICS} />
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-6 bg-white text-black text-center flex flex-col items-center justify-center border-t border-black">
                <h2 className="text-8xl md:text-[15vw] font-display font-black uppercase leading-none mb-8 tracking-tighter">
                    YOUR TURN.
                </h2>
                <p className="font-mono text-lg md:text-xl uppercase tracking-widest mb-12 max-w-2xl">
                    Tag us @innoir.streetwear to be featured in the archive.
                    Defined by you.
                </p>
                <Link
                    href="https://instagram.com/innoir.streetwear"
                    target="_blank"
                    className="group relative inline-flex items-center gap-4 px-12 py-6 border-2 border-black rounded-full overflow-hidden hover:text-white transition-colors duration-300"
                >
                    <span className="relative z-10 font-display font-bold text-xl uppercase tracking-wider">Visit Instagram</span>
                    <ArrowUpRight className="relative z-10" size={24} />
                    <div className="absolute inset-0 bg-black translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
                </Link>
            </section>
        </main>
    );
}

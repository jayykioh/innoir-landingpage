import CommunityGrid from "@/components/CommunityGrid";
import Marquee from "@/components/Marquee";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function CommunityPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            {/* Hero Section */}
            <section className="pt-32 pb-12 md:pt-48 md:pb-24 px-6 border-b border-white/20">
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

            {/* Grid Section */}
            <section className="py-20 md:py-32 bg-black">
                <CommunityGrid />
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

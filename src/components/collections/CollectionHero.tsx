import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/data/collections";

type CollectionHeroProps = {
    collection: Collection;
    productCount: number;
};

export default function CollectionHero({ collection, productCount }: CollectionHeroProps) {
    return (
        <section className="relative min-h-[60dvh] md:min-h-[75dvh] overflow-hidden border-b border-white/10 bg-black px-4 pb-8 pt-24 text-white md:px-6 md:pb-12 md:pt-36">
            <div className="absolute inset-0 opacity-45">
                <Image
                    src={collection.heroImage}
                    alt={`${collection.title} collection`}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover grayscale contrast-125"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,transparent,rgba(0,0,0,0.9)_62%)]" />
            </div>

            <div className="relative z-10 mx-auto flex min-h-[calc(60dvh-8rem)] md:min-h-[calc(75dvh-12rem)] max-w-[1800px] flex-col justify-between">
                <Link
                    href="/#works"
                    className="w-fit font-mono text-xs uppercase tracking-[0.28em] text-white/50 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                    Back to collections
                </Link>

                <div className="grid gap-6 lg:gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
                    <div>
                        <p className="mb-5 font-mono text-xs uppercase tracking-[0.45em] text-white/50">
                            {collection.season} / {String(productCount).padStart(2, "0")} pieces
                        </p>
                        <h1 className="max-w-4xl break-words text-[clamp(2.5rem,8vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tighter text-white">
                            {collection.title}
                        </h1>
                    </div>

                    <div className="border border-white/15 bg-black/45 p-5 backdrop-blur-sm md:p-7">
                        <p className="font-mono text-xs uppercase tracking-[0.32em] text-white/45">Collection brief</p>
                        <p className="mt-5 text-base leading-7 text-white/82 md:text-lg">{collection.intro}</p>
                        <p className="mt-6 border-t border-white/10 pt-5 font-mono text-xs uppercase leading-6 tracking-[0.24em] text-white/50">
                            {collection.lookbookNote}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CollectionProduct } from "@/data/collections";
import { formatVnd } from "@/lib/format";

type ProductCardProps = {
    product: CollectionProduct;
    priority?: boolean;
};

export default function ProductCard({ product, priority = false }: ProductCardProps) {
    return (
        <Link
            href={`/collections/${product.collectionSlug}/${product.slug}`}
            className="group/card block border border-white/10 bg-white/[0.02] outline-none transition-colors duration-300 hover:border-white/40 focus-visible:border-white focus-visible:ring-2 focus-visible:ring-white/60"
        >
            <div className="relative aspect-[4/5] overflow-hidden bg-zinc-950">
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 50vw"
                    priority={priority}
                    className="object-cover grayscale transition duration-700 ease-out group-hover/card:scale-105 group-hover/card:grayscale-0 motion-reduce:transition-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 opacity-80" />
                <div className="absolute left-2.5 top-2.5 sm:left-4 sm:top-4 border border-white/20 bg-black/60 px-2 py-0.5 sm:px-3 sm:py-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.28em] text-white/70 backdrop-blur">
                    {product.status}
                </div>
                <div className="absolute bottom-2.5 right-2.5 sm:bottom-4 sm:right-4 flex h-8 w-8 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover/card:-translate-y-1 group-hover/card:translate-x-1 motion-reduce:transition-none">
                    <ArrowUpRight className="h-3.5 w-3.5 sm:h-[18px] sm:w-[18px]" aria-hidden="true" />
                </div>
            </div>

            <div className="grid gap-2 p-3 sm:p-4 md:grid-cols-[1fr_auto] md:p-5">
                <div>
                    <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.28em] text-white/40">{product.category}</p>
                    <h3 className="mt-1 text-sm font-black uppercase leading-tight tracking-tighter text-white sm:text-xl md:text-2xl lg:text-3xl">
                        {product.name}
                    </h3>
                </div>
                <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-white md:text-right">{formatVnd(product.priceVnd)}</p>
            </div>
        </Link>
    );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import type { CollectionProduct } from "@/data/collections";

type ProductDetailGalleryProps = {
    product: CollectionProduct;
};

export default function ProductDetailGallery({ product }: ProductDetailGalleryProps) {
    const [activeImage, setActiveImage] = useState(product.images[0]);
    const activeImageIndex = product.images.indexOf(activeImage);

    return (
        <div className="grid gap-4 lg:grid-cols-[88px_minmax(0,1fr)] lg:items-start">
            <div className="order-2 flex gap-3 overflow-x-auto pb-1 lg:order-1 lg:flex-col lg:overflow-visible lg:pb-0">
                {product.images.map((image, index) => {
                    const isActive = image === activeImage;

                    return (
                        <button
                            key={image}
                            type="button"
                            onClick={() => setActiveImage(image)}
                            onMouseEnter={() => setActiveImage(image)}
                            className={`group relative h-24 w-20 shrink-0 overflow-hidden border bg-zinc-950 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:h-28 lg:w-[88px] ${
                                isActive ? "border-white" : "border-white/15 hover:border-white/60"
                            }`}
                            aria-label={`Preview ${product.name} image ${index + 1}`}
                            aria-pressed={isActive}
                        >
                            <Image
                                src={image}
                                alt={`${product.name} thumbnail ${index + 1}`}
                                fill
                                sizes="88px"
                                className="object-cover grayscale transition duration-500 group-hover:grayscale-0 motion-reduce:transition-none"
                            />
                            <span className="absolute bottom-1 left-1 bg-black/70 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-white/70">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                        </button>
                    );
                })}
            </div>

            <div className="order-1 lg:order-2">
                <div className="relative mx-auto aspect-[4/5] max-h-[72dvh] max-w-[560px] overflow-hidden border border-white/10 bg-zinc-950 lg:max-h-[calc(100dvh-10rem)]">
                    <Image
                        src={activeImage}
                        alt={`${product.name} view ${activeImageIndex + 1}`}
                        fill
                        priority
                        sizes="(min-width: 1024px) 560px, 100vw"
                        className="object-cover grayscale transition duration-700 hover:grayscale-0 motion-reduce:transition-none"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,transparent,rgba(0,0,0,0.22)_72%)]" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between border border-white/10 bg-black/65 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55 backdrop-blur">
                        <span>Hover preview</span>
                        <span>
                            {String(activeImageIndex + 1).padStart(2, "0")} / {String(product.images.length).padStart(2, "0")}
                        </span>
                    </div>
                </div>

                <p className="mx-auto mt-3 max-w-[560px] font-mono text-[10px] uppercase leading-5 tracking-[0.22em] text-white/35">
                    Hover a thumbnail on desktop, or tap one on mobile, to inspect alternate product views.
                </p>
            </div>
        </div>
    );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/collections/ProductCard";
import ProductDetailGallery from "@/components/collections/ProductDetailGallery";
import PurchaseActions from "@/components/collections/PurchaseActions";
import {
    getCollectionBySlug,
    getProductBySlugs,
    getProductsByCollectionSlug,
    products,
} from "@/data/collections";
import { formatVnd } from "@/lib/format";
import { siteConfig } from "@/lib/site";

type ProductPageProps = {
    params: Promise<{ collectionSlug: string; productSlug: string }>;
};

export function generateStaticParams() {
    return products.map(product => ({
        collectionSlug: product.collectionSlug,
        productSlug: product.slug,
    }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { collectionSlug, productSlug } = await params;
    const product = getProductBySlugs(collectionSlug, productSlug);

    if (!product) {
        return {
            title: "Product Not Found | INNOIR Streetwear",
        };
    }

    const title = `${product.name} | INNOIR Streetwear`;

    return {
        title,
        description: product.description,
        alternates: {
            canonical: `/collections/${collectionSlug}/${product.slug}`,
        },
        openGraph: {
            title,
            description: product.description,
            url: `/collections/${collectionSlug}/${product.slug}`,
            siteName: siteConfig.name,
            images: [product.images[0]],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: product.description,
            images: [product.images[0]],
        },
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { collectionSlug, productSlug } = await params;
    const product = getProductBySlugs(collectionSlug, productSlug);
    const collection = getCollectionBySlug(collectionSlug);

    if (!product || !collection) {
        notFound();
    }

    const relatedProducts = getProductsByCollectionSlug(collection.slug)
        .filter(item => item.id !== product.id)
        .slice(0, 3);

    return (
        <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            <Header />

            <section className="border-b border-white/10 px-4 pb-16 pt-28 md:px-6 md:pb-24 md:pt-36">
                <div className="mx-auto max-w-[1800px]">
                    <Link
                        href={`/collections/${collection.slug}`}
                        className="mb-10 inline-flex w-fit font-mono text-xs uppercase tracking-[0.28em] text-white/50 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    >
                        Back to {collection.title}
                    </Link>

                    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
                        <ProductDetailGallery product={product} />

                        <aside className="lg:sticky lg:top-28 lg:self-start">
                            <div className="relative overflow-hidden border border-white/10 bg-white/[0.025] p-5 md:p-8">
                                <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 translate-x-1/3 -translate-y-1/3 rounded-full bg-white/10 blur-3xl" />

                                <div className="relative z-10">
                                    <p className="font-mono text-xs uppercase tracking-[0.35em] text-white/45">
                                        {collection.season} / {product.category}
                                    </p>

                                    <h1 className="mt-5 text-[clamp(3rem,8vw,8rem)] font-black uppercase leading-[0.8] tracking-tighter text-white">
                                        {product.name}
                                    </h1>

                                    <div className="mt-8 grid gap-3 border-y border-white/10 py-5 font-mono text-xs uppercase tracking-[0.22em] text-white/55 sm:grid-cols-3">
                                        <div>
                                            <p className="text-white/35">Price</p>
                                            <p className="mt-2 text-white">{formatVnd(product.priceVnd)}</p>
                                        </div>
                                        <div>
                                            <p className="text-white/35">Status</p>
                                            <p className="mt-2 text-white">{product.status}</p>
                                        </div>
                                        <div>
                                            <p className="text-white/35">Drop</p>
                                            <p className="mt-2 text-white">{collection.title}</p>
                                        </div>
                                    </div>

                                    <p className="mt-8 max-w-2xl text-base leading-8 text-white/75 md:text-lg">{product.description}</p>

                                    <div className="mt-8">
                                        <p className="font-mono text-xs uppercase tracking-[0.28em] text-white/45">Available sizes</p>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {product.sizes.map(size => (
                                                <span
                                                    key={size}
                                                    className="flex h-11 min-w-11 items-center justify-center border border-white/15 px-4 font-mono text-xs uppercase tracking-widest text-white"
                                                >
                                                    {size}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <p className="font-mono text-xs uppercase tracking-[0.28em] text-white/45">Details</p>
                                        <ul className="mt-4 grid gap-3 text-sm leading-6 text-white/65">
                                            {product.details.map(detail => (
                                                <li key={detail} className="border-b border-white/10 pb-3">
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mt-8">
                                        <PurchaseActions productName={product.name} />
                                        <p className="mt-4 font-mono text-[10px] uppercase leading-5 tracking-[0.22em] text-white/35">
                                            Send us the product name and your size. Current checkout is handled through INNOIR social channels.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-[88px_1fr] gap-4 border border-white/10 p-3">
                                <div className="relative aspect-square overflow-hidden bg-zinc-950">
                                    <Image
                                        src={collection.heroImage}
                                        alt={`${collection.title} thumbnail`}
                                        fill
                                        sizes="88px"
                                        className="object-cover grayscale"
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-white/35">Collection note</p>
                                    <p className="mt-2 text-sm leading-6 text-white/60">{collection.lookbookNote}</p>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {relatedProducts.length > 0 && (
                <section className="border-b border-white/10 px-4 py-16 md:px-6 md:py-24">
                    <div className="mx-auto max-w-[1800px]">
                        <div className="mb-8 flex items-end justify-between gap-6">
                            <h2 className="text-4xl font-black uppercase tracking-tighter md:text-6xl">More from drop</h2>
                            <Link
                                href={`/collections/${collection.slug}`}
                                className="hidden font-mono text-xs uppercase tracking-[0.24em] text-white/50 transition-colors hover:text-white md:block"
                            >
                                View all
                            </Link>
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                            {relatedProducts.map(item => (
                                <ProductCard key={item.id} product={item} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </main>
    );
}

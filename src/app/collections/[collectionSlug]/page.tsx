import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CollectionHero from "@/components/collections/CollectionHero";
import CollectionProductBrowser from "@/components/collections/CollectionProductBrowser";
import { collections, getCollectionBySlug, getProductsByCollectionSlug } from "@/data/collections";
import { siteConfig } from "@/lib/site";

type CollectionPageProps = {
    params: Promise<{ collectionSlug: string }>;
};

export function generateStaticParams() {
    return collections.map(collection => ({ collectionSlug: collection.slug }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
    const { collectionSlug } = await params;
    const collection = getCollectionBySlug(collectionSlug);

    if (!collection) {
        return {
            title: "Collection Not Found | INNOIR Streetwear",
        };
    }

    const title = `${collection.title} Collection | INNOIR Streetwear`;

    return {
        title,
        description: collection.intro,
        alternates: {
            canonical: `/collections/${collection.slug}`,
        },
        openGraph: {
            title,
            description: collection.intro,
            url: `/collections/${collection.slug}`,
            siteName: siteConfig.name,
            images: [collection.heroImage],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: collection.intro,
            images: [collection.heroImage],
        },
    };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
    const { collectionSlug } = await params;
    const collection = getCollectionBySlug(collectionSlug);

    if (!collection) {
        notFound();
    }

    const collectionProducts = getProductsByCollectionSlug(collection.slug);

    return (
        <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            <Header />
            <CollectionHero collection={collection} productCount={collectionProducts.length} />
            <Suspense fallback={<div className="border-b border-white/10 px-4 py-16 text-white md:px-6">Loading products...</div>}>
                <CollectionProductBrowser products={collectionProducts} />
            </Suspense>
            <Footer />
        </main>
    );
}

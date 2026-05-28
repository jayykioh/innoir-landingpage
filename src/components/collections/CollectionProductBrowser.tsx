"use client";

import { ChangeEvent, startTransition, useDeferredValue, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { CollectionProduct, ProductSortOption } from "@/data/collections";
import { isProductSortOption, searchAndSortProducts } from "@/data/collections";
import ProductCard from "./ProductCard";

type CollectionProductBrowserProps = {
    products: CollectionProduct[];
};

const SORT_OPTIONS: { value: ProductSortOption; label: string }[] = [
    { value: "newest", label: "Newest" },
    { value: "price-asc", label: "Price Low" },
    { value: "price-desc", label: "Price High" },
    { value: "name-asc", label: "A-Z" },
];

export default function CollectionProductBrowser({ products }: CollectionProductBrowserProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") ?? "");
    const deferredQuery = useDeferredValue(query);
    const rawSort = searchParams.get("sort") ?? "newest";
    const sort = isProductSortOption(rawSort) ? rawSort : "newest";

    const visibleProducts = useMemo(
        () => searchAndSortProducts(products, deferredQuery, sort),
        [products, deferredQuery, sort],
    );

    const replaceQuery = (nextValues: { q?: string; sort?: string }) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(nextValues).forEach(([key, value]) => {
            if (!value || value === "newest") {
                params.delete(key);
                return;
            }

            params.set(key, value);
        });

        const queryString = params.toString();
        router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const nextQuery = event.target.value;
        setQuery(nextQuery);
        startTransition(() => replaceQuery({ q: nextQuery }));
    };

    const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
        startTransition(() => replaceQuery({ sort: event.target.value }));
    };

    return (
        <section className="border-b border-white/10 bg-black px-4 py-10 text-white md:px-6 md:py-24">
            <div className="mx-auto max-w-[1800px]">
                <div className="grid gap-6 border-y border-white/10 py-5 lg:grid-cols-[1fr_auto_auto] lg:items-end">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.32em] text-white/40">Product index</p>
                        <h2 className="mt-3 text-4xl font-black uppercase tracking-tighter md:text-6xl">Available pieces</h2>
                    </div>

                    <label className="grid gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-white/50">
                        Search
                        <input
                            value={query}
                            onChange={handleSearchChange}
                            placeholder="Search tee, graphic..."
                            className="min-h-12 w-full border border-white/15 bg-white/[0.03] px-4 font-sans text-base normal-case tracking-normal text-white outline-none transition-colors placeholder:text-white/25 focus:border-white lg:w-80"
                        />
                    </label>

                    <label className="grid gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-white/50">
                        Sort
                        <select
                            value={sort}
                            onChange={handleSortChange}
                            className="min-h-12 w-full cursor-pointer border border-white/15 bg-black px-4 font-sans text-base normal-case tracking-normal text-white outline-none transition-colors focus:border-white lg:w-48"
                        >
                            {SORT_OPTIONS.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="mt-6 flex items-center justify-between font-mono text-xs uppercase tracking-[0.24em] text-white/40">
                    <span>{visibleProducts.length} result(s)</span>
                    <span>Prices in VND</span>
                </div>

                {visibleProducts.length > 0 ? (
                    <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
                        {visibleProducts.map((product, index) => (
                            <ProductCard key={product.id} product={product} priority={index < 2} />
                        ))}
                    </div>
                ) : (
                    <div className="mt-8 border border-white/10 bg-white/[0.02] p-10 text-center">
                        <p className="font-display text-4xl font-black uppercase tracking-tighter text-white">No pieces found.</p>
                        <p className="mt-3 text-white/50">Try another keyword or clear the search field.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

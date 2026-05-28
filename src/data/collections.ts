export type ProductStatus = "available" | "sold-out" | "coming-soon";

export type ProductSortOption = "newest" | "price-asc" | "price-desc" | "name-asc";

export type CollectionProduct = {
    id: string;
    slug: string;
    collectionSlug: string;
    name: string;
    category: string;
    priceVnd: number;
    images: string[];
    description: string;
    details: string[];
    sizes: string[];
    status: ProductStatus;
    tags: string[];
    createdAt: string;
};

export type Collection = {
    slug: string;
    title: string;
    season: string;
    intro: string;
    heroImage: string;
    lookbookNote: string;
    productIds: string[];
};

export const collections: Collection[] = [
    {
        slug: "apocalypse",
        title: "Apocalypse",
        season: "FW25",
        intro:
            "Apocalypse is INNOIR's first project, opening the brand's local streetwear language through a monochrome, raw, and direct point of view.",
        heroImage: "/photo/collections/apocalypse/apocalypse.jpg",
        lookbookNote: "First drop. Limited pieces. Built from Da Nang, made for night movement.",
        productIds: ["apocalypse-tshirt-1", "apocalypse-tshirt-2"],
    },
];

export const products: CollectionProduct[] = [
    {
        id: "apocalypse-tshirt-1",
        slug: "tshirt-1",
        collectionSlug: "apocalypse",
        name: "Apocalypse T-Shirt 01",
        category: "T-Shirt",
        priceVnd: 390000,
        images: [
            "/photo/collections/apocalypse/tshirt1.png",
            "/photo/collections/apocalypse/tshirt1_mockup.png",
        ],
        description:
            "An oversized tee carrying INNOIR's first Apocalypse visual. Built for easy layering with a strong contrast between the graphic and black base.",
        details: ["Oversized street fit", "Monochrome graphic print", "Cotton blend mock data", "Designed in Da Nang"],
        sizes: ["S", "M", "L", "XL"],
        status: "available",
        tags: ["tee", "black", "graphic", "first-drop"],
        createdAt: "2026-05-01",
    },
    {
        id: "apocalypse-tshirt-2",
        slug: "tshirt-2",
        collectionSlug: "apocalypse",
        name: "Apocalypse T-Shirt 02",
        category: "T-Shirt",
        priceVnd: 420000,
        images: [
            "/photo/collections/apocalypse/tshirt2.png",
            "/photo/collections/apocalypse/tshirt2_mockup.png",
        ],
        description:
            "The second Apocalypse variation keeps the underground tone and pushes the artwork harder for minimal monochrome outfits.",
        details: ["Relaxed silhouette", "High contrast artwork", "Cotton blend mock data", "Limited first collection"],
        sizes: ["M", "L", "XL"],
        status: "available",
        tags: ["tee", "graphic", "monochrome", "limited"],
        createdAt: "2026-05-02",
    },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
    return collections.find(collection => collection.slug === slug);
}

export function getProductsByCollectionSlug(collectionSlug: string): CollectionProduct[] {
    return products.filter(product => product.collectionSlug === collectionSlug);
}

export function getProductBySlugs(collectionSlug: string, productSlug: string): CollectionProduct | undefined {
    return products.find(product => product.collectionSlug === collectionSlug && product.slug === productSlug);
}

export function searchAndSortProducts(
    productList: CollectionProduct[],
    query: string,
    sort: ProductSortOption,
): CollectionProduct[] {
    const normalizedQuery = query.trim().toLowerCase();
    const filteredProducts = normalizedQuery
        ? productList.filter(product => {
              const searchableText = [product.name, product.category, product.description, ...product.tags]
                  .join(" ")
                  .toLowerCase();

              return searchableText.includes(normalizedQuery);
          })
        : productList;

    return [...filteredProducts].sort((a, b) => {
        if (sort === "price-asc") return a.priceVnd - b.priceVnd;
        if (sort === "price-desc") return b.priceVnd - a.priceVnd;
        if (sort === "name-asc") return a.name.localeCompare(b.name);

        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
}

export function isProductSortOption(value: string): value is ProductSortOption {
    return ["newest", "price-asc", "price-desc", "name-asc"].includes(value);
}

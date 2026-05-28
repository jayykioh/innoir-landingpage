# Collections Backend Migration Notes

This project currently uses local mock data for collection and product pages. The goal is to keep the frontend stable while replacing only the data source when the backend is ready.

## Current Mock Source

- Mock data lives in `src/data/collections.ts`.
- Price is stored as integer VND in `priceVnd` and formatted in the UI with `formatVnd` from `src/lib/format.ts`.
- Product images are local public paths under `public/photo/collections/<collection-slug>/`.
- Current implemented collection route is `/collections/apocalypse`.
- Current implemented product route is `/collections/apocalypse/[productSlug]`.

## Data Contracts To Preserve

Keep these field names or map backend responses to this shape in a frontend service layer.

```ts
type Collection = {
    slug: string;
    title: string;
    season: string;
    intro: string;
    heroImage: string;
    lookbookNote: string;
    productIds: string[];
};

type CollectionProduct = {
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
    status: "available" | "sold-out" | "coming-soon";
    tags: string[];
    createdAt: string;
};
```

## Suggested Backend Endpoints

```txt
GET /api/collections
GET /api/collections/:slug
GET /api/collections/:slug/products?q=&sort=&page=&limit=
GET /api/collections/:slug/products/:productSlug
```

The frontend already uses URL query parameters for browsing state:

```txt
/collections/apocalypse?q=tshirt&sort=price-asc
```

Supported sort values:

```txt
newest
price-asc
price-desc
name-asc
```

## Migration Steps For Future Agent

1. Create `src/features/collections/api/collectionsApi.ts` or `src/lib/collectionsApi.ts` depending on the final project structure.
2. Move lookup logic from `src/data/collections.ts` behind async functions such as `getCollection`, `getCollectionProducts`, and `getProduct`.
3. Keep UI components unchanged where possible: `CollectionHero`, `CollectionProductBrowser`, `ProductCard`, `ProductDetailGallery`, and `PurchaseActions` should receive the same props.
4. Convert `/collections/[collectionSlug]/page.tsx` to await backend data and pass products to `CollectionProductBrowser`.
5. If backend handles filtering/sorting, replace local `searchAndSortProducts` with API query calls using the existing `q` and `sort` params.
6. Preserve `priceVnd` as a number. Do not return preformatted price strings from the backend.
7. Preserve `images` order: first image is product primary image, later images are mockup/detail views.
8. Keep social purchase CTAs in `PurchaseActions` using `siteConfig.social` until a real checkout exists.

## Asset Rules

- Local mock assets are stored in `public/photo/collections/apocalypse/`.
- Recommended naming convention: `<product-slug>.png` and `<product-slug>_mockup.png`.
- Backend/CDN URLs can replace local paths later as long as `images` remains an ordered string array.

## Animation And UI Rules

Reference `ANIMATION_DOCUMENTATION.md` before changing collection UI.

- Use Framer Motion or CSS transitions for light reveal/hover states only.
- Prefer `transform`, `opacity`, and `filter`; avoid layout animation on product grids.
- Keep grayscale-to-color image reveal for INNOIR visual consistency.
- Respect mobile-first behavior and avoid heavy ScrollTrigger product browsing interactions.
- Keep touch targets at least 44px tall for search, sort, and social purchase buttons.

## Current Social Purchase Flow

There is no cart or checkout yet. Product detail pages expose:

- `DM Instagram`
- `Message Facebook`

When checkout is added, keep these buttons as secondary contact options unless the brand decides to remove social ordering.

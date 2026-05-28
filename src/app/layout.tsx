import type { Metadata } from "next";
import { Inter, Syne, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { absoluteUrl, routes, siteConfig, socialProfileUrls } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export const metadata: Metadata = {
  title: "INNOIR Streetwear | Local Streetwear Brand in Da Nang",
  description: siteConfig.description,
  keywords: ["streetwear Da Nang", 'innoir', 'innoir streetwear', "local brand Da Nang", "INNOIR", "Vietnam streetwear", "fashion Da Nang", "authentic streetwear", "D13 An Thuong 34", "An Thuong 34 Da Nang", "thời trang đường phố Đà Nẵng"],
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: routes.home,
  },
  openGraph: {
    title: "INNOIR Streetwear | Local Streetwear Brand in Da Nang",
    description: "INNOIR: Authentic Streetwear from Da Nang. Est. 2025. Redefining local fashion with bold designs and premium quality.",
    url: routes.home,
    siteName: siteConfig.name,
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "INNOIR Streetwear Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "INNOIR Streetwear | Da Nang",
    description: siteConfig.shortDescription,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "7Dst752UO_GA311XRhraa17098so3QIDmc6TX3LIcWs",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": siteConfig.legalName,
  "image": absoluteUrl("/photo/owner.jpg"),
  "description": siteConfig.shortDescription,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": siteConfig.address.street,
    "addressLocality": siteConfig.address.locality,
    "addressCountry": siteConfig.address.country
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": siteConfig.geo.latitude,
    "longitude": siteConfig.geo.longitude
  },
  "url": siteConfig.url,
  "telephone": siteConfig.phone,
  "priceRange": "$$",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "18:00",
      "closes": "23:00"
    }
  ],
  "sameAs": socialProfileUrls
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} ${syne.variable} ${beVietnamPro.variable}`}>
      <body className="bg-background text-foreground antialiased selection:bg-white selection:text-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

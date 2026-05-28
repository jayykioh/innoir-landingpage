import type { Metadata } from "next";
import { Inter, Syne, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

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
  description: "Discover INNOIR Streetwear, the premier local fashion brand in Da Nang, Vietnam. Authentic designs, premium quality, and the spirit of the night market. Est. 2025.",
  keywords: ["streetwear Da Nang", 'innoir', 'innoir streetwear', "local brand Da Nang", "INNOIR", "Vietnam streetwear", "fashion Da Nang", "authentic streetwear", "D13 An Thuong 34", "An Thuong 34 Da Nang", "thời trang đường phố Đà Nẵng"],
  metadataBase: new URL("https://www.innoir.site"),
  openGraph: {
    title: "INNOIR Streetwear | Local Streetwear Brand in Da Nang",
    description: "INNOIR: Authentic Streetwear from Da Nang. Est. 2025. Redefining local fashion with bold designs and premium quality.",
    siteName: "INNOIR",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // Ensure this exists or use a default
        width: 1200,
        height: 630,
        alt: "INNOIR Streetwear Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "INNOIR Streetwear | Da Nang",
    description: "Authentic Streetwear from Da Nang, Vietnam.",
    images: ["/og-image.jpg"],
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
  "name": "INNOIR Streetwear",
  "image": "https://www.innoir.site/photo/owner.jpg",
  "description": "Premier local streetwear brand in Da Nang, Vietnam.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "D13 An Thuong 34",
    "addressLocality": "Da Nang",
    "addressCountry": "VN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 16.049561,
    "longitude": 108.244352
  },
  "url": "https://www.innoir.site",
  "telephone": "+84328244990",
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
  "sameAs": [
    "https://instagram.com/innoir.streetwear"
  ]
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

import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google"; // Import Syne
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

export const metadata: Metadata = {
  title: "INNOIR Streetwear | Local Streetwear Brand in Da Nang",
  description: "Discover INNOIR Streetwear, the premier local fashion brand in Da Nang, Vietnam. Authentic designs, premium quality, and the spirit of the night market. Est. 2025.",
  keywords: ["streetwear Da Nang", "local brand Da Nang", "INNOIR", "Vietnam streetwear", "fashion Da Nang", "authentic streetwear", "night market fashion"],
  metadataBase: new URL("https://innoir.streetwear"), // Replace with actual domain when live
  openGraph: {
    title: "INNOIR Streetwear | Local Streetwear Brand in Da Nang",
    description: "Authentic Streetwear from Da Nang. Est. 2025. Redefining local fashion with bold designs and premium quality.",
    siteName: "INNOIR",
    locale: "en_US",
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "INNOIR Streetwear",
  "image": "https://innoir.streetwear/photo/owner.jpg",
  "description": "Premier local streetwear brand in Da Nang, Vietnam.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "An Thuong Night Market",
    "addressLocality": "Da Nang",
    "addressCountry": "VN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 16.0544,
    "longitude": 108.2022
  },
  "url": "https://innoir.streetwear",
  "telephone": "+84905123456", // Placeholder, user can update
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
    "https://instagram.com/innoir.streetwear",
    "https://facebook.com/jeckyoh"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
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

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
  title: "INNOIR | Authentic Streetwear",
  description: "Authentic Streetwear from Da Nang. Est. 2024.",
  metadataBase: new URL("https://innoir.streetwear"),
  openGraph: {
    title: "INNOIR | Authentic Streetwear",
    description: "Authentic Streetwear from Da Nang. Est. 2024.",
    siteName: "INNOIR",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="bg-background text-foreground antialiased selection:bg-white selection:text-black">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Facebook, Instagram, MessageCircle, Globe, MapPin } from "lucide-react";
import { siteConfig, routes } from "@/lib/site";

export const metadata: Metadata = {
    title: "Links | INNOIR Streetwear",
    description: "Connect with INNOIR Streetwear. Explore our authentic streetwear and community from Da Nang.",
    alternates: {
        canonical: routes.links,
    },
};

export default function LinksPage() {
    const SOCIAL_LINKS = [
        {
            title: "Instagram",
            url: siteConfig.social.instagram.url,
            icon: <Instagram className="w-5 h-5 md:w-6 md:h-6" />,
        },
        {
            title: "Facebook",
            url: siteConfig.social.facebook.url,
            icon: <Facebook className="w-5 h-5 md:w-6 md:h-6" />,
        },
        {
            title: "WhatsApp",
            url: siteConfig.social.whatsapp.url,
            icon: <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />,
        },
        {
            title: "Google Map",
            url: "https://maps.app.goo.gl/GijCwpP4dNqHCPQY9",
            icon: <MapPin className="w-5 h-5 md:w-6 md:h-6" />,
        },
        {
            title: "Back to Website",
            url: "/",
            icon: <Globe className="w-5 h-5 md:w-6 md:h-6" />,
        },
    ];

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col items-center">
            {/* Banner Section */}
            <div className="relative w-full h-[35vh] md:h-[40vh] bg-black">
                <Image
                    src="/photo/banner.JPG"
                    alt="INNOIR Banner"
                    fill
                    className="object-cover object-center grayscale opacity-80"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
                
                {/* Logo or Title positioned at the bottom center of the banner */}
                <div className="absolute bottom-0 left-0 w-full flex flex-col items-center justify-end pb-8">
                    <Image
                        src="/photo/logo.png"
                        alt="INNOIR Logo"
                        width={60}
                        height={60}
                        className="invert mb-4"
                    />
                    <h1 className="text-3xl md:text-4xl font-display font-black tracking-tighter uppercase text-white">
                        INNOIR
                    </h1>
                    <p className="font-mono text-xs text-gray-400 mt-2 tracking-widest uppercase">
                        @innoir.store
                    </p>
                </div>
            </div>

            {/* Links Section */}
            <div className="w-full max-w-lg px-6 pt-10 pb-20 flex flex-col gap-4">
                {SOCIAL_LINKS.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url}
                        target={link.url.startsWith("http") ? "_blank" : undefined}
                        className="group relative flex items-center justify-between p-4 md:p-5 w-full border border-white/20 rounded-2xl bg-black/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-white"
                    >
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-white translate-y-[101%] transition-transform duration-300 ease-out group-hover:translate-y-0" />
                        
                        {/* Content */}
                        <div className="relative z-10 flex items-center gap-4 group-hover:text-black transition-colors duration-300">
                            {link.icon}
                            <span className="font-display font-bold text-lg md:text-xl uppercase tracking-wider">
                                {link.title}
                            </span>
                        </div>
                        
                        {/* Icon right */}
                        <div className="relative z-10 opacity-50 group-hover:opacity-100 group-hover:text-black transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                            <ArrowUpRight size={24} />
                        </div>
                    </Link>
                ))}
            </div>

            {/* Footer */}
            <div className="mt-auto pb-10 font-mono text-xs text-gray-500 uppercase tracking-widest text-center">
                <p>Da Nang • Est. 2025</p>
            </div>
        </main>
    );
}

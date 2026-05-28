import { ArrowUpRight, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";

type PurchaseActionsProps = {
    productName: string;
};

export default function PurchaseActions({ productName }: PurchaseActionsProps) {
    const message = encodeURIComponent(`Hi INNOIR, I want to buy ${productName}.`);
    const facebookUrl = `${siteConfig.social.facebook.url}?mibextid=wwXIfr`;

    return (
        <div className="grid gap-3 sm:grid-cols-2">
            <a
                href={siteConfig.social.instagram.url}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex min-h-12 items-center justify-center gap-3 border border-white bg-white px-5 py-3 font-mono text-xs uppercase tracking-[0.24em] text-black transition-colors duration-300 hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                aria-label={`DM Instagram to buy ${productName}`}
            >
                DM Instagram
                <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex min-h-12 items-center justify-center gap-3 border border-white/20 px-5 py-3 font-mono text-xs uppercase tracking-[0.24em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                aria-label={`Message Facebook to buy ${productName}`}
            >
                Message Facebook
                <MessageCircle size={16} aria-hidden="true" />
            </a>
            <p className="sr-only">Suggested purchase message: {decodeURIComponent(message)}</p>
        </div>
    );
}

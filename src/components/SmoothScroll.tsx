"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
            <ScrollHandler />
            {children}
        </ReactLenis>
    );
}

function ScrollHandler() {
    const pathname = usePathname();
    const lenis = useLenis();

    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        }
    }, [pathname, lenis]);

    return null;
}

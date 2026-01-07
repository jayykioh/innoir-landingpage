"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Globe, Smartphone, Layout, Rocket } from 'lucide-react';

const features = [
    {
        title: "Lightning Fast",
        description: "Built on Next.js 14 with App Router and Server Components for optimal performance.",
        icon: Zap,
    },
    {
        title: "SEO Optimized",
        description: "Meta tags, sitemap, and robots.txt pre-configured for maximum reach.",
        icon: Globe,
    },
    {
        title: "Modern Design",
        description: "Premium aesthetic with smooth animations and responsive layout.",
        icon: Layout,
    },
    {
        title: "Mobile First",
        description: "Looks perfect on every device, from mobile phones to large desktops.",
        icon: Smartphone,
    },
    {
        title: "Secure by Default",
        description: "Best practices for security implemented out of the box.",
        icon: Shield,
    },
    {
        title: "Ready to Ship",
        description: "Deployment ready configuration for Vercel or any hosting provider.",
        icon: Rocket,
    },
];

export default function Features() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section className="bg-background py-24 sm:py-32">
            <div className="container mx-auto px-4">
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Everything you need to launch
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        A complete features set to help you build your next great idea faster and better.
                    </p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            className="group rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg dark:hover:border-primary/50"
                        >
                            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                <feature.icon size={24} />
                            </div>
                            <h3 className="mb-3 text-xl font-semibold text-foreground">{feature.title}</h3>
                            <p className="leading-relaxed text-muted-foreground">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

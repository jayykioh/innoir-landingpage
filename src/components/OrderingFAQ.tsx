"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function OrderingFAQ() {
    return (
        <section className="relative w-full bg-black text-white border-grid-b" id="faq">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 py-24 md:py-32">
                    {/* Left: Sticky Header */}
                    <div className="md:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="sticky top-32"
                        >
                            <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/50 mb-8">
                                FAQ
                            </p>
                            <h2 className="text-5xl md:text-6xl font-display font-bold uppercase tracking-tighter mb-6 leading-[0.9]">
                                Before<br />You DM
                            </h2>
                            <p className="font-sans text-sm text-white/60 max-w-xs leading-relaxed">
                                We prioritize offline experiences.
                                Most answers are here.
                                <span className="block mt-4 text-white/40 font-sans text-xs font-bold uppercase">
                                    RESPONSE TIME: 24-48H
                                </span>
                            </p>
                        </motion.div>
                    </div>

                    {/* Right: List */}
                    <div className="md:col-span-2">
                        <FAQList />
                    </div>
                </div>
            </div>
        </section>
    );
}

function FAQList() {
    const FAQS = [
        {
            q: "Where are you based?",
            a: "Da Nang, Vietnam. Built local, moving global."
        },
        {
            q: "How do I order right now?",
            a: "We’re mostly offline for now. Orders and questions are handled through the Contact section on this site."
        },
        {
            q: "How’s the fit / sizing?",
            a: "Relaxed silhouettes. If you’re unsure, share your height and weight and we’ll guide the fit."
        },
        {
            q: "Do you ship?",
            a: "Local first in Da Nang. Nationwide shipping depends on the drop."
        },
        {
            q: "When are new drops?",
            a: "Limited batches. Updates roll out through our channels."
        },
        {
            q: "When is the online store launching?",
            a: "Soon. No rush."
        }
    ];

    return (
        <div className="flex flex-col border-t border-white/10">
            {FAQS.map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} index={i} />
            ))}
        </div>
    );
}

function FAQItem({ question, answer, index }: { question: string; answer: string, index: number }) {
    const [isOpen, setIsOpen] = useState(false);
    const num = (index + 1).toString().padStart(2, '0');

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="border-b border-white/10 group"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-8 flex items-start text-left hover:bg-white/5 transition-colors px-4 -mx-4 rounded-lg"
                aria-expanded={isOpen}
            >
                {/* Numbering */}
                <span className="font-sans text-xs text-white/30 pt-1.5 w-12 shrink-0 md:w-20 font-bold">
                    {num}
                </span>

                {/* Question */}
                <div className="flex-1 pr-8">
                    <span className="font-display text-xl md:text-3xl font-bold uppercase tracking-tight text-white block group-hover:text-white/90 transition-colors">
                        {question}
                    </span>
                </div>

                {/* Toggle Icon */}
                <span className="shrink-0 text-white/50 pt-1">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pl-12 md:pl-20 pb-8 pr-6">
                            <p className="font-sans text-base text-white/60 leading-relaxed max-w-md">
                                {answer}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

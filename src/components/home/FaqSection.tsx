"use client";

import { Container } from "@/components/ui/Container";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

interface FaqItem {
    question: string;
    answer: string;
    _id: string;
}

interface FaqSectionProps {
    items: FaqItem[];
}

export default function FaqSection({ items }: FaqSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    if (!items || items.length === 0) return null;

    return (
        <section className="py-24 bg-white border-t border-black/5">
            <Container className="max-w-4xl">
                <div className="text-center mb-16 space-y-4">
                    <span className="text-gold font-bold uppercase tracking-widest text-xs md:text-sm flex items-center justify-center gap-2">
                        <HelpCircle size={16} /> FAQ
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold font-heading uppercase text-black">
                        Questions Fréquentes
                    </h2>
                    <div className="h-1 w-24 bg-gold mx-auto" />
                </div>

                <div className="space-y-4">
                    {items.map((item, idx) => (
                        <div
                            key={item._id || idx}
                            className="border border-black/5 rounded-lg overflow-hidden bg-neutral-50 hover:bg-neutral-100 transition-colors"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <span className="text-lg font-bold text-black pr-8">{item.question}</span>
                                <span className="shrink-0 text-gold">
                                    {openIndex === idx ? <Minus size={20} /> : <Plus size={20} />}
                                </span>
                            </button>
                            <AnimatePresence>
                                {openIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-black/5 pt-4">
                                            {item.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

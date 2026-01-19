"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";

interface TrustSectionProps {
    data: {
        subtitle?: string;
        title?: string;
        logos?: Array<{
            name?: string;
            logo: any;
        }>;
    };
}

export default function TrustSection({ data }: TrustSectionProps) {
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2, // Stagger each logo by 0.2s
            }
        }
    };

    const itemVariants = {
        hidden: {
            filter: "grayscale(100%)",
            opacity: 0.4
        },
        visible: {
            filter: "grayscale(0%)",
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" as const }
        }
    };

    return (
        <section className="py-24 bg-neutral-900 text-white">
            <Container className="text-center">
                <p className="uppercase tracking-[0.3em] text-gold text-sm mb-4">
                    {data?.subtitle || "Confiance & Expertise"}
                </p>
                <h2 className="text-3xl md:text-5xl uppercase font-bold mb-12">
                    {data?.title || "Ils nous font confiance"}
                </h2>

                <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
                    <motion.div
                        className="flex min-w-max gap-6 md:gap-24 items-center"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 30, // Adjust speed here (higher = slower)
                        }}
                    >
                        {/* Duplicate logos to ensure seamless loop */}
                        {data.logos && data.logos.length > 0 ? (
                            // Create a multiplied array specifically for the animation loop
                            // We need enough items to fill the screen width + buffer for the scroll
                            Array(10).fill(data.logos).flat().map((client, idx) => (
                                <div
                                    key={`${client.name}-${idx}`}
                                    className="flex items-center justify-center min-w-[150px] md:min-w-[200px] grayscale-0 opacity-100 md:grayscale md:opacity-60 md:hover:grayscale-0 md:hover:opacity-100 transition-all duration-300 px-4"
                                >
                                    {client.logo ? (
                                        <div className="relative h-20 w-32 md:h-24 md:w-40">
                                            <Image
                                                src={urlFor(client.logo).url()}
                                                alt={client.name || "Client"}
                                                fill
                                                className="object-contain"
                                                sizes="(max-width: 768px) 150px, 200px"
                                            />
                                        </div>
                                    ) : (
                                        <span className="text-xl md:text-2xl font-heading font-bold whitespace-nowrap">{client.name}</span>
                                    )}
                                </div>
                            ))
                        ) : (
                            // Fallback if no logos, just duplicate generic text
                            [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4].map((i) => (
                                <span key={i} className="text-2xl font-heading font-bold opacity-30 whitespace-nowrap px-8">A DEFINIR</span>
                            ))
                        )}
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}

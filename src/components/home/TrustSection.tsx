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
                        {[...data.logos || [], ...data.logos || [], ...data.logos || [], ...data.logos || []].map((client, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-center min-w-[150px] md:min-w-[200px] grayscale-0 opacity-100 md:grayscale md:opacity-60 md:hover:grayscale-0 md:hover:opacity-100 transition-all duration-300"
                            >
                                {client.logo ? (
                                    <Image
                                        src={urlFor(client.logo).url()}
                                        alt={client.name || "Client"}
                                        width={200}
                                        height={100}
                                        className="max-h-20 md:max-h-24 w-auto object-contain"
                                    />
                                ) : (
                                    <span className="text-xl md:text-2xl font-heading font-bold whitespace-nowrap">{client.name}</span>
                                )}
                            </div>
                        ))}

                        {(!data?.logos || data.logos.length === 0) && (
                            // Fallback if no logos, just duplicate generic text
                            [1, 2, 3, 4, 1, 2, 3, 4].map((i) => (
                                <span key={i} className="text-2xl font-heading font-bold opacity-30 whitespace-nowrap">A DEFINIR</span>
                            ))
                        )}
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

interface Service {
    title: string;
    subtitle?: string; // or tag
    slug: { current: string };
    shortDescription: string;
    includes?: string[];
    featuredImage?: any;
    staticImage?: any;
}

interface ServicesListProps {
    services: Service[];
}

const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut" as const
        }
    }
};

export default function ServicesList({ services }: ServicesListProps) {
    return (
        <div className="space-y-32">
            {services.map((service, index) => (
                <motion.div
                    key={service.slug?.current}
                    id={service.slug?.current}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={itemVariants}
                    className={`group flex flex-col md:flex-row gap-8 md:gap-16 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""
                        }`}
                >
                    {/* Image Section */}
                    <div className="w-full md:w-1/2 relative">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                            {/* Decorative overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 z-10 transition-opacity group-hover:opacity-40" />

                            {(service.featuredImage || service.staticImage) && (
                                <Image
                                    src={
                                        service.featuredImage
                                            ? urlFor(service.featuredImage).url()
                                            : service.staticImage
                                    }
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            )}
                        </div>


                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-1/2 space-y-6">
                        <div>
                            <span className="inline-block py-1 px-3 rounded-full bg-gold/10 text-gold text-xs font-bold uppercase tracking-wider mb-4 border border-gold/20">
                                {service.subtitle || "Service Exclusif"}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 leading-tight">
                                {service.title}
                            </h2>
                        </div>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                            {service.shortDescription}
                        </p>

                        {service.includes && service.includes.length > 0 && (
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Inclus dans l'offre</h4>
                                <ul className="grid grid-cols-1 gap-3">
                                    {service.includes.slice(0, 4).map((item) => (
                                        <li key={item} className="flex items-start gap-3 text-gray-700">
                                            <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center">
                                                <Check className="w-3 h-3 text-gold" />
                                            </div>
                                            <span className="text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="pt-4">
                            <Link
                                href={`/prestations/${service.slug?.current}`}

                                className="inline-flex items-center gap-2 text-black font-bold uppercase tracking-widest hover:text-gold transition-all group-btn"
                            >
                                <span className="border-b-2 border-black group-hover:border-gold transition-colors pb-1">
                                    Découvrir l'offre
                                </span>
                                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

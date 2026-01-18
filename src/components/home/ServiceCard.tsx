"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface ServiceCardProps {
    service: {
        title: string;
        subtitle: string;
        description: string;
        image: any;
        link: string;
        img?: string; // Fallback for hardcoded images
    };
    index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
    const ref = useRef(null);
    // Trigger "in view" when 30% of the element is visible
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <Link href={service.link || "#"}>
            <div
                ref={ref}
                className={`group relative h-[600px] overflow-hidden cursor-pointer grayscale hover:grayscale-0 transition-all duration-700 ease-out border border-black/5 ${isInView ? "max-md:grayscale-0" : ""}`}
            >
                <Image
                    src={service.image ? urlFor(service.image).url() : (service.img || "")}
                    alt={service.title}
                    fill
                    className={`object-cover transition-transform duration-1000 group-hover:scale-110 ${isInView ? "max-md:scale-110" : ""}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                />

                {/* Overlay Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500 ${isInView ? "max-md:opacity-60" : ""}`} />

                {/* Number (Top Right) */}
                <div className={`absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-4 group-hover:translate-x-0 ${isInView ? "max-md:opacity-100 max-md:translate-x-0" : ""}`}>
                    <span className="text-5xl font-heading text-white/20 font-bold">0{index + 1}</span>
                </div>

                {/* Content (Bottom Left) */}
                <div className="absolute bottom-0 left-0 p-8 w-full">
                    {/* Subtitle */}
                    <div className={`text-gold text-sm font-bold uppercase tracking-widest mb-2 transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ${isInView ? "max-md:translate-y-0 max-md:opacity-100" : ""}`}>
                        {service.subtitle}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold font-heading text-white uppercase mb-4 leading-none tracking-wide">
                        {service.title}
                    </h3>

                    {/* Separator Line */}
                    <div className={`h-[1px] w-12 group-hover:w-full bg-gold mb-4 transition-all duration-500 ${isInView ? "max-md:w-full" : ""}`} />

                    {/* Description */}
                    <p className={`text-gray-300 text-lg font-light leading-relaxed transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75 ${isInView ? "max-md:translate-y-0 max-md:opacity-100" : ""}`}>
                        {service.description}
                    </p>

                    {/* CTA */}
                    <div className={`mt-8 flex items-center gap-2 text-white font-bold uppercase tracking-widest text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150 ${isInView ? "max-md:opacity-100" : ""}`}>
                        En savoir plus <span>→</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

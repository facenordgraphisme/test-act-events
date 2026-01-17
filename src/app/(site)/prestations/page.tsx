import { Container } from "@/components/ui/Container";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

import { services as staticServices } from "@/lib/services";

// --- GROQ QUERY ---
const SERVICES_QUERY = `*[_type == "service"] | order(order asc) {
    title,
    slug,
    shortDescription,
    includes,
    featuredImage
}`;

export default async function ServicesPage() {
    let services = await client.fetch(SERVICES_QUERY);

    if (!services || services.length === 0) {
        services = staticServices.map(s => ({
            title: s.title,
            slug: { current: s.slug },
            shortDescription: s.description,
            includes: s.includes,
            staticImage: s.image,
            subtitle: s.subtitle
        }));
    }

    return (
        <div className="pt-32 pb-20 bg-background">
            <Container>
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading uppercase text-black">Nos Prestations</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        De la location simple à la production complète de festivals, nous avons la solution technique adaptée.
                    </p>
                </div>

                <div className="space-y-24">
                    {services.map((service: any, index: number) => (
                        <div key={service.slug?.current} id={service.slug?.current} className={`flex flex-col md:flex-row gap-8 md:gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                            {/* Image Side */}
                            <div className="w-full md:w-1/2">
                                <Link href={`/prestations/${service.slug?.current}`}>
                                    <div className="relative aspect-video rounded-lg overflow-hidden border border-black/10 group shadow-md cursor-pointer">
                                        <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-0" />
                                        {(service.featuredImage || service.staticImage) && (
                                            <Image
                                                src={service.featuredImage ? urlFor(service.featuredImage).url() : service.staticImage}
                                                alt={service.title}
                                                fill
                                                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        )}
                                    </div>
                                </Link>
                            </div>

                            {/* Content Side */}
                            <div className="w-full md:w-1/2 space-y-4 md:space-y-6">
                                <div>
                                    <span className="text-gold text-xs md:text-sm font-bold uppercase tracking-widest">{service.subtitle || "Prestation"}</span>
                                    <h2 className="text-2xl md:text-3xl font-bold font-heading text-black mt-2">{service.title}</h2>
                                </div>
                                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                                    {service.shortDescription}
                                </p>

                                <ul className="space-y-3">
                                    {service.includes && service.includes.slice(0, 4).map((item: string) => (
                                        <li key={item} className="flex items-center gap-3 text-sm text-gray-500">
                                            <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <div className="pt-6 flex items-center gap-6">
                                    <Link href={`/prestations/${service.slug?.current}`} className="text-gold font-bold uppercase tracking-wider hover:text-black transition-colors flex items-center gap-2 group">
                                        Voir les détails
                                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}


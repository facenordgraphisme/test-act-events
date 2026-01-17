import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check, Calendar, MapPin } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/services";

import { generateSeoMetadata, generateStructuredData } from "@/lib/seo";

// --- GROQ QUERY ---
const SERVICE_QUERY = `*[_type == "service" && slug.current == $slug][0]{
    title,
    "subtitle": "Prestation",
    shortDescription,
    longDescription,
    includes,
    optionsAndAddons,
    startingPrice,
    featuredImage,
    gallery,
    seo
}`;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = await client.fetch(SERVICE_QUERY, { slug });

    // Static fallback if needed
    if (!service) {
        const staticService = getServiceBySlug(slug);
        if (staticService) {
            return generateSeoMetadata({}, {
                title: `${staticService.title} | Act Events`,
                description: staticService.description
            });
        }
    }

    return generateSeoMetadata(service?.seo, {
        title: service ? `${service.title} | Act Events` : "Prestation | Act Events",
        description: service?.shortDescription || ""
    });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let service = await client.fetch(SERVICE_QUERY, { slug });

    if (!service) {
        // Fallback to static services
        const staticService = getServiceBySlug(slug);
        if (staticService) {
            service = {
                title: staticService.title,
                subtitle: staticService.subtitle,
                shortDescription: staticService.fullDescription, // Use fullDescription as shortDescription fallback
                longDescription: null,
                includes: staticService.includes,
                optionsAndAddons: [],
                startingPrice: staticService.price,
                staticImage: staticService.image,
                gallery: staticService.gallery,
                isStatic: true // Flag to help rendering if needed
            };
        } else {
            notFound();
        }
    }

    return (
        <div className="bg-background min-h-screen">
            {/* HEADER IMAGE */}
            <div className="relative h-[60vh] w-full bg-neutral-900 overflow-hidden">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <Image
                    src={service.featuredImage ? urlFor(service.featuredImage).url() : (service.staticImage || '')}
                    alt={service.title}
                    fill
                    priority
                    className="object-cover z-0"
                    sizes="100vw"
                />
                <Container className="absolute inset-0 z-20 flex flex-col justify-end pb-16">
                    <Link href="/prestations" className="text-white/80 hover:text-white flex items-center gap-2 mb-6 text-sm uppercase tracking-wider transition-colors w-fit">
                        <ArrowLeft className="w-4 h-4" /> Retour aux prestations
                    </Link>
                    <span className="text-gold font-bold uppercase tracking-[0.2em] mb-4">{service.subtitle}</span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading text-white uppercase max-w-4xl leading-none">
                        {service.title}
                    </h1>
                </Container>
            </div>

            <Container className="py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-16">
                        <section className="space-y-6">
                            <h2 className="text-3xl font-bold font-heading text-black">Présentation</h2>
                            <div className="text-gray-600 leading-relaxed text-lg prose prose-lg">
                                {service.longDescription ? (
                                    <PortableText value={service.longDescription} />
                                ) : (
                                    <p>{service.shortDescription}</p>
                                )}
                            </div>
                        </section>

                        {service.includes && service.includes.length > 0 && (
                            <section>
                                <h2 className="text-3xl font-bold font-heading text-black mb-8">Ce qui est inclus</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {service.includes.map((item: string) => (
                                        <div key={item} className="flex items-center gap-4 p-5 bg-white border border-black/5 rounded-lg shadow-sm hover:border-gold/30 transition-colors">
                                            <div className="bg-gold/10 p-2 rounded-full text-gold shrink-0">
                                                <Check className="w-5 h-5" />
                                            </div>
                                            <span className="text-gray-700 font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {service.optionsAndAddons && service.optionsAndAddons.length > 0 && (
                            <section>
                                <h2 className="text-3xl font-bold font-heading text-black mb-8">Options & Extras</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {service.optionsAndAddons.map((item: string) => (
                                        <div key={item} className="flex items-center gap-4 p-5 bg-white border border-black/5 rounded-lg shadow-sm hover:border-gold/30 transition-colors">
                                            <div className="bg-neutral-100 p-2 rounded-full text-gray-600 shrink-0">
                                                <div className="w-5 h-5 flex items-center justify-center font-bold text-sm">+</div>
                                            </div>
                                            <span className="text-gray-700 font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {service.gallery && service.gallery.length > 0 && (
                            <section>
                                <h2 className="text-3xl font-bold font-heading text-black mb-8">Galerie Photos</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {service.gallery.map((img: any, i: number) => (
                                        <div key={i} className="aspect-[4/3] rounded-lg overflow-hidden relative group cursor-pointer">
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                                            <Image
                                                src={typeof img === 'string' ? img : urlFor(img).url()}
                                                alt={`${service.title} illustration ${i}`}
                                                fill
                                                className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar CTA */}
                    <div className="lg:col-span-1">
                        <div className="bg-white border border-black/5 rounded-xl p-8 sticky top-32 space-y-8 shadow-lg shadow-black/5">
                            <div>
                                <h3 className="text-2xl font-bold text-black mb-2">Votre projet</h3>
                                <p className="text-gray-600 text-sm">
                                    Chaque événement est unique. Discutons de vos besoins techniques.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                                    <div>
                                        <span className="block text-black font-bold text-sm uppercase">Zone d&apos;intervention</span>
                                        <span className="text-gray-500 text-sm">Hautes-Alpes & France entière</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                                    <div>
                                        <span className="block text-black font-bold text-sm uppercase">Disponibilité</span>
                                        <span className="text-gray-500 text-sm">Sur réservation uniquement</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-black/5">
                                <div className="mb-6">
                                    <span className="block text-gray-500 text-xs uppercase tracking-wider mb-1">Tarif indicatif</span>
                                    <span className="text-2xl font-bold text-black">{service.startingPrice || "Sur devis"}</span>
                                </div>
                                <Link href="/devis" className="block">
                                    <Button className="w-full text-lg py-6" size="lg">Demander un devis</Button>
                                </Link>
                                <p className="text-center text-xs text-gray-400 mt-4">
                                    Réponse sous 24h ouvrées
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

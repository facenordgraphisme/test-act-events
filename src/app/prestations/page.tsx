import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";

export default function ServicesPage() {
    return (
        <div className="py-20 bg-background">
            <Container>
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading uppercase text-black">Nos Prestations</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        De la location simple à la production complète de festivals, nous avons la solution technique adaptée.
                    </p>
                </div>

                <div className="space-y-24">
                    {services.map((service, index) => (
                        <div key={service.slug} id={service.slug} className={`flex flex-col md:flex-row gap-8 md:gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                            {/* Image Side */}
                            <div className="w-full md:w-1/2">
                                <Link href={`/prestations/${service.slug}`}>
                                    <div className="relative aspect-video rounded-lg overflow-hidden border border-black/10 group shadow-md cursor-pointer">
                                        <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-0" />
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                </Link>
                            </div>

                            {/* Content Side */}
                            <div className="w-full md:w-1/2 space-y-4 md:space-y-6">
                                <div>
                                    <span className="text-gold text-xs md:text-sm font-bold uppercase tracking-widest">{service.subtitle}</span>
                                    <h2 className="text-2xl md:text-3xl font-bold font-heading text-black mt-2">{service.title}</h2>
                                </div>
                                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                                    {service.description}
                                </p>

                                <ul className="space-y-3">
                                    {service.includes.slice(0, 4).map((item) => (
                                        <li key={item} className="flex items-center gap-3 text-sm text-gray-500">
                                            <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <div className="pt-6 flex items-center gap-6">
                                    <Link href={`/prestations/${service.slug}`} className="text-gold font-bold uppercase tracking-wider hover:text-black transition-colors flex items-center gap-2 group">
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

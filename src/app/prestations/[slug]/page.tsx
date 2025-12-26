import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, Check, Calendar, MapPin } from "lucide-react";
import { getServiceBySlug } from "@/lib/services";
import { redirect } from "next/navigation";

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) {
        redirect("/prestations");
    }

    return (
        <div className="bg-background min-h-screen">
            {/* HEADER IMAGE */}
            <div className="relative h-[60vh] w-full bg-neutral-900 overflow-hidden">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${service.image})` }}
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
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {service.fullDescription}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold font-heading text-black mb-8">Ce qui est inclus</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {service.includes.map((item) => (
                                    <div key={item} className="flex items-center gap-4 p-5 bg-white border border-black/5 rounded-lg shadow-sm hover:border-gold/30 transition-colors">
                                        <div className="bg-gold/10 p-2 rounded-full text-gold shrink-0">
                                            <Check className="w-5 h-5" />
                                        </div>
                                        <span className="text-gray-700 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold font-heading text-black mb-8">Galerie Photos</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {service.gallery.map((img, i) => (
                                    <div key={i} className="aspect-[4/3] rounded-lg overflow-hidden relative group cursor-pointer">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                                        <img
                                            src={img}
                                            alt={`${service.title} illustration ${i}`}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
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
                                        <span className="block text-black font-bold text-sm uppercase">Zone d'intervention</span>
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
                                    <span className="text-2xl font-bold text-black">{service.price}</span>
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

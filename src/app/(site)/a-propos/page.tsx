import { Container } from "@/components/ui/Container";
import { Mic2, Settings, Heart, Music } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="pt-32 pb-20 bg-background min-h-screen">
            <Container className="max-w-4xl">
                <div className="text-center mb-12 md:mb-20 space-y-4 md:space-y-6">
                    <span className="text-gold font-bold uppercase tracking-widest text-xs md:text-sm">Notre Parcours</span>
                    <h1 className="text-3xl md:text-5xl font-bold font-heading uppercase text-black leading-tight">
                        De la Passion du Son <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-600">
                            à l'Excellence Technique
                        </span>
                    </h1>
                    <div className="h-1 w-16 md:w-24 bg-gold mx-auto" />
                </div>

                <div className="space-y-24 text-lg text-gray-700 leading-relaxed font-light">

                    {/* The Beginning */}
                    <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div className="space-y-6 order-2 md:order-1">
                            <h2 className="text-xl md:text-2xl font-bold text-black font-heading uppercase flex items-center gap-3">
                                <Heart className="text-gold shrink-0" /> Les Débuts
                            </h2>
                            <p>
                                Né à Marseille, j’arrive dans les Hautes-Alpes à 18 ans avec, dans les bagages, une passion viscérale pour la musique.
                            </p>
                            <p>
                                Il y a une dizaine d’années, l'aventure commence par un défi entre amis : <strong>fabriquer nos propres enceintes</strong>. L’idée était simple : faire la fête librement, avec un son qui nous ressemble.
                            </p>
                            <p>
                                Très vite, le projet dépasse le cadre des soirées privées. Le système grandit, le public aussi. C'est la naissance d'une association avec une ambition claire : créer des événements légaux, immersifs et partager une vraie culture du son.
                            </p>
                        </div>
                        <div className="bg-neutral-900 aspect-square rounded-lg rotate-3 shadow-xl overflow-hidden border-4 border-white order-1 md:order-2">
                            {/* Placeholder for "Vintage" or "DIY" photo if available, using asset for now */}
                            <div className="w-full h-full bg-[url('/assets/image00019.jpeg')] bg-cover bg-center opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" />
                        </div>
                    </section>

                    {/* The Growth */}
                    <section className="bg-white p-10 rounded-xl shadow-sm border border-black/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full -mr-10 -mt-10" />

                        <h2 className="text-2xl font-bold text-black font-heading uppercase flex items-center gap-3 mb-8">
                            <Music className="text-gold" /> L'Experience Terrain
                        </h2>

                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="font-bold text-black mb-2 uppercase tracking-wide text-sm">Côté Scène</h3>
                                <p className="mb-4">
                                    En parallèle, je développe mon parcours d’<strong>artiste DJ</strong>. Je mixe dans de nombreux bars, clubs et lieux atypiques. Cette expérience est cruciale : elle m'a appris à comprendre les foules, à sentir l'énergie d'une salle et à construire une identité musicale forte.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-black mb-2 uppercase tracking-wide text-sm">Côté Coulisses</h3>
                                <p>
                                    Pendant deux ans, j'occupe les postes de <strong>Régisseur et Directeur Artistique</strong> d'un établissement de nuit. C'est l'école de la rigueur : gestion administrative, booking d'artistes, coordination des équipes et logistique millimétrée.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* The Company Today */}
                    <section className="text-center max-w-2xl mx-auto space-y-8">
                        <h2 className="text-3xl font-bold text-black font-heading uppercase flex justify-center items-center gap-3">
                            <Settings className="text-gold" /> Aujourd'hui
                        </h2>
                        <p className="text-xl italic font-medium text-black">
                            "Ce qui me distingue, c’est ce parcours double : celui d’un artiste habitué au dancefloor, et celui d’un technicien capable de concevoir un événement de A à Z."
                        </p>
                        <p>
                            Ces expériences m’ont amené naturellement à créer <strong>ACT Évent Pro</strong>. Aujourd'hui, avec mon équipe, nous mettons cette expertise globale au service de vos projets.
                        </p>
                        <p>
                            Que ce soit pour un mariage, une soirée privée, un concert ou un festival, nous pensons chaque prestation comme une expérience complète. Nous ne louons pas simplement du matériel : nous créons l'atmosphère qui fera vibrer vos invités.
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-t border-black/10 mt-8">
                            <div className="text-center p-4">
                                <span className="block text-2xl md:text-3xl font-bold text-gold">10+</span>
                                <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500">Années d'expérience</span>
                            </div>
                            <div className="text-center p-4">
                                <span className="block text-2xl md:text-3xl font-bold text-gold">05</span>
                                <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500">Zone Principale</span>
                            </div>
                            <div className="text-center p-4">
                                <span className="block text-xl md:text-3xl font-bold text-gold">A-Z</span>
                                <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500">Gestion Complète</span>
                            </div>
                            <div className="text-center p-4">
                                <span className="block text-2xl md:text-3xl font-bold text-gold">100%</span>
                                <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500">Passion</span>
                            </div>
                        </div>
                    </section>

                </div>
            </Container>
        </div>
    );
}

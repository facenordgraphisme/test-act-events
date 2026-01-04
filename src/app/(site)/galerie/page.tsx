"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

// Mock data
const galleryItems = [
    { id: 1, src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop", category: "mariage", title: "Mariage Château de Tallard" },
    { id: 2, src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop", category: "corporate", title: "Soirée Annuelle Tech" },
    { id: 3, src: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=2070&auto=format&fit=crop", category: "anniversaire", title: "30 Ans à Gap" },
    { id: 4, src: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop", category: "materiel", title: "Setup L-Acoustics" },
    { id: 5, src: "https://images.unsplash.com/photo-1549451371-64aa98a6f660?q=80&w=2070&auto=format&fit=crop", category: "mariage", title: "Mariage Lac de Serre-Ponçon" },
    { id: 6, src: "https://images.unsplash.com/photo-1506157787155-6963305d2a98?q=80&w=2070&auto=format&fit=crop", category: "corporate", title: "Séminaire Hiver" },
];

const filters = [
    { id: 'all', label: 'Tout' },
    { id: 'mariage', label: 'Mariages' },
    { id: 'corporate', label: 'Entreprise' },
    { id: 'anniversaire', label: 'Privé' },
    { id: 'materiel', label: 'Matériel' },
];

export default function GalleryPage() {
    const [activeFilter, setActiveFilter] = useState('all');

    const filteredItems = activeFilter === 'all'
        ? galleryItems
        : galleryItems.filter(item => item.category === activeFilter);

    return (
        <div className="pt-32 pb-20 bg-background min-h-screen">
            <Container>
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading uppercase text-black">Galerie</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Nos meilleurs moments et setups en images.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {filters.map((filter) => (
                        <Button
                            key={filter.id}
                            variant={activeFilter === filter.id ? 'primary' : 'outline'}
                            onClick={() => setActiveFilter(filter.id)}
                            className="min-w-[100px]"
                        >
                            {filter.label}
                        </Button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map((item) => (
                        <div key={item.id} className="group relative aspect-square overflow-hidden rounded-lg bg-white border border-black/5 cursor-pointer shadow-sm hover:shadow-md">
                            <img
                                src={item.src}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <span className="text-gold text-xs font-bold uppercase tracking-wider mb-2">{item.category}</span>
                                <h3 className="text-white font-bold font-heading text-lg">{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <p className="text-center text-gray-500 py-12">Aucune photo dans cette catégorie pour le moment.</p>
                )}
            </Container>
        </div>
    );
}

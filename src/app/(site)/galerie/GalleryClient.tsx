"use client";

import Image from "next/image";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { urlFor } from "@/sanity/lib/image";

type GalleryCategory = {
    _id: string;
    title: string;
    slug: { current: string };
}

type GalleryItem = {
    _id: string;
    title: string;
    image: any;
    category: GalleryCategory;
}

interface GalleryClientProps {
    categories: GalleryCategory[];
    items: GalleryItem[];
}

export default function GalleryClient({ categories, items }: GalleryClientProps) {
    const [activeFilter, setActiveFilter] = useState('all');

    // Filter items locally based on category ID
    // Note: items might have null category if not set or deleted
    const filteredItems = activeFilter === 'all'
        ? items
        : items.filter(item => item.category?._id === activeFilter);

    // Add 'All' option manually
    const filterOptions = [
        { _id: 'all', title: 'Tout' },
        ...categories
    ];

    if (items.length === 0) {
        return (
            <div className="text-center py-20 bg-white/50 rounded-lg border border-black/5">
                <p className="text-gray-500 text-lg">La galerie est vide pour le moment.</p>
                <p className="text-sm text-gray-400 mt-2">Ajoutez des catégories et des éléments dans votre Studio Sanity.</p>
            </div>
        );
    }

    return (
        <>
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
                {filterOptions.map((filter) => (
                    <Button
                        key={filter._id}
                        variant={activeFilter === filter._id ? 'primary' : 'outline'}
                        onClick={() => setActiveFilter(filter._id)}
                        className="min-w-[100px]"
                    >
                        {filter.title}
                    </Button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                    <div key={item._id} className="group relative aspect-square overflow-hidden rounded-lg bg-white border border-black/5 cursor-pointer shadow-sm hover:shadow-md">
                        {item.image && (
                            <Image
                                src={urlFor(item.image).width(800).height(800).url()}
                                alt={item.title || "Gallery Image"}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                            {item.category && (
                                <span className="text-gold text-xs font-bold uppercase tracking-wider mb-2">
                                    {item.category.title}
                                </span>
                            )}
                            {item.title && (
                                <h3 className="text-white font-bold font-heading text-lg">{item.title}</h3>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {filteredItems.length === 0 && (
                <p className="text-center text-gray-500 py-12">Aucune photo dans cette catégorie pour le moment.</p>
            )}
        </>
    );
}

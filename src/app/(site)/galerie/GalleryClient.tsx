"use client";

import Image from "next/image";

import { useState, useEffect, useCallback } from "react";
import { urlFor } from "@/sanity/lib/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type GalleryCategory = {
    _id: string;
    title: string;
    slug: { current: string };
}

type GalleryItem = {
    _id: string;
    title: string;
    description?: string;
    image: any;
    category: GalleryCategory;
}

interface GalleryClientProps {
    categories: GalleryCategory[];
    items: GalleryItem[];
}

export default function GalleryClient({ categories, items }: GalleryClientProps) {
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

    // Close lightbox on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedImage(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

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
            <div className="flex flex-wrap justify-center gap-2 mb-12">
                {filterOptions.map((filter) => {
                    const isActive = activeFilter === filter._id;
                    return (
                        <button
                            key={filter._id}
                            onClick={() => setActiveFilter(filter._id)}
                            className={`relative px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-colors duration-300 z-10 ${isActive ? 'text-black' : 'text-gray-500 hover:text-black'}`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeFilter"
                                    className="absolute inset-0 bg-gold rounded-full -z-10"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            {filter.title}
                        </button>
                    );
                })}
            </div>

            {/* Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredItems.map((item) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            key={item._id}
                            onClick={() => setSelectedImage(item)}
                            className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            {item.image && (
                                <Image
                                    src={urlFor(item.image).width(800).height(800).url()}
                                    alt={item.title || "Gallery Image"}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                                {item.category && (
                                    <span className="text-gold text-xs font-bold uppercase tracking-widest mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                        {item.category.title}
                                    </span>
                                )}
                                {item.title && (
                                    <h3 className="text-white font-bold font-heading text-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                                        {item.title}
                                    </h3>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredItems.length === 0 && (
                <p className="text-center text-gray-500 py-12">Aucune photo dans cette catégorie pour le moment.</p>
            )}

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
                    >
                        <div className="absolute top-4 right-4 z-50">
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white"
                            >
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full h-[70vh] md:h-[80vh]">
                                {selectedImage.image && (
                                    <Image
                                        src={urlFor(selectedImage.image).url()}
                                        alt={selectedImage.title || "Gallery Preview"}
                                        fill
                                        className="object-contain"
                                        sizes="100vw"
                                        priority
                                    />
                                )}
                            </div>

                            <div className="mt-4 text-center">
                                {selectedImage.category && (
                                    <span className="text-gold text-sm font-bold uppercase tracking-wider block mb-1">
                                        {selectedImage.category.title}
                                    </span>
                                )}
                                <h3 className="text-white text-xl md:text-2xl font-bold font-heading">
                                    {selectedImage.title}
                                </h3>
                                {selectedImage.description && (
                                    <p className="text-gray-300 mt-2 max-w-2xl mx-auto text-sm md:text-base">
                                        {selectedImage.description}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

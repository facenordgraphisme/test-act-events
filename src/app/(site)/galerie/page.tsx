
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import GalleryClient from "./GalleryClient";

// Define Types
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

// Fetch Data
const GALLERY_QUERY = `
{
  "categories": *[_type == "galleryCategory"] | order(title asc),
  "items": *[_type == "galleryItem"] | order(_createdAt desc) {
    _id,
    title,
    image,
    category->{
      _id,
      title,
      slug
    }
  }
}
`;

export const revalidate = 60; // Revalidate every minute

export default async function GalleryPage() {
    const data = await client.fetch(GALLERY_QUERY);
    const { categories, items } = data || { categories: [], items: [] };

    return (
        <div className="min-h-screen bg-white pb-32">
            {/* Hero Section */}
            <section className="relative pt-40 pb-20 overflow-hidden bg-gray-50 mb-12">
                <div className="absolute inset-0 bg-gold/5 z-0" />
                <Container className="relative z-10">
                    <div className="text-center max-w-4xl mx-auto space-y-6">
                        <span className="text-gold font-bold uppercase tracking-widest text-sm md:text-base">
                            Nos Réalisations
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold font-heading uppercase text-black leading-none">
                            Galerie
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Découvrez nos meilleurs moments et nos setups techniques en images.
                        </p>
                    </div>
                </Container>
            </section>

            <Container>
                <GalleryClient categories={categories} items={items} />
            </Container>
        </div>
    );
}

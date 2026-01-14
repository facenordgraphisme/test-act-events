
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
        <div className="pt-32 pb-20 bg-background min-h-screen">
            <Container>
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading uppercase text-black">Galerie</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Nos meilleurs moments et setups en images.
                    </p>
                </div>

                <GalleryClient categories={categories} items={items} />
            </Container>
        </div>
    );
}

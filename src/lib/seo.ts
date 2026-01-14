import { Metadata } from 'next';
import { urlFor } from '@/sanity/lib/image';

interface SeoData {
    metaTitle?: string;
    metaDescription?: string;
    openGraphImage?: any;
    // Fallbacks
    title?: string;
    shortDescription?: string;
    description?: string;
    featuredImage?: any;
}

export function generateSeoMetadata(data: SeoData, fallback?: { title: string; description: string }): Metadata {
    const title = data?.metaTitle || data?.title || fallback?.title || 'Act Events';
    const description = data?.metaDescription || data?.shortDescription || data?.description || fallback?.description || '';

    // Base metadata
    const metadata: Metadata = {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
        }
    };

    // Handle Image
    const imageSource = data?.openGraphImage || data?.featuredImage;
    if (imageSource) {
        const imageUrl = urlFor(imageSource).width(1200).height(630).url();
        metadata.openGraph = {
            ...metadata.openGraph,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        };
    }

    return metadata;
}

export function generateStructuredData(type: 'Organization' | 'Product' | 'Service' | 'WebSite', data: any) {
    const schema: any = {
        '@context': 'https://schema.org',
        '@type': type,
    };

    if (type === 'Organization' || type === 'WebSite') {
        schema.name = data.name || 'Act Events';
        schema.url = 'https://www.act-events.fr'; // TODO: Replace with env var if needed
        if (data.logo) {
            schema.logo = urlFor(data.logo).url();
        }
    }

    if (type === 'Service' || type === 'Product') {
        schema.name = data.title;
        schema.description = data.shortDescription || data.fullDescription;
        if (data.featuredImage) {
            schema.image = urlFor(data.featuredImage).url();
        }
        if (data.startingPrice) {
            schema.offers = {
                '@type': 'Offer',
                'price': data.startingPrice.replace(/[^0-9]/g, ''), // Basic cleaning, ideally store as number
                'priceCurrency': 'EUR'
            }
        }
    }

    return schema;
}

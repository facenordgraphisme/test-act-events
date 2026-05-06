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
    const title = data?.metaTitle || data?.title || fallback?.title || 'Act Event';
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

export function generateStructuredData(type: 'Organization' | 'Product' | 'Service' | 'WebSite' | 'LocalBusiness', data: any) {
    const schema: any = {
        '@context': 'https://schema.org',
        '@type': type,
    };

    if (type === 'Organization' || type === 'WebSite' || type === 'LocalBusiness') {
        schema.name = data.name || 'ACT Event';
        schema.url = 'https://www.act-event-pro.fr';
        if (data.logo) {
            schema.logo = urlFor(data.logo).url();
        }
    }

    if (type === 'LocalBusiness') {
        schema.image = data.image || 'https://www.act-event-pro.fr/assets/logos/icon.webp';
        schema.address = {
            '@type': 'PostalAddress',
            'streetAddress': '7 Rue du Docteur Ayasse',
            'addressLocality': 'Gap',
            'postalCode': '05000',
            'addressRegion': 'Hautes-Alpes',
            'addressCountry': 'FR'
        };
        schema.geo = {
            '@type': 'GeoCoordinates',
            'latitude': 44.5596,
            'longitude': 6.0782
        };
        schema.openingHoursSpecification = [
            {
                '@type': 'OpeningHoursSpecification',
                'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                'opens': '09:00',
                'closes': '18:00'
            }
        ];
        schema.priceRange = '€€';
        schema.telephone = '+33600000000'; // Replace with real if known
        schema.areaServed = [
            {
                "@type": "AdministrativeArea",
                "name": "Hautes-Alpes"
            },
            {
                "@type": "AdministrativeArea",
                "name": "Provence-Alpes-Côte d'Azur"
            }
        ];
    }

    if (type === 'Service' || type === 'Product') {
        schema.name = data.title;
        schema.description = data.shortDescription || data.fullDescription;
        if (data.featuredImage) {
            schema.image = urlFor(data.featuredImage).width(1200).url();
        }
        if (data.startingPrice) {
            schema.offers = {
                '@type': 'Offer',
                'price': data.startingPrice.replace(/[^0-9]/g, ''),
                'priceCurrency': 'EUR'
            }
        }
    }

    return schema;
}

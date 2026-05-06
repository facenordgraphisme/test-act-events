import { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';

const baseUrl = 'https://www.act-event-pro.fr';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Fetch all services slugs
    const services = await client.fetch(`*[_type == "service"]{ "slug": slug.current, _updatedAt }`);

    const serviceUrls = services.map((service: any) => ({
        url: `${baseUrl}/prestations/${service.slug}`,
        lastModified: new Date(service._updatedAt),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    const staticRoutes = [
        '',
        '/a-propos',
        '/galerie',
        '/prestations',
        '/devis',
        '/mentions-legales',
        '/politique-de-confidentialite',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1.0 : 0.7,
    }));

    return [...staticRoutes, ...serviceUrls];
}

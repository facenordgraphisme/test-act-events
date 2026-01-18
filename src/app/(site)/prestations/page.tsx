import { Container } from "@/components/ui/Container";
import { client } from "@/sanity/lib/client";
import ServicesList from "@/components/prestations/ServicesList";

import { services as staticServices } from "@/lib/services";

// --- GROQ QUERY ---
const SERVICES_QUERY = `*[_type == "service"] | order(order asc) {
    title,
    slug,
    shortDescription,
    includes,
    featuredImage
}`;

export default async function ServicesPage() {
    let services = await client.fetch(SERVICES_QUERY);

    if (!services || services.length === 0) {
        services = staticServices.map(s => ({
            title: s.title,
            slug: { current: s.slug },
            shortDescription: s.description,
            includes: s.includes,
            staticImage: s.image,
            subtitle: s.subtitle
        }));
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-40 pb-20 overflow-hidden bg-gray-50">
                <div className="absolute inset-0 bg-gold/5 z-0" />
                <Container className="relative z-10">
                    <div className="text-center max-w-4xl mx-auto space-y-6">
                        <span className="text-gold font-bold uppercase tracking-widest text-sm md:text-base">
                            Notre Expertise
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold font-heading uppercase text-black leading-none">
                            Nos Prestations
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            De la location simple à la production complète de festivals, nous transformons vos idées en expériences inoubliables.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Services List */}
            <section className="py-24">
                <Container>
                    <ServicesList services={services} />
                </Container>
            </section>
        </div>
    );
}


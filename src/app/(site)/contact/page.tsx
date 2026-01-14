
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { client } from "@/sanity/lib/client";

import { generateSeoMetadata } from "@/lib/seo";

const CONTACT_PAGE_QUERY = `
{
  "page": *[_type == "contactPage"][0] {
    title,
    description,
    showContactInfo,
    ctaText,
    ctaLink,
    seo
  },
  "settings": *[_type == "siteSettings"][0] {
    phoneNumber,
    email,
    address,
    coverageArea
  }
}
`;

export async function generateMetadata() {
    const data = await client.fetch(CONTACT_PAGE_QUERY);
    return generateSeoMetadata(data?.page?.seo, {
        title: "Contactez-nous | Act Events",
        description: "Prenez contact avec Act Events pour vos projets de sonorisation et d'éclairage événementiel."
    });
}

export default async function ContactPage() {
    const data = await client.fetch(CONTACT_PAGE_QUERY);
    const { page, settings } = data || {};

    if (!page) {
        // Fallback loading or default content if not yet created in Sanity
        return (
            <div className="py-20 bg-background min-h-screen">
                <Container className="max-w-4xl text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading uppercase text-black mb-8">Contactez-nous</h1>
                    <p className="text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
                        Le contenu de cette page est en cours de création.
                    </p>
                </Container>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 bg-background min-h-screen">
            <Container className="max-w-4xl text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-heading uppercase text-black mb-8">{page.title || "Contactez-nous"}</h1>
                <p className="text-gray-600 text-lg mb-16 max-w-2xl mx-auto whitespace-pre-line">
                    {page.description || "Pour toute demande de devis, merci de privilégier le formulaire dédié."}
                </p>

                {page.showContactInfo && settings && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {settings.phoneNumber && (
                            <div className="bg-white p-8 border border-black/5 rounded-lg flex flex-col items-center gap-4 shadow-sm">
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gold">
                                    <Phone />
                                </div>
                                <h3 className="text-black font-bold">Téléphone</h3>
                                <a href={`tel:${settings.phoneNumber}`} className="text-gray-600 hover:text-black transition-colors">{settings.phoneNumber}</a>
                            </div>
                        )}

                        {settings.email && (
                            <div className="bg-white p-8 border border-black/5 rounded-lg flex flex-col items-center gap-4 shadow-sm">
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gold">
                                    <Mail />
                                </div>
                                <h3 className="text-black font-bold">Email</h3>
                                <a href={`mailto:${settings.email}`} className="text-gray-600 hover:text-black transition-colors">{settings.email}</a>
                            </div>
                        )}

                        {(settings.address || settings.coverageArea) && (
                            <div className="bg-white p-8 border border-black/5 rounded-lg flex flex-col items-center gap-4 shadow-sm">
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gold">
                                    <MapPin />
                                </div>
                                <h3 className="text-black font-bold">Localisation</h3>
                                <p className="text-gray-600">{settings.address || settings.coverageArea}</p>
                            </div>
                        )}
                    </div>
                )}

                <Link href={page.ctaLink || "/devis"}>
                    <span className="inline-flex items-center justify-center rounded-sm font-medium transition-colors cursor-pointer bg-gold text-black hover:bg-[#A3863C] px-12 py-3 h-14 text-lg">
                        {page.ctaText || "Accéder au Formulaire de Devis"}
                    </span>
                </Link>
            </Container>
        </div>
    );
}

import { Container } from "@/components/ui/Container";
import { client } from "@/sanity/lib/client";
import { PortableText } from "next-sanity";
import { generateSeoMetadata } from "@/lib/seo";

const PRIVACY_QUERY = `*[_type == "privacyPolicy"][0] {
  title,
  lastUpdated,
  content,
  seo
}`;

export async function generateMetadata() {
    const data = await client.fetch(PRIVACY_QUERY);
    return generateSeoMetadata(data?.seo, {
        title: data?.title || "Politique de Confidentialité | ACT Event",
        description: "Politique de confidentialité et gestion des données personnelles.",
    });
}

export default async function PrivacyPolicyPage() {
    const data = await client.fetch(PRIVACY_QUERY);

    if (!data) {
        return (
            <Container className="py-32 text-center">
                <h1 className="text-3xl font-bold mb-4">Page non trouvée</h1>
                <p>La politique de confidentialité n'a pas encore été configurée.</p>
            </Container>
        );
    }

    return (
        <div className="pt-32 pb-20 bg-background min-h-screen">
            <Container className="max-w-4xl">
                <div className="mb-12 border-b border-black/10 pb-8">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading uppercase text-black mb-4">
                        {data.title}
                    </h1>
                    {data.lastUpdated && (
                        <p className="text-gray-500 italic">
                            Dernière mise à jour : {new Date(data.lastUpdated).toLocaleDateString("fr-FR")}
                        </p>
                    )}
                </div>

                <div className="prose prose-lg max-w-none text-gray-700 font-light prose-headings:font-heading prose-headings:uppercase prose-a:text-gold hover:prose-a:text-black">
                    {data.content && <PortableText value={data.content} />}
                </div>
            </Container>
        </div>
    );
}

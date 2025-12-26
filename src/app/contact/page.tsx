import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="py-20 bg-background min-h-screen">
            <Container className="max-w-4xl text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-heading uppercase text-black mb-8">Contactez-nous</h1>
                <p className="text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
                    Pour toute demande de devis, merci de privilégier le formulaire dédié. Pour une question rapide, n'hésitez pas à nous appeler.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white p-8 border border-black/5 rounded-lg flex flex-col items-center gap-4 shadow-sm">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gold">
                            <Phone />
                        </div>
                        <h3 className="text-black font-bold">Téléphone</h3>
                        <a href="tel:0600000000" className="text-gray-600 hover:text-black transition-colors">06 00 00 00 00</a>
                    </div>

                    <div className="bg-white p-8 border border-black/5 rounded-lg flex flex-col items-center gap-4 shadow-sm">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gold">
                            <Mail />
                        </div>
                        <h3 className="text-black font-bold">Email</h3>
                        <a href="mailto:contact@act-events.fr" className="text-gray-600 hover:text-black transition-colors">contact@act-events.fr</a>
                    </div>

                    <div className="bg-white p-8 border border-black/5 rounded-lg flex flex-col items-center gap-4 shadow-sm">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gold">
                            <MapPin />
                        </div>
                        <h3 className="text-black font-bold">Localisation</h3>
                        <p className="text-gray-600">Hautes-Alpes (Gap)</p>
                    </div>
                </div>

                <Link href="/devis">
                    <Button size="lg" className="px-12">Accéder au Formulaire de Devis</Button>
                </Link>
            </Container>
        </div>
    );
}

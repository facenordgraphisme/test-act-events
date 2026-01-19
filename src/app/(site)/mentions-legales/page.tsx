import { Container } from "@/components/ui/Container";

export default function MentionsLegalesPage() {
    return (
        <div className="py-20 bg-background min-h-screen text-gray-600">
            <Container className="max-w-4xl space-y-8">
                <h1 className="text-3xl font-bold font-heading text-black mb-8">Mentions Légales</h1>

                <section>
                    <h2 className="text-xl font-bold text-black mb-2">1. Éditeur du site</h2>
                    <p>
                        Le site ACT Event est édité par [Nom de la Société], [Forme Juridique] au capital de [Montant] €.<br />
                        Siège social : [Adresse], [Code Postal] [Ville].<br />
                        SIRET : [Numéro]<br />
                        Directeur de la publication : [Nom du Directeur]
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-black mb-2">2. Hébergement</h2>
                    <p>
                        Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133 Walnut, CA 91789, USA.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-black mb-2">3. Propriété intellectuelle</h2>
                    <p>
                        L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés.
                    </p>
                </section>
            </Container>
        </div>
    );
}

import { Container } from "@/components/ui/Container";

export default function PrivacyPage() {
    return (
        <div className="py-20 bg-background min-h-screen text-gray-600">
            <Container className="max-w-4xl space-y-8">
                <h1 className="text-3xl font-bold font-heading text-black mb-8">Politique de Confidentialité</h1>

                <section>
                    <h2 className="text-xl font-bold text-black mb-2">Collecte des données</h2>
                    <p>
                        Les informations recueillies sur le formulaire de devis sont enregistrées dans un fichier informatisé par ACT Events pour la gestion de votre demande.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-black mb-2">Durée de conservation</h2>
                    <p>
                        Vos données sont conservées pendant la durée nécessaire au traitement de votre demande et, en cas de contrat, pour la durée légale de conservation des documents commerciaux.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-black mb-2">Vos droits</h2>
                    <p>
                        Conformément à la loi « informatique et libertés », vous pouvez exercer votre droit d'accès aux données vous concernant et les faire rectifier en contactant : contact@act-events.fr
                    </p>
                </section>
            </Container>
        </div>
    );
}

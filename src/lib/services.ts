export interface Service {
    title: string;
    slug: string;
    subtitle: string;
    description: string;
    fullDescription: string;
    includes: string[];
    price: string;
    image: string;
    gallery: string[];
}

export const services: Service[] = [
    {
        title: "Prestation DJ",
        slug: "prestation-dj",
        subtitle: "Performance Artistique",
        description: "L'expertise d'un artiste habitué des clubs et des scènes pour une ambiance maîtrisée.",
        fullDescription: "Fort d'un parcours d'artiste DJ en clubs et bars, je mets ma lecture du public et ma culture musicale au service de votre événement. Loin des playlists automatiques, je propose une performance vivante, construite en direct selon l'énergie du moment. Que ce soit pour un set Électro pointu ou une ambiance généraliste fédératrice, l'objectif est unique : faire danser.",
        includes: [
            "DJ Set avec vraie sensibilité artistique",
            "Sonorisation adaptée (Intérieur/Extérieur)",
            "Éclairage d'ambiance et dynamique",
            "Performance Live & Interaction",
            "Installation en conditions difficiles (Neige/Altitude)"
        ],
        price: "Sur devis",
        image: "/assets/image00003.jpeg",
        gallery: [
            "/assets/image00003.jpeg",
            "/assets/image00009.jpeg",
            "/assets/image00010.jpeg"
        ]
    },
    {
        title: "Soirée 100% Personnalisée",
        slug: "soiree-personnalisee",
        subtitle: "Festivals & Grands Événements",
        description: "Une gestion de A à Z par un ancien régisseur et directeur artistique de nuit.",
        fullDescription: "Mon expérience de directeur artistique et régisseur d'établissement de nuit me permet de maîtriser chaque aspect de vos grands événements. De la sécurité à la programmation, en passant par la logistique technique complexe, nous gérons l'ensemble. Nous transformons votre vision en festival ou concert mémorable avec la rigueur d'une équipe professionnelle rodée.",
        includes: [
            "Étude technique & Devis personnalisés",
            "Sonorisation Grande Jauge (Festivals/Concerts)",
            "Éclairage Scénique &Architectural",
            "Installations techniques longue durée",
            "Régie générale & Coordination topage"
        ],
        price: "Étude personnalisée",
        image: "/assets/image00001.jpeg",
        gallery: [
            "/assets/image00001.jpeg",
            "/assets/image00019.jpeg",
            "/assets/image00015.jpeg",
            "/assets/image00008.jpeg"
        ]
    },
    {
        title: "Location Matériel",
        slug: "location-materiel",
        subtitle: "Parc Matériel Pro",
        description: "Le matériel professionnel que nous utilisons nous-mêmes sur le terrain.",
        fullDescription: "Nous avons commencé par fabriquer nos enceintes par passion du son. Aujourd'hui, nous vous proposons les standards mondiaux (Horn, Alto) que nous utilisons sur nos propres productions. Pas de matériel dormant : c'est un parc vivant, entretenu et connu sur le bout des doigts par nos techniciens.",
        includes: [
            "Systèmes Son Horn / Alto",
            "Consoles de mixage & Micros HF",
            "Éclairage Asservi & Projecteurs LED",
            "Structure & Distribution électrique",
            "Conseils d'installation & Réglages"
        ],
        price: "Sur catalogue",
        image: "/assets/image00006.jpeg",
        gallery: [
            "/assets/image00006.jpeg",
            "/assets/image00013.jpeg",
            "/assets/image00004.jpeg"
        ]
    }
];

export function getServiceBySlug(slug: string): Service | undefined {
    return services.find(s => s.slug === slug);
}

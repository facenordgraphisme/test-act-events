import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'homepage',
    title: 'Page d\'Accueil',
    type: 'document',
    preview: {
        prepare() {
            return {
                title: "Configuration Page d'Accueil",
                subtitle: "Modifier le contenu de la page d'accueil"
            }
        }
    },
    fields: [
        // --- HERO SECTION ---
        defineField({
            name: 'hero',
            title: 'Section Héro',
            type: 'object',
            options: {
                collapsible: true, // Collapsible for better UI
                collapsed: false,
            },
            fields: [
                defineField({
                    name: 'backgroundImages',
                    title: 'Images du Carrousel (Fond)',
                    type: 'array',
                    of: [{ type: 'image', options: { hotspot: true } }],
                    description: 'Images qui défilent en fond du Héro'
                }),
                defineField({
                    name: 'description',
                    title: 'Description Principale',
                    type: 'text',
                    rows: 3,
                    description: 'Texte sous le logo (ex: L\'alliance unique...)'
                }),
            ]
        }),

        // --- PHILOSOPHY SECTION ---
        defineField({
            name: 'philosophy',
            title: 'Section Philosophie (Intro)',
            type: 'object',
            options: {
                collapsible: true,
            },
            fields: [
                defineField({
                    name: 'introduction',
                    title: 'Surtitre (ex: Notre Philosophie)',
                    type: 'string',
                }),
                defineField({
                    name: 'title',
                    title: 'Titre Principal',
                    type: 'string', // Plain string or text if we want line breaks controlled
                    description: 'ex: Plus qu\'un prestataire, Un Partenaire Créatif'
                }),
                defineField({
                    name: 'text',
                    title: 'Texte',
                    type: 'array',
                    of: [{ type: 'block' }],
                    description: 'Paragraphes de présentation'
                }),
                defineField({
                    name: 'quote',
                    title: 'Citation',
                    type: 'text',
                    rows: 2
                }),
                defineField({
                    name: 'tags',
                    title: 'Tags',
                    type: 'array',
                    of: [{ type: 'string' }],
                    description: 'ex: Mariages, Corporates, etc.'
                }),
                defineField({
                    name: 'grid',
                    title: 'Grille de Compétences',
                    type: 'array',
                    of: [{
                        type: 'object',
                        fields: [
                            defineField({ name: 'icon', type: 'string', title: 'Émoji / Icône' }),
                            defineField({ name: 'label', type: 'string', title: 'Titre' }),
                            defineField({ name: 'desc', type: 'string', title: 'Description' }),
                        ]
                    }]
                })
            ]
        }),

        // --- SERVICES SECTION ---
        defineField({
            name: 'services',
            title: 'Section Prestations',
            type: 'object',
            options: {
                collapsible: true,
            },
            fields: [
                defineField({ name: 'title', type: 'string', title: 'Titre Section' }),
                defineField({ name: 'subtitle', type: 'text', title: 'Sous-titre / Description' }),
                defineField({
                    name: 'items',
                    title: 'Cartes de Prestations',
                    type: 'array',
                    of: [{
                        type: 'object',
                        preview: {
                            select: { title: 'title', subtitle: 'subtitle', media: 'image' }
                        },
                        fields: [
                            defineField({ name: 'subtitle', type: 'string', title: 'Surtitre (ex: Clé en Main)' }),
                            defineField({ name: 'title', type: 'string', title: 'Titre (ex: Soirée Personnalisée)' }),
                            defineField({ name: 'description', type: 'text', title: 'Description' }),
                            defineField({ name: 'image', type: 'image', options: { hotspot: true }, title: 'Image de Fond' }),
                            defineField({ name: 'link', type: 'string', title: 'Lien (ex: /prestations/dj)' }),
                        ]
                    }]
                })
            ]
        }),

        // --- STORY SECTION ---
        defineField({
            name: 'story',
            title: 'Section Notre Histoire',
            type: 'object',
            options: {
                collapsible: true,
            },
            fields: [
                defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
                defineField({ name: 'intro', type: 'string', title: 'Intro (ex: Notre Histoire)' }),
                defineField({ name: 'title', type: 'string', title: 'Titre' }),
                defineField({ name: 'text', type: 'array', of: [{ type: 'block' }] }),
                defineField({ name: 'ctaText', type: 'string', title: 'Texte Bouton' }),
                defineField({ name: 'ctaLink', type: 'string', title: 'Lien Bouton' }),
            ]
        }),

        // --- COVERAGE SECTION ---
        defineField({
            name: 'coverage',
            title: 'Section Couverture Nationale',
            type: 'object',
            options: {
                collapsible: true,
            },
            fields: [
                defineField({ name: 'badge', type: 'string', title: 'Badge (ex: Couverture Nationale)' }),
                defineField({ name: 'title', type: 'string', title: 'Titre' }),
                defineField({ name: 'description', type: 'text', title: 'Description' }),
                defineField({
                    name: 'activities',
                    title: 'Liste des Activités',
                    type: 'array',
                    of: [{ type: 'string' }]
                }),
                defineField({ name: 'image', type: 'image', title: 'Image de Fond', options: { hotspot: true } }),
                defineField({ name: 'ctaText', type: 'string', title: 'Texte Bouton' }),
                defineField({ name: 'ctaLink', type: 'string', title: 'Lien Bouton' }),
            ]
        }),

        // --- TRUST SECTION ---
        defineField({
            name: 'trust',
            title: 'Section Confiance',
            type: 'object',
            options: {
                collapsible: true,
            },
            fields: [
                defineField({ name: 'subtitle', type: 'string', title: 'Surtitre' }),
                defineField({ name: 'title', type: 'string', title: 'Titre' }),
                defineField({
                    name: 'logos',
                    title: 'Logos Clients',
                    type: 'array',
                    of: [{
                        type: 'object',
                        fields: [
                            defineField({ name: 'name', type: 'string', title: 'Nom du Client' }),
                            defineField({ name: 'logo', type: 'image', title: 'Logo' })
                        ]
                    }]
                })
            ]
        }),
        defineField({
            name: 'seo',
            title: 'SEO & Meta',
            type: 'seo',
        }),
    ]
})

import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'seo',
    title: 'SEO',
    type: 'object',
    fields: [
        defineField({
            name: 'metaTitle',
            title: 'Meta Title',
            type: 'string',
            description: 'Titre affiché dans les résultats de recherche (Google). Idéalement entre 50 et 60 caractères.',
            validation: (Rule) => Rule.max(60).warning('Un titre plus long risque d\'être tronqué par Google.'),
        }),
        defineField({
            name: 'metaDescription',
            title: 'Meta Description',
            type: 'text',
            rows: 3,
            description: 'Description affichée sous le titre dans les résultats de recherche. Idéalement entre 150 et 160 caractères.',
            validation: (Rule) => Rule.max(160).warning('Une description plus longue risque d\'être tronquée par Google.'),
        }),
        defineField({
            name: 'openGraphImage',
            title: 'Image de partage (Open Graph)',
            type: 'image',
            description: 'Image affichée lors du partage sur les réseaux sociaux (Facebook, LinkedIn, etc.).',
            options: {
                hotspot: true,
            },
        }),
    ],
})

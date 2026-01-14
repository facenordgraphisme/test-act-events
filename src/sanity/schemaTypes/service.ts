import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'service',
    title: 'Prestation',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Titre',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug (URL)',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'shortDescription',
            title: 'Description Courte',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.max(200),
        }),
        defineField({
            name: 'longDescription',
            title: 'Description Détaillée',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'includes',
            title: 'Ce qui est inclus',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'optionsAndAddons',
            title: 'Options & Extras',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'startingPrice',
            title: 'Prix de départ (Optionnel)',
            type: 'string',
        }),
        defineField({
            name: 'featuredImage',
            title: 'Image Principale',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'gallery',
            title: 'Galerie Photo',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        }),
        defineField({
            name: 'order',
            title: 'Ordre d\'Affichage',
            type: 'number',
        }),
        defineField({
            name: 'seo',
            title: 'SEO & Meta',
            type: 'seo',
        }),
    ],
})

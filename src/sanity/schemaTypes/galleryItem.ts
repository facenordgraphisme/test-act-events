import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'galleryItem',
    title: 'Élément Galerie',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Titre',
            type: 'string',
        }),
        defineField({
            name: 'category',
            title: 'Catégorie',
            type: 'reference',
            to: [{ type: 'galleryCategory' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'altText',
            title: 'Texte Alternatif',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
        }),
    ],
})

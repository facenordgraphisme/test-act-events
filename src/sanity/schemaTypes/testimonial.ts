import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'testimonial',
    title: 'Témoignage',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nom du Client',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'role',
            title: 'Rôle / Type d\'événement',
            type: 'string',
            description: 'ex: Mariage, Anniversaire, Entreprise',
        }),
        defineField({
            name: 'quote',
            title: 'Citation',
            type: 'text',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'rating',
            title: 'Note (1-5)',
            type: 'number',
            initialValue: 5,
            validation: (Rule) => Rule.min(1).max(5),
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'date',
        }),
        defineField({
            name: 'image',
            title: 'Photo Client (Optionnel)',
            type: 'image',
            options: { hotspot: true },
        }),
    ],
})

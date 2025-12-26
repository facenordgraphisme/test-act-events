import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'testimonial',
    title: 'Testimonial',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Client Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'role',
            title: 'Role / Event Type',
            type: 'string',
            description: 'e.g. Mariage, Anniversaire, Corporate',
        }),
        defineField({
            name: 'quote',
            title: 'Quote',
            type: 'text',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'rating',
            title: 'Rating',
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
            title: 'Client Image (Optional)',
            type: 'image',
            options: { hotspot: true },
        }),
    ],
})

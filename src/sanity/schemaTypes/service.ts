import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'service',
    title: 'Service',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'shortDescription',
            title: 'Short Description',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.max(200),
        }),
        defineField({
            name: 'longDescription',
            title: 'Long Description',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'includes',
            title: 'What is included?',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'optionsAndAddons',
            title: 'Options / Add-ons',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'startingPrice',
            title: 'Starting Price (Optional)',
            type: 'string',
        }),
        defineField({
            name: 'featuredImage',
            title: 'Featured Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'gallery',
            title: 'Service Gallery',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
        }),
    ],
})

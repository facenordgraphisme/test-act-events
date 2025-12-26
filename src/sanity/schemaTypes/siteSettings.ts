import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'businessName',
            title: 'Business Name',
            type: 'string',
        }),
        defineField({
            name: 'tagline',
            title: 'Tagline',
            type: 'string',
        }),
        defineField({
            name: 'phoneNumber',
            title: 'Phone Number',
            type: 'string',
        }),
        defineField({
            name: 'email',
            title: 'Email Address',
            type: 'string',
            validation: (Rule) => Rule.email(),
        }),
        defineField({
            name: 'address',
            title: 'Address / Location',
            type: 'string',
        }),
        defineField({
            name: 'coverageArea',
            title: 'Coverage Area',
            type: 'string',
            description: 'e.g. Hautes-Alpes, Gap, Embrun...',
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Media Links',
            type: 'object',
            fields: [
                defineField({ name: 'instagram', type: 'url' }),
                defineField({ name: 'facebook', type: 'url' }),
                defineField({ name: 'youtube', type: 'url' }),
            ],
        }),
        defineField({
            name: 'seo',
            title: 'Default SEO',
            type: 'object',
            fields: [
                defineField({ name: 'metaTitle', type: 'string' }),
                defineField({ name: 'metaDescription', type: 'text' }),
                defineField({ name: 'ogImage', type: 'image' }),
            ],
        }),
    ],
})

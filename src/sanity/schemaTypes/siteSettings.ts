import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'siteSettings',
    title: 'Paramètres du Site',
    type: 'document',
    fields: [
        defineField({
            name: 'businessName',
            title: 'Nom de l\'Entreprise',
            type: 'string',
        }),
        defineField({
            name: 'tagline',
            title: 'Slogan',
            type: 'string',
        }),
        defineField({
            name: 'phoneNumber',
            title: 'Numéro de Téléphone',
            type: 'string',
        }),
        defineField({
            name: 'email',
            title: 'Adresse Email',
            type: 'string',
            validation: (Rule) => Rule.email(),
        }),
        defineField({
            name: 'address',
            title: 'Adresse / Localisation',
            type: 'string',
        }),
        defineField({
            name: 'coverageArea',
            title: 'Zone de Couverture',
            type: 'string',
            description: 'ex: Hautes-Alpes, Gap, Embrun...',
        }),
        defineField({
            name: 'socialLinks',
            title: 'Réseaux Sociaux',
            type: 'object',
            fields: [
                defineField({ name: 'instagram', type: 'url' }),
                defineField({ name: 'facebook', type: 'url' }),
                defineField({ name: 'youtube', type: 'url' }),
            ],
        }),
        defineField({
            name: 'seo',
            title: 'SEO par défaut',
            type: 'object',
            fields: [
                defineField({ name: 'metaTitle', type: 'string' }),
                defineField({ name: 'metaDescription', type: 'text' }),
                defineField({ name: 'ogImage', type: 'image' }),
            ],
        }),
    ],
})

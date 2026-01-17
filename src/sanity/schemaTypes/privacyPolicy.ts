import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'privacyPolicy',
    title: 'Politique de Confidentialité',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Titre de la page',
            type: 'string',
            validation: (Rule) => Rule.required(),
            initialValue: 'Politique de Confidentialité',
        }),
        defineField({
            name: 'lastUpdated',
            title: 'Dernière mise à jour',
            type: 'date',
            options: {
                dateFormat: 'DD/MM/YYYY',
            },
            initialValue: () => new Date().toISOString().split('T')[0],
        }),
        defineField({
            name: 'content',
            title: 'Contenu',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H1', value: 'h1' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                    ],
                    lists: [
                        { title: 'Bullet', value: 'bullet' },
                        { title: 'Numbered', value: 'number' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'seo',
        }),
    ],
})

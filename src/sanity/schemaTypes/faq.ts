import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'faq',
    title: 'FAQ (Foire Aux Questions)',
    type: 'document',
    fields: [
        defineField({
            name: 'question',
            title: 'Question',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'answer',
            title: 'Réponse',
            type: 'text',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'order',
            title: 'Ordre',
            type: 'number',
        }),
    ],
})

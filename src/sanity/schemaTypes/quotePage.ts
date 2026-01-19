import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'quotePage',
    title: 'Page Devis (Contenu)',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Titre Principal',
            type: 'string',
            description: 'Ex: Demander un Devis',
        }),
        defineField({
            name: 'subtitle',
            title: 'Sous-titre / Intro',
            type: 'text',
            rows: 3,
            description: 'Ex: Dites-nous en plus sur votre événement...',
        }),
        defineField({
            name: 'successTitle',
            title: 'Titre Message Succès',
            type: 'string',
            initialValue: 'Demande Reçue !',
        }),
        defineField({
            name: 'successMessage',
            title: 'Message Succès',
            type: 'text',
            rows: 3,
            initialValue: 'Merci de nous avoir contactés. Nous avons bien reçu votre demande...',
        }),
    ],
})

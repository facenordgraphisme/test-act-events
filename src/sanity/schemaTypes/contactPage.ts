import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'contactPage',
    title: 'Page Contact',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Titre Principal',
            type: 'string',
            initialValue: 'Contactez-nous',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
            description: 'Texte d\'introduction sous le titre.',
            initialValue: 'Pour toute demande de devis, merci de privilégier le formulaire dédié. Pour une question rapide, n\'hésitez pas à nous appeler.'
        }),
        defineField({
            name: 'showContactInfo',
            title: 'Afficher les Coordonnées',
            type: 'boolean',
            initialValue: true,
            description: 'Afficher les cartes Téléphone, Email et Localisation (récupérées des Paramètres du Site).',
        }),
        defineField({
            name: 'ctaLink',
            title: 'Lien du Bouton Devis',
            type: 'string',
            initialValue: '/devis',
        }),
        defineField({
            name: 'seo',
            title: 'SEO & Meta',
            type: 'seo',
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Page Contact'
            }
        }
    }
})

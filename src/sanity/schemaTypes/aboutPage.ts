import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'aboutPage',
    title: 'Page A Propos',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Titre de la page (SEO)',
            type: 'string',
        }),
        defineField({
            name: 'mainHeading',
            title: 'Titre Principal',
            type: 'string',
            description: 'Ex: De la Passion du Son à l\'Excellence Technique',
        }),
        defineField({
            name: 'introText',
            title: 'Texte d\'introduction',
            type: 'text',
            rows: 3,
        }),
        // Section 1: Les Débuts
        defineField({
            name: 'section1Title',
            title: 'Titre Section 1 (Les Débuts)',
            type: 'string',
        }),
        defineField({
            name: 'section1Content',
            title: 'Contenu Section 1',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'section1Image',
            title: 'Image Section 1',
            type: 'image',
            options: { hotspot: true },
        }),

        // Section 2: L'Experience Terrain
        defineField({
            name: 'section2Title',
            title: 'Titre Section 2 (Experience Terrain)',
            type: 'string',
        }),
        defineField({
            name: 'section2Part1Title',
            title: 'Sous-titre Partie 1 (Côté Scène)',
            type: 'string',
        }),
        defineField({
            name: 'section2Part1Content',
            title: 'Contenu Partie 1',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'section2Part2Title',
            title: 'Sous-titre Partie 2 (Côté Coulisses)',
            type: 'string',
        }),
        defineField({
            name: 'section2Part2Content',
            title: 'Contenu Partie 2',
            type: 'text',
            rows: 4,
        }),

        // Section 3: Aujourd'hui
        defineField({
            name: 'section3Title',
            title: 'Titre Section 3 (Aujourd\'hui)',
            type: 'string',
        }),
        defineField({
            name: 'section3Quote',
            title: 'Citation',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'section3Content',
            title: 'Contenu Section 3',
            type: 'array',
            of: [{ type: 'block' }],
        }),
    ],
})

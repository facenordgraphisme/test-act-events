import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Gestion de Contenu')
    .items([
      // GROUPE: PAGES
      S.listItem()
        .title('Pages du Site')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Accueil')
                .child(S.document().schemaType('homepage').documentId('homepage')),
              S.listItem()
                .title('A Propos')
                .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
              S.listItem()
                .title('Contact')
                .child(S.document().schemaType('contactPage').documentId('contactPage')),
              S.listItem()
                .title('Devis (Contenu)')
                .child(S.document().schemaType('quotePage').documentId('quotePage')),
              S.listItem()
                .title('Politique de Confidentialité')
                .child(S.document().schemaType('privacyPolicy').documentId('privacyPolicy')),
            ])
        ),

      S.divider(),

      // GROUPE: CONTENU
      S.listItem()
        .title('Contenu Global')
        .child(
          S.list()
            .title('Contenu')
            .items([
              S.documentTypeListItem('service').title('Prestations'),
              S.documentTypeListItem('galleryItem').title('Galerie (Photos)'),
              S.documentTypeListItem('galleryCategory').title('Galerie (Catégories)'),
              S.documentTypeListItem('testimonial').title('Témoignages'),
              S.documentTypeListItem('faq').title('FAQ'),
            ])
        ),

      S.divider(),

      // GROUPE: GESTION / BUSINESS
      S.listItem()
        .title('Gestion')
        .child(
          S.list()
            .title('Gestion')
            .items([
              S.documentTypeListItem('quoteRequest').title('Demandes de Devis'),
            ])
        ),

      S.divider(),

      // GROUPE: SYSTÈME
      S.listItem()
        .title('Système & Config')
        .child(
          S.list()
            .title('Configuration')
            .items([
              S.listItem()
                .title('Paramètres Généraux')
                .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
              S.listItem()
                .title('SEO Global')
                .child(S.document().schemaType('seo').documentId('seo')),
            ])
        ),
    ])

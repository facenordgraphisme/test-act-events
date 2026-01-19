import { type SchemaTypeDefinition } from 'sanity'

import siteSettings from './siteSettings'
import service from './service'
import testimonial from './testimonial'
import galleryItem from './galleryItem'
import faq from './faq'
import quoteRequest from './quoteRequest'
import homepage from './homepage'

import galleryCategory from './galleryCategory'

import privacyPolicy from './privacyPolicy'

import seo from './seo'

import aboutPage from './aboutPage'
import quotePage from './quotePage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, service, testimonial, galleryItem, faq, quoteRequest, homepage, aboutPage, quotePage, galleryCategory, seo, privacyPolicy],
}

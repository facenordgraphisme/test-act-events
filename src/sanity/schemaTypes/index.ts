import { type SchemaTypeDefinition } from 'sanity'

import siteSettings from './siteSettings'
import service from './service'
import testimonial from './testimonial'
import galleryItem from './galleryItem'
import faq from './faq'
import quoteRequest from './quoteRequest'
import homepage from './homepage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, service, testimonial, galleryItem, faq, quoteRequest, homepage],
}

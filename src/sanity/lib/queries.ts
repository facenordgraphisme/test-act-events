import { defineQuery } from 'next-sanity';

export const SERVICES_QUERY = defineQuery(`*[_type == "service"]|order(order asc){
  _id,
  title,
  slug,
  shortDescription,
  startingPrice,
  featuredImage
}`);

export const SERVICE_DETAIL_QUERY = defineQuery(`*[_type == "service" && slug.current == $slug][0]{
  title,
  shortDescription,
  longDescription,
  includes,
  optionsAndAddons,
  gallery,
  startingPrice
}`);

export const TESTIMONIALS_QUERY = defineQuery(`*[_type == "testimonial"]|order(date desc)[0...5]{
  _id,
  name,
  role,
  quote,
  rating
}`);

export const FAQ_QUERY = defineQuery(`*[_type == "faq"]|order(order asc){
  _id,
  question,
  answer
}`);

export const HOMEPAGE_GALLERY_QUERY = defineQuery(`*[_type == "galleryItem"]|order(_createdAt desc)[0...6]{
  _id,
  image,
  title,
  category
}`);

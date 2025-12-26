import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'galleryItem',
    title: 'Gallery Item',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Wedding', value: 'wedding' },
                    { title: 'Birthday', value: 'birthday' },
                    { title: 'Corporate', value: 'corporate' },
                    { title: 'Equipment', value: 'equipment' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'altText',
            title: 'Alt Text',
            type: 'string',
        }),
    ],
})

import {defineField, defineType} from 'sanity'

export const concerts = defineType({
  name: 'concerts',
  title: 'Concerts',
  type: 'document',
  fields: [
    defineField({
      name: 'band',
      title: 'Band Name / Artist',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ticketLink',
      title: 'Ticket Link',
      type: 'url',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'band',
      date: 'date',
      location: 'location',
    },
  },
})

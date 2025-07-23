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
      name: 'venue',
      type: 'reference',
      to: [{type: 'venues'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ticketLink',
      title: 'Ticket Link',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'band',
      date: 'date',
      venue: 'venue',
    },
    prepare(selection) {
      const {title, date} = selection
      return {
        title: title,
        subtitle: `${new Date(date).toLocaleDateString()}`,
      }
    },
  },
})

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
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Concert Time',
      type: 'string',
      description: 'Time of the concert in HH:MM format or TBA',
    }),
    defineField({
      name: 'venue',
      type: 'reference',
      to: [{type: 'venues'}],
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
      const {title, date, venue} = selection
      return {
        title: title,
        subtitle: `${new Date(date).toLocaleDateString()} - ${venue?.title || 'Unknown Venue'}`,
      }
    },
  },
})

import { defineType, defineField } from 'sanity';

export const tag = defineType({
  name: 'tag',
  title: 'Tags',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nome da Tag',
      type: 'localeString', 
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.pt', 
      },
    }),
  ],
});

import { defineType, defineField } from 'sanity';

export const localeString = defineType({
  name: 'localeString',
  title: 'Texto Traduzível',
  type: 'object',
  fields: [
    defineField({ name: 'pt', title: 'Português', type: 'string' }),
    defineField({ name: 'en', title: 'Inglês', type: 'string' }),
  ],
});

import { defineType, defineField } from 'sanity';

export const tool = defineType({
  name: 'tool',
  title: 'Ferramentas & Skills',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nome da Ferramenta ou Habilidade',
      type: 'localeString',
    }),
  ],
});

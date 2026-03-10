import { defineType, defineField } from 'sanity';

export const projectStatus = defineType({
  name: 'projectStatus',
  title: 'Status de Projeto',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'localeString',
      description: 'Nome do status',
    }),
  ],
});

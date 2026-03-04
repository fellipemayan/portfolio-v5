import { defineType, defineField } from 'sanity';

export const education = defineType({
  name: 'education',
  title: 'Formação Acadêmica',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Curso', type: 'localeString' }),
    defineField({ name: 'institution', title: 'Instituição', type: 'string' }),
    defineField({
      name: 'type',
      title: 'Tipo (Ex: Bacharelado)',
      type: 'localeString',
    }),
    defineField({ name: 'startYear', title: 'Ano de Início', type: 'number' }),
    defineField({ name: 'endYear', title: 'Ano de Término', type: 'number' }),
    defineField({
      name: 'description',
      title: 'Ênfase/Resumo',
      type: 'localeString',
    }),
    defineField({ name: 'order', title: 'Ordem', type: 'number' }),
  ],
});

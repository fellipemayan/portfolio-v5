import { defineType, defineField } from 'sanity';

export const experience = defineType({
  name: 'experience',
  title: 'Experiência Profissional',
  type: 'document',
  fields: [
    defineField({ name: 'company', title: 'Empresa', type: 'string' }),
    defineField({ name: 'title', title: 'Cargo', type: 'localeString' }),
    defineField({
      name: 'type',
      title: 'Tipo (Ex: Pleno, Júnior)',
      type: 'localeString',
    }),
    defineField({ name: 'location', title: 'Localização', type: 'string' }),
    defineField({ name: 'startYear', title: 'Ano de Início', type: 'number' }),
    defineField({
      name: 'endYear',
      title: 'Ano de Término',
      type: 'number',
      hidden: ({ document }) => !!document?.isPresent,
    }),
    defineField({
      name: 'isPresent',
      title: 'Trabalho atual?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'localeString',
    }),
    defineField({ name: 'order', title: 'Ordem', type: 'number' }),
  ],
});

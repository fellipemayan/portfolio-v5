import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'cta',
  title: 'CTA',
  type: 'document',
  fields: [
    defineField({
      name: 'identifier',
      title: 'Identificador',
      type: 'string',
      description: 'Exemplo: home, sobre, projeto',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'primary',
      title: 'Ação Primária',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'localeString',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'route',
          title: 'Rota Interna',
          type: 'string',
          description: 'Exemplo: /contato, /projetos',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondary',
      title: 'Ação Secundária',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'localeString',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'route',
          title: 'Rota Interna',
          type: 'string',
          description: 'Exemplo: /contato, /projetos',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
});

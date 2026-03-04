import { defineType, defineField } from 'sanity';

export const localeRichText = defineType({
  name: 'localeRichText',
  title: 'Conteúdo Traduzível',
  type: 'object',
  fields: [
    {
      name: 'pt',
      title: 'Português',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Título Seção', value: 'h2' },
            { title: 'Subtítulo', value: 'h3' },
          ],
          lists: [{ title: 'Lista', value: 'bullet' }],
          marks: {
            decorators: [
              { title: 'Negrito', value: 'strong' },
              { title: 'Itálico', value: 'em' },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto Alternativo (Acessibilidade)',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Legenda',
            },
          ],
        },
      ],
    },
    {
      name: 'en',
      title: 'Inglês',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'h2', value: 'h2' },
          ],
        },
        { type: 'image', options: { hotspot: true } },
      ],
    },
  ],
});

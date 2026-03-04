import { defineType, defineField } from 'sanity';

export const research = defineType({
  name: 'research',
  title: 'Pesquisa e Artigos',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título do Artigo', type: 'string' }),
    defineField({ name: 'description', title: 'Resumo', type: 'localeString' }),
    defineField({
      name: 'publishingYear',
      title: 'Ano de Publicação',
      type: 'number',
    }),
    defineField({ name: 'event', title: 'Evento/Conferência', type: 'string' }),
    defineField({ name: 'location', title: 'Local', type: 'string' }),
    defineField({
      name: 'type',
      title: 'Tipo de Artigo',
      type: 'localeString',
    }),
    defineField({ name: 'order', title: 'Ordem', type: 'number' }),
  ],
});

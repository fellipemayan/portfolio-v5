import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Configurações do Site',
  type: 'document',
  fields: [
    // SEO dinâmico
    {
      name: 'metaTitle',
      title: 'Título para SEO',
      type: 'localeString',
      description: 'Título principal do site para SEO e compartilhamento',
    },
    {
      name: 'metaDescription',
      title: 'Descrição para SEO',
      type: 'localeString',
      description: 'Descrição principal do site para SEO e compartilhamento',
    },
    {
      name: 'ogImage',
      title: 'Imagem de Compartilhamento (Open Graph)',
      type: 'image',
      description: 'Imagem para compartilhamento em redes sociais (1200x630px)',
      options: {
        hotspot: true,
      },
    },
    defineField({
      name: 'email',
      title: 'E-mail de Contato',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),

    // Localiação
    defineField({
      name: 'location',
      title: 'Localização Atual',
      type: 'object',
      fields: [
        { name: 'city', title: 'Cidade', type: 'string' },
        { name: 'state', title: 'Estado (Sigla)', type: 'string' },
        { name: 'country', title: 'País', type: 'string' },
      ],
    }),

    // Rotas
    defineField({
      name: 'navLinks',
      title: 'Links da Navegação',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Rótulo', type: 'localeString' },
            { name: 'path', title: 'Caminho (ex: /projetos)', type: 'string' },
            {
              name: 'aliases',
              title: 'Aliases (redirecionamentos)',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Ex: ["/about", "/contact"]',
            },
          ],
        },
      ],
    }),

    // --- CURRÍCULOS POR IDIOMA ---
    defineField({
      name: 'resumes',
      title: 'Currículos (PDF)',
      type: 'object',
      fields: [
        {
          name: 'pt',
          title: 'Currículo em Português',
          type: 'file',
          options: { accept: '.pdf' },
        },
        {
          name: 'en',
          title: 'Currículo em Inglês',
          type: 'file',
          options: { accept: '.pdf' },
        },
      ],
    }),

    // --- LINKS DE REDES SOCIAIS ---
    defineField({
      name: 'socialLinks',
      title: 'Links de Redes Sociais',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Plataforma', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
            { name: 'order', title: 'Ordem de Exibição', type: 'number' },
            {
              name: 'isVisible',
              title: 'Visível no Site?',
              type: 'boolean',
              initialValue: true,
            },
          ],
          preview: {
            select: { title: 'name', subtitle: 'url' },
          },
        },
      ],
    }),

    // Colofão
    defineField({
      name: 'colophon',
      type: 'object',
      fields: [
        {
          name: 'pt',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [{ title: 'Normal', value: 'normal' }],
              marks: {
                decorators: [
                  { title: 'Strong', value: 'strong' },
                  { title: 'Emphasis', value: 'em' },
                ],
                annotations: [
                  {
                    title: 'URL',
                    name: 'link',
                    type: 'object',
                    fields: [{ name: 'href', type: 'url' }],
                  },
                ],
              },
            },
          ],
        },
        { name: 'en', type: 'array', of: [{ type: 'block' }] },
      ],
    }),

    // Metadados
    defineField({
      name: 'version',
      title: 'Versão do Projeto',
      type: 'string',
      initialValue: '1.0.0',
    }),
    defineField({
      name: 'lastUpdate',
      title: 'Última Atualização',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' },
    }),
  ],
});

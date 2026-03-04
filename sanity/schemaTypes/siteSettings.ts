import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Configurações do Site',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'E-mail de Contato',
      type: 'string',
      validation: (Rule) => Rule.email(),
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
          ],
          preview: {
            select: { title: 'name', subtitle: 'url' },
          },
        },
      ],
    }),
  ],
});

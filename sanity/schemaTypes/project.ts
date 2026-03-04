import { defineType, defineField } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Projetos',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título', type: 'string' }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    }),

    // Destaque?
    defineField({
      name: 'featured',
      title: 'Destaque?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'featuredOrder',
      title: 'Ordem de Destaque',
      type: 'number',
      hidden: ({ document }) => !document?.featured,
    }),

    // Flags de Estado
    defineField({
      name: 'isComingSoon',
      title: 'Em breve?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isProtected',
      title: 'Protegido por senha?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'password',
      title: 'Senha',
      type: 'string',
      hidden: ({ document }) => !document?.isProtected,
    }),

    // Informações Principais (Internacionalizadas)
    defineField({
      name: 'category',
      title: 'Categoria principal',
      type: 'localeString',
    }),
    defineField({
      name: 'description',
      title: 'Descrição Curta',
      type: 'localeString',
    }),

    // Metadados do Projeto
    defineField({
      name: 'role',
      title: 'Papel / Função',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'period',
      title: 'Período',
      type: 'object',
      fields: [
        { name: 'start', title: 'Início', type: 'string' },
        { name: 'end', title: 'Fim', type: 'string' },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    }),
    defineField({
      name: 'toolsAndskills',
      title: 'Ferramentas e Habilidades',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'toolSkill' }] }],
    }),

    // Mídias
    defineField({
      name: 'thumbnailImage',
      title: 'Imagem de Capa',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Texto Alternativo', type: 'localeString' },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Galeria de Imagens',
      type: 'array',
      of: [
        {
          type: 'image',
          fields: [
            { name: 'alt', title: 'Texto Alternativo', type: 'localeString' },
          ],
        },
      ],
    }),

    // Links Externos
    defineField({
      name: 'externalLinks',
      title: 'Links Externos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Rótulo', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
          ],
        },
      ],
    }),

    // Conteúdo (Estudo de Caso)
    defineField({
      name: 'content',
      title: 'Estudo de Caso Completo',
      type: 'localeRichText',
    }),
  ],
});

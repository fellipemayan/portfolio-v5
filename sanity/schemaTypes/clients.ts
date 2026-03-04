import { defineType, defineField } from 'sanity';

export const client = defineType({
  name: 'client',
  title: 'Clientes',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nome do Cliente', type: 'string' }),
  ],
});

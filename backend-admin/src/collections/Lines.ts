import { CollectionConfig } from 'payload'

export const Lines: CollectionConfig = {
  slug: 'lines',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'updatedAt'],
    group: 'Estrutura do Produto',
  },
  access: {
    create: ({ req }) => req.user?.role === 'admin',
    read: () => true,
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      label: 'Nome da Linha',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Descrição da Linha',
      type: 'textarea',
    },
    {
      name: 'category',
      label: 'Categoria',
      type: 'relationship',
      relationTo: 'categories', // Linha obrigatoriamente pertence a uma Categoria
      required: true, // Simula on_delete=PROTECT
    },
  ],
  timestamps: true,
}

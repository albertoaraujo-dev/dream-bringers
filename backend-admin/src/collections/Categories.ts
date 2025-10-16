import { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Categoria',
    plural: 'Categorias',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'id', 'updatedAt'],
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
      label: 'Nome da Categoria',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Descrição da Categoria',
      type: 'textarea',
    },
  ],
  // Payload adiciona createdAt e updatedAt (date_created, date_edited)
  timestamps: true,
}
